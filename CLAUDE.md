# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Gainzos is a full-stack fitness platform: a Spring Boot REST API, a Next.js admin dashboard, and an Expo React Native mobile app, all orchestrated with Turbo in an pnpm workspace monorepo.

## Commands

### Root (runs across all apps via Turbo)
```bash
npm run dev            # Start all dev servers
npm run dev:web        # Next.js only (port 3001)
npm run dev:native     # Expo only
npm run dev:server     # Spring Boot with DATABASE_IP=localhost
npm run build          # Production build all
npm run lint           # Lint all
npm run db:start       # Start PostgreSQL container
npm run db:stop        # Stop PostgreSQL container
npm run db:reset       # Wipe and recreate database
```

### Server (apps/server/)
```bash
./gradlew bootRun      # Dev server
./gradlew clean build  # Production JAR
./gradlew test         # Run all tests
./gradlew test --tests "com.gainzos.server.ClassName"  # Run single test class
```

### Web (apps/web/)
```bash
npm run dev            # Dev on port 3001
npm run lint           # ESLint
npm run format         # Prettier
```

### Native (apps/native/)
```bash
npm start              # Expo start
npm run ios            # iOS
npm run android        # Android
npm run lint           # ESLint
```

## Architecture

### Stack
- **Server**: Spring Boot 4, Java 25, PostgreSQL 17.6, Liquibase, Spring Security (session-based), MapStruct + Lombok, SpringDoc/Swagger at `/swagger-ui.html`
- **Web**: Next.js 16 (App Router), React 19, Tailwind CSS v4, shadcn/ui + Radix UI, next-intl, TanStack Query v5
- **Native**: Expo ~54 (Expo Router v6), React Native, NativeWind v4 (Tailwind CSS v3), Zustand, TanStack Query v5, MMKV, expo-secure-store

### Request Flow
```
Native / Web  →  axios (lib/react-query/fetcher.ts)
             →  Spring Boot API on :3000/api
             →  PostgreSQL
```

Both frontend apps use the same API layer pattern: `lib/react-query/api.ts` + `lib/react-query/fetcher.ts`. Authentication is session-based (JSESSIONID cookie); `credentials: 'include'` is required on all fetch calls.

### Server Layers
Controllers (`routers/`) → Services → Repositories (JPA) → Entities. DTOs are separate and mapped with MapStruct. Enums (e.g. `MuscleGroup`) live in `enums/`.

### Key API Paths
| Prefix | Resource |
|--------|----------|
| `/api/auth` | login / logout / register / me |
| `/api/exercises` | exercise CRUD |
| `/api/exercises-types` | exercise types (mobile uses `/exercises-type/getAllMobile`) |
| `/api/workouts` | workout tracking |
| `/api/workout-templates` | templates |
| `/api/user-metrics` | user stats |
| `/api/quotes` | motivational quotes |
| `/api/media` | file storage |

### Web Routes
- `(auth)/login`, `(auth)/register` — public
- `dashboard/` — protected admin (exercises, exercise-types, quotes, users)

### Native Routes (Expo Router)
- `(tabs)/index.tsx` — home/analytics
- `(tabs)/workout/` — workout tracking
- `(tabs)/templates/` — template management
- `(tabs)/profile/` — user profile

## Configuration

Copy env files before first run:
```bash
cp apps/server/.env.example apps/server/.env
cp apps/web/.env.example apps/web/.env
cp apps/native/.env.example apps/native/.env
```

Server reads DB connection from env vars: `DATABASE_IP`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`. Defaults in `application.yaml`: host `localhost`, port `5432`, name/user/password all `gainzos`. CORS is configured for `localhost:3001`.

Web requires `NEXT_PUBLIC_API_URL=http://localhost:3000`. Native requires `EXPO_PUBLIC_API_URL` — defaults to `http://10.0.2.2:3000` (Android emulator); use `http://localhost:3000` for iOS simulator or physical devices on the same network.

Local development: run `npm run db:start` then `npm run dev:server` (sets `DATABASE_IP=localhost`).

Full stack via Docker: `docker-compose up`.

### Schema management

Liquibase is **disabled** (`spring.liquibase.enabled: false`). Schema changes are applied automatically via `ddl-auto: update`. The `SESSION` table for JDBC-backed Spring Session is initialized from `db/session/session-schema.sql` on startup.

## Mobile Design System

The mobile app uses a design system called **Kinetic Nocturne** (see `apps/native/DESIGN.md`):
- Dark theme, primary purple `#bc9dff`
- Surface hierarchy for depth instead of borders
- Manrope for display text, Inter for body
- Glass morphism (backdrop blur), 300ms ease-out-expo transitions
- No 1px borders — use background tier changes for separation

## Code Conventions

- **Formatting**: Prettier — 2-space indent, 100-char line width, trailing commas (es5). Run `npm run format` in `apps/web/`.
- **Path alias**: `@/` maps to `src/` in both web and native.
- **Zod versions**: web uses Zod v4, native uses Zod v3 — keep imports consistent per app.
- **Entity mapping**: always use MapStruct mappers, never map manually in services or controllers.
- **Timestamps**: entities use `@PrePersist` / `@PreUpdate` hooks — do not set `createdAt`/`updatedAt` manually.
