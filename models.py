import uuid
from datetime import datetime, timezone
from sqlalchemy.dialects.postgresql import UUID
from extensions import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    age = db.Column(db.Integer)
    weight = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    runs = db.relationship('Run', backref='user', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f'<User {self.email}>'

class Run(db.Model):
    __tablename__ = 'runs'

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False, index=True)
    date = db.Column(db.DateTime, nullable=False, default=lambda: datetime.now(timezone.utc), index=True)
    duration = db.Column(db.Integer, nullable=False) # stored in seconds
    distance = db.Column(db.Float, nullable=False) # stored in miles/km
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def __repr__(self):
        return f'<Run {self.id} User {self.user_id}>'
