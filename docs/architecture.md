# Architecture

## Services

| Service      | Tech                              | Responsibility                                   |
|--------------|------------------------------------|---------------------------------------------------|
| `frontend`   | React + TypeScript + Vite (PWA)    | Resident/collector/admin UI                        |
| `backend`    | Spring Boot 3 (Java 17)            | REST + WebSocket API, auth, business logic         |
| `ai-service` | FastAPI (Python)                   | Waste image classification for the scanner feature |
| `postgres`   | PostgreSQL                         | System of record                                    |
| `redis`      | Redis                              | Caching / ephemeral state                           |

## Request flow

```
Browser (frontend)
   │  REST (JWT bearer) / WebSocket (STOMP over SockJS)
   ▼
backend (Spring Boot)
   │  Postgres (JPA + Flyway)   │  Redis   │  HTTP → ai-service (scanner uploads)
   ▼
```

`docker/nginx/nginx.conf` fronts the stack in the `docker-compose.yml` setup,
routing `/` to the frontend, `/api/` to the backend, and `/ws/` to the
backend's WebSocket endpoint.

## Backend package split

The backend's `common/` package holds shared infrastructure (security, JWT,
exception handling, DTOs, base entity, config) used by every feature package.
Feature packages are split across three team members — see the comments in
`backend/src/main/java/lk/greencycle/` and `frontend/src/features/` for the
exact ownership boundaries, and `.github/CODEOWNERS` for the enforced mapping.

## Diagrams

An ER diagram (`docs/er-diagram.png`) and the original project proposal
(`docs/proposal.pdf`) are tracked here once available; they are authored
deliverables rather than generated files.
