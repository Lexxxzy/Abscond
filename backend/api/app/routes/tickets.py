from flask import Blueprint, request, current_app, jsonify, session

from app.models.user import Passport, User
from app.helpers.resolver import get_country_flag_path, get_path_to_airline_logo
from app.helpers.generator import generate_user_boarding_info, get_ten_symbol_uuid
from app.helpers.validation import validate_input, validate_passport
from app.extensions import db
from app.models.bookings import BoardingInfo, Booking, Flight, Ticket, City
from flask_bcrypt import Bcrypt
from sqlalchemy import text, func
from datetime import datetime, timedelta

tickets = Blueprint('tickets', __name__, url_prefix='/tickets')
flaskbcrypt = Bcrypt(current_app)


@tickets.route("/get")
def get_tickets():
    try:
        trip_type = request.args.get("tripType", default="", type=str)
    except KeyError:
        return {'error': 'Please, specify your trip type'}, 400

    try:
        departure_city = request.args.get(
            "departureCity", default="", type=str)
        arrival_city = request.args.get("arrivalCity", default="", type=str)
        departurel_date = request.args.get(
            "departurelDate", default="", type=str)

    except KeyError:
        return {'error': 'All fiels must be filled'}, 400

    arrivalDate = request.args.get("arrivalDate", default="", type=str)

    departure_city = departure_city.split(',')[0].strip()
    arrival_city = arrival_city.split(',')[0].strip()

    validation_result = validate_input(
        departurel_date, arrivalDate, departure_city, arrival_city)

    if validation_result == "ALL_VALID":
        depart_city_code = City.query.filter(
            City.city_title.ilike(departure_city)).first()

        arrival_city_code = City.query.filter(
            City.city_title.ilike(arrival_city)).first()

        searched_tickets = [
            {
                "type": "Round",
                "items": [],
            },
            {
                "type": "OneWay",
                "items": [],
            },
        ]

        if (depart_city_code == None or arrival_city_code == None):
            return []

        with db.engine.connect() as connection:
            # SEARCH FOR ALL TICKETS TWO WAY
            search_result = connection.execute(text('''
                                            SELECT
                                                f.flight_id,
                                                f.departure_time,
                                                f.departure_time+f.duration AS arrival_time,
                                                depart.city AS city_from,
                                                arrival.city AS city_to,
                                                f.price,
                                                f.duration,
                                                f.airline,
                                                f.departure_airport,
                                                f.arrival_airport
                                            FROM tickets.flight f
                                            JOIN tickets.airport depart
                                                ON f.departure_airport = depart.airport_code
                                            JOIN tickets.airport arrival
                                                ON f.arrival_airport = arrival.airport_code
                                            WHERE ((depart.city = '{dc}' AND arrival.city = '{ac}') OR
                                                   (depart.city = '{ac}' AND arrival.city = '{dc}'));
                                            '''.format(dc=depart_city_code.city_code, ac=arrival_city_code.city_code)))

            one_way = []
            back_way = []

            for row in search_result:
                if (row.city_from == depart_city_code.city_code and row.city_to == arrival_city_code.city_code):
                    one_way.append({
                        'price': '₽' + str(row.price),
                        'info': "Meals are included",
                        'dateFrom': departurel_date,
                        'logo': get_path_to_airline_logo(row.airline),
                        'flight_id': row.flight_id,
                        'directions': [
                            {
                                'airportIdFrom': row.departure_airport,
                                'airportIdTo': row.arrival_airport,
                                'flightLength': str(row.duration),
                                'flightFrom': row.city_from,
                                'cityFrom': departure_city,
                                'flightTo': row.city_to,
                                'cityTo': arrival_city,
                                'timeFlightFrom': str(row.departure_time),
                                'timeFlightTo': str(row.arrival_time),
                            },
                        ]
                    })
                elif (row.city_from == arrival_city_code.city_code and row.city_to == depart_city_code.city_code):
                    back_way.append({
                        'price': '₽' + str(row.price),
                        'info': "Meals are included",
                        'dateTo': arrivalDate,
                        'dateFrom': "",
                        'logo': get_path_to_airline_logo(row.airline),
                        'flight_id': row.flight_id,
                        'directions': [
                            {
                                'flightLength': row.duration,
                                'flightFrom': row.city_from,
                                'cityFrom': arrival_city,
                                'flightTo': row.city_to,
                                'cityTo': departure_city,
                                'timeFlightFrom': str(row.departure_time),
                                'timeFlightTo': str(row.arrival_time),
                                'airportIdFrom': row.departure_airport,
                                'airportIdTo': row.arrival_airport,
                            },
                        ]
                    })

            for i, ticket_to in enumerate(one_way):
                ticket_from = back_way[i]

                ticket_from["directions"].insert(0, ticket_to["directions"][0])

                true_flight_length = datetime.strptime(
                    ticket_from["directions"][0]["flightLength"], '%H:%M:%S')
                t = datetime.strptime(
                    ticket_from["directions"][1]["timeFlightFrom"], '%H:%M:%S')
                flight_from_current = timedelta(
                    hours=t.hour, minutes=t.minute, seconds=t.second)

                """
                NOTE: Setting right arrival and flight time to back way ticket,
                      cause data was generated randomly
                """
                ticket_from["directions"][1]['timeFlightTo'] = str(
                    (flight_from_current + true_flight_length).time())
                ticket_from["directions"][1]['flightLength'] = ticket_from["directions"][0]['flightLength']
                ticket_from["dateFrom"] = ticket_to["dateFrom"]

            searched_tickets[1]["items"] += one_way
            searched_tickets[0]["items"] += back_way

        return searched_tickets

    return {'error': validation_result}, 400


