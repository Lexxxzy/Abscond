from dotenv import load_dotenv
import os
import redis

load_dotenv()

class ApplicationConfig:
    SECRET_KEY = os.environ["SECRET_KEY"]
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SESSION_TYPE = "redis"
    SESSION_PERMAMENT = False
    SESSION_USE_SIGNER = True
    
    # PROD
    # SQLALCHEMY_DATABASE_URI = f"postgresql://postgres:{os.environ['POSTGRES_PASSWORD']}@localhost:5432/{os.environ['POSTGRES_DB']}"
    # REDIS_HOST = os.environ.get('REDIS_HOST', '127.0.0.1')
    # SESSION_REDIS = redis.Redis(host='redis', port=6379)
    
    
    # DEV
    SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")
    SQLALCHEMY_DATABASE_URI = f"postgresql://postgres:{os.environ['POSTGRES_PASSWORD']}@localhost:5432/{os.environ['POSTGRES_DB']}"