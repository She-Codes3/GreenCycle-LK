-- Demo data only — not applied via Flyway. See database/README.md.
-- Broader illustrative dataset for presentations. Adjust table/column names
-- to match the final Flyway-managed schema before running.

INSERT INTO users (name, email, role) VALUES
    ('Nimal Perera', 'nimal.demo@greencycle.lk', 'RESIDENT'),
    ('Kamal Silva', 'kamal.demo@greencycle.lk', 'COLLECTOR'),
    ('Ayesha Fernando', 'ayesha.demo@greencycle.lk', 'ADMIN');

INSERT INTO pickups (user_id, waste_category, status, scheduled_at)
SELECT id, 'plastic', 'SCHEDULED', now() + interval '2 days'
FROM users WHERE email = 'nimal.demo@greencycle.lk';
