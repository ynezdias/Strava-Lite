import jwt
import bcrypt
from datetime import datetime, timedelta, timezone
from functools import wraps
from flask import request, current_app, jsonify
from flask_restful import Resource
from extensions import db
from models import User

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]

        if not token:
            return {'message': 'Token is missing!'}, 401

        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.filter_by(id=data['user_id']).first()
            if not current_user:
                return {'message': 'User not found!'}, 401
        except jwt.ExpiredSignatureError:
            return {'message': 'Token has expired!'}, 401
        except Exception as e:
            return {'message': 'Token is invalid!'}, 401

        return f(*args, **kwargs, current_user=current_user)
    return decorated

class Signup(Resource):
    def post(self):
        """
        Register a new user
        ---
        tags:
          - Authentication
        parameters:
          - in: body
            name: body
            schema:
              type: object
              required:
                - email
                - password
              properties:
                name:
                  type: string
                email:
                  type: string
                password:
                  type: string
                age:
                  type: integer
                weight:
                  type: number
        responses:
          201:
            description: User created
          400:
            description: Bad Request
        """
        data = request.get_json()

        if not data or not data.get('email') or not data.get('password'):
            return {"message": "Email and password required"}, 400

        if User.query.filter_by(email=data['email']).first():
            return {"message": "Email already exists"}, 400

        hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        
        new_user = User(
            name=data.get('name', ''),
            email=data['email'],
            password_hash=hashed_password,
            age=data.get('age'),
            weight=data.get('weight')
        )
        
        db.session.add(new_user)
        db.session.commit()

        return {
            "id": str(new_user.id),
            "name": new_user.name,
            "email": new_user.email
        }, 201

class Login(Resource):
    def post(self):
        """
        Login user and obtain JWT token
        ---
        tags:
          - Authentication
        parameters:
          - in: body
            name: body
            schema:
              type: object
              required:
                - email
                - password
              properties:
                email:
                  type: string
                password:
                  type: string
        responses:
          200:
            description: Successfully authenticated (Returns JWT)
          401:
            description: Invalid password
          404:
            description: User not found
        """
        data = request.get_json()

        if not data or not data.get('email') or not data.get('password'):
            return {"message": "Could not verify", "error": "Email and password required"}, 400

        user = User.query.filter_by(email=data['email']).first()

        if not user:
            return {"message": "Could not verify", "error": "User not found"}, 404

        if bcrypt.checkpw(data['password'].encode('utf-8'), user.password_hash.encode('utf-8')):
            token = jwt.encode({
                'user_id': str(user.id),
                'exp': datetime.now(timezone.utc) + timedelta(hours=24)
            }, current_app.config['SECRET_KEY'], algorithm="HS256")

            return {
                "token": token,
                "user": {
                    "id": str(user.id),
                    "name": user.name,
                    "email": user.email
                }
            }, 200

        return {"message": "Could not verify", "error": "Invalid password"}, 401
