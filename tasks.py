from worker import celery
from app import create_app
from extensions import cache
from flask_socketio import SocketIO

# Create a scoped app instance for the worker
# so we can interface with extensions (like cache)
app = create_app()
app.app_context().push()

# Standalone SocketIO instance for emitting externally (using message queue)
# It requires the same message_queue URL used by the main app
import os
redis_url = os.environ.get('REDIS_URL') or 'redis://localhost:6379/0'
socketio_emitter = SocketIO(message_queue=redis_url)

@celery.task(name='tasks.process_run_created')
def process_run_created(user_id, distance, duration):
    """
    Background job that runs immediately after a run is posted.
    It invalidates the user's specific analytics cache and emits a global stat update.
    """
    # 1. Invalidate Cache
    # We delete caching on the analytics and leaderboard
    # Depending on how the cache keys are formed natively via Flask-Caching setup 
    # For now we can clear the whole cache, or target specific endpoints.
    # Warning: clearing all cache in production is aggressive.
    cache.clear() 

    # 2. Real-time Notification via Websocket (Phase 5)
    # Broadcast to the global live feed
    message = {
        "user_id": user_id,
        "distance": distance,
        "duration": duration,
        "event": "run_created"
    }
    socketio_emitter.emit('live_run_feed', message, namespace='/')
    
    return f"Processed run for user {user_id}"
