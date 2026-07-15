# Backend Design — Restaurant Reservation System

## Stack

- **Runtime:** Node.js, TypeScript
- **Framework:** NestJS 11
- **ORM:** TypeORM 1.1 with `mysql2`
- **Database:** MySQL (Aiven Cloud, SSL)
- **Auth:** JWT (secret + expiry in `.env`, no implementation yet)

## Architecture

Standard NestJS modular structure. One feature module (`RestaurantBookingModule`) with 4 submodules mirroring DB entities.

```
src/
├── main.ts                          # Bootstrap, port 3000
├── app.module.ts                    # Root: ConfigModule, TypeORM (MySQL+SSL), RestaurantBookingModule
├── app.controller.ts                # GET / → "Hello World!"
├── app.service.ts
└── restaurant-booking/
    ├── restaurant-booking.module.ts # Aggregates 4 submodules
    ├── users/
    │   ├── users.module.ts
    │   └── entities/users.entity.ts
    ├── restaurants/
    │   ├── restaurants.module.ts
    │   ├── restaurant.controller.ts       # STUB — no routes
    │   ├── restaurant.service.ts          # STUB
    │   ├── entities/restaurant.entity.ts
    │   ├── dto/get-restaurant.dto.ts      # STUB
    │   ├── mappers/restaurant.mapper.ts   # STUB
    │   ├── repositories/restaurant.repository.ts  # STUB
    │   └── actions/
    │       ├── create-restaurant-action.service.ts   # STUB
    │       ├── update-restaurant-action.service.ts   # STUB
    │       ├── update-operating-hours-action.service.ts # STUB
    │       └── dto/ (3 files, all STUB)
    ├── tables/
    │   ├── tables.module.ts
    │   ├── table.controller.ts           # STUB
    │   ├── table.service.ts              # STUB
    │   ├── entities/table.entity.ts
    │   ├── dto/get-table.dto.ts          # STUB
    │   ├── mappers/table.mapper.ts       # STUB
    │   ├── repositories/table.repository.ts  # STUB
    │   └── actions/
    │       ├── create-table-action.service.ts   # STUB
    │       ├── update-table-action.service.ts   # STUB
    │       └── dto/ (2 files, all STUB)
    └── reservations/
        ├── reservations.module.ts
        ├── reservation.controller.ts     # STUB
        ├── reservation.service.ts        # STUB
        ├── entities/reservation.entity.ts
        ├── dto/get-reservation.dto.ts    # STUB
        ├── mappers/reservation.mapper.ts # STUB
        ├── repositories/reservation.repository.ts  # PARTIAL — wraps Users, not Reservation
        └── actions/
            ├── create-reservation-action.service.ts   # STUB
            ├── cancel-reservation-action.service.ts   # STUB
            ├── confirm-reservation-action.service.ts  # STUB
            ├── complete-reservation-action.service.ts # STUB
            ├── reschedule-reservation-action.service.ts# STUB
            └── dto/ (3 files, all STUB)
```

## Layer Pattern (per subdomain)

Each subdomain (restaurants, tables, reservations) follows same layout:

| Layer | Role | Status |
|-------|------|--------|
| `entities/*.entity.ts` | TypeORM entity, maps to DB table | DONE — all 4 aligned with schema |
| `repositories/*.repository.ts` | Wraps TypeORM `Repository`, encapsulates queries | STUB (reservation.repository has partial Users logic, wrong entity) |
| `actions/*-action.service.ts` | Business logic per use case | STUB (10 files, all empty) |
| `actions/dto/*.dto.ts` | Input validation contracts | STUB (8 files, all empty) |
| `dto/*.dto.ts` | Response contracts | STUB (3 files, all empty) |
| `mappers/*.mapper.ts` | Entity ↔ DTO mapping | STUB (3 files, all empty) |
| `*.controller.ts` | HTTP routes | STUB (3 files, `@Controller()` only, no routes) |
| `*.service.ts` | Orchestrates actions, exposes to controller | STUB (3 files, all empty) |

