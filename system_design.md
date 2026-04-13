# System Design: Strava-Lite

This document outlines the architectural trade-offs, scaling decisions, and distributed design characteristics of the Strava-Lite backend service.

## 1. High-Level Architecture
The system transitioned from a monolithic state-managed application into a **Distributed Event-Driven API Server**.
- **Web Tier:** Gunicorn running via Eventlet to support hundreds of concurrent WebSockets alongside standard HTTP REST polling.
- **Background Processing:** Celery handles asynchronous cache clearing and external network broadcasting (Sockets) preventing the API cycle from blocking.
- **Message Broker & Caching:** Redis acting as a dual-engine. It stores fast-retrieval computed leaderboards and operates as the Pub/Sub bus for Celery.
- **Persistence:** PostgreSQL for hardened ACID-compliant data storage.

## 2. Deep Dive: Trade-offs & Decisions

### Why Redis?
- **In-Memory Speed vs Durability:** Redis was chosen over Memcached because we needed Pub/Sub features to cleanly route events to Celery Workers and WebSocket namespaces. Redis guarantees near instant O(1) reads for `/analytics` constraints avoiding constant DB hits.

### Stateless JWT vs Session Cookies
- **Horizontal Scalability:** We utilized JSON Web Tokens (`PyJWT`). If Strava-Lite runs across 5 separate Load-Balanced APIs, they do not need a centralized session-lookup DB. The token intrinsically carries verified claims (user_id) signed via `SECRET_KEY`, allowing stateless horizontal scaling at zero penalty. The downside is immediate token revocation is difficult without a denylist.

### Database Indexing & Sharding
- We utilized B-Tree Indexes on `user_id` and `date` in PostgreSQL. Searching for `WHERE user_id = X AND date >= Y` goes from O(N) sequence scans to O(log N).
- **When to Shard:** Currently, PostgreSQL scales vertically very well. We would introduce a Read-Replica structure (Master-Slave DB) for analytical dashboards first. Only when write-throughput to `runs` exceeds generic vertical machine limits (e.g., millions of runs logged asynchronously per minute) would we explore consistent-hashing across sharded DBs based on `user_id`.

## 3. Real-World Scaling Patterns
- **Leaderboard Calculation:** Calculating a leaderboard over 10M rows synchronously kills the API layer. We solved this by creating a 5-minute cache Time-to-Live (TTL). 
- **The Asynchronous Worker Pattern:** By delegating post-run processing to Celery (`tasks.process_run_created`), the HTTP engine returns HTTP 202 instantly to the mobile app, providing snappy UX while the heavy lifting operates linearly behind the scenes via a queue.

## 4. Advanced Feature: Real-time WebSockets
Rather than repeatedly polling HTTP endpoints for incoming friend-runs, we attached `Flask-SocketIO` to an `eventlet` worker cluster. When a Run is posted, Celery pushes an event across the Redis Message Queue which broadcasts to any connected client natively, creating a brilliant "Live Feed".
