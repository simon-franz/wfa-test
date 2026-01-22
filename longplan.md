HR WORKS Workflow Automation - 4-Phasen Projektplan

Executive Summary

Dieses Dokument beschreibt den 4-Phasen-Rollout für die HR WORKS Workflow Automation App. Ziel ist es, schnell eine funktionsfähige Basis (MVP) zu liefern und dann iterativ Features aufzubauen. Die Phasen folgen dem Prinzip "Vibe Engineering" - schnelle Ergebnisse mit direktem Mehrwert für Anwender.

Technologie-Stack (Finalisiert)

Projektstruktur (Monorepo)
```
workflow-automation/
├── backend/          # NestJS Backend
├── frontend/         # React Frontend mit SmartFace
├── shared/           # Gemeinsame Types, Utils, Schemas
├── tools/            # Build-Tools, Generatoren
│   └── generators/
│       └── api-generator/    # OpenAPI Client Generator
└── docs/             # Dokumentation
    └── plan-hrworks-integration.md  # HR WORKS API Generator Setup (aus Root übernehmen)
```

Backend
Runtime: **Bun** (schneller als Node.js, native TypeScript-Support)
Framework: NestJS
ORM: **Drizzle** (Type-safe, Multi-Dialect Support, bessere Performance als Prisma)
Datenbank: PostgreSQL (Produktion), SQLite (lokale Entwicklung)
Queue System: BullMQ (Redis-basiert, für asynchrone Workflow-Ausführung)
API: REST + Webhooks
Authentication: OAuth2 (SSO mit HR WORKS - siehe hrworks-api.yml /v2/authentication)
Echtzeit-Updates: **Server-Sent Events (SSE)** für Live-Workflow-Execution-Updates (Library: `@microsoft/fetch-event-source` im Frontend)

Multi-Tenant Architektur (Landlord-DB Pattern)
```
┌─────────────────────────────────────────────────────────────┐
│                      LANDLORD DB                            │
│  (PostgreSQL in Prod / SQLite in Dev)                       │
│  - tenants (id, name, slug, dbUrl, status, plan)           │
│  Nur Metadaten - keine User-/Business-Daten!               │
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
│  - person_tasks │  │  - person_tasks │  │  - person_tasks │
│  - synced_*     │  │  - synced_*     │  │  - synced_*     │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

Tenant-Auflösung (JWT Cookie - Single Domain)
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

**Auth Flow:**
1. User loggt sich ein (via HR WORKS SSO oder lokaler Login)
2. Backend erstellt JWT mit `tenant_id` und `user_id`
3. JWT wird als HttpOnly Cookie gesetzt (`auth_token`)
4. Bei jedem Request: JWT aus Cookie dekodieren → `tenant_id` extrahieren → richtige Tenant-DB verwenden

Vorteile des Landlord-DB Patterns + JWT:
- **Single Domain** - kein DNS/SSL für Subdomains nötig
- **Totale Datenisolation** - unmöglich, dass ein Tenant Daten eines anderen sieht
- **GDPR/Compliance-ready** - strikte Datentrennung out-of-the-box
- **Einfaches Offboarding** - `DROP DATABASE` und fertig
- **Stateless Auth** - JWT enthält alle nötigen Infos

Development vs Production:
- **Development**: SQLite-Dateien pro Tenant (`./dev-tenants/tenant_{id}.db`)
- **Production**: Separate PostgreSQL-Datenbanken (1 DB pro Tenant, alle auf einem PostgreSQL-Server)

**AWS Region:** `eu-west-1` (Ireland) - dort ist HR WORKS gehostet

**Data Retention:**
| Datentyp | Aufbewahrung |
|----------|--------------|
| Workflow Execution Logs | **90 Tage** |
| Audit Trail | 90 Tage |
| Workflow Definitions | Unbegrenzt (bis Löschung) |
| Synced Persons/OEs | Bis Tenant-Löschung |

**Tenant-Provisioning (via API):**

```
┌─────────────┐     POST /api/tenants           ┌─────────────────────┐
│  HR WORKS   │ ────────────────────────────────▶│  Workflow App       │
│             │  {                               │                     │
│  Erstellt   │    "name": "Acme Corp",          │  1. Tenant in       │
│  API-Key    │    "apiKey": "...",              │     Landlord-DB     │
│  Pair       │    "apiSecret": "...",           │  2. Neue Tenant-DB  │
│             │    "hrworksCustomerId": "123"    │  3. Initial Sync    │
└─────────────┘  }                               │     (Persons, OEs)  │
                                                 └─────────────────────┘
```

**Ablauf Tenant-Erstellung:**
1. HR WORKS erstellt neues API-Key-Pair für den Kunden
2. HR WORKS ruft `POST /api/tenants` der Workflow App auf
3. Workflow App speichert Tenant-Metadaten in Landlord-DB (inkl. API-Key für Webhook-Validierung)
4. Workflow App erstellt neue PostgreSQL-Datenbank für Tenant
5. Workflow App führt Initial Sync durch (alle Persons + OEs laden)
6. Workflow App registriert benötigte Webhooks bei HR WORKS

**PostgreSQL Setup (Production):**
- Ein PostgreSQL-Server (AWS RDS)
- Jeder Tenant = eigene Datenbank (`tenant_{id}`)
- Backup: AWS DB Snapshots (automatisiert)

**Connection Pooling (Application-Level):**
```typescript
// Pro Tenant: Lazy-loaded Connection Pool
const poolConfig = {
  max: 5,           // Max 5 Connections pro Tenant
  idleTimeoutMs: 30000,  // Idle Connections nach 30s schließen
};

// Bei 100 Tenants = max 500 Connections
// Pools werden erst erstellt wenn Tenant aktiv wird
```

→ Später bei 500+ Tenants: Migration zu PgBouncer evaluieren

Frontend
Framework: React mit SmartFace UI Library (npm Package)
Workflow Designer: React Flow (@xyflow/react)
State Management: **Zustand** (einfacher als Redux, weniger Boilerplate)
UI Components: SmartFace Component Library
Styling: Styled-Components (wie in SmartFace verwendet)
**Authentication**: Alle API-Requests zum Backend müssen Authorization-Header mit JWT-Token enthalten (`Authorization: Bearer <token>`)
**Echtzeit-Updates**: `@microsoft/fetch-event-source` für SSE-basierte Live-Updates während Workflow-Ausführung

**SmartFace WorkflowGraph Analyse:**

SmartFace enthält bereits eine `WorkflowGraph` Komponente (`@hrworks/sui-extension`):
- Basiert auf `@xyflow/react` (React Flow v12+)
- `RawNode` - generischer Node für beliebigen Content
- Automatisches Layout via `useWorkflowLayout`
- HR WORKS Styling/Farben

⚠️ **Aber:** Die Komponente ist **Read-Only** (für Visualisierung):
```typescript
nodesConnectable={false}
nodesDraggable={false}
```

**Strategie für Workflow Designer:**
```
┌─────────────────────────────────────────────────────────────┐
│  SmartFace (npm Package)                                    │
│  ├── UI Components (Button, Input, Modal, etc.)            │
│  ├── Styling (Farben, Themes)                              │
│  └── WorkflowGraph (Read-Only) → als Inspiration           │
└─────────────────────────────────────────────────────────────┘
                              +
┌─────────────────────────────────────────────────────────────┐
│  Custom Workflow Editor (neu bauen)                         │
│  ├── @xyflow/react direkt verwenden                        │
│  ├── nodesDraggable={true}, nodesConnectable={true}        │
│  ├── Custom Node Types:                                     │
│  │   ├── TriggerNode (Manual, Scheduled, Webhook)          │
│  │   ├── ActionNode (HTTP, HR WORKS, Delay, Email)         │
│  │   ├── ConditionNode (If/Else)                           │
│  │   ├── ApprovalNode                                       │
│  │   └── PersonTaskNode                                     │
│  ├── Node Configuration Panel                               │
│  └── Zustand Store für Editor State                        │
└─────────────────────────────────────────────────────────────┘
```

**React Flow Konfiguration (wichtige Constraints):**
```typescript
// Wichtige Editor-Einstellungen
const editorConfig = {
  // Layout
  direction: 'LR',  // Immer Links-nach-Rechts!

  // Edge-Typ: Orthogonal (Step-Edge)
  defaultEdgeOptions: {
    type: 'smoothstep',  // Rechteckige Linien, keine Kurven
    animated: true,      // Animation für Datenfluss-Visualisierung
    style: { strokeWidth: 2 },
  },

  // Validierung: Nur ein Trigger pro Workflow
  onConnect: (connection) => {
    const triggerNodes = nodes.filter(n => n.type === 'trigger');
    if (triggerNodes.length > 1) {
      throw new Error('Nur ein Trigger-Knoten pro Workflow erlaubt!');
    }
  },
};

// Custom Edge mit Lösch-Button bei Hover
const CustomEdge = ({ id, ...props }) => {
  const [showDelete, setShowDelete] = useState(false);
  return (
    <g onMouseEnter={() => setShowDelete(true)}
       onMouseLeave={() => setShowDelete(false)}>
      <SmoothStepEdge {...props} />
      {showDelete && (
        <DeleteButton onClick={() => deleteEdge(id)} />
      )}
    </g>
  );
};

// Multi-Output Nodes: Handles auf dem Rahmen
const ConditionNode = () => (
  <div className="condition-node">
    <Handle type="target" position={Position.Left} />
    {/* Outputs auf dem rechten Rahmen */}
    <Handle type="source" position={Position.Right} id="yes"
            style={{ top: '30%' }} />
    <Handle type="source" position={Position.Right} id="no"
            style={{ top: '70%' }} />
  </div>
);
```

**Node Library (Drag & Drop Sidebar):**
```typescript
// Sidebar mit draggable Node-Typen
const NodeLibrary = () => (
  <aside className="node-library">
    <h3>Trigger</h3>
    <DraggableNode type="manual-trigger" label="Manual" />
    <DraggableNode type="scheduled-trigger" label="Scheduled" />

    <h3>Actions</h3>
    <DraggableNode type="hrworks" label="HR WORKS" />
    <DraggableNode type="http-request" label="HTTP Request" />
    <DraggableNode type="delay" label="Delay" />
    <DraggableNode type="email" label="Email" />

    <h3>Logic</h3>
    <DraggableNode type="condition" label="Condition" />
    <DraggableNode type="switch" label="Switch" />
  </aside>
);

// onDrop Handler für Canvas
const onDrop = (event) => {
  const type = event.dataTransfer.getData('nodeType');
  const position = screenToFlowPosition(event);
  addNode({ type, position });
};
```

Hosting & Infrastruktur
Cloud: **AWS EKS** (Kubernetes) - wird extern verwaltet
CI/CD: **GitHub Actions**

**Deployment Stages:**
```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌────────────┐
│   dev   │───▶│ testing │───▶│  demo   │───▶│ production │
└─────────┘    └─────────┘    └─────────┘    └────────────┘
```

| Stage | Zweck |
|-------|-------|
| **dev** | Entwicklung, Feature-Branches |
| **testing** | QA, automatisierte Tests |
| **demo** | Kundenvorführungen, Sales |
| **production** | Live-Betrieb |

**DB-Migrationen (Zero-Downtime Ready):**

Abwärtskompatible Migration-Strategie:

```
Phase 1: Neues Feld hinzufügen (nullable)
─────────────────────────────────────────
ALTER TABLE users ADD COLUMN new_field TEXT;
-- Code ignoriert new_field noch

Phase 2: Code deployen (dual-write)
─────────────────────────────────────────
-- Code schreibt in old_field UND new_field
-- Code liest noch von old_field

Phase 3: Daten migrieren
─────────────────────────────────────────
UPDATE users SET new_field = old_field WHERE new_field IS NULL;

Phase 4: Code deployen (read from new)
─────────────────────────────────────────
-- Code liest jetzt von new_field
-- Code schreibt noch in beide

Phase 5: Alte Spalte entfernen (später)
─────────────────────────────────────────
ALTER TABLE users DROP COLUMN old_field;
```

**Drizzle Migration Workflow:**
```typescript
// migrations/0001_add_user_status.ts
import { sql } from 'drizzle-orm';

