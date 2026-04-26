import bcrypt
from app import create_app
from extensions import db
from models import User, Run
from datetime import datetime, timedelta, timezone
import random

def seed():
    app = create_app()
    with app.app_context():
        # Clean up existing fake data if needed
        # db.drop_all()
        # db.create_all()

        print("Seeding users...")
        users_data = [
            {"name": "Eliud Kipchoge", "email": "eliud@example.com", "age": 39, "weight": 115},
            {"name": "Brigid Kosgei", "email": "brigid@example.com", "age": 30, "weight": 110},
            {"name": "Keneth Bekele", "email": "ken@example.com", "age": 41, "weight": 120},
            {"name": "Faith Kipyegon", "email": "faith@example.com", "age": 30, "weight": 95},
            {"name": "Usain Bolt", "email": "bolt@example.com", "age": 37, "weight": 207},
            {"name": "Mo Farah", "email": "mo@example.com", "age": 41, "weight": 128},
            {"name": "Sifan Hassan", "email": "sifan@example.com", "age": 31, "weight": 108},
            {"name": "Tigst Assefa", "email": "tigst@example.com", "age": 27, "weight": 105},
        ]

        hashed_password = bcrypt.hashpw("password".encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        for u in users_data:
            if not User.query.filter_by(email=u['email']).first():
                user = User(
                    name=u['name'],
                    email=u['email'],
                    password_hash=hashed_password,
                    age=u['age'],
                    weight=u['weight']
                )
                db.session.add(user)
                db.session.commit()
                
                # Add some runs for each user
                print(f"Adding runs for {u['name']}...")
                for i in range(5):
                    run = Run(
                        user_id=user.id,
                        duration=random.randint(1800, 7200),
                        distance=random.uniform(5.0, 20.0),
                        date=datetime.now(timezone.utc) - timedelta(days=random.randint(0, 30))
                    )
                    db.session.add(run)
                db.session.commit()

        print("Seeding complete!")

if __name__ == "__main__":
    seed()
