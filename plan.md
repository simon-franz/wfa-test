Hier sind die Requirement-Specs, die ich aus dem Dokument für dich extrahiert und ausformuliert habe – strukturiert nach Phasen, damit du sie einem LLM übergeben kannst:

---

## Technische Entscheidungen (Finalisiert)

### Projektstruktur
```
workflow-automation/
├── backend/          # NestJS Backend
├── frontend/         # React Frontend mit SmartFace
├── shared/           # Gemeinsame Types, Utils, Schemas
└── docs/             # Dokumentation
```

### Technologie-Stack
| Bereich | Entscheidung | Begründung |
|---------|--------------|------------|
| Runtime | **Bun** | Schneller als Node.js, native TypeScript-Support |
| Backend-Framework | **NestJS** | Modulare Architektur, TypeScript-first |
| ORM | **Drizzle** | Type-safe, Multi-Dialect (SQLite/PostgreSQL), Performance |
| Datenbank | **PostgreSQL** (Prod), **SQLite** (Dev) | Schnelle lokale Entwicklung, robust in Production |
| Queue-System | **BullMQ** | Redis-basiert, robust für async Jobs |
| State-Management | **Zustand** | Einfacher als Redux, weniger Boilerplate |
| UI-Framework | **SmartFace** | HR WORKS Design-System, shadcn-ähnlich |
| Workflow-Designer | **React Flow** | Bewährt (n8n, make.com) |
| Hosting | **AWS EKS** | Kubernetes für Skalierung |
| CI/CD | Später definieren | |

### Multi-Tenant Architektur (Landlord-DB Pattern)
```
┌─────────────────────────────────────────────────────────────┐
│                      LANDLORD DB                            │
│  (PostgreSQL in Prod / SQLite in Dev)                       │
│  ┌───────────────────────────────────────────────────┐     │
│  │   tenants                                          │     │
│  │  - id, name, slug, dbUrl, status, plan            │     │
│  │  Nur Metadaten - keine User-/Business-Daten!      │     │
│  └───────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   TENANT DB 1   │  │   TENANT DB 2   │  │   TENANT DB N   │
│  - users        │  │  - users        │  │  - users        │
│  - workflows    │  │  - workflows    │  │  - workflows    │
│  - executions   │  │  - executions   │  │  - executions   │
│  - credentials  │  │  - credentials  │  │  - credentials  │
│  - approvals    │  │  - approvals    │  │  - approvals    │
│  - synced_*     │  │  - synced_*     │  │  - synced_*     │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

### Tenant-Auflösung (JWT Cookie - Single Domain)
```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│    Browser      │      │    Backend      │      │   Tenant DB     │
│                 │      │                 │      │                 │
│  Cookie:        │─────▶│  JWT Decode     │─────▶│  Queries mit    │
│  auth_token=JWT │      │  → tenant_id    │      │  tenant_id      │
│                 │      │  → user_id      │      │                 │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

**JWT Payload:**
```json
{
  "sub": "user_uuid",
  "tenant_id": "tenant_uuid",
  "email": "user@company.de",
  "role": "workflow-admin",
  "iat": 1234567890,
  "exp": 1234567890
}
```

**Vorteile:**
- **Single Domain** - kein DNS/SSL für Subdomains nötig
- Totale Datenisolation zwischen Tenants
- GDPR/Compliance-ready
- Einfaches Offboarding (`DROP DATABASE`)
- SQLite für Development, PostgreSQL für Production

### Design-Richtlinien
- **Look & Feel**: Orientierung an HR WORKS UI
- **Komponenten**: SmartFace Component Library (aus `/SmartFace-dev`)
- **Styling**: Styled-Components (wie in SmartFace verwendet)

---

## Phase 1: Foundation & MVP (Wochen 1-6)

### Authentifizierung & Autorisierung
- OAuth2 Integration mit HR WORKS
- SSO-Flow implementieren
- Rollen-basierte Zugriffskontrolle (initial nur workflow-admin)
- Session Management mit JWT Token Handling

### Daten-Synchronisation
- Organisationseinheiten-Sync: Initial Full-Sync aus HR WORKS, Delta-Updates via Webhooks, lokales Caching
- Personen-Sync: Initial Full-Sync aller Mitarbeiter, Webhook-Handler für Änderungen, Mapping HR WORKS Person → Workflow User
- Synchronisation von Vorgesetzten-Beziehungen (VG, VG von VG)

### HR WORKS Webhook Handler
**Endpoint:** `POST /webhooks/hrworks/{hrworksCustomerId}`

**Signature Verification:**
```typescript
const stringToSign = `${jobId}.${timestamp}`;
const expectedSig = crypto.createHmac('sha256', secretKey)
  .update(stringToSign).digest('base64');
```