export async function up(db) {
  // Phase 1: Neues Feld hinzufügen (nullable, mit Default)
  await db.execute(sql`
    ALTER TABLE users
    ADD COLUMN status TEXT DEFAULT 'active'
  `);
}

export async function down(db) {
  await db.execute(sql`
    ALTER TABLE users DROP COLUMN status
  `);
}
```

**GitHub Actions Workflow (Beispiel):**
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun test
      - run: bun run lint
      - run: bun run typecheck

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}

  deploy-dev:
    if: github.ref == 'refs/heads/develop'
    needs: build
    environment: dev
    # ... kubectl apply / helm upgrade

  deploy-production:
    if: github.ref == 'refs/heads/main'
    needs: build
    environment: production
    # ... kubectl apply / helm upgrade
```

**Redis / BullMQ Setup:**

| Aspekt | Entscheidung |
|--------|--------------|
| Service | **AWS ElastiCache** (Managed Redis) |
| Modus | **Cluster Mode mit Multi-AZ** |
| Tenants | **Shared Redis** mit Key-Prefixes |
| Persistence | Automatische Backups + Replikation |

```
┌─────────────────────────────────────────────────────────────┐
│                  AWS ElastiCache Cluster                    │
│                                                             │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐   │
│   │  Primary    │    │  Primary    │    │  Primary    │   │
│   │  (Shard 1)  │    │  (Shard 2)  │    │  (Shard 3)  │   │
│   └──────┬──────┘    └──────┬──────┘    └──────┬──────┘   │
│          │                  │                  │           │
│   ┌──────▼──────┐    ┌──────▼──────┐    ┌──────▼──────┐   │
│   │  Replica    │    │  Replica    │    │  Replica    │   │
│   │  (AZ 2)     │    │  (AZ 2)     │    │  (AZ 2)     │   │
│   └─────────────┘    └─────────────┘    └─────────────┘   │
│                                                             │
│   ✅ Automatic Failover                                     │
│   ✅ Multi-AZ (kein Single Point of Failure)               │
│   ✅ Automatic Backups (Snapshots)                         │
└─────────────────────────────────────────────────────────────┘
```

**Key-Prefix Schema (Multi-Tenant):**
```
tenant:{tenantId}:workflow:queue      # Workflow Execution Queue
tenant:{tenantId}:workflow:delayed    # Delayed/Scheduled Jobs
tenant:{tenantId}:workflow:completed  # Completed Jobs (für History)
tenant:{tenantId}:webhook:pending     # Pending Webhook Deliveries
```

**BullMQ Konfiguration:**
```typescript
import { Queue, Worker } from 'bullmq';

const connection = {
  host: process.env.REDIS_HOST,  // ElastiCache Endpoint
  port: 6379,
  tls: {},  // ElastiCache erfordert TLS
};

// Queue pro Tenant (dynamisch)
function getWorkflowQueue(tenantId: string) {
  return new Queue(`tenant:${tenantId}:workflow`, { connection });
}

// Worker für alle Tenants (shared)
const worker = new Worker(
  'tenant:*:workflow',  // Pattern matching
  async (job) => {
    const tenantId = job.name.split(':')[1];
    // Process workflow...
  },
  { connection }
);
```

**Secrets Management:**

| Ebene | Lösung |
|-------|--------|
| Datenbank | **AWS RDS Encryption at Rest** (automatisch verschlüsselt) |
| Besonders sensible Daten | **AWS KMS** für zusätzliche Verschlüsselung |
| Key Management | Kein Key-per-Tenant nötig (DB-Encryption reicht) |

```typescript
// Für besonders sensible Daten (z.B. OAuth Tokens)
import { KMSClient, EncryptCommand, DecryptCommand } from '@aws-sdk/client-kms';

const kms = new KMSClient({ region: 'eu-central-1' });

async function encryptSecret(plaintext: string): Promise<string> {
  const result = await kms.send(new EncryptCommand({
    KeyId: process.env.KMS_KEY_ID,
    Plaintext: Buffer.from(plaintext),
  }));
  return Buffer.from(result.CiphertextBlob!).toString('base64');
}

async function decryptSecret(ciphertext: string): Promise<string> {
  const result = await kms.send(new DecryptCommand({
    CiphertextBlob: Buffer.from(ciphertext, 'base64'),
  }));
  return Buffer.from(result.Plaintext!).toString('utf-8');
}
```

Design-Richtlinien
- Look & Feel orientiert sich an HR WORKS UI
- SmartFace Komponenten verwenden wo möglich

Integrationen

HR WORKS API: REST API v2.10 (siehe hrworks-api.yml)

**Auth-Methoden (zwei getrennte Flows):**

| Zweck | Methode | Details |
|-------|---------|---------|
| **User-Login** | OAuth2 (Admin Consent) | Provider existiert bei HR WORKS. Wir erhalten `client_id`, `client_secret`, `scopes`. Admin genehmigt einmalig. |
| **API-Calls** | Access Key + Secret | POST `/v2/authentication` → Bearer Token (15 min). Für Webhooks, Sync, alle Server-to-Server Calls. |

**API Endpoints:**
- Persons: GET/POST/PUT /v2/persons, /v2/persons/master-data
- Organization Units: GET/POST /v2/organization-units
- Webhooks: GET/POST/PUT/DELETE /v2/webhooks
- PersonTasks: ⚠️ **Noch nicht verfügbar** - kommt später, Integration dann in Phase 2+
- Approvals: ⚠️ **Noch nicht verfügbar** - kommt später, Integration dann in Phase 3+

**Approval Builder (HR WORKS Service - kommt noch)**

Der Approval Builder ist ein **HR WORKS Service**, nicht Teil der Workflow App:

```
┌───────────────────────────────────────────────────────────────┐
│                       HR WORKS                                │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Approval Builder API                                    │ │
│  │  - POST /approvals → Approval-Objekt erstellen          │ │
│  │  - PUT /approvals/:id → Status ändern (stornieren)      │ │
│  │  - Historisierung aller Approvals                       │ │
│  │  - Webhooks bei Status-Änderungen                       │ │
│  └─────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────┘
                 ▲                         │
                 │ API Calls               │ Webhooks
                 │                         ▼
┌───────────────────────────────────────────────────────────────┐
│                    Workflow App                               │
│  1. Erstellt Approval-Objekte via API (1 pro Genehmiger)     │
│  2. Speichert Approval-IDs im Workflow-Context               │
│  3. Wartet auf Webhook: "approval.approved/rejected"         │
│  4. Bei ANY-Mode: Setzt restliche Approvals auf "storniert"  │
│  5. Workflow fortsetzen                                       │
└───────────────────────────────────────────────────────────────┘
```

**Beispiel: ANY-Mode (1 aus 5 Genehmiger)**
1. Workflow App erstellt 5 Approval-Objekte in HR WORKS
2. Speichert alle 5 IDs: `[approval_1, approval_2, ..., approval_5]`
3. Genehmiger 3 genehmigt → Webhook kommt
4. Workflow App setzt `approval_1, 2, 4, 5` auf "storniert"
5. Workflow geht weiter

HR WORKS Webhook Resources (aus API):
- `person` - Mitarbeiter-Events
- `applicant` - Bewerber-Events
- `absence` - Abwesenheits-Events
- `sickLeave` - Krankmeldungs-Events
- `remoteWork` - Remote Work Events

HR WORKS Webhook Actions:
- `resourceCreated` - Ressource erstellt
- `resourceUpdated` - Ressource aktualisiert
- `resourceDeleted` - Ressource gelöscht
- `resourceDeactivated` - Ressource deaktiviert (nur für person)

**Webhook-Strategie: Fan-Out Pattern**

⚠️ **Wichtig:** NICHT für jeden Workflow einen eigenen Webhook registrieren!

```
┌─────────────────┐     ┌─────────────────────────────────────────┐
│   HR WORKS      │     │         Workflow App                    │
│                 │     │                                         │
│  1 Webhook pro  │────▶│  Webhook Handler                        │
│  Resource-Type  │     │       │                                 │
│  (person, etc.) │     │       ▼                                 │
└─────────────────┘     │  ┌─────────────────┐                    │
                        │  │  Event Router   │                    │
                        │  └────────┬────────┘                    │
                        │           │                             │
                        │     ┌─────┼─────┐                       │
                        │     ▼     ▼     ▼                       │
                        │   WF 1  WF 2  WF 3  (wartende Workflows)│
                        └─────────────────────────────────────────┘
```

**Implementierung:**
- Pro Tenant: Max 1 Webhook pro Resource-Type (`person`, `absence`, etc.)
- Workflow App registriert Webhooks automatisch bei Bedarf
- Eingehende Events werden intern an alle wartenden Workflow-Instanzen dispatched
- Event Router prüft: Welche Workflows warten auf dieses Event?

**Vorteile:**
- Weniger Webhooks bei HR WORKS (sauberer)
- Zentrale Signature-Verification
- Einfacheres Debugging

HR WORKS Webhook Handler (NestJS Implementation)

**Webhook Payload Struktur:**
```json
{
  "event": "serverEvent",
  "resourceLocation": "https://api.hrworks.de/v2/persons/ea0c59f7-2f09-44e6-aa97-4641216af05b",
  "jobId": "abc-123",
  "action": "resourceCreated"
}
```

**Headers:**
- `x-hrworks-signature` - HMAC-SHA256 Signatur (Base64)
- `x-hrworks-timestamp` - Unix Timestamp

**Signature Verification:**
```
stringToSign = jobId + "." + timestamp
signature = Base64(HMAC-SHA256(stringToSign, secretAccessKey))
```

**Webhook Controller** (`backend/src/webhooks/hrworks-webhook.controller.ts`):
```typescript
import { Controller, Post, Req, Res, Param, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { createHmac, timingSafeEqual } from 'crypto';
import { HRWorksWebhookService } from './hrworks-webhook.service';
import { getTenantDB } from '../db/tenant-manager';
import { landlordDB } from '../db/landlord';
import { tenants } from '@shared/db/landlord-schema';
import { eq } from 'drizzle-orm';

interface WebhookPayload {
  event: string;
  resourceLocation: string;
  jobId: string;
  action: 'resourceCreated' | 'resourceUpdated' | 'resourceDeleted' | 'resourceDeactivated';
}

@Controller('webhooks/hrworks')
export class HRWorksWebhookController {
  constructor(private readonly webhookService: HRWorksWebhookService) {}

  @Post(':customerId')
  async handleWebhook(
    @Param('customerId') customerId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    // 1. Find tenant by HR WORKS customer ID
    const [tenant] = await landlordDB
      .select()
      .from(tenants)
      .where(eq(tenants.hrworksCompanyId, customerId))
      .limit(1);

    if (!tenant) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Tenant not found'
      });
    }

    // 2. Get tenant config for secret key
    const tenantDB = await getTenantDB(tenant.id);
    const config = await this.webhookService.getHRWorksConfig(tenantDB);

    if (!config?.isActive || config.personSyncMethod !== 'webhooks') {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Webhook sync not enabled'
      });
    }

    // 3. Verify signature
    const signature = req.headers['x-hrworks-signature'] as string;
    const timestamp = req.headers['x-hrworks-timestamp'] as string;
    const payload = req.body as WebhookPayload;

    if (!signature || !timestamp || !payload.jobId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        error: 'Missing signature, timestamp or jobId'
      });
    }

    const isValid = this.verifySignature(
      payload.jobId,
      timestamp,
      signature,
      config.secretAccessKey,
    );

    if (!isValid) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        error: 'Invalid signature'
      });
    }

    // 4. Validate payload
    if (payload.event !== 'serverEvent') {
      return res.status(HttpStatus.OK).json({
        message: 'Event type ignored'
      });
    }

    const validActions = ['resourceCreated', 'resourceUpdated', 'resourceDeleted', 'resourceDeactivated'];
    if (!validActions.includes(payload.action)) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Invalid action'
      });
    }

    // 5. Extract resource type and ID from resourceLocation
    const resourceMatch = payload.resourceLocation.match(/\/v2\/(\w+)\/([a-f0-9-]+)/i);
    if (!resourceMatch) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Could not parse resourceLocation'
      });
    }

    const [, resourceType, resourceId] = resourceMatch;

    // 6. Process based on resource type
    try {
      switch (resourceType) {
        case 'persons':
          await this.webhookService.syncPerson(tenantDB, resourceId, payload.action);
          break;
        case 'organization-units':
          await this.webhookService.syncOrganizationUnit(tenantDB, resourceId, payload.action);
          break;
        default:
          return res.status(HttpStatus.OK).json({
            message: `Resource type ${resourceType} ignored`
          });
      }

      return res.status(HttpStatus.OK).json({
        message: 'Webhook processed successfully',
        action: payload.action,
        resourceType,
        resourceId,
      });
    } catch (error) {
      console.error('Webhook processing failed:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Processing failed',
        message: error.message,
      });
    }
  }

  private verifySignature(
    jobId: string,
    timestamp: string,
    signature: string,
    secretKey: string,
  ): boolean {
    const stringToSign = `${jobId}.${timestamp}`;
    const expectedSignature = createHmac('sha256', secretKey)
      .update(stringToSign)
      .digest('base64');

    try {
      return timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature),
      );
    } catch {
      return false;
    }
  }
}
```

