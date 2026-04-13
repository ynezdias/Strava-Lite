from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_caching import Cache
from flask_socketio import SocketIO

db = SQLAlchemy()
migrate = Migrate()
limiter = Limiter(key_func=get_remote_address)
cache = Cache()

import os
redis_url = os.environ.get('REDIS_URL') or 'redis://localhost:6379/0'
socketio = SocketIO(message_queue=redis_url, async_mode='eventlet', cors_allowed_origins="*")
