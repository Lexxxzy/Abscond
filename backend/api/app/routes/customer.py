from flask import Blueprint, request, jsonify, session, current_app
from app.extensions import db
from app.models.bookings import *
from app.models.user import User, Passport, ForeignPassport
from app.helpers.validation import password_check, validate_account, check_mail, validate_login, validate_passport, validate_phone
from flask_bcrypt import Bcrypt
from sqlalchemy import text

user = Blueprint('user', __name__)
flaskbcrypt = Bcrypt(current_app)


@user.route("/@me")
def get_current_user():
    user_id = session.get("user_id")
    
    if not user_id:
        return jsonify({"error": "Unauthorized"})

    return "200"


@user.route("/@me/info")
def set_user_info():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"})

    user = User.query.filter_by(id=user_id).first()

    return jsonify({
        "id": user.id,
        "email": user.email,
        "phone": user.phone_number,
        "login": user.login
    })


@user.route("/@me/info/add", methods=["PATCH"])
def get_user_info():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"})

    user = User.query.filter_by(id=user_id).first()

    try:
        new_phone_number = request.json["phone_number"]
        
        if not isinstance(new_phone_number, str):
            raise KeyError
        
        validation_result_phone = validate_phone(new_phone_number)
        
        if(validation_result_phone != "ALL_VALID"):
            return jsonify({"error": validation_result_phone})

        user.phone_number = new_phone_number
        db.session.commit()

    except KeyError:
        new_phone_number = None

    try:
        new_login = request.json["login"]
        
        if not isinstance(new_login, str):
            raise KeyError
        
        validation_result_login = validate_login(new_login)
        
        if(validation_result_login != "ALL_VALID"):
            return jsonify({"error": validation_result_login})
        
        user.login = new_login
        db.session.commit()
        
    except KeyError:
        new_login = None

    if(new_login is None and new_phone_number is None):
        return jsonify({"error": 'NOT VALID INPUT'})
    
    return jsonify({
        "phoneNumber":new_phone_number,
        "email": new_login,
    })


@user.route("/@me/documents")
def get_user_docs():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"})

    passport = Passport.query.filter_by(owner_id=user_id).first()
    foreign_passport = ForeignPassport.query.filter_by(
        owner_id=user_id).first()

    passport_info = {
        "id": passport.id,
        "issue_date": passport.issue_date,
        "name": passport.name,
        "surname": passport.surname,
        "gender": passport.gender,
    } if passport is not None else None

    foreign_passport_info = {
        "id": foreign_passport.id,
        "issue_date": foreign_passport.issue_date,
        "expiry_date": foreign_passport.expiry_date,
        "name": foreign_passport.name,
        "surname": foreign_passport.surname,
        "gender": foreign_passport.gender,
    } if foreign_passport is not None else None

    return {
        "passport": passport_info,
        "foreign_passport": foreign_passport_info
    }


@user.route("/@me/passport/add", methods=["POST"])
def add_user_passport():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"})

    try:
        passport_id = request.json["id"]
    except KeyError:
        return jsonify({"error": 'NOT VALID INPUT'})

    if Passport.query.filter_by(id=passport_id).first():
        return jsonify({"error": "Incorrect passport data"})

    try:
        issue_date = request.json["issue_date"]
        passport_name = request.json["name"]
        passport_surname = request.json["surname"]
        passport_gender = request.json["gender"]
    except KeyError:
        return jsonify({"error": 'NOT VALID INPUT'})

    validation_result = validate_passport(passport_id=passport_id, issue_date=issue_date,
                                          passport_name=passport_name, passport_surname=passport_surname,
                                          gender=passport_gender)

    if validation_result != "ALL_VALID":
        return jsonify({"error": validation_result})

    # Deleting the old one
    Passport.query.filter_by(owner_id=user_id).delete()
    db.session.commit()
    new_passport = Passport(id=passport_id, issue_date=issue_date, name=passport_name,
                            surname=passport_surname, gender=passport_gender, owner_id=user_id)

    db.session.add(new_passport)
    db.session.commit()

    return {
        "passport": request.json
    }


@user.route("/check-user-mail")
def check_user_email():
    try:
        email = request.args.get("email", default="", type=str) 
    except KeyError:
        return {'error': 'All fiels must be filled'}
    
    try:
        is_from_manager = request.args.get("is_manager", default="", type=str) 
    except KeyError:
        is_from_manager = False
        
    if not check_mail(email):
        return {"error": "Invalid E-mail"}
    
    if is_from_manager:
        with db.engine.connect() as connection:
            user_login = connection.execute(text('''
                                               SELECT id FROM airlines.airline_manager WHERE email='{email}' LIMIT 1;
                                               '''.format(email=email)))
            
            user_exists = len([dict(row) for row in user_login])!=0
            
    else:
        user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "A user with this address already exists"}), 409

    return jsonify({
        "email": email
    })


@user.route("/check-user-pass")
def check_user_pass():
    try:
        password = request.args.get("password", default="", type=str)
    except KeyError:
        return {'error': 'All fiels must be filled'}
    
    res = password_check(password)

    return {"result": res}


@user.route("/register", methods=["POST"])
def register_user():
    try:
        email = request.json["email"]
        password = request.json["password"]
    except KeyError:
        return {'error': 'All fiels must be filled'}
    
    # TODO: MAIL SERVER | OTP CODE CHECKING |
    validation_result = validate_account(email, password)

    if validation_result != "ALL_VALID":
        return jsonify({"error": validation_result})

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = flaskbcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })
    

@user.route('/@me/bookings')
def get_bookings():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"})
    
    try:
        with db.engine.connect() as connection:
            bookings = connection.execute(text('''
                                               SELECT * FROM customer.get_bookings('{user_id}');
                                               '''.format(user_id=user_id)))
            
            return jsonify([dict(row) for row in bookings])

    except Exception as e:
        print(e)
        return jsonify({"error": "Some error occured"}), 500
    
    

@user.route('/login', methods=["POST"])
def login_user():
    try:
        email = request.json["email"]
        password = request.json["password"]
    except KeyError:
        return {'error': 'All fiels must be filled'}
    
    user = User.query.filter_by(email=email).first()

    if user is None or not flaskbcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Incorrect login or password"})

    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email
    })


@user.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"