**Webhook Service** (`backend/src/webhooks/hrworks-webhook.service.ts`):
```typescript
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { syncedPersons, syncedOrganizationUnits } from '@shared/db/tenant-schema';
import { HRWorksApiService } from '../hrworks/hrworks-api.service';

@Injectable()
export class HRWorksWebhookService {
  constructor(private readonly hrworksApi: HRWorksApiService) {}

  async getHRWorksConfig(tenantDB: any) {
    // Fetch tenant-specific HR WORKS config
    const [config] = await tenantDB
      .select()
      .from(hrworksConfig)
      .limit(1);
    return config;
  }

  async syncPerson(
    tenantDB: any,
    personId: string,
    action: string,
  ) {
    if (action === 'resourceDeleted' || action === 'resourceDeactivated') {
      // Mark as deleted/deactivated
      await tenantDB
        .update(syncedPersons)
        .set({ isActive: false, lastSyncedAt: new Date() })
        .where(eq(syncedPersons.hrworksPersonId, personId));
      return;
    }

    // Fetch fresh data from HR WORKS API
    const personData = await this.hrworksApi.getPerson(personId);

    // Upsert person
    await tenantDB
      .insert(syncedPersons)
      .values({
        hrworksPersonId: personId,
        email: personData.email,
        firstName: personData.firstName,
        lastName: personData.lastName,
        supervisorId: personData.supervisorId,
        organizationUnitId: personData.organizationUnitId,
        lastSyncedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: syncedPersons.hrworksPersonId,
        set: {
          email: personData.email,
          firstName: personData.firstName,
          lastName: personData.lastName,
          supervisorId: personData.supervisorId,
          organizationUnitId: personData.organizationUnitId,
          lastSyncedAt: new Date(),
        },
      });
  }

  async syncOrganizationUnit(
    tenantDB: any,
    ouId: string,
    action: string,
  ) {
    if (action === 'resourceDeleted') {
      await tenantDB
        .delete(syncedOrganizationUnits)
        .where(eq(syncedOrganizationUnits.hrworksOuId, ouId));
      return;
    }

    // Fetch fresh data from HR WORKS API
    const ouData = await this.hrworksApi.getOrganizationUnit(ouId);

    // Upsert organization unit
    await tenantDB
      .insert(syncedOrganizationUnits)
      .values({
        hrworksOuId: ouId,
        name: ouData.name,
        parentId: ouData.parentId,
        lastSyncedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: syncedOrganizationUnits.hrworksOuId,
        set: {
          name: ouData.name,
          parentId: ouData.parentId,
          lastSyncedAt: new Date(),
        },
      });
  }
}
```

**Webhook URL Format:**
```
POST https://workflow.example.com/webhooks/hrworks/{hrworksCustomerId}
```

Builder Pattern: Für Validierung und Persistierung von Genehmigungsobjekten

Phase 1: Foundation & MVP (Wochen 1-6)
Ziel Funktionsfähige Basis mit einfachen Workflows - "Make it work"

1.1 Backend Infrastructure

**Workflow Execution Engine (XState + BullMQ):**

| Komponente | Technologie | Zweck |
|------------|-------------|-------|
| State Machine | **XState** | Bulletproof State Management |
| Job Queue | **BullMQ** | Async Execution, Retries, Delays |
| IDs | **ULID** | Zeitlich sortierbar, besser als UUID |
| Persistenz | **PostgreSQL** | State überlebt App-Neustarts |

```
┌─────────────────────────────────────────────────────────────────┐
│                    Workflow Execution Flow                      │
│                                                                 │
│  1. Trigger (Webhook/Manual/Schedule)                          │
│         │                                                       │
│         ▼                                                       │
│  2. BullMQ Job erstellen                                       │
│         │                                                       │
│         ▼                                                       │
│  3. Worker nimmt Job                                           │
│         │                                                       │
│         ▼                                                       │
│  4. XState Machine erstellen/laden                             │
│         │                                                       │
│         ▼                                                       │
│  5. Node ausführen                                             │
│         │                                                       │
│         ├──▶ Erfolgreich: State in DB speichern, nächste Node  │
│         │                                                       │
│         ├──▶ Wartet (Approval/Delay): State in DB, Job beenden │
│         │    (später: Webhook/Timer erstellt neuen Job)        │
│         │                                                       │
│         └──▶ Fehler: Retry via BullMQ oder Error State         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**ULIDs für zeitliche Sortierbarkeit:**
```typescript
import { ulid } from 'ulid';

// ULID = Timestamp + Random (sortierbar!)
const executionId = ulid();  // "01ARZ3NDEKTSV4RRFFQ69G5FAV"

// Vorteil: Execution Logs sind automatisch chronologisch sortiert
// SELECT * FROM workflow_executions ORDER BY id; -- Zeitlich sortiert!
```

**XState Persistenz:**
```typescript
import { createMachine, createActor } from 'xstate';

// Workflow als XState Machine
const workflowMachine = createMachine({
  id: 'workflow',
  initial: 'trigger',
  context: { /* workflow data */ },
  states: {
    trigger: { on: { NEXT: 'httpRequest1' } },
    httpRequest1: { on: { SUCCESS: 'condition1', ERROR: 'error' } },
    condition1: { on: { YES: 'approval1', NO: 'end' } },
    approval1: { on: { APPROVED: 'end', REJECTED: 'rejected' } },
    end: { type: 'final' },
    error: { type: 'final' },
    rejected: { type: 'final' },
  },
});

// State in DB speichern (nach jedem Schritt)
async function persistWorkflowState(instanceId: string, snapshot: any) {
  await db.update(workflowInstances)
    .set({
      xstateSnapshot: snapshot,
      updatedAt: new Date(),
    })
    .where(eq(workflowInstances.id, instanceId));
}

// State aus DB laden (bei Fortsetzung)
async function loadWorkflowState(instanceId: string) {
  const instance = await db.select()
    .from(workflowInstances)
    .where(eq(workflowInstances.id, instanceId));

  // XState Actor mit gespeichertem State erstellen
  const actor = createActor(workflowMachine, {
    snapshot: instance.xstateSnapshot,
  });
  return actor;
}
```

**Idempotenz mit ULID:**
```typescript
// Jede Node-Execution bekommt eigene ULID
const executionId = ulid();

// Vor Ausführung: Check ob schon erfolgreich
const existing = await db.select()
  .from(workflowExecutions)
  .where(and(
    eq(workflowExecutions.instanceId, instanceId),
    eq(workflowExecutions.nodeId, nodeId),
    eq(workflowExecutions.status, 'completed')
  ));

if (existing.length > 0) {
  // Bereits ausgeführt - Skip (Idempotenz)
  return existing[0].output;
}

// Ausführen und speichern
const result = await executeNode(node, context);
await db.insert(workflowExecutions).values({
  id: executionId,
  instanceId,
  nodeId,
  status: 'completed',
  output: result,
});
```

**App-Neustart sicher:**
- Alle States in PostgreSQL (nicht in Memory)
- BullMQ Jobs überleben Neustarts (Redis persistent)
- Bei Startup: Offene Jobs werden automatisch fortgesetzt

**Testing-Strategie (Fixtures-basiert):**

| Modus | Beschreibung | Verwendung |
|-------|--------------|------------|
| **Fixtures** | Vordefinierte Mock-Daten | Automatisierte Tests, User-Testing |
| **Live** | Echte API-Calls | Production, manuelles Debugging |
| **Node-by-Node** | Einzelne Nodes ausführen | Entwicklung, Debugging |

**Fixtures-Konzept:**
```
┌─────────────────────────────────────────────────────────────────┐
│  Workflow Test mit Fixtures                                     │
│                                                                 │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐       │
│  │  Fixture    │     │  Workflow   │     │  Expected   │       │
│  │  Input      │────▶│  Engine     │────▶│  Output     │       │
│  │  (JSON)     │     │             │     │  (JSON)     │       │
│  └─────────────┘     └─────────────┘     └─────────────┘       │
│                                                                 │
│  Beispiel Fixture:                                              │
│  {                                                              │
│    "person": { "firstName": "Max", "role": "developer" },      │
│    "httpRequest1": { "statusCode": 200, "data": {...} },       │
│    "approval1": { "status": "approved", "by": "..." }          │
│  }                                                              │
└─────────────────────────────────────────────────────────────────┘
```

**Fixture-Typen:**
```typescript
// System-Fixtures (wir liefern mit)
const fixtures = {
  'onboarding-developer': {
    person: { firstName: 'Max', lastName: 'Müller', role: 'developer' },
    organizationUnit: { name: 'IT', managerId: '...' },
    // Simulierte API Responses
    nodes: {
      httpRequest1: { statusCode: 200, data: { orderId: '12345' } },
    },
  },
  'onboarding-manager': { /* ... */ },
  'approval-approved': { /* ... */ },
  'approval-rejected': { /* ... */ },
};

// User-definierte Fixtures (in Tenant-DB gespeichert)
interface CustomFixture {
  id: string;
  name: string;
  description: string;
  data: Record<string, any>;
  createdBy: string;
}
```

**Test-Modi im Designer:**
```
┌─────────────────────────────────────────────────────────────────┐
│  Workflow Designer                                    [▶ Test]  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Test Mode                                                │  │
│  │                                                           │  │
│  │  ○ Live (echte API-Calls)                                │  │
│  │  ● Fixture: [Onboarding Developer ▼]                     │  │
│  │                                                           │  │
│  │  [▶ Run All]  [▶ Step-by-Step]  [⟳ Reset]               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Execution Log:                                                 │
│  ✅ Trigger: Manual                                            │
│  ✅ HTTP Request: GET /persons/123 → 200 (from fixture)        │
│  ⏳ Condition: role = "developer" → evaluating...              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Node-by-Node Execution (Debugging):**
```typescript
// Im Designer: Einzelnen Node ausführen
async function executeNodeManually(
  workflowId: string,
  nodeId: string,
  mode: 'live' | 'fixture',
  fixtureId?: string,
) {
  const context = mode === 'fixture'
    ? await loadFixture(fixtureId)
    : await buildLiveContext(workflowId);

  const node = await getNode(workflowId, nodeId);
  const result = await executeNode(node, context);

  return {
    input: context,
    output: result,
    duration: '...',
  };
}
```

**Automatisierte Tests (CI/CD):**
```typescript
// tests/workflows/onboarding.test.ts
import { describe, it, expect } from 'vitest';
import { executeWorkflow } from '../src/workflow/engine';
import { fixtures } from '../fixtures';

describe('Onboarding Workflow', () => {
  it('should order laptop for developer', async () => {
    const result = await executeWorkflow('onboarding', {
      fixture: fixtures['onboarding-developer'],
    });

    expect(result.status).toBe('completed');
    expect(result.nodes.httpOrderEquipment.output.type).toBe('laptop');
  });

  it('should order standard PC for non-developer', async () => {
    const result = await executeWorkflow('onboarding', {
      fixture: fixtures['onboarding-manager'],
    });

    expect(result.nodes.httpOrderEquipment.output.type).toBe('standard-pc');
  });
});
```

Authentifizierung & Autorisierung
OAuth2 Integration mit HR WORKS
SSO-Flow implementieren
Rollen-basierte Zugriffskontrolle (nur workflow-admin)
Session Management
JWT Token Handling