## Database Schema (MySQL, 4 tables)

- **`users`** — id, full_name, email (unique), password_hash, role (enum: owner/customer), created_at
- **`restaurants`** — id, owner_id → users(id) CASCADE, name, address, opening_time, closing_time, created_at
- **`restaurant_tables`** — id, restaurant_id → restaurants(id) CASCADE, label, seats; UK on (restaurant_id, label)
- **`reservations`** — id, customer_id → users(id) CASCADE, table_id → restaurant_tables(id) CASCADE, party_size, reservation_date, start_time, end_time (CK end_time > start_time), status (enum 5 values), created_at; composite index for conflict check

## What Has Been Done

- NestJS project scaffolded, TypeORM connected to Aiven MySQL
- All 4 entities defined, validated, and verified against SQL schema
- Folder structure laid out for all 3 subdomains (controllers, services, actions, repositories, mappers, DTOs)
- Overlap-prevention index and CHECK constraint modeled in reservation entity
- JWT config present in `.env` (secret + expiry)

## What Is Next (Implementation Priority)

### Phase 1 — Core CRUD (Actions + DTOs)
1. **Users** — registration (create user), profile lookup
2. **Restaurants**
   - `create-restaurant-action.service` — validate owner exists, insert
   - `update-restaurant-action.service` — update name/address
   - `update-operating-hours-action.service` — update opening/closing time
   - All corresponding DTOs with `class-validator` decorators
3. **Tables**
   - `create-table-action.service` — validate restaurant, enforce unique label per restaurant
   - `update-table-action.service` — update label/seats
   - Corresponding DTOs
4. **Reservations**
   - `create-reservation-action.service` — overlap check using composite index, valid time window, party_size ≤ table seats
   - `cancel-reservation-action.service` — status → cancelled (only if pending/confirmed)
   - `confirm-reservation-action.service` — status → confirmed (only if pending)
   - `complete-reservation-action.service` — status → completed (only if confirmed)
   - `reschedule-reservation-action.service` — change date/time, re-run overlap check
   - All corresponding DTOs with validation

### Phase 2 — Repositories & Mappers
5. **Repositories** — implement actual TypeORM calls (inject correct entities, not Users)
6. **Mappers** — entity-to-DTO mapping for all response types
7. **Get DTOs** — define response shapes for GET endpoints

### Phase 3 — Controllers & Services
8. **Services** — wire action services into cohesive orchestration (e.g., `ReservationService.complete(id)` calls validator + `CompleteReservationActionService`)
9. **Controllers** — REST endpoints:
   - `POST /restaurants`, `PATCH /restaurants/:id`, `PATCH /restaurants/:id/hours`
   - `POST /restaurants/:restaurantId/tables`, `PATCH /tables/:id`
   - `POST /reservations`, `PATCH /reservations/:id/cancel`, `PATCH /reservations/:id/confirm`, `PATCH /reservations/:id/complete`, `PATCH /reservations/:id/reschedule`
   - `GET /restaurants/:id`, `GET /restaurants/:id/tables`, `GET /restaurants/:id/reservations` (read endpoints)

### Phase 4 — Auth & Security
10. **Auth module** — JWT guard, login endpoint, protected routes
11. **Owner verification** — only restaurant owner can manage their restaurant/tables
12. **Customer verification** — users can only manage their own reservations

### Phase 5 — Testing & Polish
13. **Unit tests** — action services, overlap logic, status transitions
14. **E2E tests** — full booking flow
15. **Error handling** — global exception filter, consistent error responses
16. **Validation pipes** — enable `ValidationPipe` globally with DTOs

## Notable Issues to Fix

- `reservation.repository.ts` injects `Users` entity instead of `Reservation` — wrong
- No global `ValidationPipe` configured
- `synchronize: false` in TypeORM config — migrations must be managed manually or enabled only in dev
- No auth guard implemented despite JWT config existing
