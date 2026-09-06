# Testing

## Backend

JUnit 5 + Spring Boot Test, run via Maven:

```bash
cd backend && mvn test
```

`GreenCycleApplicationTests` is a context-load smoke test; add
feature-specific unit/integration tests alongside each package.

## Frontend

Add a component/unit test runner (e.g. Vitest + React Testing Library) as
features are built out; wire it into `frontend/package.json`'s `test` script
and into `.github/workflows/frontend-ci.yml`.

## AI service

Pytest:

```bash
cd ai-service && pytest
```

## CI enforcement

Each service has a dedicated GitHub Actions workflow
(`.github/workflows/backend-ci.yml`, `frontend-ci.yml`, `ai-service-ci.yml`)
that runs on every push/PR touching that service's directory.