**Payload:**
```json
{
  "event": "serverEvent",
  "resourceLocation": "https://api.hrworks.de/v2/persons/{uuid}",
  "jobId": "...",
  "action": "resourceCreated|resourceUpdated|resourceDeleted|resourceDeactivated"
}
```

**Headers:** `x-hrworks-signature`, `x-hrworks-timestamp`

### Core Workflow Engine
- Workflow Definition Model (JSON Schema)
- Workflow Instance Management
- Execution Engine (State Machine)
- Event Queue (BullMQ)
- Logging & Audit Trail

### Designer UI (Frontend)
- Canvas mit Drag & Drop
- Node Palette (Start, Action, End)
- Connection Drawing zwischen Nodes
- Node Configuration Panel
- Workflow Speichern/Laden

### Trigger Nodes (Phase 1)
- Manual Trigger: Workflow manuell starten, Input-Parameter definierbar, für Testing & Debugging
- Scheduled Trigger: Cron-basierte Ausführung, Zeitzone-Handling, einfache Intervalle (täglich, wöchentlich)

### Action Nodes (Phase 1)
- HTTP Request Node: GET/POST/PUT/DELETE zu HR WORKS API, Header Configuration, Body Template (Handlebars), Response Mapping
- Delay Node: Zeitverzögerung (Minuten, Stunden, Tage), Pause & Resume
- Condition Node: If/Else Logic, Simple Expressions (==, !=, >, <), Boolean Operations (AND, OR)

### Expression Language (JSONata + Platzhalter)

**Library:** JSONata (npm) - bewährt, wird auch von n8n verwendet

| Anwendung | Syntax | Beispiel |
|-----------|--------|----------|
| **Templates** | `{{expression}}` Platzhalter | `"Hallo {{person.firstName}}"` |
| **Conditions** | Pure JSONata | `amount > 5000 and role = "manager"` |

#### Templates (Strings mit Platzhaltern)
```
Hallo {{person.firstName}},
Ihr Antrag über {{amount}}€ wurde eingereicht.
```

```typescript
// Template Engine - Regex findet {{...}}, JSONata evaluiert
template.replace(/\{\{(.+?)\}\}/g, (match, expr) => {
  return jsonata(expr).evaluate(context);
});
```

#### Conditions (Pure JSONata)
```javascript
amount > 5000                           // Einfach
person.role = "manager" and amount > 1000  // Kombiniert (ACHTUNG: = nicht ==)
$count(approvers[status = "approved"]) >= 3  // Mit Funktionen
```

#### Wichtige JSONata Funktionen
- **Strings:** `$lowercase()`, `$uppercase()`, `$contains()`, `$replace()`
- **Numbers:** `$sum()`, `$average()`, `$round()`, `$abs()`
- **Arrays:** `$count()`, `array[filter]`, `$distinct()`, `$sort()`
- **Datum (custom):** `$now()`, `$formatDate()`, `$addDays()`, `$diffDays()`

---

## Phase 2: PersonTask & Advanced Triggers (Wochen 7-12)

### PersonTask Integration
- PersonTask Node: Builder für PersonTask API-Calls, Validierung von Task-Daten, Persistierung in HR WORKS via API
- PersonTask-ID im Workflow-Kontext speichern
- PersonTask Webhook Handler: Empfang von Task-Updates, Status-Mapping (offen, in Bearbeitung, erledigt, abgelehnt), Workflow-Fortsetzung bei Task-Completion, Retry-Handling

### PersonTask Frontend UI
- Assignee-Auswahl (Person, Rolle, VG)
- Task-Beschreibung (Template-Editor)
- Deadline-Konfiguration
- Priorität

### Event-basierte Trigger
- Person Created/Updated/Deleted: Webhook von HR WORKS, Filter nach OE/Rolle/Status, Payload-Mapping
- OE Changed: Strukturänderungen, VG-Wechsel, OE-Umbenennung
- Custom Webhooks: Generic Webhook Endpoint, Signature Verification, Custom Payload Parsing

### Erweiterte Action Nodes
- Data Transformation Node: JSON Path Expressions, Data Mapping, Aggregation Functions
- Loop Node: Iteration über Arrays, Parallel vs. Sequential, Loop Variables
- Email Node: Template Engine (Handlebars), Recipient Logic (Person, OE, VG), Attachments Support

---

## Phase 3: Genehmigungssystem (Wochen 13-20)

### Generisches Genehmigungsobjekt (Approval Builder)
- Datenmodell mit: id, workflowInstanceId, title, description, requestedBy, requestedAt, mode, approvers, currentStatus, responses, metadata
- Approval Modes: ANY (First-Response-Wins), ALL (Unanimous), MAJORITY (>50%), SEQUENCE (Kaskade)
- Approver-Struktur: personId, role (VG, VG von VG), order für Sequence