Daten-Synchronisation
Organisationseinheiten Sync
  - Initiales Full-Sync aller OEs aus HR WORKS
  - Webhook-Handler für OE-Änderungen
  - Lokale Caching-Strategie
  - Delta-Updates

Personen Sync
  - Initiales Full-Sync aller Mitarbeiter
  - Webhook-Handler für Personenänderungen
  - Mapping: HR WORKS Person → Workflow User
  - Synchronisation von Vorgesetzten-Beziehungen (VG, VG von VG)

Core Workflow Engine
Workflow Definition Model (JSON Schema)
Workflow Instance Management
Execution Engine (State Machine)
Event Queue (Bull/BullMQ)
Logging & Audit Trail

**Settings-Modul (Tenant-Konfiguration)**
Backend Settings Service
  - CRUD-Operationen für Tenant-spezifische Einstellungen
  - Sichere Speicherung von API-Credentials (HR WORKS apiKey, apiSecret, baseUrl)
  - Verschlüsselung sensibler Daten
  - Validierung von Konfigurationswerten
  - updateTenantSettings Methode im Landlord Service
Frontend Settings Page
  - Formular für HR WORKS API-Credentials
  - Tenant-Informationen anzeigen
  - Sync-Einstellungen (Webhook vs. Polling)
  - Test-Connection-Button für API-Validierung
  - Navigation-Link im Layout

1.2 Frontend Grundlagen

Designer UI (React Flow Integration)
Canvas mit Drag & Drop
Node Palette (Initial: Start, Action, End)
Connection Drawing
Basic Node Configuration Panel
**Echtzeit-Execution-Updates via SSE**:
  - Backend sendet Live-Updates während Workflow-Ausführung über Server-Sent Events
  - Frontend verwendet `@microsoft/fetch-event-source` mit Authorization-Header
  - Node-Status-Updates in Echtzeit (running, success, error)
  - Ersetzt Polling-Mechanismus (reduziert Backend-Load erheblich)
  - Automatische Reconnect-Logik bei Verbindungsabbruch
  - Event-Stream bleibt offen während gesamter Workflow-Ausführung
**Context Panel / Variable Picker**:
  - Overlay/Sidebar beim Klick in Input-Felder
  - Zeigt Outputs aller vorherigen Nodes im Workflow-Graph als **expandable Tree-View**
  - **Array-Navigation**: Unterstützt Array-Indexierung ([0], [1], etc.) zum Zugriff auf Array-Elemente
  - **Wert-Anzeige**: Zeigt tatsächliche Werte für primitive Typen (Strings, Numbers, Booleans)
  - **Klickbar auf allen Ebenen**: Arrays, Objekte und Leaf-Nodes können angeklickt werden zum Einfügen des Pfads
  - **Array-Metadaten**: Zeigt Array-Länge und Typ-Informationen an
  - Syntax-Highlighting für JSON
  - Klickbar zum Einfügen von Variablen-Referenzen (z.B. `{{node_name.output.field}}`)
  - Filterfunktion zum Suchen von Feldern
  - Zeigt auch Trigger-Daten und Workflow-Variablen
**Node-by-Node Testing (Play-Button)**:
  - **Play-Button an jedem Node** zum einzelnen Testen
  - **Sequentielle Abhängigkeit**: Node kann nur ausgeführt werden, wenn alle vorherigen Nodes bereits ausgeführt wurden
  - **Execution Flow**: A → B → C (B erst nach A, C erst nach B)
  - **Output Caching**: Ergebnis wird am Node gespeichert und im Context Panel verfügbar
  - **Visuelles Status-Feedback**:
    - Grau: Nicht ausführbar (Vorgänger fehlen)
    - Grün: Bereit zum Ausführen
    - Blau/Spinner: Läuft gerade
    - Grün mit Haken: Erfolgreich ausgeführt
    - Rot: Fehler
  - **Output-Preview**: Expandable JSON-View direkt am Node
  - **"Run All"-Button**: Führt alle Nodes in topologischer Reihenfolge aus
  - **Cache Invalidation**: Outputs werden gelöscht bei Änderung der Node-Konfiguration oder Vorgänger-Outputs
  - **Mock Trigger Data**: Bei Trigger-Nodes kann Mock-Input definiert werden
**Template Placeholder System**:
  - Syntax: `{{NodeName.output.field}}` für Variablen-Referenzen
  - Funktioniert in Manual Test und Workflow Execution
  - Unterstützt verschachtelte Strukturen (nested objects/arrays)
  - Backend-Methode `getValueByPath()` für Pfad-Auflösung in verschachtelten Kontexten
  - Context-Button in Input-Feldern öffnet Context Panel zum Einfügen
**Canvas Controls**:
  - Zoom-Steuerung (-, Prozentanzeige, +)
  - Undo/Redo-Buttons
  - Vollbild-Toggle
  - Auto-Layout-Funktion für automatische Node-Anordnung (horizontales Layout)
  - Hilfe-Button
  - Grüner "+" FAB-Button zum Hinzufügen neuer Knoten
**Context Menu für Nodes**:
  - Rechtsklick auf Node öffnet Context Menu
  - Optionen: Duplizieren, Löschen, Konfigurieren, Testen
  - Keyboard-Shortcuts (z.B. Delete-Taste für Löschen)
**Deletable Edges**:
  - Hover über Edge zeigt Lösch-Icon
  - Klick auf Icon entfernt die Verbindung
  - Orthogonale/rechteckige Linien (keine kurvigen Linien)
  - Datenfluss-Animation auf Edges
**Theme Management**:
  - Dark/Light Mode Support
  - Persistierung der Theme-Präferenz
  - Zustand Store für Theme-State
Workflow Speichern/Laden

### UI-Spezifikationen (Detail)

#### Workflow-Übersicht
- **Darstellung als Tabelle** mit Spalten für Name, Status, Version, letzte Änderung, Ersteller
- Pro Workflow darf es **nur einen Trigger-Knoten** geben (Validierung im Designer)

#### Workflow-Designer Layout (oberer Bereich, ~60% der Höhe)

**Visueller Graph-Editor:**
- Knoten-basierter Editor mit Drag-and-Drop-Funktionalität
- **Drag & Drop aus Library**: Komponenten können aus einer seitlichen "Library" in den Designer gezogen werden
- Knoten werden durch Verbindungslinien (Edges) verknüpft
- Unterstützung für verschiedene Knotentypen (z.B. Jira, HR WORKS, Condition, API-Calls)
- Jeder Knoten zeigt eine Vorschau seines Inhalts/Konfiguration
- **Horizontale Anordnung** des Workflows von links nach rechts (immer!)

**Verbindungslinien (Edges):**
- **Orthogonale/rechteckige Linien** (keine kurvigen Linien!)
- **Hover-Icon zum Löschen**: Kanten zeigen bei Hover ein Icon, mit dem sie gelöscht werden können
- **Datenfluss-Animation**: Animierte Linien, die visualisieren wohin die Daten fließen
- **Verbindungspunkte bei Multi-Output-Knoten**: Bei Bedingungen, Switches oder ähnlichen Knoten mit mehreren Ausgängen liegen die Verbindungsstücke immer auf dem Rahmen der Box

**Header-Leiste:**
- Workflow-Name mit Dropdown zur Bearbeitung
- Versionsnummer (z.B. "0.0.14")
- Toggle für Aktivierung/Deaktivierung

**Canvas-Controls:**
- Zoom-Steuerung (-, Prozentanzeige, +)
- Undo/Redo-Buttons
- Vollbild-Toggle
- Hilfe-Button
- Grüner "+" FAB-Button zum Hinzufügen neuer Knoten

#### Verlauf/Historie (linker unterer Bereich)

**Statistik-Dashboard:**
- Gesamte Ausführungen (Anzahl)
- Ausgeführte Nodes (Anzahl)

**Filter-Optionen:**
- "Alle Ausführungen" / gefilterte Ansicht
- Datumsfilter
- Statusfilter

**Ausführungsliste:**
- Scrollbare Liste aller Workflow-Durchläufe
- Pro Eintrag:
  - Status-Icon (grüner Haken = erfolgreich, rot = fehlgeschlagen)
  - Ausführungs-ID (z.B. "Ausführung #1047")
  - Zeitstempel (Datum + Uhrzeit)
- Klick auf Eintrag öffnet Details im rechten Panel

#### Ausführungsdetails (rechter unterer Bereich)

**Header:**
- Ausführungs-ID mit Status-Icon
- Gesamtdauer
- Schließen-Button (X)

**Knoten-Liste (chronologisch):**
- Für jeden ausgeführten Knoten:
  - Icon des Knotentyps
  - Knotenname (z.B. "Jira", "Condition", "Get Issue")
  - Ausführungsdauer
  - Zeitstempel
  - Aufklappbare Sections:
    - **Eingabe**: JSON-Darstellung der Input-Daten
    - **Ausgabe**: JSON-Darstellung der Output-Daten (syntax-highlighted)

#### Workflow-Versionierung & Historie
- **Zeitstempel-basierte Historisierung** für jeden Speichervorgang
- **Personenzuordnung**: Wer hat wann gespeichert
- **Versions-Wiederherstellung**: Alte Versionen können als neue Version wiederhergestellt werden
- **Audit-Trail**: Vollständige Nachverfolgbarkeit aller Änderungen

#### Design-Vorgaben
- **Dunkles Theme** (Dark Mode)
- Farbcodierung: Grün für Erfolg, Orange für Hinweise, Rot für Fehler
- Syntax-Highlighting für JSON (Keys in einer Farbe, Strings in einer anderen)
- Responsive Split-Panels zwischen den drei Bereichen

Smartface Integration
Navigation Structure
Workflow List View
Workflow Detail View
Basic Styling & Theming

1.3 Minimale Node-Typen

Trigger Nodes (Phase 1)
Manual Trigger
   - Workflow wird manuell gestartet
   - Input-Parameter definierbar
   - Testing & Debugging

Scheduled Trigger
   - Cron-basierte Ausführung
   - Zeitzone-Handling
   - Simple Intervalle (täglich, wöchentlich)

Action Nodes (Phase 1)
HTTP Request Node
   - GET/POST/PUT/DELETE zu HR WORKS API
   - Header Configuration
   - Body Template (Handlebars)
   - Response Mapping

**HR WORKS Node** (NEU - bereits in Phase 1)
   - Dedizierter Knoten für HR WORKS Integration
   - Vorkonfigurierte Endpunkte (Persons, OEs, Absences, etc.)
   - Automatische Authentifizierung (Token-Handling mit 15min Gültigkeit, automatischer Refresh)
   - **Token-Feld**: Response enthält `token` (nicht `access_token`)
   - Dropdown-Auswahl für Operationen (Get Person, Update Person, etc.)
   - **Async Job Handling**: Write-Operationen (POST/PUT/DELETE) geben jobId zurück, Backend pollt automatisch Job-Status
   - **UI-Mapping**: Async-Calls werden als synchrone Operationen dargestellt - Node bleibt "running" bis Job fertig
   - **Dictionary Response Flattening**: HR WORKS API liefert Dictionary-Format - alle Werte werden automatisch flattened
   - **Erweiterte Person-Felder**: Unterstützt alle Felder (personnelNumber, birthday, gender, role, department, etc.)
   - **Parameter-Flexibilität**: Unterstützt sowohl `params` als auch `parameters` Feldnamen in Node-Config
   - Integrierte Fehlerbehandlung für HR WORKS-spezifische Errors
   - Response-Mapping mit vordefinierten Templates

**Data Transformation Node** (NEU - bereits in Phase 1)
   - Operationen für Datenverarbeitung: count, filter, map, reduce, sort, distinct
   - JSONPath-Expressions für Daten-Extraktion
   - **Result Wrapping**: Ergebnisse werden in Objekte gewrappt für Context-Nutzung
   - Aggregations-Funktionen
   - Array-Manipulation
   - Unterstützt komplexe Transformationen

Delay Node
   - Zeitverzögerung (Minuten, Stunden, Tage)
   - Pause & Resume

Condition Node
   - If/Else Logic
   - Simple Expressions (==, !=, >, <)
   - Boolean Operations (AND, OR)

**API-Client Generierung:** → Siehe **[plan-hrworks-integration.md](./plan-hrworks-integration.md)**

