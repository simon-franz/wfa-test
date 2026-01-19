# Workflow Automation - Setup & Development Guide

## Prerequisites

- **Node.js** v20+ or **Bun** v1.0+
- **Redis** (optional, for workflow queue)

## Quick Start

### 1. Installation

```bash
cd workflow-automation
bun install
```

### 2. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
cp .env.example backend/.env
```

Edit `.env` and `backend/.env` with your configuration:

```env
# Database
DATABASE_URL=./dev-tenants/landlord.db
NODE_ENV=development

# JWT
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=1d

# HR WORKS OAuth2 (optional for production)
HRWORKS_OAUTH_CLIENT_ID=xxx
HRWORKS_OAUTH_CLIENT_SECRET=xxx
HRWORKS_OAUTH_REDIRECT_URI=http://localhost:5173/oauth/callback

# HR WORKS API
HRWORKS_API_BASE_URL=https://api.hrworks.de

# Redis (optional, for workflow queue)
REDIS_HOST=localhost
REDIS_PORT=6379

# Development Mode (enables dev login)
DEV_MODE=true
```

### 3. Build Shared Package

The shared package must be built before starting the backend:

```bash
cd shared
bun run build
cd ..
```

### 4. Start Development Servers

Open two terminals:

**Terminal 1 - Backend:**
```bash
bun run dev:backend
```

**Terminal 2 - Frontend:**
```bash
bun run dev:frontend
```

The application will be available at:
- **Frontend:** http://localhost:5174
- **Backend API:** http://localhost:3000

## Development Login

When `DEV_MODE=true`, a "Dev Login" button appears on the login page. This allows you to log in without HR WORKS OAuth:

1. Click "Dev Login"
2. Enter any email (e.g., `admin@example.com`)
3. A development tenant and user will be created automatically

## Project Structure

```
workflow-automation/
├── backend/          # NestJS backend
│   ├── src/
│   │   ├── auth/     # Authentication & OAuth
│   │   ├── db/       # Database & tenant management
│   │   ├── hrworks/  # HR WORKS API integration
│   │   ├── sync/     # Data synchronization
│   │   ├── webhooks/ # Webhook handlers
│   │   └── workflow/ # Workflow engine & execution
│   └── .env          # Backend environment variables
├── frontend/         # React + Vite frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       └── lib/
├── shared/           # Shared types & schemas
│   ├── src/
│   │   ├── types/    # TypeScript types
│   │   ├── schemas/  # Zod validation schemas
│   │   ├── db/       # Drizzle ORM schemas
│   │   └── utils/    # Shared utilities
│   └── dist/         # Built output (must be built first!)
└── .env              # Root environment variables
```

## Common Issues

### Backend won't start - "Cannot find module 'shared'"

**Solution:** Build the shared package first:
```bash
cd shared
bun run build
cd ..
```

### "Port already in use" error

**Solution:** Kill existing processes:
```bash
# Kill backend
pkill -f "ts-node.*main.ts"

# Kill frontend
pkill -f "vite"
```

### Redis connection errors

Redis is optional for development. The errors can be ignored, or start Redis:

```bash
# With Docker
docker run -d -p 6379:6379 redis:alpine

# Or install locally (Ubuntu/Debian)
sudo apt install redis-server
sudo systemctl start redis
```

### Dev Login button not showing

1. Check `DEV_MODE=true` in both `.env` and `backend/.env`
2. Restart the backend
3. Verify: `curl http://localhost:3000/api/auth/dev-mode` should return `{"devMode":true}`

## Database

The application uses SQLite with a multi-tenant architecture:

- **Landlord DB:** `dev-tenants/landlord.db` (tenant registry)
- **Tenant DBs:** `dev-tenants/{tenantId}.db` (per-tenant data)

Databases are created automatically on first run.

## Scripts

### Root Level
- `bun run dev:backend` - Start backend in development mode
- `bun run dev:frontend` - Start frontend in development mode

### Backend
- `bun run dev` - Start with ts-node (development)
- `bun run build` - Build for production
- `bun run start:prod` - Start production build

### Frontend
- `bun run dev` - Start Vite dev server
- `bun run build` - Build for production
- `bun run preview` - Preview production build

### Shared
- `bun run build` - Build shared package (required!)
- `bun run dev` - Build in watch mode

## Production Deployment

1. Set environment variables (remove `DEV_MODE`)
2. Build all packages:
   ```bash
   cd shared && bun run build && cd ..
   cd backend && bun run build && cd ..
   cd frontend && bun run build && cd ..
   ```
3. Start backend: `cd backend && bun run start:prod`
4. Serve frontend build from `frontend/dist`

## Tech Stack

- **Backend:** NestJS, TypeScript, Drizzle ORM, SQLite, BullMQ
- **Frontend:** React, TypeScript, Vite, TanStack Query, Tailwind CSS
- **Workflow Engine:** XState
- **Queue:** BullMQ + Redis
- **Validation:** Zod
- **API Integration:** HR WORKS REST API

## Support

For issues or questions, check the logs:
- Backend logs appear in the terminal running `dev:backend`
- Frontend logs appear in browser console (F12)
