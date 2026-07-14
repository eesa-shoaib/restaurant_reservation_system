# BookMe — Modern Restaurant Table Reservation System

A full-stack, real-time table reservation platform. Nuxt 3 frontend, NestJS backend
(Action-Service pattern), MySQL database.

## Stack

- **Frontend:** Nuxt 3 (Vue 3, Tailwind CSS, Pinia, VueUse)
- **Backend:** NestJS (TypeScript, TypeORM, Passport/JWT, class-validator)
- **Database:** MySQL

## Project Structure

```
backend/    NestJS API (Action-Service architecture)
frontend/   Nuxt 3 client
docs/       Database schema, architecture notes
```

## Getting Started

### Prerequisites
- Node.js 20+
- MySQL 8+ (or a free instance on Aiven.io)

### Backend

```bash
cd backend
cp .env.example .env   # fill in DB credentials + JWT secret
npm install
npm run migration:run
npm run start:dev
```

### Frontend

```bash
cd frontend
cp .env.example .env   # set API base URL
npm install
npm run dev
```

## Architecture: Action-Service Pattern

Each domain module (`restaurants`, `tables`, `reservations`, ...) follows:

- **Controller** — validates DTOs, delegates to an Action Service. No business logic.
- **Action Service** — one class per business transaction (e.g. `CreateBookingActionService`).
- **Repository** — encapsulates all database queries for the domain.
- **Mapper** — converts entities to presentation-safe DTOs before they leave the API layer.

## License

MIT
