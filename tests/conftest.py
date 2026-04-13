import pytest
from app import create_app
from extensions import db, cache

class TestConfig:
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'test-key'
    REDIS_URL = 'redis://localhost:6379/1' # Avoid overwriting real cache if running locally
    RATELIMIT_ENABLED = False # Disable rate limits for easier testing
    CACHE_TYPE = 'SimpleCache' # Use simple cache for tests instead of Redis
    CELERY_TASK_ALWAYS_EAGER = True
    
@pytest.fixture
def app():
    app = create_app(TestConfig)
    
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def runner(app):
    return app.test_cli_runner()
