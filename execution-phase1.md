# HR WORKS Workflow Automation - Implementierungsplan Phase 1 (PoC)

## Ziel
Full-Stack MVP in 2 Wochen: Backend + Frontend + OAuth2 + Designer + 1 Demo-Workflow

## Tech-Stack Zusammenfassung
| Bereich | Technologie |
|---------|-------------|
| Runtime | Bun |
| Backend | NestJS |
| ORM | Drizzle (SQLite dev / PostgreSQL prod) |
| Queue | BullMQ + Redis |
| State Machine | XState |
| Frontend | React + Vite |
| UI Library | @hrworks/sui-core + @hrworks/sui-extension |
| Workflow Editor | @xyflow/react (React Flow) |
| State Mgmt | Zustand |
| IDs | ULID |
| Echtzeit-Updates | Server-Sent Events (SSE) mit `@microsoft/fetch-event-source` |

---

## Projektstruktur (Monorepo)

```
workflow-automation/
├── backend/                    # NestJS Backend
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── auth/              # OAuth2, JWT, Guards
│   │   ├── db/                # Drizzle, Tenant-Manager
│   │   ├── hrworks/           # HR WORKS API Client
│   │   ├── sync/              # Person/OE Sync Service
│   │   ├── webhooks/          # Webhook Handler
│   │   ├── workflow/          # Engine, Nodes, Execution
│   │   └── common/            # Decorators, Pipes, Filters
│   ├── drizzle/               # Migrations
│   └── package.json
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── api/               # API Client
│   │   ├── stores/            # Zustand Stores
│   │   ├── pages/             # Route Pages
│   │   ├── components/        # UI Components
│   │   └── features/          # Feature Modules
│   │       └── designer/      # Workflow Designer
│   └── package.json
├── shared/                     # Gemeinsame Types
│   ├── src/
│   │   ├── types/
│   │   ├── schemas/
│   │   └── utils/
│   └── package.json
├── package.json               # Root (Bun Workspace)
├── bun.lockb
└── .env.example
```

---

## Implementierungsschritte

### 1. Projekt-Setup
- [ ] Monorepo mit Bun Workspaces initialisieren
- [ ] Backend (NestJS) Grundgerüst
- [ ] Frontend (React + Vite) Grundgerüst
- [ ] Shared Package für Types
- [ ] ESLint, Prettier, TypeScript Config

**Kritische Dateien:**
- `package.json` (Root)
- `backend/package.json`
- `frontend/package.json`
- `shared/package.json`
- `tsconfig.json`

### 2. Database Layer (Drizzle)
- [ ] Landlord Schema (tenants Tabelle)
- [ ] Tenant Schema (users, workflows, executions, etc.)
- [ ] Tenant-Manager (Connection Pool)
- [ ] Migrations Setup

**Kritische Dateien:**
- `shared/src/db/landlord-schema.ts`
- `shared/src/db/tenant-schema.ts`
- `backend/src/db/tenant-manager.ts`
- `backend/src/db/landlord.ts`

### 3. Authentication (OAuth2 + JWT)
- [ ] HR WORKS OAuth2 Integration
- [ ] JWT Token Generation/Validation
- [ ] Auth Guard
- [ ] Tenant/User Decorators
- [ ] Login Endpoint

**Kritische Dateien:**
- `backend/src/auth/auth.module.ts`
- `backend/src/auth/auth.service.ts`
- `backend/src/auth/jwt-auth.guard.ts`
- `backend/src/auth/oauth.controller.ts`
- `backend/src/common/decorators/tenant.decorator.ts`

### 4. HR WORKS API Client
- [ ] Authentication (Access Key + Secret → Bearer Token)
- [ ] Persons API
- [ ] Organization Units API
- [ ] Webhooks API
- [ ] Error Handling & Retries

**Kritische Dateien:**
- `backend/src/hrworks/hrworks.module.ts`
- `backend/src/hrworks/hrworks-api.service.ts`
- `backend/src/hrworks/hrworks-auth.service.ts`

### 5. Sync Service
- [ ] Initial Full-Sync (Persons + OEs)
- [ ] Webhook Registration bei HR WORKS
- [ ] Webhook Handler für Delta-Updates
- [ ] Signature Verification

**Kritische Dateien:**
- `backend/src/sync/sync.module.ts`
- `backend/src/sync/sync.service.ts`
- `backend/src/webhooks/hrworks-webhook.controller.ts`
- `backend/src/webhooks/hrworks-webhook.service.ts`

