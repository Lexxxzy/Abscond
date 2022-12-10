import re
from uuid import uuid4
from flask import Blueprint, current_app, jsonify, request, session
from app.extensions import db
from sqlalchemy import text, func
from flask_bcrypt import Bcrypt
from app.helpers.validation import validate_account, validate_input, validate_name, validate_airline_company
from app.helpers.resolver import get_path_to_airline_logo

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
        
    query = re.sub('[^\u0401\u0451\u0410-\u044fa-zA-Z]+', '', query)

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
