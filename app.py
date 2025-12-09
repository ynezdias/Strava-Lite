from flask import Flask, request, jsonify, send_from_directory
from flask_restful import Api, Resource
import uuid
import os

app = Flask(__name__)
CORS(app)   # ✅ allow React to access the API
api = Api(app)

# In-memory store
DATA = {
    "users": {}   # user_id -> { id, name, age, runs[] }
}

# Helpers
def bad_request():
    return ("", 400)

def not_found():
    return ("", 404)

# ========== API ENDPOINTS ==========

class RegisterUser(Resource):
    def post(self):
        if not request.is_json:
            return bad_request()
        body = request.get_json()

        name = body.get("name")
        age = body.get("age")

        # Validate age is a number
        try:
            age = int(age)
        except:
            return bad_request()

        user_id = str(uuid.uuid4())
        DATA["users"][user_id] = {
            "id": user_id,
            "name": name,
            "age": age,
            "runs": []
        }

        return jsonify({
            "id": user_id,
            "name": name,
            "age": age
        })


class GetUser(Resource):
    def get(self, user_id):
        user = DATA["users"].get(user_id)
        if not user:
            return not_found()
        return jsonify({
            "id": user["id"],
            "name": user["name"],
            "age": user["age"]
        })


class RemoveUser(Resource):
    def delete(self, user_id):
        removed = DATA["users"].pop(user_id, None)
        if not removed:
            return not_found()
        return ("", 200)


class ListUsers(Resource):
    def get(self):
        users = [
            {"id": u["id"], "name": u["name"], "age": u["age"]}
            for u in DATA["users"].values()
        ]
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

        if not date or not time or not distance:
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


# Register endpoints
api.add_resource(RegisterUser, "/user")
api.add_resource(GetUser, "/user/<string:user_id>")
api.add_resource(RemoveUser, "/user/<string:user_id>")
api.add_resource(ListUsers, "/users")
api.add_resource(AddRun, "/runs/<string:user_id>")
api.add_resource(ListRuns, "/runs/<string:user_id>")


# Optional: Serve React build for extra credit
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    if os.path.exists(os.path.join(app.static_folder, "index.html")):
        file_path = os.path.join(app.static_folder, path)
        if path != "" and os.path.exists(file_path):
            return send_from_directory(app.static_folder, path)
        return send_from_directory(app.static_folder, "index.html")

    return ("React build not found. Run React dev server separately.", 200)


if __name__ == "__main__":
    app.run(debug=True)
