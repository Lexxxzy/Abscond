import datetime
import re
from uuid import uuid4
from flask import Blueprint, current_app, jsonify, request, session
from app.extensions import db
from sqlalchemy import text, func
from flask_bcrypt import Bcrypt
from app.helpers.validation import validate_account, validate_input, validate_name, validate_airline_company
from app.helpers.resolver import get_path_to_airline_logo, convert_week, convert_days,convert_additional_options

dashboard = Blueprint('dashboard', __name__, url_prefix="/dashboard")
flaskbcrypt = Bcrypt(current_app)


@dashboard.route("/get-airports")
def get_airports():
    manager_id = session.get("manager_id")

    if not manager_id:
        return jsonify({"error": "Unauthorized"})

    try:
        airport = request.args.get("airport", default="", type=str)
    except KeyError:
        airport = ''

    airport = re.sub('[^\u0401\u0451\u0410-\u044fa-zA-Z]+', '', airport)

    try:
        with db.engine.connect() as connection:
            airports = connection.execute(text('''
                                               SELECT * FROM tickets.search_airport('{query}');
                                               '''.format(query=airport)))

            return jsonify([dict(row) for row in airports])

    except Exception:
        return jsonify({"error": "Some error occured"}), 500


@dashboard.route("/get-airlines")
def get_airlines():

    try:
        airline = request.args.get("airline", default="", type=str)
    except KeyError:
        airline = ''

    try:
        with db.engine.connect() as connection:
            airlines = connection.execute(text('''
                                               SELECT title FROM airlines.company WHERE title ILIKE '{query}%';
                                               '''.format(query=airline)))

            return jsonify(list(map(lambda title: title['title'], airlines)))

    except Exception:
        return jsonify({"error": "Some error occured"}), 500


@dashboard.route("/manager-register", methods=["POST"])
def manager_register():
    try:
        email = request.json["email"]
        password = request.json["password"]
        name = request.json["name"]
        surname = request.json["surname"]
        airline = request.json["airline"]
    except KeyError:
        return {'error': 'All fiels must be filled'}

    validation_result = validate_account(email, password)
    if validation_result != "ALL_VALID":
        return jsonify({"error": validation_result})

    validation_result = validate_input(name, surname)
    if validation_result != "ALL_VALID":
        return jsonify({"error": validation_result})

    validation_result = validate_name(name, surname)
    if validation_result != "ALL_VALID":
        return jsonify({"error": validation_result})

    validation_result = validate_airline_company(airline)
    if validation_result != "ALL_VALID":
        return jsonify({"error": validation_result})

    try:
        with db.engine.connect() as connection:
            user_exists = connection.execute(text('''
                                               SELECT * FROM airlines.is_exists('{email}');
                                               '''.format(email=email)))

            is_user_exists = [dict(row) for row in user_exists][0]['is_exists']

            if is_user_exists:
                return jsonify({"error": "User already exists"}), 409

            hashed_password = flaskbcrypt.generate_password_hash(password)
            manager_id = uuid4().hex

            connection.execute(text('''
                            CALL airlines.register_manager('{manager_id}', '{email}', 
                            '{password}', '{name}', '{surname}', '{airline}');COMMIT;
                             '''.format(manager_id=manager_id, email=email,
                                        password=hashed_password.decode("utf-8"), name=name,
                                        surname=surname, airline=airline)))

            return jsonify({"success": f"Successful registration for {email}"})
    except Exception:
        return jsonify({"error": "Some error occured"}), 500


@dashboard.route('/manager-login', methods=["POST"])
def login_user():
    try:
        email = request.json["email"]
        password = request.json["password"]
    except KeyError:
        return {'error': 'All fiels must be filled'}

    try:
        with db.engine.connect() as connection:
            user_info = connection.execute(text('''
                                               SELECT air.id, air.email, comp.title, air.password, air.is_activated 
                                               FROM airlines.airline_manager air
                                               JOIN airlines.company comp
                                                   ON comp.id = air.airline
                                               WHERE email='{email}'
                                               LIMIT 1;
                                               '''.format(email=email)))

            user_pass = [dict(row) for row in user_info]

            if len(user_pass) != 0:
                is_activated = user_pass[0]['is_activated']
                if not is_activated:
                    return jsonify({"error": "Account is not confirmed yet"})

                hashed_pass = bytearray(
                    user_pass[0]['password']).decode('utf-8', 'ignore')
                if not flaskbcrypt.check_password_hash(hashed_pass, password):
                    return jsonify({"error": "Incorrect login or password"})
            else:
                return jsonify({"error": "Incorrect login or password"})

            manager_id = user_pass[0]['id']
            session["manager_id"] = manager_id

            return jsonify({
                "email": user_pass[0]['email'],
                "airline": user_pass[0]['title'],
            })

    except Exception as e:
        print(e)
        return jsonify({"error": "Some error occured"}), 500


