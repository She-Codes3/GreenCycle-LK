# Deployment

## Images

`.github/workflows/deploy.yml` builds and pushes a Docker image per service
(`backend`, `frontend`, `ai-service`) to GitHub Container Registry (GHCR) on
every push to `main` and on version tags.

## Environments

- `dev` — `application-dev.yml` (backend), local `.env` files, run via
  `docker-compose.yml`.
- `prod` — `application-prod.yml` (backend); all secrets/config come from
  environment variables, never committed `.env` files.

## Target hosting

The `deploy` job in `.github/workflows/deploy.yml` is currently a
placeholder — wire it up to whatever hosting target is chosen (a VM over
SSH, ECS, a Kubernetes cluster, etc.) once decided.

## Database migrations in production

Flyway runs automatically on backend startup against the configured
`application-prod.yml` datasource. Take a backup before deploying a release
that includes new migrations.
