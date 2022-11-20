from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from flask_cors import CORS

db = SQLAlchemy()
session = Session()
cors = CORS()