> ℹ️ Im finalen `workflow-automation` Projekt wird diese Datei nach `docs/` verschoben.

**Async Job Handling (Write-Operationen):**

HR WORKS API verwendet Job-basierte asynchrone Verarbeitung:

1. **Write-Request** (POST/PUT/DELETE) → Response: `{ jobId: "..." }`
2. **Backend pollt** `/jobs/{jobId}` bis Status = "finished" oder "failed"
3. **Polling-Strategie**:
   - Intervall: 500ms initial, dann exponentiell bis max. 2s
   - Timeout: 60 Sekunden
   - Max. Retries bei Netzwerkfehlern: 3x
4. **Frontend-Darstellung**:
   - Node zeigt "running" Status während Polling
   - Bei Success: Node wird grün mit Job-Result als Output
   - Bei Failure: Node wird rot mit Error-Details
5. **Job-Result Mapping**:
   - Success: Node-Output = `data` Objekt aus Job-Response (ohne Wrapper)
   - Error: `{ error: "...", jobId: "..." }`
   - Beispiel: Job-Response `{ status: "finished", result: { data: { id: "123", name: "..." } } }` → Node-Output = `{ id: "123", name: "..." }`

#### Node-Konfiguration im Designer

**1. Dropdown: API-Endpoint auswählen**

Die verfügbaren Endpoints werden aus der OpenAPI Spec generiert und gruppiert:

```typescript
// Endpoint-Gruppen (aus OpenAPI generiert)
const hrworksEndpoints = {
  persons: [
    { id: 'getPersons', label: 'Get All Persons', method: 'GET', path: '/v2/persons' },
    { id: 'getPersonById', label: 'Get Person by ID', method: 'GET', path: '/v2/persons/{id}' },
    { id: 'createPerson', label: 'Create Person', method: 'POST', path: '/v2/persons' },
    { id: 'updatePerson', label: 'Update Person', method: 'PUT', path: '/v2/persons/{id}' },
  ],
  organizationUnits: [
    { id: 'getOUs', label: 'Get All Organization Units', method: 'GET', path: '/v2/organization-units' },
    { id: 'getOUById', label: 'Get Organization Unit by ID', method: 'GET', path: '/v2/organization-units/{id}' },
  ],
  absences: [
    { id: 'getAbsences', label: 'Get Absences', method: 'GET', path: '/v2/absences' },
    { id: 'createAbsence', label: 'Create Absence', method: 'POST', path: '/v2/absences' },
  ],
  // ... weitere Gruppen
};
```

**2. Dynamisches Formular für Parameter**

Je nach gewähltem Endpoint werden die benötigten Parameter dynamisch angezeigt:

```typescript
// Parameter-Definition pro Endpoint (aus OpenAPI generiert)
interface EndpointParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'object' | 'array';
  required: boolean;
  description: string;
  location: 'path' | 'query' | 'body';
  enum?: string[];  // Falls feste Werte
  default?: any;
}

// Beispiel: Get Person by ID
const getPersonByIdParams: EndpointParameter[] = [
  {
    name: 'id',
    type: 'string',
    required: true,
    description: 'Die UUID der Person',
    location: 'path',
  }
];

// Beispiel: Create Person (Body-Parameter)
const createPersonParams: EndpointParameter[] = [
  { name: 'firstName', type: 'string', required: true, description: 'Vorname', location: 'body' },
  { name: 'lastName', type: 'string', required: true, description: 'Nachname', location: 'body' },
  { name: 'email', type: 'string', required: true, description: 'E-Mail-Adresse', location: 'body' },
  { name: 'organizationUnitId', type: 'string', required: false, description: 'OE-ID', location: 'body' },
  // ...
];
```

**3. UI-Komponente für den Node**

```tsx
// HRWorksNodeConfig.tsx
const HRWorksNodeConfig: React.FC<{ nodeId: string }> = ({ nodeId }) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null);
  const [parameters, setParameters] = useState<Record<string, any>>({});

  // Lade Parameter-Definition für gewählten Endpoint
  const endpointParams = useMemo(() => {
    if (!selectedEndpoint) return [];
    return getEndpointParameters(selectedEndpoint);
  }, [selectedEndpoint]);

  return (
    <div className="hrworks-node-config">
      {/* Endpoint-Auswahl */}
      <Select
        label="API-Endpoint"
        value={selectedEndpoint}
        onChange={setSelectedEndpoint}
        options={hrworksEndpointOptions}
        grouped={true}  // Gruppiert nach Kategorie
      />

      {/* Dynamisches Parameter-Formular */}
      {selectedEndpoint && (
        <div className="parameter-form">
          <h4>Parameter</h4>
          {endpointParams.map(param => (
            <ParameterInput
              key={param.name}
              param={param}
              value={parameters[param.name]}
              onChange={(val) => setParameters(prev => ({
                ...prev,
                [param.name]: val
              }))}
              // Autocomplete für IDs aus Sync-Daten
              autocomplete={
                param.name.endsWith('Id')
                  ? getSyncedDataForAutocomplete(param.name)
                  : undefined
              }
            />
          ))}
        </div>
      )}

      {/* Output-Variable */}
      <Input
        label="Output-Variable"
        placeholder="z.B. personData"
        description="Name unter dem die Response verfügbar ist"
      />
    </div>
  );
};

// Dynamische Parameter-Eingabe
const ParameterInput: React.FC<{
  param: EndpointParameter;
  value: any;
  onChange: (val: any) => void;
  autocomplete?: AutocompleteOption[];
}> = ({ param, value, onChange, autocomplete }) => {
  const label = `${param.name}${param.required ? '*' : ''}`;

  // Expression-Support: {{...}} Platzhalter erlauben
  const supportsExpression = true;

  switch (param.type) {
    case 'string':
      return autocomplete ? (
        <Autocomplete
          label={label}
          value={value}
          onChange={onChange}
          options={autocomplete}
          allowCustom={true}  // Erlaubt auch {{expressions}}
          description={param.description}
        />
      ) : (
        <Input
          label={label}
          value={value}
          onChange={onChange}
          placeholder={supportsExpression ? '{{variable}} oder Wert' : ''}
          description={param.description}
        />
      );

    case 'number':
      return (
        <Input
          label={label}
          type="number"
          value={value}
          onChange={onChange}
          description={param.description}
        />
      );

    case 'date':
      return (
        <DatePicker
          label={label}
          value={value}
          onChange={onChange}
          allowExpression={true}  // z.B. {{$now()}}
          description={param.description}
        />
      );

    case 'boolean':
      return (
        <Switch
          label={label}
          checked={value}
          onChange={onChange}
          description={param.description}
        />
      );

    case 'object':
    case 'array':
      return (
        <JsonEditor
          label={label}
          value={value}
          onChange={onChange}
          description={param.description}
        />
      );

    default:
      return <Input label={label} value={value} onChange={onChange} />;
  }
};
```

**4. Beispiel UI-Flow im Designer**

```
┌──────────────────────────────────────────────────────────────┐
│  HR WORKS                                            [x]     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  API-Endpoint                                                │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Persons > Get Person by ID                          ▼ │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ─────────────────────────────────────────────────────────   │
│  Parameter                                                   │
│                                                              │
│  Person ID *                                                 │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ {{trigger.personId}}                                   │  │
│  └────────────────────────────────────────────────────────┘  │
│  💡 Die UUID der Person                                      │
│                                                              │
│  ─────────────────────────────────────────────────────────   │
│  Output                                                      │
│                                                              │
│  Variable-Name                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ personData                                             │  │
│  └────────────────────────────────────────────────────────┘  │
│  💡 Zugriff via {{nodes.hrworks1.output.personData}}        │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**5. Autocomplete für synchronisierte Daten**

```typescript
// Für Person-IDs: Zeige synchronisierte Personen als Autocomplete
const getSyncedDataForAutocomplete = (paramName: string): AutocompleteOption[] => {
  if (paramName === 'personId' || paramName === 'id') {
    // Lade aus syncedPersons Tabelle
    return syncedPersons.map(p => ({
      value: p.hrworksPersonId,
      label: `${p.firstName} ${p.lastName}`,
      description: p.email,
    }));
  }

  if (paramName === 'organizationUnitId') {
    // Lade aus syncedOrganizationUnits Tabelle
    return syncedOUs.map(ou => ({
      value: ou.hrworksOuId,
      label: ou.name,
    }));
  }

  return [];
};
```

**6. Backend: Node-Ausführung**

```typescript
// backend/src/workflow/nodes/hrworks-node.executor.ts
import { HRWorksClient } from '@hrworks/hrworks-api-client';

interface HRWorksNodeConfig {
  endpoint: string;
  parameters: Record<string, any>;
  outputVariable: string;
}

export async function executeHRWorksNode(
  config: HRWorksNodeConfig,
  context: WorkflowContext,
  tenantDB: TenantDB,
): Promise<NodeOutput> {
  // 1. HR WORKS Client mit Tenant-Credentials initialisieren
  const credentials = await getHRWorksCredentials(tenantDB);
  const client = new HRWorksClient({
    baseUrl: 'https://api.hrworks.de',
    accessToken: credentials.accessToken,
  });

  // 2. Parameter evaluieren (Expressions auflösen)
  const evaluatedParams: Record<string, any> = {};
  for (const [key, value] of Object.entries(config.parameters)) {
    evaluatedParams[key] = evaluateExpression(value, context);
  }

  // 3. API-Call basierend auf Endpoint ausführen
  let result: any;
  switch (config.endpoint) {
    case 'getPersonById':
      result = await client.api.getPersonById({ id: evaluatedParams.id });
      break;
    case 'getPersons':
      result = await client.api.getPersons(evaluatedParams);
      break;
    case 'createPerson':
      result = await client.api.createPerson({ body: evaluatedParams });
      break;
    // ... weitere Endpoints
    default:
      throw new Error(`Unknown endpoint: ${config.endpoint}`);
  }

  // 4. Output zurückgeben
  return {
    [config.outputVariable]: result,
    _raw: result,
    _statusCode: 200,
  };
}
```

---

Delay Node
   - Zeitverzögerung (Minuten, Stunden, Tage)
   - Pause & Resume

Condition Node
   - If/Else Logic
   - Simple Expressions (==, !=, >, <)
   - Boolean Operations (AND, OR)

1.4 Expression Language Spezifikation (JSONata + Platzhalter)

Die Workflow Engine verwendet **JSONata** als Expression Language.
- **Library:** `jsonata` (npm) - https://jsonata.org/
- **Bewährt:** Wird auch von n8n verwendet

**Zwei Anwendungsfälle:**

| Anwendung | Syntax | Beispiel |
|-----------|--------|----------|
| **Templates** (Strings) | `{{expression}}` Platzhalter | `"Hallo {{person.firstName}}"` |
| **Conditions** (Logik) | Pure JSONata | `amount > 5000 and role = "manager"` |

---

**1. Templates (Strings mit Platzhaltern)**

Platzhalter `{{...}}` werden per Regex gefunden und mit JSONata evaluiert:

```
Hallo {{person.firstName}} {{person.lastName}},

Ihr Antrag über {{amount}}€ wurde eingereicht.
Status: {{status}}
Datum: {{$formatDate($now(), "DD.MM.YYYY")}}
```

**Template Engine Implementation:**
```typescript
import jsonata from 'jsonata';

function evaluateTemplate(template: string, context: object): string {
  return template.replace(/\{\{(.+?)\}\}/g, (match, expr) => {
    try {
      const result = jsonata(expr).evaluate(context);
      return String(result ?? '');
    } catch (e) {
      return `[ERROR: ${expr}]`;
    }
  });
}

// Beispiel
const template = "Hallo {{person.firstName}}, Antrag über {{amount}}€";
const context = { person: { firstName: "Max" }, amount: 5000 };
// → "Hallo Max, Antrag über 5000€"
```

---

**2. Conditions (Pure JSONata)**

Für If/Else Nodes - direkte JSONata Syntax ohne `{{}}`:

```javascript
// Einfache Bedingung
amount > 5000

// Vergleiche (ACHTUNG: = nicht ==)
status = "approved"
role != "admin"

// Logische Operatoren
amount > 5000 and person.role = "manager"
role = "admin" or role = "manager"
not isDeleted