@dashboard.route("/tickets")
def get_tickets():
    manager_id = session.get("manager_id")

    if not manager_id:
        return jsonify({"error": "Unauthorized"})

    try:
        query = request.args.get("query", default="", type=str)
    except KeyError:
        query = ''

    query = re.sub('[^\u0401\u0451\u0410-\u044fa-zA-Z0-9]+', '', query)

    try:
        with db.engine.connect() as connection:
            airline = connection.execute(text('''
                SELECT comp.title
                FROM airlines.airline_manager manager
                JOIN airlines.company comp
                ON comp.id = manager.airline
                WHERE manager.id = '{manager_id}';
                '''.format(manager_id=manager_id)))

            tickets = connection.execute(text('''
                                                SELECT * FROM airlines.search_tickets_airlines('{manager_id}', '{query}');
                                                '''.format(manager_id=manager_id, query=query)))

            return jsonify({
                "logo": get_path_to_airline_logo([dict(row) for row in airline][0]['title']),
                "items": [dict(row) for row in tickets]
            })

    except Exception as e:
        print(e)
        return jsonify({"error": "Some error occured"}), 500


@dashboard.route("/tickets/add", methods=["POST"])
def add_ticket():
    manager_id = session.get("manager_id")

    if not manager_id:
        return jsonify({"error": "Unauthorized"})
    
    try:
        additional_options = request.json["additionalOptions"]
        arrival_airport = request.json["arrivalAirport"]["airport_code"]
        departure_airport = request.json["departureAirport"]["airport_code"]
        departure_time = request.json["departureTime"]
        flight_week = request.json["flightWeek"]
        flight_duration = request.json["flight_duration"]
        price = request.json["price"]
        tickets_amount = request.json["ticketsAmount"]
        weekdays = request.json["weekdays"]
        
        if(len(weekdays) == 0):
            return {'error': 'All fiels must be filled'}
        
    except KeyError:
        return {'error': 'All fiels must be filled'}
    
    try:
        datetime.datetime.strptime(departure_time, '%H:%M').time()
    except Exception:
        return {'error': 'Invalid departure time'}
    
    try:
        datetime.datetime.strptime(flight_duration, '%H:%M').time()
    except Exception:
        return {'error': 'Invalid flight duration field'}
    
    validation = validate_input(arrival_airport, departure_airport, flight_week, price, tickets_amount)
    
    if not validation=="ALL_VALID":
        return {'error': validation}
    
    week = convert_week(flight_week)
    
    if week=="Invalid week type":
        return {'error': week}
    
    coverted_flight_days = convert_days(weekdays)
    
    if coverted_flight_days == "Invalid weekday format":
        return {'error': coverted_flight_days}
    
    coverted_additional_options = convert_additional_options(additional_options)
    
    if coverted_additional_options == "Invalid additional options":
        return {'error': coverted_additional_options}
    
    try:
        tickets = []
        with db.engine.begin() as connection:
            tickets = connection.execute(text('''
                                                CALL tickets.add_ticket('{}','{}','{}','{}','{}',{},{},'{}',{},'{}');
                                                '''.format(departure_time, departure_airport, arrival_airport,
                                                        coverted_flight_days,flight_duration, 
                                                        week, price, manager_id, tickets_amount, 
                                                        coverted_additional_options)))
            connection.execute(text('''COMMIT;'''))

        tickets = [dict(row) for row in tickets]
        
        if(len(tickets) == 1):
            return jsonify(tickets)
        else:
            return jsonify({"error": "Some error occured"}), 500

    except Exception as e:
        print(e)
        return jsonify({"error": "Some error occured"}), 500
    

@dashboard.route("/flight/delete", methods=["DELETE"])
def delete_flight():
    manager_id = session.get("manager_id")

    if not manager_id:
        return jsonify({"error": "Unauthorized"})
    
    try:
        flight_id = request.args.get("flight_id", default="", type=str)
    except KeyError:
        return {'error': 'All fiels must be filled'}
    
    if flight_id == '' or None:
        return {'error': 'All fiels must be filled'}
          
    flight_id = re.sub('[^\u0401\u0451\u0410\u044fa-zA-Z0-9]+', '', flight_id)
    validation_result = validate_input(flight_id)

    if validation_result != "ALL_VALID":
        return {'error': validation_result}, 400

    try:
        with db.engine.connect() as connection:
            ticket = connection.execute(text('''
                            SELECT flight_id FROM tickets.flight 
                            WHERE flight_id='{id}';
                '''.format(id=flight_id)))
            
            ticket = [dict(row) for row in ticket]
            
            if (ticket == []):
                return {'error': 'Not valid ticket number'}, 400
            
            connection.execute(text('''
                            DELETE FROM tickets.flight 
                            WHERE flight_id='{id}';
                            '''.format(id=flight_id)))

            return jsonify({
                "success": 200
            })

    except Exception as e:
        print(e)
        return jsonify({"error": "Some error occured"}), 500



@dashboard.route("/manager-logout", methods=["POST"])
def logout_user():
    session.pop("manager_id")
    return "200"


@dashboard.route("/@manager")
def get_current_manager():
    manager_id = session.get("manager_id")

    if not manager_id:
        return jsonify({"error": "Unauthorized"})

    return "200"
