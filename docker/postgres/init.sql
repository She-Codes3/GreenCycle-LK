-- Runs once when the postgres container's data volume is first created
-- (docker-entrypoint-initdb.d). Flyway (run by the backend on startup) owns
-- the actual application schema — this script only prepares extensions that
-- migrations may rely on.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