@tickets.route("/cities")
def get_city():
    city = request.args.get("city", default="", type=str)

    if city == None or not city.isalpha():
        return {"city": []}

    search = "{}%".format(city)

    cities_filter = City.query.filter(
        City.city_title.ilike(search)).order_by(City.city_title.asc()).limit(5).all()

    if (cities_filter == []):
        cities_filter = City.query.filter(City.city_code.ilike(
            search)).order_by(City.city_code.asc()).limit(5).all()

    return {"city": cities_filter}


@tickets.route("/get/boarding")
def get_boarging():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"})

    existing_unpaid_user_ticket = Ticket.query.filter_by(
        passenger=user_id, booking_info=None).first()
    if existing_unpaid_user_ticket is not None:
        boarding = BoardingInfo.query.filter_by(
            boarding_no=existing_unpaid_user_ticket.boarding_pass).first()
        db.session.delete(existing_unpaid_user_ticket)
        db.session.commit()

        db.session.delete(boarding)
        db.session.commit()

    flight_no = request.args.get("flight_no", default="", type=str)
    validation_result = validate_input(flight_no)

    if validation_result != "ALL_VALID":
        return {'error': validation_result}, 400

    flight = Flight.query.filter_by(flight_id=flight_no).first()

    if (flight is None):
        return {'error': 'Not valid'}, 400

    return {"boarding": generate_user_boarding_info(flight_no, user_id)}


@tickets.route("/booking/cancelled", methods=["DELETE"])
def delete_ticket():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 403

    ticket_id = request.args.get("ticket_id", default="", type=str)

    validation_result = validate_input(ticket_id)

    if validation_result != "ALL_VALID":
        return {'error': validation_result}, 400

    ticket = Ticket.query.filter_by(ticket_id=ticket_id).first()

    if (ticket is None):
        return {'error': 'Not valid'}, 400

    boarding = BoardingInfo.query.filter_by(
        boarding_no=ticket.boarding_pass).first()

    if (ticket.passenger == user_id):
        db.session.delete(ticket)
        db.session.commit()

        db.session.delete(boarding)
        db.session.commit()
    else:
        return {'error': 'Not valid'}, 403

    return "200"


@tickets.route("/buy", methods=["POST"])
def buy_ticket():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"})

    try:
        user = User.query.filter_by(id=user_id).first()
        passport = Passport.query.filter_by(owner_id=user_id).first()
        if (passport is None):
            passport_id = request.json["passport_id"]
            issue_date = request.json["issue_date"]
            passport_name = request.json["name"]
            passport_surname = request.json["surname"]
            passport_gender = request.json["gender"]
            validation_result = validate_passport(passport_id=passport_id, issue_date=issue_date,
                                                  passport_name=passport_name, passport_surname=passport_surname,
                                                  gender=passport_gender)

            if (validation_result != "ALL_VALID"):
                return {'error': validation_result}

        else:
            passport_id = passport.id
            passport_surname = passport.surname
            passport_name = passport.name

        ticket_id = request.json["ticket_id"]
        flight_date = request.json["flight_date"]

    except KeyError:
        return jsonify({"error": 'NOT VALID INPUT'})

    ticket = Ticket.query.filter_by(ticket_id=ticket_id).first()

    if (ticket is None):
        return {'error': 'Not valid'}, 400

    if (ticket.booking_info is not None):
        return {'error': 'Ticket is already bought'}, 400

    if (ticket.passenger == user_id):
        try:
            boaring = BoardingInfo.query.filter_by(
                boarding_no=ticket.boarding_pass).first()
            price = Flight.query.filter_by(
                flight_id=boaring.flight_id).first().price

            try:
                with db.engine.connect() as connection:
                    connection.execute(text('''
                                    BEGIN TRANSACTION;
                                    DO
                                    $$
                                    DECLARE
                                    booking INTEGER;
                                    BEGIN
                                        INSERT INTO tickets.booking (book_date, total_amount, flight_on)
                                                                        VALUES (NOW(), {total_amount}, '{flight_date}')
                                                                        RETURNING book_id INTO booking;
                                        UPDATE tickets.ticket
                                        SET booking_info = booking
                                        WHERE ticket_id = '{ticket_id}';

                                        UPDATE tickets.flight
                                        SET amount = amount - 1
                                        WHERE flight_id = '{flight_id}';
                                    END;
                                    $$;
                                    COMMIT TRANSACTION;
                                        '''.format(total_amount=price, flight_date=flight_date, ticket_id=ticket_id, flight_id=boaring.flight_id)))
            except Exception as e:
                print(e)
                return jsonify({"error": "Error!"}), 500

            return {"moreInfo":
                    {
                        "passengerName": passport_surname + " " + passport_name,
                        "passengerPassport": passport_id,
                        "terminal": boaring.terminal,
                        "gate": boaring.gate,
                        "seat": boaring.seat,
                        "barcodeId": ticket.ticket_id
                    }}

        except Exception:
            return {'error': 'Not valid'}, 403
    else:
        return {'error': 'Not valid'}, 403


# @tickets.route("/avalible-routes")
# def get_available_routes():
#     countries_from_db = db.session.query(
#         City.c.country).distinct(City.c.country).all()

#     cities = []
#     for country in countries_from_db:
#         cities_in_country = db.session.query(City).filter_by(country=country.country).all()
#         cities_temp = []

#         for city in cities_in_country:
#             cities_temp.append(city.city_title)

#         cities.append({city.country:
#             {
#                 "cities": cities_temp,
#                 "logo": get_country_flag_path(country.country),
#             }
#         })

#         cities_temp = []

#     return jsonify( cities)