// Mit Funktionen
$count(approvers) >= 3
$contains(email, "@hrworks.de")
```

---

**3. JSONata Syntax Referenz**

```javascript
// ═══════════════════════════════════════════════════════════════
// PROPERTY ACCESS
// ═══════════════════════════════════════════════════════════════
person.firstName                    // Nested property
input.data.items[0]                 // Array access
nodes.httpRequest1.output           // Node output

// ═══════════════════════════════════════════════════════════════
// OPERATOREN
// ═══════════════════════════════════════════════════════════════
a = b                               // Gleich (nicht ==!)
a != b                              // Ungleich
a > b, a >= b, a < b, a <= b       // Vergleiche
a and b                             // Logisches UND
a or b                              // Logisches ODER
not a                               // Logisches NICHT
a & b                               // String Concatenation

// ═══════════════════════════════════════════════════════════════
// STRING-FUNKTIONEN
// ═══════════════════════════════════════════════════════════════
$lowercase(str)                     // Kleinbuchstaben
$uppercase(str)                     // Großbuchstaben
$trim(str)                          // Whitespace entfernen
$length(str)                        // Länge
$contains(str, "search")            // Enthält?
$substring(str, start, length)      // Teilstring
$replace(str, "old", "new")         // Ersetzen

// ═══════════════════════════════════════════════════════════════
// NUMERISCHE FUNKTIONEN
// ═══════════════════════════════════════════════════════════════
$sum(array)                         // Summe
$average(array)                     // Durchschnitt
$round(number, precision)           // Runden
$abs(number)                        // Absolutwert
$floor(number)                      // Abrunden
$ceil(number)                       // Aufrunden

// ═══════════════════════════════════════════════════════════════
// ARRAY-FUNKTIONEN
// ═══════════════════════════════════════════════════════════════
$count(array)                       // Anzahl
array[0]                            // Erstes Element
array[-1]                           // Letztes Element
array[status = "active"]            // Filtern
array.fieldName                     // Alle Werte eines Feldes
$distinct(array)                    // Unique values
$sort(array)                        // Sortieren

// ═══════════════════════════════════════════════════════════════
// DATUM-FUNKTIONEN (Custom, wir registrieren diese)
// ═══════════════════════════════════════════════════════════════
$now()                              // Aktueller Timestamp
$formatDate(timestamp, "DD.MM.YYYY")
$addDays(timestamp, 7)
$diffDays(date1, date2)

// ═══════════════════════════════════════════════════════════════
// CONDITIONAL
// ═══════════════════════════════════════════════════════════════
condition ? valueIfTrue : valueIfFalse
value ? value : "default"           // Null-Handling
```

---

**4. Workflow Context Struktur**

Der Context der an Expressions übergeben wird:

```javascript
{
  // Input vom Trigger
  "input": { ... },

  // Outputs aller bisherigen Nodes
  "nodes": {
    "trigger1": { "output": { ... } },
    "httpRequest1": { "output": { "statusCode": 200, "data": { ... } } },
    "condition1": { "output": { "branch": "yes" } }
  },

  // Synced Data
  "person": { "firstName": "Max", "lastName": "Müller", ... },
  "organizationUnit": { "name": "IT", ... },

  // Workflow Metadata
  "$workflow": {
    "id": "...",
    "name": "Onboarding",
    "triggeredBy": "..."
  }
}
```

1.5 Use Case: Einfacher Onboarding-Workflow
Szenario Neuer Mitarbeiter → IT-Equipment bestellen → Email an Admin

[Manual Trigger] 
  → [HTTP: Person Details abrufen]
  → [Condition: Rolle = "Developer"?]
      Yes → [HTTP: Laptop bestellen]
      No → [HTTP: Standard-PC bestellen]
  → [HTTP: Email an IT-Admin]
  → [End]

Deliverables Phase 1
✅ Lauffähige Workflow Engine
✅ OAuth2 Login mit HR WORKS
✅ OE & Personen synchronisiert
✅ React Flow Designer mit:
   - Drag & Drop aus Node Library
   - Orthogonale Kanten mit Lösch-Icon bei Hover
   - Datenfluss-Animation auf Kanten
   - Links-nach-Rechts Layout
   - Workflow-Übersicht als Tabelle
✅ 2 Trigger-Nodes (Manual, Scheduled) + 4 Action-Nodes (HTTP, **HR WORKS**, Delay, Condition)
✅ **Workflow-Versionierung** mit Historisierung (Zeitstempel + Person)
✅ **Ausführungs-Historie** mit Input/Output pro Knoten
✅ 1 Demo-Workflow produktiv nutzbar

Phase 2: PersonTask & Advanced Triggers (Wochen 7-12)
Ziel Integration von HR WORKS PersonTasks und erweiterte Automatisierung - "Make it useful"

2.1 PersonTask Integration

Backend Implementation
PersonTask Node
  - Builder für PersonTask API-Calls
  - Validierung von Task-Daten
  - Persistierung in HR WORKS via API
  - Speichern der PersonTask-ID im Workflow-Kontext
  
PersonTask Webhook Handler
  - Empfang von PersonTask-Updates
  - Status-Mapping (offen, in Bearbeitung, erledigt, abgelehnt)
  - Workflow-Fortsetzung bei Task-Completion
  - Error Handling & Retries

Frontend
PersonTask Node UI
  - Assignee-Auswahl (Person, Rolle, VG)
  - Task-Beschreibung (Template-Editor)
  - Deadline-Konfiguration
  - Priorität

2.2 Erweiterte Trigger

Event-basierte Trigger
Person Created/Updated/Deleted
   - Webhook von HR WORKS
   - Filter nach OE, Rolle, Status
   - Payload-Mapping

OE Changed
   - Strukturänderungen
   - VG-Wechsel
   - OE-Umbenennung

Custom Webhooks
   - Generic Webhook Endpoint
   - Signature Verification
   - Custom Payload Parsing

2.3 Erweiterte Action Nodes

Data Transformation Node
   - JSON Path Expressions
   - Data Mapping
   - Aggregation Functions

Loop Node
   - Iteration über Arrays
   - Parallel vs. Sequential
   - Loop Variables

Email Node
   - Template Engine (Handlebars)
   - Recipient Logic (Person, OE, VG)
   - Attachments Support

2.4 Use Case: Offboarding-Prozess mit Tasks
Szenario Mitarbeiter verlässt Unternehmen → Mehrere Tasks an Abteilungen

[Trigger: Person Status = "Austritt"]
  → [PersonTask: IT → Geräte zurücknehmen]
  → [PersonTask: HR → Exit-Interview planen]
  → [PersonTask: Buchhaltung → Abrechnung]
  → [Condition: Alle Tasks erledigt?]
      Yes → [HTTP: Person deaktivieren]
      No → [Delay: 1 Tag] → [Email: Reminder]
  → [End]

Deliverables Phase 2
✅ PersonTask Node mit Webhook-Integration
✅ 3 Event-Trigger (Person, OE, Custom)
✅ Loop & Transformation Nodes
✅ Email-Versand
✅ 2-3 produktive Use Cases

Phase 3: Genehmigungssystem (Wochen 13-20)
Ziel Generisches Approval-System mit verschiedenen Modi - "Make it powerful"

3.1 Generisches Genehmigungsobjekt

Backend: Approval Builder
Datenmodell
    interface ApprovalRequest {
    id: string;
    workflowInstanceId: string;
    title: string;
    description: string;
    requestedBy: PersonId;
    requestedAt: DateTime;
    mode: ApprovalMode;
    approvers: Approver[];
    currentStatus: ApprovalStatus;
    responses: ApprovalResponse[];
    metadata: JSON;
  }
  
  enum ApprovalMode {
    ANY,           // First-Response-Wins
    ALL,           // Unanimous
    MAJORITY,      // >50%
    SEQUENCE       // Cascade
  }
  
  interface Approver {
    personId?: string;
    role?: string;      // "VG", "VG\OF\VG"
    order?: number;     // für SEQUENCE
  }
  

Approval Builder Service
  - Validierung der Approval-Requests
  - Persistierung in HR WORKS DB
  - Resolution von dynamischen Approvern (VG, VG von VG)
  - Status-Berechnung je nach Mode

Webhook Integration
Approval Status Changed Events
Automatische Stornierung bei First-Win/Majority
Notification Service für Approver

3.2 Approval Modes Implementierung

ANY (First-Response-Wins)
Sobald ein Approver genehmigt/ablehnt → Workflow fortsetzten
Alle anderen Approvals automatisch stornieren
Result: approved/rejected + approver

ALL (Unanimous)
Alle müssen genehmigen
Bei erster Ablehnung → sofort abgebrochen
Tracking: wer hat schon responded
Result: approved/rejected + liste aller responses

MAJORITY
Threshold: >50% der Approver
Live-Berechnung bei jeder Response
Auto-Cancel sobald Mehrheit erreicht oder unmöglich
Result: approved/rejected + vote count

SEQUENCE (Kaskade)
Order-basierte Abarbeitung
Nächster Approver wird erst freigeschaltet nach Genehmigung
Bei Ablehnung → gesamte Kette abgebrochen
Result: approved/rejected + stage

3.3 Frontend: Approval Node

Designer Configuration
Approval-Titel & Beschreibung (Template)
Mode-Auswahl (ANY/ALL/MAJORITY/SEQUENCE)
Approver Configuration
  - Direkte Personenauswahl
  - Rollen-basiert (aus HR WORKS)
  - Dynamisch: "VG von {requestingPerson}"
  - Dynamisch: "VG von VG von {requestingPerson}"
Deadline Configuration
Eskalation Rules

Approver UI (Smartface)
Pending Approvals List
Approval Detail View
Approve/Reject mit Kommentar
History & Audit Trail

3.4 Advanced Approval Features

Dynamic Approver Resolution
// Beispiel: VG von Requestor
if (approver.role === "VG") {
  const person = await getPersonById(request.requestedBy);
  const supervisor = await getPersonById(person.supervisorId);
  return supervisor;
}

// VG von VG
if (approver.role === "VG\OF\VG") {
  const person = await getPersonById(request.requestedBy);
  const supervisor = await getPersonById(person.supervisorId);
  const supervisorOfSupervisor = await getPersonById(supervisor.supervisorId);
  return supervisorOfSupervisor;
}


Delegation & Substitution
Approver kann delegieren
Urlaubsvertretung automatisch
Proxy-Approvals

Eskalation
Timeout-basiert
Eskalation an nächsthöhere Ebene
Reminder-Emails

3.5 Use Case: Urlaubsgenehmigung (Custom)
Szenario Mitarbeiter beantragt Urlaub → VG genehmigt → Bei >10 Tagen auch HR

[Trigger: Custom Form "Urlaubsantrag"]
  → [Approval Node: Mode=SEQUENCE]
      Approver 1: VG von {requestingPerson}
      Approver 2 (conditional): HR-Manager (wenn Tage > 10)
  → [Condition: Approved?]
      Yes → [HTTP: Urlaub in HR WORKS eintragen]
           → [Email: Bestätigung an Mitarbeiter]
      No → [Email: Ablehnungsgrund an Mitarbeiter]
  → [End]


3.6 Use Case: Budget-Genehmigung (Majority)
Szenario Ausgabe >5000€ → Mehrheit von 3 Geschäftsführern

[Trigger: Budget Request Form]
  → [Condition: Amount > 5000?]
      Yes → [Approval Node: Mode=MAJORITY]
              Approvers: [CEO, CFO, COO]
      No → [Approval Node: Mode=ANY]
              Approvers: [Team Lead, Department Manager]
  → [Condition: Approved?]
      Yes → [HTTP: Create PO in ERP]
      No → [Email: Rejection to Requestor]
  → [End]

Deliverables Phase 3
✅ Generisches Approval-Objekt mit Builder
✅ 4 Approval Modes (ANY, ALL, MAJORITY, SEQUENCE)
✅ Dynamische Approver-Resolution (VG, VG von VG)
✅ Approval UI in Smartface
✅ Webhook-Integration für Approval-Status
✅ Delegation & Eskalation
✅ 3-5 produktive Genehmigungsprozesse

Phase 4: Enterprise Features & Scale (Wochen 21-28)
Ziel Skalierung, Monitoring, und Advanced Features - "Make it enterprise-ready"

4.1 Monitoring & Observability

**Logging-Stack:**
| Komponente | Technologie |
|------------|-------------|
| Log-Aggregation | **ELK Stack** (Elasticsearch, Logstash, Kibana) |
| Log-Format | **Structured JSON Logging** |
| Integration | Von Anfang an eingebaut (Phase 1) |

**Structured Logging (ab Phase 1):**
```typescript
// Einheitliches Log-Format für alle Services
interface LogEntry {
  timestamp: string;
  level: 'debug' | 'info' | 'warn' | 'error';
  service: string;
  tenantId?: string;
  userId?: string;
  workflowId?: string;
  instanceId?: string;
  nodeId?: string;
  message: string;
  data?: Record<string, any>;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

// Beispiel Logger (NestJS)
import { Logger } from '@nestjs/common';

const logger = new Logger('WorkflowEngine');

logger.log(JSON.stringify({
  timestamp: new Date().toISOString(),
  level: 'info',
  service: 'workflow-engine',
  tenantId: ctx.tenantId,
  workflowId: workflow.id,
  instanceId: instance.id,
  nodeId: currentNode.id,
  message: 'Node execution completed',
  data: { duration: 123, output: result },
}));
```

**Log-Kategorien:**
- `auth` - Login, Logout, Token-Refresh
- `sync` - HR WORKS Sync Events
- `webhook` - Eingehende/Ausgehende Webhooks
- `workflow` - Workflow-Ausführungen
- `approval` - Genehmigungsprozesse
- `error` - Fehler und Exceptions

→ Details zu Dashboards, Alerting, Metriken werden später spezifiziert.

Workflow Analytics Dashboard (Phase 4)
Active Workflows (Count, Status)
Execution Times (avg, p95, p99)
Error Rates & Types
Bottleneck Detection
SLA Monitoring

Audit Trail & Compliance
Complete Execution History
Data Change Logs
User Actions
Export für Compliance (PDF, CSV)
DSGVO-konforme Datenhaltung

Error Handling & Recovery
Dead Letter Queue
Retry Strategies (exponential backoff)
Manual Intervention Points
Rollback Mechanisms
Alert System (Details später)

4.2 Advanced Node Types

Sub-Workflow Node
Workflow als wiederverwendbare Komponente
Parameter Passing
Return Values
Versioning

Parallel Execution Node
Fork-Join Pattern
Parallel Branches
Synchronization Point
Timeout Handling

Database Node
Direct DB Queries (PostgreSQL)
Insert/Update/Delete
Transaction Support
Query Builder UI

AI/LLM Node
Integration mit OpenAI/Azure OpenAI
Prompt Templates
Response Parsing
Content Moderation

4.3 Workflow-Templates & Marketplace

Template Library
Vorkonfigurierte Standard-Workflows
Kategorien (Onboarding, Offboarding, Approvals, etc.)
One-Click Import
Customization nach Import

Template Creator
Workflow als Template speichern
Parametrisierung
Documentation
Sharing innerhalb Organisation

Workflow Marketplace (Optional)
Community-geteilte Workflows
Rating & Reviews
Version Management

4.4 Advanced Trigger & Scheduling

Composite Triggers
Multiple Conditions (AND/OR)
Time-based + Event-based Kombination
Debouncing & Throttling

Smart Scheduling
Business Hours Awareness
Holiday Calendar Integration
Timezone Support
Dynamic Scheduling (z.B. "3 Tage vor Geburtstag")

4.5 Variablen & Context Management

Workflow Variables
Global Variables (über gesamten Workflow)
Node-lokale Variables
Environment Variables
Secrets Management (verschlüsselt)

Context Passing
Output von Node A als Input für Node B
JSON Path Referencing
Expression Language
Type Safety & Validation

4.6 Permissions & Multi-Tenancy

Granulare Berechtigungen
Workflow-Ownership
Edit vs. View vs. Execute Rights
OE-basierte Zugriffskontrolle
Delegate Rights

Multi-Mandanten-Fähigkeit
Isolation zwischen Organisationen
Shared Workflows (Optional)
White-Labeling
Tenant-spezifische Konfiguration

4.7 Performance & Scalability

Optimization
Workflow Caching
Database Indexing
Query Optimization
Connection Pooling

Horizontal Scaling
Stateless Backend Services
Load Balancing
Queue-based Architecture
Redis für Shared State

Rate Limiting
API Call Limits (zu HR WORKS)
Workflow Execution Limits
Per-User/Per-OE Quotas

4.8 Integration Ecosystem

Webhooks (Outbound)
Custom Webhook Nodes
Signature Signing
Retry Logic
Payload Templates

API für Externe Systeme
Public API für Workflow-Triggering
Status Queries
Webhook Registration
API Keys & OAuth2

Pre-built Connectors
Email (SMTP, Exchange, Gmail)
Slack/Teams
SharePoint/OneDrive
SAP/Datev (optional)

4.9 Testing & Quality Assurance

**Node-by-Node Testing (bereits in Phase 1)**
Play-Button an jedem Node für einzelne Ausführung
Sequentielle Abhängigkeiten: Node nur ausführbar wenn alle Vorgänger ausgeführt
Output Caching: Ergebnisse werden gespeichert und im Context Panel verfügbar
Mock Trigger Data: Trigger-Nodes können mit Test-Daten ausgeführt werden
Visuelles Status-Feedback:
  - Grau: Nicht ausführbar (Vorgänger fehlen)
  - Grün: Bereit zum Ausführen
  - Blau/Spinner: Läuft gerade
  - Grün mit Haken: Erfolgreich
  - Rot: Fehler
Output-Preview: Expandable JSON-View direkt am Node
"Run All"-Button: Führt alle Nodes in topologischer Reihenfolge aus
Cache Invalidation: Outputs werden gelöscht bei Config-Änderungen

Workflow Testing
Test Mode (Dry-Run)
Mock Data Injection
Step-by-Step Debugging
Unit Tests für Custom Nodes

Versioning
Workflow Versions
Rollback zu vorheriger Version
A/B Testing
Canary Deployments

4.10 Use Case: Komplexer Recruiting-Prozess
Szenario End-to-End Recruiting mit AI-Support

[Trigger: Bewerbung eingeht]
  → [AI Node: CV Screening & Scoring]
  → [Condition: Score > 70?]
      Yes → [Sub-Workflow: Interview-Planung]
              → [PersonTask: Termine koordinieren]
              → [Parallel Execution]
                  Branch 1: [Email: Einladung an Bewerber]
                  Branch 2: [Calendar: Meeting erstellen]
              → [Join]
      No → [Email: Absage]
  → [PersonTask: Interview durchführen]
  → [Approval: Mode=ALL]
      Approvers: [Fachbereich, HR, VG]
  → [Condition: Approved?]
      Yes → [Sub-Workflow: Vertragsstellung]
           → [HTTP: Vertrag generieren]
           → [Approval: Mode=SEQUENCE]
               1. Legal
               2. CFO
           → [Email: Vertragsangebot]
      No → [Email: Absage nach Interview]
  → [End]

Deliverables Phase 4
✅ Monitoring Dashboard mit Analytics
✅ Advanced Nodes (Sub-Workflow, Parallel, DB, AI)
✅ Template Library & Marketplace
✅ Granulare Berechtigungen
✅ Performance Optimierung & Scaling
✅ API für externe Systeme
✅ Testing & Versioning
✅ 10+ produktive Enterprise-Workflows

Technische Architektur-Details

Monorepo-Struktur (Bun Workspace)
```
workflow-automation/
├── backend/                    # NestJS Backend (Bun)
│   ├── src/
│   │   ├── auth/               # OAuth2, SSO, JWT
│   │   ├── sync/               # HR WORKS Data Sync
│   │   │   ├── persons/
│   │   │   └── organizational-units/
│   │   ├── workflow/           # Core Engine
│   │   │   ├── definition/
│   │   │   ├── instance/
│   │   │   ├── execution/
│   │   │   ├── expression/     # Expression Language Parser
│   │   │   └── nodes/
│   │   ├── triggers/           # Trigger Handlers
│   │   ├── webhooks/           # Webhook In/Out
│   │   ├── approval/           # Approval System
│   │   ├── person-task/        # PersonTask Integration
│   │   ├── monitoring/         # Metrics & Logging
│   │   └── api/                # External API
│   ├── drizzle/                # Database Migrations
│   └── package.json
│
├── frontend/                   # React Frontend (Bun)
│   ├── src/
│   │   ├── components/         # UI Components
│   │   ├── features/           # Feature Modules
│   │   ├── hooks/              # Custom Hooks
│   │   ├── stores/             # Zustand Stores
│   │   └── pages/              # Route Pages
│   └── package.json
│
├── shared/                     # Gemeinsame Code
│   ├── types/                  # TypeScript Types
│   ├── schemas/                # JSON Schemas
│   ├── utils/                  # Utility Functions
│   └── package.json
│
├── docs/                       # Dokumentation
│   ├── api/
│   ├── architecture/
│   └── guides/
│
├── package.json                # Root package.json
└── bun.lockb                   # Bun Lockfile
```

Backend Services (NestJS + Bun)


Database Schema (Drizzle ORM)

**Landlord DB Schema** (`shared/db/landlord-schema.ts`):
```typescript
import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

// Nur Tenant-Metadaten in der Landlord-DB
export const tenants = pgTable('tenants', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(), // Für URLs/Identifikation (z.B. "acme-corp")
  dbUrl: text('db_url').notNull(),
  region: text('region').default('eu-central'),
  status: text('status').default('active'), // active, suspended, deleted
  plan: text('plan').default('free'), // free, pro, enterprise
  hrworksCompanyId: text('hrworks_company_id'), // Referenz zu HR WORKS
  createdAt: timestamp('created_at').defaultNow(),
});
```

**Tenant DB Schema** (`shared/db/tenant-schema.ts`):
```typescript
import { pgTable, uuid, text, timestamp, jsonb, boolean, integer } from 'drizzle-orm/pg-core';

