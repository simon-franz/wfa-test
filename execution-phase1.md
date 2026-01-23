# HR WORKS Workflow Automation - Phase 1 Execution Checklist

## Ziel
Full-Stack MVP: Backend + Frontend + OAuth2 + Designer + Demo-Workflow

## Tech-Stack
| Bereich | Technologie |
|---------|-------------|
| Runtime | Bun |
| Backend | NestJS |
| ORM | Drizzle (SQLite dev / PostgreSQL prod) |
| Queue | BullMQ + Redis |
| State Machine | XState |
| Frontend | React + Vite |
| UI Library | @hrworks/sui-core + @hrworks/sui-extension |
| Workflow Editor | @xyflow/react |
| State Mgmt | Zustand |
| IDs | ULID |
| Echtzeit | Server-Sent Events (SSE) |

---

## 1. Projekt-Setup

- [ ] Monorepo mit Bun Workspaces initialisieren
- [ ] Backend (NestJS) Grundgerüst erstellen
- [ ] Frontend (React + Vite) Grundgerüst erstellen
- [ ] Shared Package für Types anlegen
- [ ] ESLint, Prettier, TypeScript Config einrichten
- [ ] .env.example mit allen Variablen anlegen

**Kritische Dateien:**
- `package.json` (Root mit workspaces)
- `backend/package.json`
- `frontend/package.json`
- `shared/package.json`
- `tsconfig.json`

---

## 2. Database Layer (Drizzle)

- [ ] Landlord Schema erstellen (tenants Tabelle)
- [ ] Tenant Schema erstellen (users, workflows, executions, credentials, synced_*)
- [ ] Workflow Versions Schema für Historisierung
- [ ] Tenant-Manager mit Connection Pool implementieren
- [ ] SQLite für Development konfigurieren
- [ ] Migrations Setup mit Drizzle Kit

**Kritische Dateien:**
- `shared/src/db/landlord-schema.ts`
- `shared/src/db/tenant-schema.ts`
- `backend/src/db/tenant-manager.ts`
- `backend/src/db/landlord.ts`

---

## 3. Authentication (OAuth2 + JWT)

- [ ] HR WORKS OAuth2 Integration (Client ID, Secret, Scopes)
- [ ] JWT Token Generation mit tenant_id, user_id, role
- [ ] JWT Validation Service
- [ ] HttpOnly Cookie Setup (auth_token)
- [ ] Auth Guard implementieren
- [ ] Tenant/User Decorators erstellen
- [ ] Login/Logout Endpoints

**JWT Payload Struktur:**
```json
{
  "sub": "user_uuid",
  "tenant_id": "tenant_uuid",
  "email": "user@company.de",
  "role": "workflow-admin"
}
```

**Kritische Dateien:**
- `backend/src/auth/auth.module.ts`
- `backend/src/auth/auth.service.ts`
- `backend/src/auth/jwt-auth.guard.ts`
- `backend/src/auth/oauth.controller.ts`
- `backend/src/common/decorators/tenant.decorator.ts`

---

## 4. HR WORKS API Client

- [ ] Authentication Service (Access Key + Secret → Bearer Token, 15 min Gültigkeit)
- [ ] Automatischer Token-Refresh bei Ablauf
- [ ] Persons API Wrapper
- [ ] Organization Units API Wrapper
- [ ] Webhooks API Wrapper
- [ ] Async Job Handling (POST/PUT/DELETE → jobId → Polling)
- [ ] Dictionary Response Flattening
- [ ] Error Handling & Retries (max 3x)

**Token-Handling:**
- Response-Feld ist `token` (nicht `access_token`)
- 15 Minuten Gültigkeit
- Sichere Speicherung in Tenant-Konfiguration

**Kritische Dateien:**
- `backend/src/hrworks/hrworks.module.ts`
- `backend/src/hrworks/hrworks-api.service.ts`
- `backend/src/hrworks/hrworks-auth.service.ts`

---

## 5. Sync Service

- [ ] Initial Full-Sync (alle Persons + OEs)
- [ ] Webhook Registration bei HR WORKS
- [ ] Webhook Handler mit Signature Verification
- [ ] Delta-Updates via Webhooks
- [ ] Lokales Caching in synced_persons/synced_organization_units

**Webhook Signature:**
```typescript
const stringToSign = `${jobId}.${timestamp}`;
const signature = crypto.createHmac('sha256', secretKey)
  .update(stringToSign).digest('base64');
```

