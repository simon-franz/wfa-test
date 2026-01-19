# HR WORKS Workflow Automation

Full-Stack Workflow Automation MVP für HR WORKS.

## Tech-Stack

- **Runtime:** Bun
- **Backend:** NestJS + Drizzle ORM (SQLite/PostgreSQL) + BullMQ + XState
- **Frontend:** React + Vite + React Flow + Zustand
- **Authentication:** OAuth2 + JWT

## Projekt-Struktur

```
workflow-automation/
├── backend/         # NestJS Backend
├── frontend/        # React Frontend
├── shared/          # Gemeinsame Types & Schemas
├── demo-workflows/  # Beispiel-Workflows
└── dev-tenants/     # SQLite Datenbanken (dev)
```

## Setup

### Voraussetzungen

- Bun >= 1.1
- Redis (für BullMQ Queue)

### Installation

```bash
cd workflow-automation
bun install
```

### Umgebungsvariablen

Erstellen Sie eine `.env` Datei basierend auf `.env.example`:

```bash
cp .env.example .env
```

Konfigurieren Sie die HR WORKS OAuth Credentials und Redis Verbindung.

### Entwicklung starten

```bash
# Shared Package bauen
cd shared && bun run build && cd ..

# Backend starten (Port 3000)
bun run dev:backend

# Frontend starten (Port 5173)
bun run dev:frontend
```

## Features (Phase 1)

### Backend

- Multi-Tenant Architektur (SQLite pro Tenant)
- OAuth2 Login mit HR WORKS
- JWT Session Management
- HR WORKS API Client (Persons, Organization Units)
- Webhook Handler für Delta-Sync
- Workflow Engine mit XState
- BullMQ Job Queue

### Frontend

- Workflow Liste mit CRUD
- Visual Workflow Designer (React Flow)
- Node-Konfiguration

### Node Types

1. **Manual Trigger** - Manueller Start
2. **Scheduled Trigger** - Cron-basierter Start
3. **HTTP Request** - API Aufrufe
4. **Condition** - If/Else Verzweigung (JSONata)
5. **Delay** - Wartezeit

## API Endpoints

### Auth
- `GET /api/auth/authorize` - OAuth2 URL generieren
- `POST /api/auth/login` - Code gegen Token tauschen
- `GET /api/auth/me` - Aktueller Benutzer

### Workflows
- `GET /api/workflows` - Alle Workflows
- `POST /api/workflows` - Workflow erstellen
- `GET /api/workflows/:id` - Workflow Details
- `PUT /api/workflows/:id` - Workflow aktualisieren
- `DELETE /api/workflows/:id` - Workflow löschen
- `POST /api/workflows/:id/activate` - Aktivieren
- `POST /api/workflows/:id/deactivate` - Deaktivieren

### Executions
- `POST /api/workflows/:id/executions/trigger` - Workflow starten
- `GET /api/workflows/:id/executions` - Ausführungen abrufen
- `GET /api/workflows/:id/executions/:execId` - Einzelne Ausführung

### Sync
- `POST /api/sync/full` - Vollständiger Sync
- `GET /api/sync/status` - Sync Status
- `GET /api/sync/persons` - Synchronisierte Personen
- `GET /api/sync/organization-units` - Synchronisierte OEs

### Webhooks
- `POST /api/webhooks/hrworks/:tenantId` - HR WORKS Webhook Endpoint
