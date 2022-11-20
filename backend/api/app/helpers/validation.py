from datetime import datetime
from email_validate import validate
import re

# Function for validating an Email


def check_mail(email):
    return validate(
        email_address=email,
        check_format=True,
        check_blacklist=True,
        check_dns=True,
        dns_timeout=10,
        check_smtp=False,
        smtp_debug=False)

# Function to validate the password


def password_check(passwd):

    SpecialSym = ['$', '@', '#', '!', '?', '_']

    if len(passwd) < 6:
        return ("Password must be longer than 6 characters")

    if not any(char.isdigit() for char in passwd):
        return ("Password must contain at least one digit")

    if not any(char.isupper() for char in passwd):
        return ("Password must contain at least one capital letter")

    if not any(char.islower() for char in passwd):
        return ("Password must contain at least one lowercase letter")

    if not any(char in SpecialSym for char in passwd):
        return ("The password must contain at least one of the special characters (! @ $ # ? _)")

    return "Valid"


def validate_account(email, password):
    if not check_mail(email):
        return "Invalid e-mail"

    validation_result = password_check(password)
    if validation_result != "Valid":
        return validation_result

    return "ALL_VALID"


def validate_passport(passport_id, issue_date, passport_name, passport_surname, gender):

    if len(passport_id) != 10 or not passport_id.isdigit():
        return "Incorrect passport data"

    if not passport_name.isalpha() or len(passport_name) > 64 or len(passport_name) < 2:
        return "The name must contain only letters and be shorter than 64 characters"

    if not passport_surname.isalpha() or len(passport_surname) > 64 or len(passport_name) < 2:
        return "The surname must contain only letters and be shorter than 64 characters"

    if any((char.isdigit() or char == "-") for char in issue_date):
        try:
            date_time_obj = datetime.strptime(issue_date, "%d-%m-%Y")

            if date_time_obj.date() > datetime.today().date():
                return "Invalid date"

        except ValueError:
            return "Invalid date format. Please enter the date in the format DD.MM.YYYY"
    else:
        return "Invalid date format"

    if gender != "M" and gender != "W":
        return "Invalid format of the 'gender' field value"

    return "ALL_VALID"


def validate_input(*args):
    SQL_CODES = ['SELECT', 'UPDATE', 'DELETE', 'INSERT',
                 'CREATE', 'ALTER', 'DROP', 'INDEX', 'AND']
    SYMBOLS = ["'", "-", "*", '=', "&", "|",
               "{", "}", "@", "#", "%", "$", "(", ")", "_", ";", ":"]

    for value in args:
        if any(char in SYMBOLS for char in value):
            return 'Invalid value'

    for value in args:
        if any(word.upper() in SQL_CODES for word in value.split()):
            return 'Invalid value'

    return "ALL_VALID"


def validate_phone(phone_number):
    validate_phone_number_pattern = "^\\+?[1-9][0-9]{7,14}$"
    match_obj = re.match(validate_phone_number_pattern, phone_number)

    if (len(phone_number) != 11 or match_obj is None):
        return "Invalid phone number input format"

    return "ALL_VALID"


def validate_login(login):
    if (len(login) > 32 or not login.isalnum()):
        return "The login must be shorter than 32 characters and consist only of letters and numbers"

    return "ALL_VALID"