### Approval Builder Service
- Validierung der Approval-Requests
- Persistierung in HR WORKS DB
- Resolution von dynamischen Approvern (VG, VG von VG)
- Status-Berechnung je nach Mode

### Approval Modes Implementierung
- ANY: Erster Response → Workflow fortsetzen, andere stornieren
- ALL: Alle müssen genehmigen, bei Ablehnung sofort abgebrochen
- MAJORITY: >50% Threshold, Live-Berechnung, Auto-Cancel bei Entscheidung
- SEQUENCE: Order-basiert, nächster erst nach Genehmigung, bei Ablehnung Kette abbrechen

### Approval Node Frontend
- Approval-Titel & Beschreibung (Template)
- Mode-Auswahl (ANY/ALL/MAJORITY/SEQUENCE)
- Approver Configuration: Direkte Person, Rollen-basiert, Dynamisch (VG von requestingPerson)
- Deadline Configuration
- Eskalation Rules

### Approver UI (Smartface)
- Pending Approvals List
- Approval Detail View
- Approve/Reject mit Kommentar
- History & Audit Trail

### Advanced Approval Features
- Dynamic Approver Resolution (VG, VG von VG)
- Delegation & Substitution (Urlaubsvertretung, Proxy-Approvals)
- Eskalation: Timeout-basiert, Eskalation an nächsthöhere Ebene, Reminder-Emails

---

## Phase 4: Enterprise Features & Scale (Wochen 21-28)

### Monitoring & Observability
- Workflow Analytics Dashboard: Active Workflows, Execution Times, Error Rates, Bottleneck Detection, SLA Monitoring
- Audit Trail & Compliance: Complete Execution History, Data Change Logs, Export (PDF, CSV), DSGVO-konforme Datenhaltung
- Error Handling: Dead Letter Queue, Retry Strategies (exponential backoff), Manual Intervention, Rollback, Alert System

### Advanced Node Types
- Sub-Workflow Node: Workflow als wiederverwendbare Komponente, Parameter Passing, Return Values, Versioning
- Parallel Execution Node: Fork-Join Pattern, Parallel Branches, Synchronization Point, Timeout Handling
- Database Node: Direct DB Queries (PostgreSQL), Insert/Update/Delete, Transaction Support, Query Builder UI
- AI/LLM Node: OpenAI/Azure Integration, Prompt Templates, Response Parsing, Content Moderation

### Workflow-Templates & Marketplace
- Template Library: Vorkonfigurierte Standard-Workflows, Kategorien, One-Click Import, Customization
- Template Creator: Workflow als Template speichern, Parametrisierung, Documentation, Sharing
- Workflow Marketplace (Optional): Community Workflows, Rating & Reviews, Version Management

### Advanced Trigger & Scheduling
- Composite Triggers: Multiple Conditions (AND/OR), Time + Event Kombination, Debouncing & Throttling
- Smart Scheduling: Business Hours, Holiday Calendar, Timezone Support, Dynamic Scheduling

### Variablen & Context Management
- Workflow Variables: Global, Node-lokal, Environment, Secrets (verschlüsselt)
- Context Passing: Output/Input zwischen Nodes, JSON Path, Expression Language, Type Safety

### Permissions & Multi-Tenancy
- Granulare Berechtigungen: Workflow-Ownership, Edit/View/Execute Rights, OE-basierte Zugriffskontrolle
- Multi-Mandanten-Fähigkeit: Tenant-Isolation, White-Labeling, Tenant-spezifische Konfiguration

### Performance & Scalability
- Workflow Caching, Database Indexing, Query Optimization, Connection Pooling
- Horizontal Scaling: Stateless Backend, Load Balancing, Queue-based Architecture, Redis für Shared State
- Rate Limiting: API Call Limits, Workflow Execution Limits, Per-User/Per-OE Quotas

### Integration Ecosystem
- Webhooks (Outbound): Custom Webhook Nodes, Signature Signing, Retry Logic, Payload Templates
- Public API: Workflow-Triggering, Status Queries, Webhook Registration, API Keys & OAuth2
- Pre-built Connectors: Email (SMTP, Exchange, Gmail), Slack/Teams, SharePoint/OneDrive, SAP/DATEV (optional)

### Testing & Quality Assurance
- Workflow Testing: Test Mode (Dry-Run), Mock Data Injection, Step-by-Step Debugging, Unit Tests
- Versioning: Workflow Versions, Rollback, A/B Testing, Canary Deployments

---

Soll ich das als herunterladbare Datei (Markdown, JSON oder YAML) für dich aufbereiten?