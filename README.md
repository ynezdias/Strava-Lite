# Strava Lite

**Author:** Ynez Dias  
**Email:** ydias@stevens.edu  

## Project Description

Strava Lite is a lightweight running tracker that allows users to register themselves, add running sessions, and manage their running data. The backend is powered by **Flask-RESTful**, and the frontend is a **ReactJS web application** that communicates with the REST API. All data is stored in memory on the server; restarting the server will clear all data.

**Features:**
- Create new runners with name and age (UUID generated automatically)
- Lookup runner details by ID
- Delete runners by ID
- List all existing runners
- Add run data for a runner (date, time, distance)
- List all runs for a selected runner
- Attractive, functional web frontend (extra credit)

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/user` | POST | Register a new user (requires `name` and `age`). Returns UUID. |
| `/user/<user_id>` | GET | Retrieve user details by ID. |
| `/user/<user_id>` | DELETE | Delete user by ID. |
| `/users` | GET | List all users. |
| `/runs/<user_id>` | PUT | Add a run for a user (requires `date`, `time`, `distance`). |
| `/runs/<user_id>` | GET | List all runs for a user. |

**HTTP Status Codes:**
- 200 — Success  
- 400 — Bad request (invalid arguments)  
- 404 — User not found  

---

## Frontend

The frontend is a ReactJS application located in the `frontend` folder. It provides a user-friendly interface with the following pages:  
1. **Home Page** — Welcome and navigation to other pages  
2. **Create Runner** — Form to register a new runner  
3. **Manage Runner** — Lookup, delete, list runners, add runs, and list runs  

**Styling:**  
- Dark theme with pink highlights  
- Responsive design and hover effects  
- Smooth alignment and spacing for forms, buttons, and lists  

---

## Bugs / Issues Faced

- **React import/casing issues**: Fixed by ensuring consistent folder/file casing (`pages` vs `Pages`)  
- **Module not found errors**: Instal

## How to Run

### Backend (Flask API)
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
pip install -r requirements.txt
python app.py

## Frontend (React)
cd frontend
npm install
npm start


## frontend will be accessible at http://localhost:3000 and will communicate with the Flask backend running at http://localhost:5000.