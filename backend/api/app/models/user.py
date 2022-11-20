from app.extensions import db
from uuid import uuid4
from sqlalchemy.dialects import postgresql

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "user"
    __table_args__ = {'schema': 'customer'}
    
    id = db.Column(db.String(32), primary_key = True, unique = True, default = get_uuid)
    email = db.Column(db.String(127), unique = True, nullable = False)
    password = db.Column(db.LargeBinary(60), nullable = False)
    login = db.Column(db.String(32), unique = True, nullable = True)
    phone_number = db.Column(db.String(12), unique = True, nullable = True)
    
    passport = db.relationship('Passport', backref='user')
    
    
class Passport(db.Model):
    __tablename__ = "passport"
    __table_args__ = {'schema': 'customer'}
    
    id = db.Column(db.String(10), unique = True, primary_key = True)
    issue_date = db.Column(db.Date, nullable = False)
    name = db.Column(db.String(64), nullable=False)
    surname = db.Column(db.String(64), nullable=False)
    gender = db.Column(db.CHAR(1), nullable=False)
    
    owner_id = db.Column(db.String(32), db.ForeignKey(User.id))
    
    
class ForeignPassport(db.Model):
    __tablename__ = "foreign_passport"
    __table_args__ = {'schema': 'customer'}
    
    id = db.Column(db.String(9), unique = True, primary_key = True)
    issue_date = db.Column(db.Date, nullable = False)
    expiry_date = db.Column(db.Date, nullable = False)
    name = db.Column(db.String(64), nullable=False)
    surname = db.Column(db.String(64), nullable=False)
    gender = db.Column(db.CHAR(1), nullable=False)
    
    owner_id = db.Column(db.String(32), db.ForeignKey(User.id))