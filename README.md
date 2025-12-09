# RunRunRun (Strava Lite)


Author: <Your Name> — <your_stevens_email@stevens.edu>


## What this project does
A simple running tracker with a Flask-RESTful API and a React frontend. The API implements the required endpoints for registering users, listing users, removing users, adding runs, and listing runs. The React frontend lets you add users, view users, add runs to a user, and list runs.


## Files included
- app.py (Flask app + API)
- requirements.txt
- README.md
- frontend/ (React app source)
- package.json
- src/App.js
- src/index.js


## How to run (development)
1. Create a Python virtualenv and install requirements:


```bash
python -m venv venv
source venv/bin/activate # or venv\Scripts\activate on Windows
pip install -r requirements.txt