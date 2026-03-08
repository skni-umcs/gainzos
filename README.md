# Gainzos

A full-stack fitness application for managing exercises, workouts, and motivational quotes. Built with a Spring Boot REST API, a Next.js web dashboard, and an Expo mobile app.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Spring Boot 4, Java 25, Gradle |
| **Database** | PostgreSQL 17, Liquibase (migrations) |
| **Security** | Spring Security (session-based auth) |
| **API Docs** | SpringDoc / Swagger UI |
| **Frontend** | Next.js 16, React 19, TypeScript |
| **Styling** | Tailwind CSS v4, Radix UI, shadcn/ui |
| **State** | TanStack Query |
| **Mobile** | Expo (React Native), NativeWind |
| **Infrastructure** | Docker Compose, Nginx |

---

## Project Structure

```
gainzos/
├── apps/
│   ├── server/     # Spring Boot API
│   ├── web/        # Next.js dashboard
│   └── native/     # Expo mobile app
├── nginx/          # Nginx reverse proxy config
├── docker-compose.yml
└── Makefile
```

---

## Prerequisites

- **Java 25+**
- **Node.js 20+** and **npm**
- **Docker** and **Docker Compose**

---

## Getting Started (Development)

### 1. Environment Variables

Copy the example env files and fill in your values:

```bash
cp apps/server/.env.example apps/server/.env
cp apps/web/.env.example apps/web/.env
```

Minimum required variables for `apps/server/.env`:

```env
DATABASE_IP=localhost
DATABASE_PORT=5432
DATABASE_NAME=gainzos
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
FRONTEND_URL=http://localhost:3001
```

Minimum required variables for `apps/web/.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 2. Start the Database

```bash
make db:start
```

### 3. Run the Backend

```bash
make dev:server
```

The API will be available at `http://localhost:3000/api`

### 4. Run the Frontend

```bash
make dev:web
```

The dashboard will be available at `http://localhost:3001`

---

## Available Make Commands

| Command | Description |
|---|---|
| `make db:start` | Start PostgreSQL container |
| `make db:stop` | Stop PostgreSQL container |
| `make db:reset` | Wipe and recreate the database |
| `make dev:server` | Run backend in dev mode (hot reload) |
| `make dev:web` | Run frontend in dev mode |
| `make build` | Build backend JAR and frontend for production |

---

## API Reference

Swagger UI is available at:

```
http://localhost:3000/api/swagger-ui/index.html
```

### Endpoints overview

| Resource | Base path |
|---|---|
| Auth | `/api/auth` |
| Exercises | `/api/exercises` |
| Exercise Types | `/api/exercises-types` |
| Quotes | `/api/quotes` |
| Media | `/api/media` |

---

## Running with Docker

```bash
docker compose up --build
```

This starts the database, API, dashboard, and Nginx reverse proxy together.

---

## Mobile App

The Expo app is located in `apps/native/`. To run it:

```bash
cd apps/native
npm install
npx expo start
```


