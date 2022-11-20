from uuid import uuid4
import random
from app.extensions import db
from sqlalchemy import text

def get_ten_symbol_uuid():
    return uuid4().hex[0:10]


def get_uuid():
    return uuid4().hex


def generate_seat():
    letters = "ABC"
    return str(random.randint(1, 40)) + random.choice(letters)


def generate_terminal():
    letters = "ABCDEFG"
    return random.choice(letters)


def generate_gate():
    letters = "ABC"
    return str(random.randint(1, 20)) + random.choice(letters)


def generate_user_boarding_info(flight_id, passenger_id):
    boarding_no = get_ten_symbol_uuid()
    seat = generate_seat()
    terminal = generate_terminal()
    gate = generate_gate()

    ticket_id = uuid4().hex
    
    with db.engine.connect() as connection:
         connection.execute(text('''
                                    INSERT INTO tickets.boarding_info(
                                        boarding_no, flight_id, terminal, gate, seat)
                                        VALUES ('{bn}', '{fid}', '{t}', '{g}', '{s}');
                                    INSERT INTO tickets.ticket(
                                        ticket_id, passenger, boarding_pass)
                                        VALUES ('{tid}', '{p}', '{bn}');
                                 '''.format(bn=boarding_no, fid=flight_id, t=terminal, g=gate, s=seat, tid=ticket_id, p=passenger_id)))
    return ticket_id