**Kritische Dateien:**
- `backend/src/sync/sync.module.ts`
- `backend/src/sync/sync.service.ts`
- `backend/src/webhooks/hrworks-webhook.controller.ts`
- `backend/src/webhooks/hrworks-webhook.service.ts`

---

## 6. Workflow Engine

- [ ] Workflow Definition Model (JSON Schema mit nodes + edges)
- [ ] XState Machine Generator aus Workflow-Definition
- [ ] BullMQ Queue Setup für async Execution
- [ ] Execution Worker implementieren
- [ ] State Persistence in DB (überlebt App-Neustarts)
- [ ] ULID für zeitlich sortierbare IDs
- [ ] Expression Engine (JSONata)
- [ ] Custom Datum-Funktionen ($now, $formatDate, $addDays, $diffDays)
- [ ] Template Engine ({{expression}} Platzhalter)
- [ ] getValueByPath() für Pfad-Auflösung (sucht nach Node-ID dann Node-Label)

**Workflow Context Struktur:**
```json
{
  "input": { },
  "nodes": {
    "trigger1": { "output": { } },
    "httpRequest1": { "output": { } }
  },
  "person": { },
  "$workflow": { "id": "", "name": "" }
}
```

**Kritische Dateien:**
- `backend/src/workflow/workflow.module.ts`
- `backend/src/workflow/engine/workflow-engine.service.ts`
- `backend/src/workflow/engine/xstate-generator.ts`
- `backend/src/workflow/execution/execution.worker.ts`
- `backend/src/workflow/execution/execution.service.ts`
- `backend/src/workflow/expression/expression.service.ts`
- `backend/src/workflow/workflow.service.ts`

---

## 7. Node Types (Phase 1)

### Trigger Nodes
- [ ] **Manual Trigger**: Workflow manuell starten, Input-Parameter definierbar
- [ ] **Scheduled Trigger**: Cron-basiert, Zeitzone-Handling

### Action Nodes
- [ ] **HTTP Request Node**: GET/POST/PUT/DELETE, Header Config, Body Template
- [ ] **HR WORKS Node**:
  - Dropdown für Endpoint-Auswahl (Persons, OEs, Absences)
  - Dynamisches Parameter-Formular
  - Async Job Handling (Node bleibt "running" bis Job fertig)
  - Output = `data` Objekt aus Job-Response (ohne Wrapper)
- [ ] **Data Transformation Node**:
  - Operationen: count, filter, map, reduce, sort, distinct
  - Result Wrapping für Context-Nutzung
- [ ] **Condition Node (Multi-Condition Switch)**:
  - Variable Anzahl Bedingungen
  - First-Match Logik (von oben nach unten)
  - Template-Resolution in Expressions (`{{NodeName.field}}`)
  - Default-Pfad optional
  - Eigener Output-Handle pro Bedingung
  - Visual Feedback: Gematchte Bedingung grün hervorgehoben
- [ ] **Delay Node**: Minuten/Stunden/Tage, persistente Delays mit BullMQ

- [ ] **Node Registry** für dynamische Registrierung aller Node-Typen

**Kritische Dateien:**
- `backend/src/workflow/nodes/base-node.ts`
- `backend/src/workflow/nodes/trigger/manual-trigger.node.ts`
- `backend/src/workflow/nodes/trigger/scheduled-trigger.node.ts`
- `backend/src/workflow/nodes/action/http-request.node.ts`
- `backend/src/workflow/nodes/action/hrworks.node.ts`
- `backend/src/workflow/nodes/action/data-transform.node.ts`
- `backend/src/workflow/nodes/action/condition.node.ts`
- `backend/src/workflow/nodes/action/delay.node.ts`
- `backend/src/workflow/nodes/node-registry.ts`

---

## 8. REST API

- [ ] Workflows CRUD (`/api/workflows`)
- [ ] Workflow Executions (`/api/executions`)
- [ ] SSE Endpoint für Live-Updates (`/api/executions/:id/stream`)
- [ ] Node Testing Endpoint (`POST /api/workflows/:id/test-node`)
- [ ] Settings Endpoints (`GET/PUT /api/settings`)
- [ ] Synced Persons/OEs Endpoints
- [ ] Workflow Versions Endpoints (Historie abrufen, Version wiederherstellen)
- [ ] Structured JSON Logging für alle Requests

**Kritische Dateien:**
- `backend/src/workflow/workflow.controller.ts`
- `backend/src/workflow/execution/execution.controller.ts`
- `backend/src/sync/sync.controller.ts`
- `backend/src/settings/settings.controller.ts`

