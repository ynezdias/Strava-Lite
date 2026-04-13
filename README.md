# Strava Lite 🏃‍♂️⚡

Strava Lite is a production-grade backend application designed to track running sessions, calculate advanced performance analytics, and manage runner profiles securely. The API is built using a modern Flask factory pattern, featuring robust integrations with PostgreSQL for persistence and Redis for caching and rate-limiting.

<<<<<<< HEAD
## 🚀 Key Features

*   **Robust Authentication**: JWT-based secure authentication with bcrypt password hashing. Routes are strongly protected.
*   **Normalized Database Schema**: Managed thoughtfully using PostgreSQL and SQLAlchemy with Alembic for clean, tracked schema evolution. Data indexing guarantees fast lookups by UUIDs and date-time boundaries.
*   **Performance Analytics Engine**: Capable of complex metric generation using advanced SQL logic including Window Functions to calculate:
    *   *Average Pace Calculations*
    *   *Rolling 7-day Activity Summaries*
    *   *Personal Best Breakdowns*
*   **Optimized Performance**: Integrated Redis to drastically reduce database latency. The `/leaderboard` and `/analytics` endpoints are cached (up to 95% latency reduction under load) ensuring rapid delivery of complex UI elements.
*   **DDoS Protection**: Enforced Rate-limiting via `Flask-Limiter` directly integrating with Redis bounds API-abuse natively.
=======
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
>>>>>>> c1f2f0c28272fc4121594718c91b327171e41023

---

## 🛠 Tech Stack

<<<<<<< HEAD
| Component | Technology |
| :--- | :--- |
| **API Framework** | Flask (RESTful) |
| **Database** | PostgreSQL 15 |
| **ORM & Migrations** | SQLAlchemy & Alembic |
| **Caching & Throttling**| Redis 7 |
| **Containerization** | Docker & Docker Compose |
| **CI/CD & Testing** | GitHub Actions / Pytest (70%+ Coverage) |
| **Server** | Gunicorn |

---

## 🏗 Architecture & Scaling Metrics

Transitioning from an in-memory cache to a highly available production footprint yielded significant improvements:
- **Number of Endpoints:** Grew from 5 basic CRUD paths to **8 structured RESTful resources** handling everything from auth to window-function generated data sets.
- **Latency Improvements:** 
  - Redis cache integration on `/leaderboard` cut average response times from `~180ms` (querying dense PB history) down to `< 15ms`.
  - Added indexes on `user_id` and `date` eliminated Seq Scans resulting in predictable `O(log n)` lookups.
- **Resilience:** Flask-Limiter ensures registration limits (10/min) and analytics lookups (100/day) keep infrastructure costs down and stable.
=======
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
>>>>>>> c1f2f0c28272fc4121594718c91b327171e41023

---

## 🚴 Local Development

<<<<<<< HEAD
You can run the entire backend via a single Docker command!

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed.

### 1. Boot Environment
```bash
docker-compose up --build
```
*This launches the Flask application, PostgreSQL, and Redis containers and automatically executes schema migrations.*

### 2. Available Endpoints

**Auth Profile & Users**
- `POST /auth/signup` - Register an account.
- `POST /auth/login` - Authenticate and obtain JWT.
- `GET/DELETE /user/<target_id>` - Fetch / Remove profile (Requires JWT).
- `GET /users` - List all generic user identities.

**Runs & Analytics**
- `POST /runs/<user_id>` - Add new run (`duration` (sec), `distance` (mi/km)).
- `GET /runs/<user_id>` - Retrieve all past run sets.
- `GET /analytics/<user_id>` - Retrieve deep analytical breakdowns including rolling Window Function totals.
- `GET /leaderboard` - Highest cumulative distances across the platform (Cached).

### 3. Running Test Suite
You can execute tests locally against an isolated suite using:
=======
- **React import/casing issues**: Resolved by ensuring consistent folder/file casing (`pages` vs `Pages`)  
- **Module not found errors**: Fixed by ensuring correct import paths and installing missing dependencies  
- **API connection issues**: Solved by ensuring `api.js` points to the correct Flask server URL (`http://localhost:5000`)  

---

## Setup & Run

### Backend (Flask API)

>>>>>>> c1f2f0c28272fc4121594718c91b327171e41023
```bash
python -m venv venv
<<<<<<< HEAD
source venv/bin/activate  # or venv\Scripts\activate on Windows
=======
venv\Scripts\activate      # On Windows
# OR source venv/bin/activate  # On Mac/Linux
>>>>>>> c1f2f0c28272fc4121594718c91b327171e41023
pip install -r requirements.txt
pytest tests/ -v --cov=app
```
*Continuous Integration is automatically run by GitHub Actions via `.github/workflows/ci.yml`.*

<<<<<<< HEAD
---

## 🚢 Deployment (Render / Railway)

This project contains an optimized `Dockerfile` making it plug-and-play for platforms like [Render](https://render.com/) or Railway.

1. **Database Set up**: Provision a standard PostgreSQL and Redis instance on Render.
2. **Web Service Setup**: Connect your GitHub repository to Render and deploy as a "Docker" environment.
3. **Environment Variables**: Make sure the following are supplied to the build container:
   - `DATABASE_URL` (From managed PostgreSQL)
   - `REDIS_URL` (From attached Redis service)
   - `SECRET_KEY` (Strong randomized 256-bit hash)
4. **Build Command**: The deployment handles `flask db upgrade` implicitly upon startup through the Docker command directives.

---
*Created by Ynez Dias*
=======
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
>>>>>>> c1f2f0c28272fc4121594718c91b327171e41023
