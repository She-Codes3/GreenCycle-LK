# Database Design

## Migration ownership

Schema changes are managed exclusively through Flyway migrations under
`backend/src/main/resources/db/migration`, versioned by owner to avoid merge
conflicts:

| Range              | Owner              |
|---------------------|--------------------|
| `V1__` – `V99__`    | Shared (users, roles, base tables) |
| `V100__` – `V199__` | Member 1 (auth, user, schedule, recycling, scanner) |
| `V200__` – `V299__` | Member 2 (vehicle, tracking, route, pickup) |
| `V300__` – `V399__` | Member 3 (disposal, report, gamification, notification, analytics) |
| `R__seed_*.sql`     | Repeatable seed data, any owner |

## Base entity

Every JPA entity extends
`backend/src/main/java/lk/greencycle/common/entity/BaseEntity.java`, which
provides:

- `id` (auto-generated primary key)
- `createdAt` / `updatedAt` (managed by Spring Data JPA auditing)

## Demo data

Presentation-only sample rows live in `database/demo/*.sql` — see
`database/README.md`. They are not part of the Flyway migration chain.

## ER diagram

`docs/er-diagram.png` will be added once the schema settles across all three
members' migrations.
