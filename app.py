from flask import Flask, request, jsonify, send_from_directory, render_template
from flask_restful import Api, Resource
from flask_cors import CORS
import uuid
import os

app = Flask(__name__, template_folder="templates", static_folder="static")
CORS(app)
api = Api(app)

# In-memory data store
# USERS: user_id -> { id, name, age, runs: [ {date, time, distance} ] }
DATA = {"users": {}}

# Helper responses
def bad_request():
    return ("", 400)

def not_found():
    return ("", 404)

# -----------------------
# API endpoints (as required)
# -----------------------

class RegisterUser(Resource):
    def post(self):
        if not request.is_json:
            return bad_request()
        body = request.get_json()
        name = body.get("name")
        age = body.get("age")
        # Age validation: must be an integer
        try:
            if age is None:
                raise ValueError
            age = int(age)
        except Exception:
            return bad_request()

        user_id = str(uuid.uuid4())
        DATA["users"][user_id] = {"id": user_id, "name": name, "age": age, "runs": []}
        return jsonify({"id": user_id, "name": name, "age": age})

class GetUser(Resource):
    def get(self, user_id):
        user = DATA["users"].get(user_id)
        if not user:
            return not_found()
        return jsonify({"id": user["id"], "name": user["name"], "age": user["age"]})

class RemoveUser(Resource):
    def delete(self, user_id):
        removed = DATA["users"].pop(user_id, None)
        if removed is None:
            return not_found()
        return ("", 200)

class ListUsers(Resource):
    def get(self):
        users = [{"id": u["id"], "name": u["name"], "age": u["age"]} for u in DATA["users"].values()]
        return jsonify({"users": users})

class AddRun(Resource):
    def put(self, user_id):
        user = DATA["users"].get(user_id)
        if not user:
            return not_found()
        if not request.is_json:
            return bad_request()
        body = request.get_json()
        date = body.get("date")
        time = body.get("time")
        distance = body.get("distance")
        if date is None or time is None or distance is None:
            return bad_request()
        run = {"date": date, "time": time, "distance": distance}
        user["runs"].append(run)
        return jsonify(run)

class ListRuns(Resource):
    def get(self, user_id):
        user = DATA["users"].get(user_id)
        if not user:
            return not_found()
        return jsonify({"runs": user["runs"]})

# Register API resource routes - EXACT paths specified in assignment
api.add_resource(RegisterUser, "/user")                     # POST
api.add_resource(GetUser, "/user/<string:user_id>")         # GET
api.add_resource(RemoveUser, "/user/<string:user_id>")      # DELETE
api.add_resource(ListUsers, "/users")                       # GET
api.add_resource(AddRun, "/runs/<string:user_id>")          # PUT
api.add_resource(ListRuns, "/runs/<string:user_id>")        # GET

# -----------------------
# Flask-served Frontend (for extra credit)
# -----------------------

# Serve static files (css, images) from /static
@app.route("/static/<path:filename>")
def static_files(filename):
    return send_from_directory(os.path.join(app.root_path, "static"), filename)

# Main page (renders template that calls the API endpoints)
@app.route("/")
def index():
    return render_template("index.html")

# Health-check or simple info
@app.route("/info")
def info():
    return jsonify({"status": "ok", "endpoints": ["/user (POST)", "/user/<id> (GET, DELETE)", "/users (GET)", "/runs/<id> (PUT, GET)"]})

if __name__ == "__main__":
    # Use debug=True only for development
    app.run(debug=True)