### 6. Workflow Engine
- [ ] Workflow Definition Model
- [ ] XState Machine Generator
- [ ] BullMQ Queue Setup
- [ ] Execution Worker
- [ ] State Persistence
- [ ] Expression Engine (JSONata)

**Kritische Dateien:**
- `backend/src/workflow/workflow.module.ts`
- `backend/src/workflow/engine/workflow-engine.service.ts`
- `backend/src/workflow/engine/xstate-generator.ts`
- `backend/src/workflow/execution/execution.worker.ts`
- `backend/src/workflow/execution/execution.service.ts` (SSE Stream)
- `backend/src/workflow/expression/expression.service.ts`
- `backend/src/workflow/workflow.service.ts` (testNode, getValueByPath)

### 7. Node Types (Phase 1)
- [ ] Manual Trigger Node
- [ ] Scheduled Trigger Node (Cron)
- [ ] HTTP Request Node
- [ ] **HR WORKS Node** (mit Dictionary Flattening, Token-Handling, erweiterten Person-Feldern)
- [ ] **Data Transformation Node** (count, filter, map, reduce mit Result Wrapping)
- [ ] Condition Node
- [ ] Delay Node

**Kritische Dateien:**
- `backend/src/workflow/nodes/base-node.ts`
- `backend/src/workflow/nodes/trigger/manual-trigger.node.ts`
- `backend/src/workflow/nodes/trigger/scheduled-trigger.node.ts`
- `backend/src/workflow/nodes/action/http-request.node.ts`
- `backend/src/workflow/nodes/action/hrworks.node.ts` (Dictionary Flattening, Token-Handling)
- `backend/src/workflow/nodes/action/data-transform.node.ts` (Result Wrapping)
- `backend/src/workflow/nodes/action/condition.node.ts`
- `backend/src/workflow/nodes/action/delay.node.ts`
- `backend/src/workflow/nodes/node-registry.ts` (Registrierung aller Node-Typen)

### 8. REST API
- [ ] Workflows CRUD
- [ ] Workflow Executions
- [ ] **SSE Endpoint** für Echtzeit-Execution-Updates (`/api/executions/:id/stream`)
- [ ] **Settings Endpoints** (GET/PUT `/api/settings` für Tenant-Konfiguration)
- [ ] **Node Testing Endpoint** (`POST /api/workflows/:id/test-node` für Play-Button)
- [ ] Synced Persons/OEs Endpoints

**Kritische Dateien:**
- `backend/src/workflow/workflow.controller.ts`
- `backend/src/workflow/execution/execution.controller.ts`
- `backend/src/sync/sync.controller.ts`

### 9. Frontend - Grundgerüst
- [ ] SmartFace Integration (@hrworks/sui-core, @hrworks/sui-extension)
- [ ] Router Setup
- [ ] Zustand Store Setup
- [ ] API Client
- [ ] Auth State Management

**Kritische Dateien:**
- `frontend/src/main.tsx`
- `frontend/src/App.tsx`
- `frontend/src/api/client.ts`
- `frontend/src/stores/auth.store.ts`
- `frontend/src/stores/workflow.store.ts`

### 10. Frontend - Login
- [ ] Login Page
- [ ] OAuth2 Redirect Handler
- [ ] Protected Routes

**Kritische Dateien:**
- `frontend/src/pages/LoginPage.tsx`
- `frontend/src/pages/OAuthCallbackPage.tsx`
- `frontend/src/components/ProtectedRoute.tsx`

### 11. Frontend - Workflow List
- [ ] Workflow List Page
- [ ] Workflow Card Component
- [ ] Create Workflow Modal

**Kritische Dateien:**
- `frontend/src/pages/WorkflowListPage.tsx`
- `frontend/src/components/WorkflowCard.tsx`
- `frontend/src/components/CreateWorkflowModal.tsx`

### 12. Frontend - Workflow Designer
- [ ] React Flow Canvas
- [ ] Custom Node Types (Trigger, Action, Condition)
- [ ] Node Palette (Drag & Drop)
- [ ] **Orthogonale Edges** mit Hover-Lösch-Icon
- [ ] **Datenfluss-Animation** auf Edges
- [ ] Edge Drawing
- [ ] Node Configuration Panel mit **Context-Button** für Variable Picker
- [ ] **Context Panel** mit expandable Tree-View, Array-Navigation, Wert-Anzeige
- [ ] **Node-by-Node Testing** (Play-Button, sequentielle Abhängigkeiten, Output Caching)
- [ ] **Template Placeholder Resolution** (`{{NodeName.output.field}}`)
- [ ] **Canvas Controls** (Zoom, Undo/Redo, Auto-Layout, Fullscreen)
- [ ] **Context Menu** für Nodes (Rechtsklick)
- [ ] **SSE Integration** für Live-Execution-Updates
- [ ] **Theme Store** für Dark/Light Mode
- [ ] Save/Load Workflow