---

## 9. Frontend - Grundgerüst

- [ ] SmartFace Integration (@hrworks/sui-core, @hrworks/sui-extension)
- [ ] React Router Setup
- [ ] Zustand Store Setup
- [ ] API Client mit Authorization Header
- [ ] Auth State Management
- [ ] **Theme Store** für Dark/Light Mode mit Persistierung
- [ ] Error Boundary
- [ ] Loading States
- [ ] **Notification Center** (Toast für Fehler/Erfolg)
- [ ] Layout mit Navigation

**Kritische Dateien:**
- `frontend/src/main.tsx`
- `frontend/src/App.tsx`
- `frontend/src/api/client.ts`
- `frontend/src/stores/auth.store.ts`
- `frontend/src/stores/workflow.store.ts`
- `frontend/src/stores/theme.store.ts`
- `frontend/src/components/Layout.tsx`

---

## 10. Frontend - Login

- [ ] Login Page mit HR WORKS OAuth Redirect
- [ ] OAuth2 Callback Handler
- [ ] Protected Routes (Auth Guard)
- [ ] Logout Funktion

**Kritische Dateien:**
- `frontend/src/pages/LoginPage.tsx`
- `frontend/src/pages/OAuthCallbackPage.tsx`
- `frontend/src/components/ProtectedRoute.tsx`

---

## 11. Frontend - Workflow List

- [ ] **Tabellen-Darstellung** (nicht Karten)
  - Spalten: Name, Beschreibung, Status (Badge), Aktualisiert, Aktionen
  - Status-Badges: Aktiv (grün), Inaktiv (gelb), Entwurf (grau)
- [ ] Action-Buttons: Historie, Ausführen, Löschen
- [ ] Klick auf Zeile → Workflow-Designer öffnen
- [ ] Create Workflow Modal
- [ ] Validierung: Nur ein Trigger pro Workflow

**Kritische Dateien:**
- `frontend/src/pages/WorkflowListPage.tsx`
- `frontend/src/components/WorkflowTable.tsx`
- `frontend/src/components/CreateWorkflowModal.tsx`

---

## 12. Frontend - Workflow Designer

### Canvas & Editor
- [ ] React Flow Canvas mit Drag & Drop
- [ ] **Horizontales Layout** (links nach rechts, immer!)
- [ ] Custom Node Types (Trigger, Action, Condition, HR WORKS, DataTransform)
- [ ] **Node Palette/Library** (Sidebar mit draggable Nodes)
- [ ] Edge Drawing (Bezier-Kurven)
- [ ] **Deletable Edges** (Hover-Icon zum Löschen)
- [ ] **Datenfluss-Animation** auf Edges
- [ ] Node Selection & Multi-Select

### Canvas Controls
- [ ] Zoom-Steuerung (-, %, +)
- [ ] Undo/Redo-Buttons
- [ ] Vollbild-Toggle
- [ ] **Auto-Layout-Funktion**
- [ ] Hilfe-Button
- [ ] Grüner "+" FAB-Button

### Node Configuration
- [ ] **Config Panel** (Sidebar rechts)
- [ ] **Context-Button** in Input-Feldern → öffnet Context Panel
- [ ] **Context Panel** mit:
  - Expandable Tree-View für Node Outputs
  - Array-Navigation ([0], [1], etc.)
  - Wert-Anzeige für primitive Typen
  - Klickbar auf allen Ebenen zum Einfügen
  - Syntax-Highlighting für JSON
  - Filterfunktion
- [ ] **Context Menu** (Rechtsklick): Duplizieren, Löschen, Konfigurieren, Testen
- [ ] Keyboard-Shortcuts (Delete-Taste)

### Node-by-Node Testing
- [ ] **Play-Button** an jedem Node
- [ ] Sequentielle Abhängigkeit (Node nur ausführbar wenn Vorgänger fertig)
- [ ] **Output Caching** (Ergebnis am Node gespeichert)
- [ ] Visuelles Status-Feedback:
  - Grau: Nicht ausführbar
  - Grün: Bereit
  - Blau/Spinner: Läuft
  - Grün mit Haken: Erfolgreich
  - Rot: Fehler
- [ ] **Output-Preview** (expandable JSON direkt am Node)
- [ ] **"Run All"-Button** (alle Nodes in Reihenfolge)
- [ ] Cache Invalidation bei Config-Änderungen

