from dataclasses import dataclass
from app.extensions import db
from uuid import uuid4
from sqlalchemy.dialects import postgresql
from app.models.user import User

def get_uuid():
    return uuid4().hex
    
@dataclass
class City(db.Model):
    __tablename__ = "city"
    __table_args__ = {'schema': 'tickets'}
    
    city_code: str
    city_title: str
    # country: str
    
    city_code = db.Column(db.String(3), unique = True, primary_key = True, nullable = False)
    city_title = db.Column(db.String(64), nullable = False)
    # country = db.Column(db.String(32))
    

class Airport(db.Model):
    __tablename__ = "airport"
    __table_args__ = {'schema': 'tickets'}
    
    airport_code = db.Column(db.String(3), unique = True, primary_key = True, nullable = False)
    airport_name = db.Column(db.String(64), unique = True, nullable = False)
    # city = db.Column(db.String(3), db.ForeignKey(City.city_code), nullable = False)

    
class Flight(db.Model):
    __tablename__ = "flight"
    __table_args__ = {'schema': 'tickets'}
    
    flight_id = db.Column(db.String(6), unique = True, primary_key = True)
    departure_time = db.Column(db.TIME(0), nullable = False)
    duration = db.Column(postgresql.INTERVAL(0), nullable = False)
    week = db.Column(db.Boolean, nullable = False)
    weekday = db.Column(db.SmallInteger, nullable = False)
    price = db.Column(db.Integer, nullable = False)
    
    departure_airport = db.Column(db.String(3), db.ForeignKey(Airport.airport_code))
    arrival_airport = db.Column(db.String(3), db.ForeignKey(Airport.airport_code))
    
    departure = db.relationship("Airport", foreign_keys=[departure_airport])
    arrival = db.relationship("Airport", foreign_keys=[arrival_airport])
    flight = db.relationship('BoardingInfo', backref='flight')
    
    
class Booking(db.Model):
    __tablename__ = "booking"
    __table_args__ = {'schema': 'tickets'}
    
    book_id = db.Column(db.Integer, primary_key = True, unique = True)
    book_date = db.Column(db.Date, nullable = False)
    total_amount = db.Column(db.Integer)
    
    
class BoardingInfo(db.Model):
    __tablename__ = "boarding_info"
    __table_args__ = {'schema': 'tickets'}
    
    boarding_no = db.Column(db.String(10), primary_key = True, unique = True)
    flight_id = db.Column(db.String(6), db.ForeignKey(Flight.flight_id), nullable = False)
    terminal = db.Column(db.CHAR(2), nullable=False)
    gate = db.Column(db.CHAR(3), nullable=False)
    seat = db.Column(db.CHAR(4), nullable=False)
    is_food_included = db.Column(db.Boolean, nullable=False)
    is_business = db.Column(db.Boolean, nullable=False)
    
class Ticket(db.Model):
    __tablename__ = "ticket"
    __table_args__ = {'schema': 'tickets'}
    
    ticket_id = db.Column(db.String(32), primary_key = True, unique = True, default = get_uuid)
    passenger = db.Column(db.String(32), db.ForeignKey(User.id), nullable = False)
    booking_info = db.Column(db.Integer, db.ForeignKey(Booking.book_id), nullable = True)
    boarding_pass = db.Column(db.String(10), db.ForeignKey(BoardingInfo.boarding_no), nullable = False)
    