**Kritische Dateien:**
- `frontend/src/features/designer/WorkflowDesigner.tsx`
- `frontend/src/features/designer/Canvas.tsx`
- `frontend/src/features/designer/NodePalette.tsx`
- `frontend/src/features/designer/nodes/TriggerNode.tsx`
- `frontend/src/features/designer/nodes/ActionNode.tsx`
- `frontend/src/features/designer/nodes/HRWorksNode.tsx`
- `frontend/src/features/designer/nodes/DataTransformNode.tsx`
- `frontend/src/features/designer/nodes/ConditionNode.tsx`
- `frontend/src/features/designer/ConfigPanel.tsx`
- `frontend/src/features/designer/ContextPanel.tsx` (Tree-View, Array-Navigation)
- `frontend/src/features/designer/components/ContextInput.tsx`
- `frontend/src/features/designer/components/NodePlayButton.tsx`
- `frontend/src/features/designer/components/NodeExecutionPanel.tsx`
- `frontend/src/features/designer/edges/DeletableEdge.tsx`
- `frontend/src/features/designer/ContextMenu.tsx`
- `frontend/src/features/designer/CanvasControls.tsx`
- `frontend/src/features/designer/hooks/useAutoLayout.ts`
- `frontend/src/features/designer/hooks/useContextInput.ts`
- `frontend/src/stores/designer.store.ts` (Node Execution Logic, Context Handling)
- `frontend/src/stores/theme.store.ts`
- `frontend/src/pages/WorkflowDesignerPage.tsx` (SSE Integration)
- `frontend/src/pages/SettingsPage.tsx`

### 13. Demo-Workflow: Onboarding
- [ ] Workflow Template erstellen
- [ ] End-to-End Test

**Demo-Workflow:**
```
[Manual Trigger]
  → [HTTP: Person Details abrufen]
  → [Condition: Rolle = "Developer"?]
      Yes → [HTTP: Laptop bestellen]
      No → [HTTP: Standard-PC bestellen]
  → [End]
```

---

## Verification / Testing

1. **Backend Unit Tests:**
   - Auth Service Tests
   - Expression Engine Tests
   - Node Execution Tests

2. **Integration Tests:**
   - Workflow CRUD API
   - Webhook Signature Verification
   - Full Workflow Execution

3. **E2E Test:**
   - Login → Create Workflow → Execute → Verify Result

4. **Manual Testing:**
   - Designer UI funktioniert
   - Nodes können verbunden werden
   - Workflow speichern/laden
   - Workflow manuell triggern

---

## Umgebungsvariablen (.env)

```env
# Database
DATABASE_URL=./dev-tenants/landlord.db
NODE_ENV=development

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d

# HR WORKS OAuth2
HRWORKS_OAUTH_CLIENT_ID=xxx
HRWORKS_OAUTH_CLIENT_SECRET=xxx
HRWORKS_OAUTH_REDIRECT_URI=http://localhost:5173/oauth/callback

# HR WORKS API
HRWORKS_API_BASE_URL=https://api.hrworks.de

# Redis (BullMQ)
REDIS_HOST=localhost
REDIS_PORT=6379
```

---

## Abhängigkeiten

**Backend:**
- @nestjs/common, @nestjs/core, @nestjs/platform-express
- drizzle-orm, better-sqlite3 (dev), pg (prod)
- bullmq, ioredis
- xstate
- jsonata
- ulid
- @nestjs/jwt, @nestjs/passport

**Frontend:**
- react, react-dom, react-router-dom
- @hrworks/sui-core, @hrworks/sui-extension
- @xyflow/react
- zustand
- styled-components
- @microsoft/fetch-event-source (für SSE)

**Shared:**
- zod (Schema Validation)
- typescript

---

## Offene Punkte für spätere Phasen

- PersonTask API (Phase 2) - API noch nicht verfügbar
- Approval Builder API (Phase 3) - API noch nicht verfügbar
- Monitoring Dashboard (Phase 4)
- Template Library (Phase 4)