### Echtzeit-Updates
- [ ] **SSE Integration** (`@microsoft/fetch-event-source`)
- [ ] Node-Status-Updates in Echtzeit (running → success/error)
- [ ] Automatische Reconnect-Logik

### Toolbar
- [ ] Workflow-Name (editierbar)
- [ ] Versionsnummer
- [ ] Aktivieren/Deaktivieren Toggle
- [ ] Historie-Button
- [ ] Ausführen-Button (Play-Icon)
- [ ] Speichern-Button

### Speichern & Versionierung
- [ ] Workflow speichern mit Versionierung
- [ ] Workflow laden
- [ ] **Unsaved Changes Indicator**

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
- `frontend/src/features/designer/ContextPanel.tsx`
- `frontend/src/features/designer/components/ContextInput.tsx`
- `frontend/src/features/designer/components/NodePlayButton.tsx`
- `frontend/src/features/designer/edges/DeletableEdge.tsx`
- `frontend/src/features/designer/ContextMenu.tsx`
- `frontend/src/features/designer/CanvasControls.tsx`
- `frontend/src/features/designer/hooks/useAutoLayout.ts`
- `frontend/src/stores/designer.store.ts`
- `frontend/src/pages/WorkflowDesignerPage.tsx`

---

## 13. Frontend - Ausführungshistorie

- [ ] **Split-Layout**: Liste links (350px), Details rechts
- [ ] **Sidebar (Ausführungsliste)**:
  - Zurück-Button zum Designer
  - Nummerierte Einträge (#1, #2, #3)
  - Datum/Zeit, Status-Badge
  - Execution-ID (monospace)
- [ ] **Detail-Panel**:
  - Header: Status, Start-/Endzeit
  - Node-Liste (aufklappbar)
  - Node-Header: Icon, Name (lesbar, nicht ID!), Startzeit, Status
  - Node-Content: Output als JSON-Viewer
- [ ] **JSON-Viewer**:
  - Syntax-Highlighting
  - Ein-/ausklappbare Objekte/Arrays
  - Item/Key-Zähler bei eingeklappten Elementen
- [ ] **Node-Namen-Mapping** (condition-123 → "Bedingung")
- [ ] **Node-Icons** (Trigger, Schedule, Condition, HR WORKS, etc.)

**Kritische Dateien:**
- `frontend/src/pages/ExecutionHistoryPage.tsx`
- `frontend/src/components/ExecutionList.tsx`
- `frontend/src/components/ExecutionDetail.tsx`
- `frontend/src/components/JsonViewer.tsx`

---

## 14. Frontend - Settings

- [ ] Settings Page mit Navigation-Link
- [ ] HR WORKS API-Credentials Formular (apiKey, apiSecret, baseUrl)
- [ ] Sync-Einstellungen (Webhook vs. Polling)
- [ ] Test-Connection-Button
- [ ] Tenant-Informationen anzeigen

**Kritische Dateien:**
- `frontend/src/pages/SettingsPage.tsx`

---

## 15. Demo-Workflow: Onboarding

- [ ] Workflow Template erstellen
- [ ] End-to-End Test durchführen
- [ ] Dokumentation erstellen

**Demo-Workflow Struktur:**
```
[Manual Trigger]
  → [HTTP: Person Details abrufen]
  → [Condition: Rolle = "Developer"?]
      Yes → [HTTP: Laptop bestellen]
      No → [HTTP: Standard-PC bestellen]
  → [End]
```

---

## 16. Verification & Testing

### Backend Tests
- [ ] Auth Service Unit Tests
- [ ] Expression Engine Unit Tests
- [ ] Node Execution Unit Tests
- [ ] Webhook Signature Verification Test

### Integration Tests
- [ ] Workflow CRUD API
- [ ] Full Workflow Execution
- [ ] SSE Stream Test

### Manual E2E Testing
- [ ] Login → OAuth Flow
- [ ] Workflow erstellen
- [ ] Nodes hinzufügen & verbinden
- [ ] Node-by-Node Testing (Play-Button)
- [ ] Workflow speichern
- [ ] Workflow ausführen
- [ ] Ausführungshistorie prüfen

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
- @microsoft/fetch-event-source

**Shared:**
- zod
- typescript

---

## Offene Punkte (spätere Phasen)

- PersonTask API (Phase 2)
- Approval Builder API (Phase 3)
- Monitoring Dashboard (Phase 4)
- Template Library (Phase 4)
