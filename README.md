# Strava Lite

**Author:** Ynez Dias  
**Email:** ydias@stevens.edu  

---

## Project Description

**Strava Lite** is a lightweight running tracker that allows users to register, manage, and track their running sessions. The backend is built with **Flask-RESTful**, and the frontend is a **ReactJS web application** that communicates with the REST API.  

**Note:** Data is currently stored in-memory on the server; restarting the server will clear all data. You can later integrate a database (e.g., SQLite) for persistent storage.

**Core Features:**
- Register new runners with name and age (UUID generated automatically)
- Lookup runner details by ID
- Delete runners by ID
- List all existing runners
- Add running sessions (date, time, distance)
- List all runs for a runner
- Functional and attractive ReactJS frontend

**Extra Credit Frontend Features:**
- Dark theme with sporty pink highlights
- Responsive and aligned forms, buttons, and lists
- Hover effects for buttons and navigation links

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
- **200** — Success  
- **400** — Bad request (invalid arguments)  
- **404** — User not found  

---

## Frontend Pages

1. **Home Page** — Welcome page with navigation to other features  
2. **Create Runner** — Form to register a new runner  
3. **Manage Runner** — Lookup, delete, list runners; add and list runs  
4. **Profile Page** — View runner profile (name, age, runs)  
5. **Future Features (Planned)**:
   - Calories calculation  
   - Goal setting  
   - Medals & rewards  
   - Cycling tracking  
   - Friend comparison  
   - Personal health records  
   - Analytics and charts  

---

## Styling

- Consistent dark theme (`#111` background) with pink highlights (`#ff416c`)  
- Rounded inputs and buttons with hover animations  
- Flexbox used for forms and list layouts  
- Responsive design for mobile and desktop  

---

## Bugs / Issues Faced

- **React import/casing issues**: Resolved by ensuring consistent folder/file casing (`pages` vs `Pages`)  
- **Module not found errors**: Fixed by ensuring correct import paths and installing missing dependencies  
- **API connection issues**: Solved by ensuring `api.js` points to the correct Flask server URL (`http://localhost:5000`)  

---

## Setup & Run

### Backend (Flask API)

```bash
cd backend
python -m venv venv
venv\Scripts\activate      # On Windows
# OR source venv/bin/activate  # On Mac/Linux
pip install -r requirements.txt
python app.py

### Frontend(Flask API)

```bash
cd frontend
npm install
npm start
Frontend will run at: http://localhost:3000
It will communicate with the Flask backend running at http://localhost:5000.

GitHub Repository

Private repository hosted on GitHub

Include the following in the repository root:

app.py (or backend scripts)

frontend/ folder

requirements.txt

README.md

## frontend will be accessible at http://localhost:3000 and will communicate with the Flask backend running at http://localhost:5000.
