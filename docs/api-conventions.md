# API Conventions

## Base path

All backend REST endpoints are versioned under `/api/v1/...` (auth endpoints
under `/api/v1/auth/...` are the only ones that don't require a token).

## Response envelope

Every response body wraps its payload in `ApiResponse<T>`
(`backend/src/main/java/lk/greencycle/common/dto/ApiResponse.java`,
mirrored on the frontend in `frontend/src/shared/types/api.ts`):

```json
{
  "success": true,
  "message": null,
  "data": { "...": "..." },
  "timestamp": "2026-09-06T12:00:00Z"
}
```

Paginated list endpoints nest a `PageResponse<T>` inside `data`:

```json
{
  "content": [ "..." ],
  "page": 0,
  "size": 20,
  "totalElements": 42,
  "totalPages": 3,
  "last": false
}
```

## Errors

Errors use the same envelope with `success: false` and a human-readable
`message`. Validation errors (`400`) put a field → message map in `data`.
See `GlobalExceptionHandler` for the full mapping of exception → HTTP status.

## Auth

Send `Authorization: Bearer <token>` on every request except
`/api/v1/auth/**`. Access tokens are short-lived; use the refresh endpoint to
get a new one (see `common/security/JwtTokenProvider`).

## Pagination & sorting

List endpoints accept standard Spring `page`, `size`, and `sort` query
params (e.g. `?page=0&size=20&sort=createdAt,desc`).

## Naming

- Path segments: kebab-case (`/pickup-requests`).
- JSON fields: camelCase, matching the Java DTOs and TypeScript types 1:1.
