from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from config import Config
from extensions import db, migrate, limiter, cache, socketio
from prometheus_flask_exporter import PrometheusMetrics
import structlog
from flasgger import Swagger

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Redis Cache configuration
    app.config['CACHE_TYPE'] = 'RedisCache'
    app.config['CACHE_REDIS_URL'] = app.config['REDIS_URL']

    CORS(app)

    db.init_app(app)
    migrate.init_app(app, db)
    limiter.init_app(app)
    cache.init_app(app)
    socketio.init_app(app)

    # Phase 2: Observability - Prometheus
    metrics = PrometheusMetrics(app)
    metrics.info('app_info', 'Application info', version='1.0.0')

    # Phase 2: Observability - Structlog Configuration
    structlog.configure(
        processors=[
            structlog.processors.JSONRenderer()
        ]
    )

    # Phase 4: API Docs - Swagger
    swagger = Swagger(app)

    api = Api(app)

    with app.app_context():
        # Import resources down here to avoid circular imports
        from auth import Signup, Login
        from routes import UserProfile, UserList, UserRuns
        from analytics import UserAnalytics, Leaderboard
        
        # Apply rate limiting globally to auth/registration endpoints if desired
        limiter.limit("10/minute")(Signup)
        limiter.limit("10/minute")(Login)
        limiter.limit("100/day;20/hour")(UserAnalytics)
        
        # Add Resources
        api.add_resource(Signup, "/auth/signup")
        api.add_resource(Login, "/auth/login")
        api.add_resource(UserProfile, "/user/<string:user_id>")
        api.add_resource(UserList, "/users")
        api.add_resource(UserRuns, "/runs/<string:user_id>")
        api.add_resource(UserAnalytics, "/analytics/<string:user_id>")
        api.add_resource(Leaderboard, "/leaderboard")

    return app

if __name__ == "__main__":
    app = create_app()
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)
