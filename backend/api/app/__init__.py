from flask import Flask
from app.config import ApplicationConfig
from app.extensions import db, session,cors

def create_app():
    app = Flask(__name__)
    app.config.from_object(ApplicationConfig)
    
    db.init_app(app)
    session.init_app(app)
    cors.init_app(app, supports_credentials=True)
    
    with app.app_context():
        from app.routes.customer import user
        app.register_blueprint(user)
        
        from app.routes.tickets import tickets
        app.register_blueprint(tickets)
        
        from app.routes.dashboard import dashboard
        app.register_blueprint(dashboard)
    
    return app

app = create_app()