import os
from celery import Celery

def make_celery(app_name=__name__):
    redis_url = os.environ.get('REDIS_URL') or 'redis://localhost:6379/0'
    return Celery(
        app_name,
        backend=redis_url,
        broker=redis_url
    )

celery = make_celery()

# Import task modules here so they are registered
import tasks
