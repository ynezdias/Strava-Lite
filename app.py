from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import uuid

app = Flask(__name__)
api = Api(app)
CORS(app)

# In-memory data store (replace with DB later)
users = {}

class Signup(Resource):
    def post(self):
        data = request.get_json()

        if not data or 'email' not in data or 'password' not in data:
            return {}, 400

        for u in users.values():
            if u['email'] == data['email']:
                return {"error": "Email already exists"}, 400

        user_id = str(uuid.uuid4())
        users[user_id] = {
            "id": user_id,
            "name": data.get("name", ""),
            "email": data["email"],
            "password": generate_password_hash(data["password"]),
            "age": data.get("age"),
            "weight": data.get("weight"),
            "runs": [],
            "cycles": [],
            "goals": [],
            "medals": []
        }

        return {
            "id": user_id,
            "name": users[user_id]["name"],
            "email": users[user_id]["email"]
        }, 200

class Login(Resource):
    def post(self):
        data = request.get_json()

        if not data or 'email' not in data or 'password' not in data:
            return {}, 400

        for user in users.values():
            if user['email'] == data['email']:
                if check_password_hash(user['password'], data['password']):
                    return {
                        "id": user["id"],
                        "name": user["name"],
                        "email": user["email"]
                    }, 200
                return {}, 400

        return {}, 404

class GetProfile(Resource):
    def get(self, user_id):
        if user_id not in users:
            return {}, 404
        user = users[user_id]
        return {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "age": user["age"],
            "weight": user["weight"]
        }, 200

api.add_resource(Signup, "/auth/signup")
api.add_resource(Login, "/auth/login")
api.add_resource(GetProfile, "/user/<string:user_id>")

if __name__ == "__main__":
    app.run(debug=True)
