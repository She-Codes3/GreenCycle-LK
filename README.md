# ♻️ GreenCycle LK

A smart waste management PWA for Sri Lanka — connecting residents, collectors, and municipal authorities through one digital platform.

---

## 🌍 The Problem in Sri Lanka

Waste management is an important challenge for urban and suburban communities in Sri Lanka. Residents may not always have clear information about collection schedules, proper waste segregation, or appropriate disposal locations for special waste such as e-waste and bulky items.

GreenCycle LK addresses these challenges by providing a centralized digital platform that connects citizens with waste-management services.


---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript, Vite, Tailwind CSS |
| Backend | Spring Boot 3, Java 17, REST + WebSocket/STOMP |
| AI Service | FastAPI (Python 3.11), ML waste classifier |
| Database | PostgreSQL + Flyway migrations |
| Cache | Redis (optional) |
| Auth | Spring Security + JWT |
| Maps | Leaflet + OpenStreetMap |
| Infra | Docker, Nginx, GitHub Actions |

---

## ✨ Features

- 📅 **Collection Schedules** — Location-based schedules with real-time updates
- 🚛 **Live Truck Tracking** — GPS tracking via WebSocket, approaching alerts
- 🤖 **AI Waste Scanner** — Photo-based waste classification + disposal guidance
- ♻️ **Recycling Guide** — Searchable waste item database with disposal instructions
- 🗺️ **Disposal Center Map** — Find nearby special-waste centers with filters
- 📦 **Bulky Pickup Requests** — Request & track large item collection
- 🚨 **Issue Reporting** — Report illegal dumping, missed collections with photos
- 🏆 **Green Points** — Gamification with badges, leaderboard, and challenges
- 🏛️ **Municipal Dashboard** — Admin/officer tools, analytics, and management

---

## 🚀 Quick Start

```bash
# Copy environment config and start everything
cp .env.example .env
docker compose up --build
```

| Service | URL |
|---|---|
| Frontend | `http://localhost` |
| Backend Swagger | `http://localhost:8080/swagger-ui.html` |
| AI Service Docs | `http://localhost:8000/docs` |

### Run services individually

```bash
# 1. Start databases
docker compose up postgres redis

# 2. Backend
cd backend && ./mvnw spring-boot:run

# 3. Frontend
cd frontend && npm install && npm run dev

# 4. AI Service
cd ai-service && uvicorn app.main:app --reload
```

---

## 📂 Structure

```
GreenCycle-LK/
├── backend/        # Spring Boot API (Java)
├── frontend/       # React PWA (TypeScript)
├── ai-service/     # FastAPI ML service (Python)
├── docker/         # Nginx & Postgres config
├── docs/           # Architecture, setup, API docs
└── docker-compose.yml
```


Happy Coding! 🌿
