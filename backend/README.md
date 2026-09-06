# GreenCycle LK — Backend

Spring Boot 3 (Java 17) REST + WebSocket API for the GreenCycle LK platform.

## Stack

- Spring Boot 3 — Web, Security, Data JPA, Validation, WebSocket, Data Redis
- PostgreSQL + Flyway migrations
- JWT authentication (jjwt)
- springdoc-openapi (Swagger UI)

## Getting started

1. Copy `.env.example` to `.env` and fill in local values.
2. Start Postgres and Redis (see `docker-compose.yml` at the repo root).
3. Run the app:

   ```bash
   ./mvnw spring-boot:run
   ```

4. API docs are served at `http://localhost:8080/swagger-ui.html`.

## Package layout

- `common/` — shared config, security, exception handling, DTOs, and base entity used by every feature package.
- Feature packages (`auth`, `user`, `schedule`, `recycling`, `scanner`, `vehicle`, `tracking`, `route`, `pickup`, `disposal`, `report`, `gamification`, `notification`, `analytics`) are owned per the team split noted in each package.

## Database migrations

Flyway migrations live under `src/main/resources/db/migration`:

- `V1__` – `V99__` — shared (users, roles, base tables)
- `V100__` – `V199__` — Member 1
- `V200__` – `V299__` — Member 2
- `V300__` – `V399__` — Member 3
- `R__seed_*.sql` — repeatable seed data

## Tests

```bash
./mvnw test
```
