# Local Setup

## Prerequisites

- Java 17
- Node.js 20+
- Python 3.11+
- Docker & Docker Compose

## Option A — everything via Docker Compose

```bash
cp .env.example .env
docker compose up --build
```

This starts Postgres, Redis, the backend, the ai-service, the frontend, and
an nginx reverse proxy on `http://localhost`.

## Option B — run each service locally

1. **Postgres + Redis** — easiest via Docker: `docker compose up postgres redis`.
2. **Backend** — see `backend/README.md`.
3. **Frontend** — see `frontend/README.md`.
4. **AI service** — see `ai-service/README.md`.

Each service has its own `.env.example` — copy it to `.env` in that
service's directory and adjust values for your machine.

## Verifying the setup

- Backend Swagger UI: `http://localhost:8080/swagger-ui.html`
- AI service docs: `http://localhost:8000/docs`
- Frontend: `http://localhost:5173`
