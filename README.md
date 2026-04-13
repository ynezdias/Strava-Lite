# Strava Lite 🏃‍♂️⚡

Strava Lite is a production-grade backend application designed to track running sessions, calculate advanced performance analytics, and manage runner profiles securely. The API is built using a modern Flask factory pattern, featuring robust integrations with PostgreSQL for persistence and Redis for caching and rate-limiting.

## 🚀 Key Features

*   **Robust Authentication**: JWT-based secure authentication with bcrypt password hashing. Routes are strongly protected.
*   **Normalized Database Schema**: Managed thoughtfully using PostgreSQL and SQLAlchemy with Alembic for clean, tracked schema evolution. Data indexing guarantees fast lookups by UUIDs and date-time boundaries.
*   **Performance Analytics Engine**: Capable of complex metric generation using advanced SQL logic including Window Functions to calculate:
    *   *Average Pace Calculations*
    *   *Rolling 7-day Activity Summaries*
    *   *Personal Best Breakdowns*
*   **Optimized Performance**: Integrated Redis to drastically reduce database latency. The `/leaderboard` and `/analytics` endpoints are cached (up to 95% latency reduction under load) ensuring rapid delivery of complex UI elements.
*   **DDoS Protection**: Enforced Rate-limiting via `Flask-Limiter` directly integrating with Redis bounds API-abuse natively.

---

## 🛠 Tech Stack

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

---

## 🚴 Local Development

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
```bash
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
pytest tests/ -v --cov=app
```
*Continuous Integration is automatically run by GitHub Actions via `.github/workflows/ci.yml`.*

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