// Users (tenant-spezifisch)
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').unique().notNull(),
  passwordHash: text('password_hash'),
  firstName: text('first_name'),
  lastName: text('last_name'),
  role: text('role').default('member'), // admin, workflow-admin, member
  hrworksPersonId: text('hrworks_person_id'), // Verknüpfung zu HR WORKS Person
  isActive: boolean('is_active').default(true),
  lastLoginAt: timestamp('last_login_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Workflow Definitions (aktueller Stand)
export const workflowDefinitions = pgTable('workflow_definitions', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  currentVersion: integer('current_version').default(1),
  graph: jsonb('graph'), // { nodes: Node[], edges: Edge[] }
  isActive: boolean('is_active').default(true),
  isTemplate: boolean('is_template').default(false),
  createdBy: uuid('created_by'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Workflow Versions (Historisierung)
export const workflowVersions = pgTable('workflow_versions', {
  id: uuid('id').defaultRandom().primaryKey(),
  workflowId: uuid('workflow_id').references(() => workflowDefinitions.id).notNull(),
  version: integer('version').notNull(),
  graph: jsonb('graph').notNull(), // Snapshot des Graphs zum Zeitpunkt
  name: text('name'), // Name zum Zeitpunkt (kann sich ändern)
  description: text('description'),
  savedBy: uuid('saved_by').notNull(), // Wer hat gespeichert
  savedAt: timestamp('saved_at').defaultNow().notNull(),
  changeNote: text('change_note'), // Optionale Änderungsnotiz
});

// Index für schnelle Abfragen
// CREATE INDEX idx_workflow_versions_workflow ON workflow_versions(workflow_id, version DESC);

// Workflow Instances (laufende Workflows)
export const workflowInstances = pgTable('workflow_instances', {
  id: uuid('id').defaultRandom().primaryKey(),
  definitionId: uuid('definition_id').references(() => workflowDefinitions.id),
  status: text('status').default('running'), // running, paused, completed, failed
  context: jsonb('context'), // Alle Workflow-Variablen
  triggeredBy: uuid('triggered_by'),
  startedAt: timestamp('started_at').defaultNow(),
  completedAt: timestamp('completed_at'),
});

// Node Executions (einzelne Node-Ausführungen)
export const workflowExecutions = pgTable('workflow_executions', {
  id: uuid('id').defaultRandom().primaryKey(),
  instanceId: uuid('instance_id').references(() => workflowInstances.id),
  nodeId: text('node_id').notNull(),
  input: jsonb('input'),
  output: jsonb('output'),
  error: jsonb('error'),
  retryCount: integer('retry_count').default(0),
  startedAt: timestamp('started_at').defaultNow(),
  completedAt: timestamp('completed_at'),
});

// Approval Requests
export const approvalRequests = pgTable('approval_requests', {
  id: uuid('id').defaultRandom().primaryKey(),
  instanceId: uuid('instance_id').references(() => workflowInstances.id),
  nodeId: text('node_id').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  mode: text('mode').notNull(), // ANY, ALL, MAJORITY, SEQUENCE
  approvers: jsonb('approvers'), // [{ personId, role, order }]
  responses: jsonb('responses'), // [{ approverId, decision, comment, at }]
  status: text('status').default('pending'), // pending, approved, rejected
  createdAt: timestamp('created_at').defaultNow(),
  resolvedAt: timestamp('resolved_at'),
});

// Person Tasks (HR WORKS Integration)
export const personTasks = pgTable('person_tasks', {
  id: uuid('id').defaultRandom().primaryKey(),
  instanceId: uuid('instance_id').references(() => workflowInstances.id),
  nodeId: text('node_id').notNull(),
  hrworksTaskId: text('hrworks_task_id'), // Referenz zu HR WORKS
  assigneeId: text('assignee_id').notNull(),
  status: text('status').default('open'), // open, in_progress, completed, rejected
  createdAt: timestamp('created_at').defaultNow(),
  completedAt: timestamp('completed_at'),
});

// Synced Data from HR WORKS
export const syncedPersons = pgTable('synced_persons', {
  id: uuid('id').defaultRandom().primaryKey(),
  hrworksPersonId: text('hrworks_person_id').unique().notNull(),
  email: text('email'),
  firstName: text('first_name'),
  lastName: text('last_name'),
  role: text('role'),
  supervisorId: text('supervisor_id'),
  organizationUnitId: text('organization_unit_id'),
  lastSyncedAt: timestamp('last_synced_at').defaultNow(),
});

export const syncedOrganizationUnits = pgTable('synced_organization_units', {
  id: uuid('id').defaultRandom().primaryKey(),
  hrworksOuId: text('hrworks_ou_id').unique().notNull(),
  name: text('name').notNull(),
  parentId: text('parent_id'),
  lastSyncedAt: timestamp('last_synced_at').defaultNow(),
});

// Credentials (encrypted)
export const credentials = pgTable('credentials', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(), // hrworks, smtp, slack, etc.
  encryptedData: text('encrypted_data').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
```

**Tenant DB Manager** (`backend/src/db/tenant-manager.ts`):
```typescript
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import Database from 'better-sqlite3';
import { Pool } from 'pg';
import { eq } from 'drizzle-orm';
import * as landlordSchema from '@shared/db/landlord-schema';
import * as tenantSchema from '@shared/db/tenant-schema';

const isDev = process.env.NODE_ENV === 'development';

// Tenant DB Connection Cache
const tenantConnections = new Map();

export async function getTenantDB(tenantId: string) {
  if (tenantConnections.has(tenantId)) {
    return tenantConnections.get(tenantId);
  }

  if (isDev) {
    // SQLite für Development
    const db = drizzleSqlite(
      new Database(`./dev-tenants/tenant_${tenantId}.db`),
      { schema: tenantSchema }
    );
    tenantConnections.set(tenantId, db);
    return db;
  } else {
    // PostgreSQL für Production
    const tenant = await landlordDB
      .select()
      .from(landlordSchema.tenants)
      .where(eq(landlordSchema.tenants.id, tenantId))
      .limit(1);

    const pool = new Pool({ connectionString: tenant[0].dbUrl });
    const db = drizzlePg(pool, { schema: tenantSchema });
    tenantConnections.set(tenantId, db);
    return db;
  }
}
```

**JWT Auth Guard** (`backend/src/auth/jwt-auth.guard.ts`):
```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies['auth_token'];

    if (!token) return false;

    try {
      const payload = await this.jwtService.verifyAsync(token);
      // Attach tenant_id und user info zum Request
      request['user'] = {
        userId: payload.sub,
        tenantId: payload.tenant_id,
        email: payload.email,
        role: payload.role,
      };
      return true;
    } catch {
      return false;
    }
  }
}
```

**Tenant Context Decorator** (`backend/src/common/decorators/tenant.decorator.ts`):
```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const TenantId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.tenantId;
  },
);

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
```

**Usage in Controller:**
```typescript
@Controller('workflows')
@UseGuards(JwtAuthGuard)
export class WorkflowsController {
  constructor(private workflowsService: WorkflowsService) {}

