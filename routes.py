from flask import request
from flask_restful import Resource
from extensions import db
from models import User, Run
from auth import token_required
from datetime import datetime
import tasks

class UserProfile(Resource):
    @token_required
    def get(self, current_user, user_id):
        """
        Fetch a user profile
        ---
        tags:
          - Users
        parameters:
          - in: path
            name: user_id
            required: true
            type: string
        responses:
          200:
            description: Profile details
          404:
            description: User not found
        """
        user = User.query.filter_by(id=user_id).first()
        if not user:
            return {}, 404
        
        return {
            "id": str(user.id),
            "name": user.name,
            "email": user.email,
            "age": user.age,
            "weight": user.weight
        }, 200

    @token_required
    def delete(self, current_user, user_id):
        if str(current_user.id) != user_id:
            return {"message": "Unauthorized"}, 403

        db.session.delete(current_user)
        db.session.commit()
        return {"message": "User deleted"}, 200

class UserList(Resource):
    def get(self):
        """
        List all users
        ---
        tags:
          - Users
        responses:
          200:
            description: List of users
        """
        users = User.query.all()
        return [{
            "id": str(user.id),
            "name": user.name,
            "email": user.email
        } for user in users], 200

class UserRuns(Resource):
    @token_required
    def get(self, current_user, user_id):
        """
        Get all runs for specific user
        ---
        tags:
          - Runs
        responses:
          200:
            description: List of runs
        """
        if str(current_user.id) != user_id:
            return {"message": "Unauthorized"}, 403

        runs = Run.query.filter_by(user_id=current_user.id).all()
        return [{
            "id": str(run.id),
            "date": run.date.isoformat(),
            "duration": run.duration,
            "distance": run.distance
        } for run in runs], 200

    @token_required
    def post(self, current_user, user_id):
        """
        Log a new run
        ---
        tags:
          - Runs
        parameters:
          - in: body
            name: body
            schema:
              type: object
              properties:
                duration:
                  type: integer
                  example: 3600
                distance:
                  type: number
                  example: 10.5
        responses:
          202:
            description: Run successfully logged and processing asynchronously
        """
        if str(current_user.id) != user_id:
            return {"message": "Unauthorized"}, 403

        data = request.get_json()
        if not data or 'duration' not in data or 'distance' not in data:
            return {"message": "duration and distance are required"}, 400

        try:
            run_date = datetime.fromisoformat(data['date']) if 'date' in data else datetime.utcnow()
        except ValueError:
            return {"message": "Invalid date format, expected ISO 8601"}, 400

        new_run = Run(
            user_id=current_user.id,
            duration=data['duration'],
            distance=data['distance'],
            date=run_date
        )

        db.session.add(new_run)
        db.session.commit()

        # Emit asynchronous task to process metrics, caching, and websockets (Phase 1 & 5)
        tasks.process_run_created.delay(user_id, data['distance'], data['duration'])

        return {
            "id": str(new_run.id),
            "date": new_run.date.isoformat(),
            "duration": new_run.duration,
            "distance": new_run.distance,
            "status": "processing"
        }, 202