  @Get()
  async getWorkflows(@TenantId() tenantId: string) {
    const db = await getTenantDB(tenantId);
    return db.select().from(workflowDefinitions);
  }
}
```

Frontend Architecture (Smartface + React Flow)

Screen Structure
screens/
├── auth/
│   └── LoginScreen.tsx           # SSO Login
├── workflows/
│   ├── WorkflowListScreen.tsx    # Alle Workflows
│   ├── WorkflowDetailScreen.tsx  # Einzelner Workflow
│   └── WorkflowDesignerScreen.tsx # React Flow Editor
├── approvals/
│   ├── ApprovalListScreen.tsx    # Pending Approvals
│   └── ApprovalDetailScreen.tsx  # Approve/Reject
├── tasks/
│   ├── TaskListScreen.tsx        # PersonTasks
│   └── TaskDetailScreen.tsx      # Task bearbeiten
├── monitoring/
│   └── DashboardScreen.tsx       # Analytics
└── settings/
    └── SettingsScreen.tsx        # Konfiguration


React Flow Custom Nodes
// Beispiel: Approval Node
const ApprovalNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div className="approval-node">
      <div className="node-header">
        <Icon name="check-circle" />
        <span>Genehmigung</span>
      </div>
      <div className="node-body">
        <p>{data.title}</p>
        <Badge>{data.mode}</Badge>
        <span>{data.approvers.length} Genehmiger</span>
      </div>
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </div>
  );
};


API Integration mit HR WORKS

Synchronisation Flow
Initial Sync beim App-Start
   GET /api/organizational-units → Alle OEs
   GET /api/persons → Alle Personen
   
Webhook Registration
   POST /api/webhooks
   {
     "event": "person.updated",
     "url": "https://workflow.hrworks.de/webhooks/person"
   }
   
Delta-Updates via Webhooks
   HR WORKS → POST /webhooks/person
   {
     "event": "person.updated",
     "person\_id": "12345",
     "changes": {...}
   }


PersonTask Builder
// Service in HR WORKS
class PersonTaskBuilder {
  validate(taskData: PersonTaskRequest): boolean {
    // Validierung: Assignee existiert?
    // Deadline in Zukunft?
    // Beschreibung vorhanden?
  }
  
  persist(taskData: PersonTaskRequest): PersonTask {
    // Speichern in HR WORKS DB
    // Webhook erstellen für Status-Changes
    // Notification an Assignee
  }
}

// Aufruf aus Workflow
POST /api/person-tasks
{
  "title": "Geräte zurücknehmen",
  "assignee\_id": "67890",
  "description": "Laptop und Handy von {{person.name}}",
  "deadline": "2025-02-15",
  "metadata": {
    "workflow\instance\id": "abc-123"
  }
}


Approval Builder
// Service in HR WORKS
class ApprovalBuilder {
  validate(approvalData: ApprovalRequest): boolean {
    // Mindestens 1 Approver?
    // Mode valide?
    // Bei SEQUENCE: Order gesetzt?
  }
  
  persist(approvalData: ApprovalRequest): Approval {
    // Speichern in HR WORKS DB
    // Approver resolven (VG, etc.)
    // Webhooks erstellen
    // Notifications versenden
  }
  
  resolveApprover(approver: Approver, context: Context): Person {
    if (approver.role === "VG") {
      return getSupervisor(context.requestedBy);
    }
    if (approver.role === "VG\OF\VG") {
      const vg = getSupervisor(context.requestedBy);
      return getSupervisor(vg.id);
    }
    return getPerson(approver.personId);
  }
}


Rollout-Strategie

Phase 1: Closed Beta (2-3 Kunden)
Ausgewählte Power-User
Intensive Betreuung
Feedback-Loops
Bug Fixes & Quick Wins

Phase 2: Open Beta (10-20 Kunden)
Breitere Nutzergruppe
Self-Service Onboarding
Template Library verfügbar
Community Feedback

Phase 3: General Availability
Alle HR WORKS Kunden
Marketplace aktiviert
Premium Features (AI, Advanced Analytics)
Professional Services für Custom Workflows

Risiken & Mitigationen

Technische Risiken
Risiko Performance-Probleme bei vielen parallelen Workflows
Mitigation: Queue-basierte Architektur, Horizontal Scaling, Load Tests ab Phase 2
Risiko Webhook-Verluste (Network Issues)
Mitigation: Retry-Logic, Dead Letter Queue, Idempotenz-Checks
Risiko Race Conditions bei Approvals (MAJORITY Mode)
Mitigation: Optimistic Locking, Transaction Isolation, Event Sourcing

Business Risiken
Risiko Zu komplexe UI → niedrige Adoption
Mitigation: Template Library, Guided Tutorials, 1-Click-Workflows
Risiko Feature Creep → verzögerter Launch
Mitigation: Strikte Phasen-Trennung, MVP-First Mindset, Feature Freeze vor Release
Risiko Integration-Probleme mit HR WORKS API
Mitigation: Enge Abstimmung mit HR WORKS Backend-Team, Feature Flags, Graceful Degradation

Success Metrics

Phase 1 (MVP)
✅ 3 Kunden nutzen mindestens 1 Workflow produktiv
✅ <5% Error Rate bei Workflow-Ausführungen
✅ <2s durchschnittliche Ladezeit im Designer

Phase 2 (PersonTasks)
✅ 50% der Kunden nutzen PersonTask-Workflows
✅ >80% Task-Completion-Rate
✅ 10+ verschiedene Workflow-Typen im Einsatz

Phase 3 (Approvals)
✅ 100+ Genehmigungsprozesse aktiv
✅ <24h durchschnittliche Approval-Zeit
✅ 90% Approver-Zufriedenheit

Phase 4 (Enterprise)
✅ 500+ aktive Workflows
✅ 99.9% Uptime
✅ <100ms API Response Time (p95)
✅ 5+ Templates im Marketplace

Team & Ressourcen

**Aktuelles Team (PoC Phase):**
- **3 Personen** + Claude Code (Vibe-Engineering)
- **Ziel:** PoC in 2 Wochen
- **Ansatz:** Schnell bauen, später optimieren, Scope bei Bedarf reduzieren

Empfohlenes Team (später, für Scale)
1x Tech Lead (NestJS, Architektur)
2x Backend Engineers (NestJS, PostgreSQL, APIs)
2x Frontend Engineers (Smartface, React Flow)
1x DevOps Engineer (CI/CD, Monitoring, Scaling)
1x Product Owner (Requirements, Priorisierung)
1x QA Engineer (Testing, Automation)

Tools & Infrastructure
Code: GitHub/GitLab
CI/CD: GitHub Actions / Jenkins
Hosting: AWS/Azure/GCP (Kubernetes)
Monitoring: Grafana, Prometheus, Sentry
Docs: Confluence/Notion
Communication: Slack/Teams

Timeline Übersicht

| Phase | Wochen | Meilenstein | Go-Live |
|-------|--------|-------------|---------|
| Phase 1 | 1-6 | MVP mit Basic Workflows | Closed Beta |
| Phase 2 | 7-12 | PersonTask Integration | Open Beta (10 Kunden) |
| Phase 3 | 13-20 | Approval System | General Availability |
| Phase 4 | 21-28 | Enterprise Features | Premium Tier |
Gesamtdauer 28 Wochen (~7 Monate)

Nächste Schritte

Kickoff Meeting mit gesamtem Team
Technische Spezifikation für Phase 1 detaillieren
UI/UX Mockups für Designer & Smartface Screens
HR WORKS API Alignment (Webhooks, Builder)
Development Environment Setup (NestJS, Smartface, DB)
Sprint Planning für erste 2 Wochen