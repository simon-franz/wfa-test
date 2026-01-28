Hier sind die Requirement-Specs, die ich aus dem Dokument für dich extrahiert und ausformuliert habe – strukturiert nach Phasen, damit du sie einem LLM übergeben kannst:

---

## Technische Entscheidungen (Finalisiert)

### Projektstruktur
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

### Technologie-Stack
| Bereich | Entscheidung | Begründung |
|---------|--------------|------------|
| Runtime | **Bun** | Schneller als Node.js, native TypeScript-Support |
| Backend-Framework | **NestJS** | Modulare Architektur, TypeScript-first |
| ORM | **Drizzle** | Type-safe, Multi-Dialect (SQLite/PostgreSQL), Performance |
| Datenbank | **PostgreSQL** (Prod), **SQLite** (Dev) | Schnelle lokale Entwicklung, robust in Production |
| Queue-System | **BullMQ** | Benötigt Valkey (Redis-Fork), robust für async Jobs |
| State-Management | **Zustand** | Einfacher als Redux, weniger Boilerplate |
| Frontend | **Vite + React** | Schnelles Build-Tool, React 18 SPA |
| UI-Framework | **SmartFace** | HR WORKS Design-System, shadcn-ähnlich |
| Workflow-Designer | **React Flow** | Bewährt (n8n, make.com) |
| Routing | **react-router-dom** | Client-seitiges Routing |
| Echtzeit-Updates | **Server-Sent Events (SSE)** | Unidirektionale Streams für Execution Updates, geringere Last als Polling. Library: `@microsoft/fetch-event-source` |
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

### Tenant-Provisioning (via API)
**Automatische Tenant-Erstellung aus HR WORKS:**
```typescript
// POST /api/tenants
// Header: X-Provisioning-Secret: <shared-secret>
{
  "slug": "acme-corp",
  "name": "Acme Corporation",
  "hrworksCustomerId": "123",
  "apiKey": "...",
  "apiSecret": "...",
  "baseUrl": "api.hrworks.de"
}
```

**Ablauf:**
1. HR WORKS erstellt API-Key-Pair für Kunden
2. HR WORKS ruft Provisioning-API mit Shared Secret auf
3. Workflow-App validiert Secret (`PROVISIONING_SECRET` env var)
4. Erstellt Tenant in Landlord-DB + neue Tenant-DB
5. Speichert verschlüsselte HR WORKS Credentials
6. Initial Sync (Persons, OEs) - async
7. Registriert Webhooks bei HR WORKS - async

**Sicherheit:** Shared Secret zwischen HR WORKS und Workflow-App, verschlüsselte Credential-Speicherung

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
- Session Management mit JWT Token Handling
- **Rollen-System (4 Ebenen)**:

| Rolle | Scope | Berechtigungen |
|-------|-------|----------------|
| **server_admin** | Global (Landlord-DB) | Mandanten anlegen/löschen/verwalten, System-Konfiguration, alle Tenants sehen |
| **consultant** | Global (Marketplace) | Workflows in Marketplace publizieren, Template-Verwaltung, Tenant-übergreifend |
| **master_admin** | Tenant-spezifisch | Volle Rechte im eigenen Mandanten, User-Verwaltung, Billing, Settings |
| **workflow-administrator** | Tenant-spezifisch | Workflows erstellen/bearbeiten/löschen/ausführen, Executions sehen, keine User-Verwaltung |

- **Zugriffsbeschränkung**: Nur Personen mit Rolle `workflow-administrator` oder `master_admin` aus HR WORKS dürfen sich in der Workflow-Automation App anmelden
- **Andere HR WORKS User**: Haben keinen direkten Zugriff auf die App (Integration in HR WORKS Oberfläche kommt später)

- **JWT Payload erweitert**:
```json
{
  "sub": "user_uuid",
  "tenant_id": "tenant_uuid",  // null für server_admin/consultant
  "email": "user@company.de",
  "role": "workflow-administrator",
  "global_role": "consultant",  // Optional: für Consultants mit Tenant-Zugriff
  "iat": 1234567890,
  "exp": 1234567890
}
```

- **API-Authentifizierung (alle AJAX/Fetch-Calls)**:
  - JWT-Token wird als **HttpOnly Cookie** gespeichert (`auth_token`)
  - Cookie wird automatisch bei jedem Request mitgesendet
  - Backend validiert Cookie via `JwtAuthGuard`
  - **Kein manuelles Setzen des Authorization-Headers nötig** (Cookie-basiert)
  - Bei SSE (Server-Sent Events): Token muss explizit im Header mitgegeben werden

```typescript
// Frontend: API-Client mit automatischem Cookie-Handling
const api = {
  async getWorkflows() {
    // Cookie wird automatisch mitgesendet
    const response = await fetch('/api/workflows', {
      credentials: 'include', // Wichtig: Cookies mitsenden
    });
    return response.json();
  },
  
  // SSE: Token explizit im Header
  connectToExecutionStream(executionId: string) {
    return new EventSource(`/api/executions/${executionId}/stream`, {
      withCredentials: true, // Cookie mitsenden
    });
  }
};
```

- **Development Login Bypass**:
  - Zusätzlicher "Dev Login" Button im Login-Screen (nur sichtbar wenn `NODE_ENV=development`)
  - Erstellt direkt ein JWT-Token mit Mock-User-Daten ohne OAuth2-Flow
  - Mock-User hat vorkonfigurierte Tenant-ID und Admin-Rechte
  - Ermöglicht schnelles Testen ohne HR WORKS OAuth2-Setup
  - **Wichtig**: Dieser Button darf in Production NICHT verfügbar sein (Environment-Check im Backend!)

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

### Engine Testing (Unit & Integration Tests)
**Unit Tests:**
- Node-Execution-Logik für jeden Node-Typ (HTTP, Condition, Data Transform, Delay)
- Condition-Evaluation: JSONata-Expressions, Multi-Condition First-Match-Logic
- Template-Resolution: `{{variable}}` Platzhalter, verschachtelte Pfade
- Context-Scope-Resolution: `{{global.*}}`, `{{workflow.*}}`, `{{execution.*}}`
- Error-Handling: Error-Branch, Retry-Logic, Timeout-Handling
- Data-Transformation: count, filter, map, reduce, sort, distinct

**Integration Tests:**
- End-to-End Workflow-Ausführung (Linear-Flow: Trigger → Action → Action → End)
- Branching-Szenarien: Condition mit mehreren Pfaden, First-Match-Verhalten
- Error-Branch-Handling: Fehler in Node → Error-Output → Fallback-Pfad
- Delay-Node mit BullMQ: Job-Scheduling, Resume nach Delay
- HR WORKS Node: Gemockte API-Calls, Async-Job-Handling, Token-Refresh
- Context-Passing: Output von Node A als Input in Node B

**Test-Framework:**
- Vitest für Unit/Integration Tests
- Supertest für API-Tests
- Mock-Services für externe APIs (HR WORKS, Email)

### Designer UI (Frontend)

**Node-Darstellung (kompakt & professionell):**
- **Kompakte Nodes**: Icon + Label + Kurzbeschreibung (max. 2 Zeilen)
- **Farbcodierung nach Typ**:
  - Trigger: Blau
  - HR WORKS: Orange/Coral
  - Transformation: Lila
  - Condition: Gelb
  - Action: Grün
- **Play-Button**: Grüner Play-Button oben rechts am Node (nur im Test-Modus)
- **Status-Indicator**: Kleines Icon unten links (✓ success, ✗ error, ⏳ running)
- **Keine technischen Details** im Node selbst (z.B. "action.hrworks" oder "Node Type")

**Edges (Verbindungslinien):**
- **Gestrichelte Linien** (nicht durchgezogen)
- **Animierte Datenfluss-Visualisierung**: Punkte/Striche bewegen sich entlang der Linie
- **Bezier-Kurven** für natürliche Verbindungen
- **Hover-Effekt**: Linie wird dicker, Lösch-Icon erscheint
- **Farbe**: Grau (neutral), bei Hover: Primärfarbe

**Node Configuration Panel (benutzerfreundlich, KEIN JSON!):**
- **Rechte Sidebar** öffnet sich beim Klick auf Node
- **Strukturierte Felder** statt JSON-Textfeld:
  - **Name**: Einfaches Text-Input
  - **Einstellungen**: Gruppiert nach Kategorie
  - **Dropdowns** für Auswahlfelder (z.B. "API Endpoint", "Operation")
  - **Parameter-Felder**: Dynamisch basierend auf gewähltem Endpoint
  - **Variable Picker Button** (🔗) neben jedem Input-Feld
- **Beispiel HR WORKS Node**:
  ```
  Name: [HR WORKS                    ]
  
  Einstellungen
  ─────────────
  API Endpoint: [Person nach ID abrufen  ▼]
  
  Parameter
  ─────────────
  Person ID *:  [z.B. {{trigger.id}}     ] 🔗
  
  [Knoten löschen]  [Speichern]
  ```
- **Beispiel Data Transformation Node**:
  ```
  Name: [Daten-Transformation        ]
  
  Einstellungen
  ─────────────
  Operation:    [Anzahl (Count)         ▼]
                - Anzahl (Count)
                - Feld extrahieren
                - Filtern
                - Transformieren (Map)
                - Summe
                - Durchschnitt
  
  Input:        [{{HR WORKS.output.persons}}] 🔗
  
  [Knoten löschen]  [Speichern]
  ```

**WICHTIG: Keine generischen Felder wie:**
- ❌ "Node Type: action.transform"
- ❌ "Configuration (JSON)"
- ❌ "Enter configuration (JSON)"
- ✅ Stattdessen: Spezifische, benutzerfreundliche Felder pro Node-Typ

- Canvas mit Drag & Drop
- Node Palette (Start, Action, End)
- Connection Drawing zwischen Nodes
- **Echtzeit-Execution-Updates via SSE**:
  - Backend sendet Live-Updates während Workflow-Ausführung über Server-Sent Events
  - Frontend verwendet `@microsoft/fetch-event-source` mit `withCredentials: true`
  - Node-Status-Updates in Echtzeit (running, success, error)
  - Ersetzt Polling-Mechanismus (reduziert Backend-Load)
  - Automatische Reconnect-Logik bei Verbindungsabbruch
- **Context Panel / Variable Picker**: 
  - Zeigt Outputs aller vorherigen Nodes im Workflow als **expandable Tree-View**
  - **Array-Navigation**: Unterstützt Array-Indexierung ([0], [1], etc.) zum Zugriff auf Array-Elemente
  - **Wert-Anzeige**: Zeigt tatsächliche Werte für primitive Typen (Strings, Numbers, Booleans)
  - **Klickbar auf allen Ebenen**: Arrays, Objekte und Leaf-Nodes können angeklickt werden zum Einfügen des Pfads
  - **Array-Metadaten**: Zeigt Array-Länge und Typ-Informationen
  - Klickbar zum Einfügen von Variablen-Referenzen (z.B. `{{node_name.output.field}}`)
  - Syntax-Highlighting für JSON
  - Filterfunktion zum Suchen von Feldern
  - Wird beim Klick in Input-Felder als Overlay/Sidebar angezeigt
- **Node-by-Node Testing (Play-Button)**:
  - Jeder Node hat einen Play-Button zum einzelnen Ausführen
  - Play-Button nur aktiv, wenn alle vorherigen Nodes ausgeführt wurden
  - Sequentielle Ausführung: A → B → C (B erst nach A, C erst nach B)
  - Output wird im Node gespeichert und im Context Panel verfügbar
  - Visuelles Feedback: Node zeigt Status
    - `pending`: Noch nicht ausgeführt (grau)
    - `running`: Wird gerade ausgeführt (blau/spinner)
    - `waiting`: Wartet auf externes Event (gelb/orange) - für Delay, Approval, PersonTask
    - `success`: Erfolgreich abgeschlossen (grün/Haken)
    - `error`: Fehlgeschlagen (rot/X)
  - **Input/Output-Preview unterhalb des Nodes (Tabs)**:
    - Expandable Section unterhalb des Node-Körpers
    - **2 Tabs**: "Input" und "Output"
    - JSON-Darstellung mit Syntax-Highlighting
    - Ein-/ausklappbare Objekte und Arrays
    - Nur sichtbar nach Node-Ausführung
    - Kann minimiert/maximiert werden
  - "Run All"-Button zum Ausführen aller Nodes in Reihenfolge
  - Cached Outputs bleiben erhalten bis Workflow-Definition ändert
- **Template Placeholder System**:
  - Syntax: `{{NodeName.output.field}}` für Variablen-Referenzen
  - Funktioniert in Manual Test und Workflow Execution
  - Unterstützt verschachtelte Strukturen (nested objects/arrays)
  - Backend-Methode `getValueByPath()` für Pfad-Auflösung
  - Context-Button in Input-Feldern öffnet Context Panel
- **Canvas Controls**:
  - Zoom-Steuerung (-, Prozentanzeige, +)
  - Undo/Redo-Buttons
  - Vollbild-Toggle
  - Auto-Layout-Funktion für automatische Node-Anordnung
  - Hilfe-Button
  - Grüner "+" FAB-Button zum Hinzufügen neuer Knoten
- **Context Menu für Nodes**:
  - Rechtsklick auf Node öffnet Context Menu
  - Optionen: Duplizieren, Löschen, Konfigurieren, Testen
  - Keyboard-Shortcuts (z.B. Delete-Taste)
- **Deletable Edges**:
  - Hover über Edge zeigt Lösch-Icon
  - Klick auf Icon entfernt die Verbindung
  - Bestätigungsdialog bei kritischen Verbindungen
- Workflow Speichern/Laden
- **Workflow Export (JSON)**:
  - Export der kompletten Workflow-Definition als JSON-Datei
  - Enthält alle Nodes, Edges und Konfigurationen
  - Download als `.json` Datei über Button im Designer oder Workflow-Übersicht
  - Format: Standardisiertes JSON-Schema für Portabilität
- **Workflow Import (JSON)**:
  - Import einer zuvor exportierten JSON-Datei
  - Validierung des Imports (Schema-Validierung, Node-Typ-Prüfung)
  - Erstellt neuen Workflow aus Import mit eindeutigem Namen
  - Konflikt-Handling bei doppelten Namen (automatische Umbenennung)
  - Fehlerbehandlung mit aussagekräftigen Fehlermeldungen
- **Workflow Duplizieren**:
  - Duplizieren-Button in der Workflow-Übersicht (Tabellen-Aktionen) und im Designer-Toolbar
  - Erstellt vollständige Kopie mit neuem Namen (z.B. "Original Name (Kopie)")
  - Kopiert alle Nodes, Edges und Konfigurationen
  - Neue IDs für alle Elemente (keine Referenz-Konflikte)
  - Öffnet duplizierten Workflow direkt im Designer

### Workflow-Übersicht & Navigation
- **Workflow-Liste als Tabelle** (statt Karten):
  - Spalten: Name, Beschreibung, Status (Badge), Aktualisiert (Datum/Zeit), Aktionen
  - Status-Badges mit Farben: Aktiv (grün), Inaktiv (gelb), Entwurf (grau)
  - Action-Buttons pro Zeile: Historie, Ausführen, Duplizieren, Export, Löschen
  - "Import Workflow" Button im Header der Tabelle (neben "Neuer Workflow")
  - Klick auf Zeile öffnet Workflow-Designer
- **Workflow-Designer Toolbar**:
  - Buttons: Historie, Ausführen (mit Play-Icon), Aktivieren/Deaktivieren, Speichern
  - Historie-Button navigiert zur Ausführungshistorie
  - Zurück-Navigation von Historie zum Designer
- **Ausführungshistorie-Seite** (`/workflows/:id/executions`):
  - **Split-Layout**: Liste links (350px), Details rechts
  - **Ausführungsliste (Sidebar links)**:
    - Zurück-Button zum Designer (← Zurück)
    - **Filter-Bereich**:
      - Status-Filter: Alle / Erfolgreich / Fehlgeschlagen / Läuft
      - Datums-Filter: Zeitraum auswählen (von-bis)
    - **Execution-Liste** (scrollbar):
      - Nummerierte Einträge (#1, #2, #3) mit Badge
      - Datum/Zeit, Status-Badge (Erfolgreich/Fehlgeschlagen/Läuft)
      - Execution-ID (monospace)
      - Klick lädt Details rechts
  - **Detail-Panel (rechts)**:
    - **Workflow-Diagramm (oben)**:
      - Visueller Graph der ausgeführten Nodes (wie im Designer)
      - Nodes zeigen Status-Farben (grün=success, rot=error, grau=skipped)
      - Read-only Ansicht (kein Editing)
      - Zoom-Controls
      - Zeigt tatsächlich ausgeführten Pfad (bei Conditions nur gematchte Branch)
    - **Node-Details (unten)**:
      - Header: Status, Start-/Endzeit, Fehlermeldung
      - **Node-Liste** (aufklappbar):
        - Node-Header: Expand-Icon (▶/▼), Node-Icon (Emoji), Node-Name (lesbar), Startzeit, Status-Badge
        - Node-Content (ausgeklappt):
          - **Output**: Interaktiver JSON-Viewer mit ein-/ausklappbaren Objekten/Arrays
          - **Fehler**: Fehlermeldung (falls vorhanden)
          - **Metadaten**: Timestamps, Dauer
      - **JSON-Viewer Features**:
        - Syntax-Highlighting (Keys blau, Strings rot, Numbers grün, Booleans/Null blau)
        - Ein-/Ausklappbare Objekte und Arrays (▶/▼ Icons)
        - Item/Key-Zähler bei eingeklappten Elementen ("3 items", "5 keys")
        - Einrückung für Hierarchie
        - Hover-Effekte auf Toggle-Icons
  - **Node-Namen-Mapping**:
    - `condition-123456` → "Bedingung"
    - `hrworks-1` → "HR WORKS"
    - `data-transform-123` → "Daten-Transformation"
    - `manual-trigger` → "Manueller Trigger"
  - **Node-Icons**:
    - ▶️ Trigger/Manueller Trigger
    - ⏰ Geplanter Trigger
    - 🔀 Bedingung
    - 👤 HR WORKS
    - 🔄 Daten-Transformation
    - 🌐 HTTP Request
    - ⏱️ Verzögerung
    - ⚙️ Standard (unbekannt)
- **Workflow-Ausführung**:
  - Echtzeit-Updates via SSE (Server-Sent Events)
  - Node-Status-Updates live (completed → success, failed → error)
  - Keine automatischen Retries (attempts: 1)
  - Checkmarks/Error-Icons während Ausführung
  - Alert nach Abschluss (Erfolg/Fehler)

### UI-Spezifikationen (Detail)

#### Workflow-Übersicht
- **Darstellung als Tabelle** mit Spalten für Name, Beschreibung, Status (Badge), Aktualisiert (Datum/Zeit), Aktionen
- Status-Badges: Aktiv (grün), Inaktiv (gelb), Entwurf (grau)
- Action-Buttons: Historie, Ausführen, Löschen
- Klick auf Zeile öffnet Workflow-Designer
- Pro Workflow darf es **nur einen Trigger-Knoten** geben (Validierung im Designer)

#### Workflow-Designer Layout

**Visueller Graph-Editor:**
- Knoten-basierter Editor mit Drag-and-Drop-Funktionalität
- **Drag & Drop aus Library**: Komponenten können aus einer seitlichen "Library" in den Designer gezogen werden
- Knoten werden durch Verbindungslinien (Edges) verknüpft
- Unterstützung für verschiedene Knotentypen (z.B. Jira, HR WORKS, Condition, API-Calls)
- Jeder Knoten zeigt eine Vorschau seines Inhalts/Konfiguration
- **Horizontale Anordnung** des Workflows von links nach rechts (immer!)

**Verbindungslinien (Edges):**
- **Bezier-Kurven** für natürliche, geschwungene Verbindungen
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

### Trigger Nodes (Phase 1)
- Manual Trigger: Workflow manuell starten, Input-Parameter definierbar, für Testing & Debugging
- Scheduled Trigger: Cron-basierte Ausführung, Zeitzone-Handling, einfache Intervalle (täglich, wöchentlich)

### Error Handling für externe Systeme (Phase 1)
**Nur für Nodes die mit externen Systemen kommunizieren:**
- HTTP Request Node
- HR WORKS Node
- Email Node (Phase 2)
- Webhook Node (Phase 2)

**Nicht für interne Nodes** (Delay, Condition, Data Transformation, Trigger).

- **Error Branch (On Error)**:
  - Optionaler Error-Output-Handle für Fallback-Logik
  - Konfigurierbare Fehlerbehandlung:
    - `stop`: Workflow stoppt bei Fehler (Default)
    - `continue`: Fehler ignorieren, nächster Node wird ausgeführt
    - `fallback`: Error-Branch ausführen (separater Pfad)
  - Error-Output enthält: `errorMessage`, `errorCode`, `nodeId`, `timestamp`
  - Visuell: Roter Error-Handle am unteren Rand des Nodes
- **Retry-Konfiguration**:
  - `retryCount`: Anzahl der Wiederholungsversuche (0-5, Default: 0)
  - `retryDelay`: Wartezeit zwischen Retries in ms (Default: 1000)
  - `retryBackoff`: Exponentieller Backoff-Faktor (Default: 2)
  - Retry nur bei: 5xx Server-Fehler, Timeout, Network Error
  - Keine Retries bei 4xx Client-Fehlern
- **Timeout-Konfiguration**:
  - `timeout`: Maximale Wartezeit auf Response in ms (Default: 30000)
  - Bei Timeout: Error mit `errorCode: 'TIMEOUT'`

### Action Nodes (Phase 1)
- HTTP Request Node: GET/POST/PUT/DELETE zu HR WORKS API, Header Configuration, Body Template (Handlebars), Response Mapping, **Timeout & Retry Settings**
- **HR WORKS Node**: Dedizierter Knoten für HR WORKS Integration (Details siehe unten)
- **Data Transformation Node**: 
  - Operationen für Datenverarbeitung: count, filter, map, reduce, sort, distinct
  - JSONPath-Expressions für Daten-Extraktion
  - Wrapping von Ergebnissen in Objekte für Context-Nutzung
  - Aggregations-Funktionen
  - Array-Manipulation
- Delay Node: Zeitverzögerung (Minuten, Stunden, Tage), Pause & Resume, Persistente Delays mit BullMQ
- **Condition Node (Multi-Condition Switch)**:
  - Variable Anzahl von Bedingungen pro Node
  - **First-Match Logik**: Bedingungen werden von oben nach unten geprüft, erste zutreffende wird ausgeführt
  - Optional: Default-Pfad wenn keine Bedingung zutrifft
  - Jede Bedingung hat eigenen Output-Handle für Verknüpfung (direkt am rechten Rand der Condition)
  - **Visual Feedback**: Gematchte Bedingung wird grün hervorgehoben nach Ausführung
  - **Use Case**: Switch/Case-ähnliche Logik (z.B. Betrag > 1000 → Manager, > 500 → Team Lead, sonst → Auto-Approve)
  - **Condition Builder UI** (visuelle Bedingungserstellung statt manuelle JSONata):
    - 3-Felder-Layout pro Bedingung: `[Variable] [Operator] [Wert/Variable]`
    - Linkes Feld: Variable Picker (zeigt verfügbare Outputs vorheriger Nodes)
    - Operator-Dropdown: `=`, `!=`, `>`, `>=`, `<`, `<=`, `contains`, `startsWith`, `endsWith`, `isEmpty`, `isNotEmpty`
    - Rechtes Feld: Wert eingeben oder Variable auswählen
    - Backend generiert automatisch korrekte JSONata-Expression
    - **Vorteile**: Keine Syntax-Kenntnisse nötig, keine Fallstricke (`=` vs `==`, `and` vs `&&`)
    - Optional: "Advanced Mode" Toggle für Power-User mit direkter JSONata-Eingabe

### HR WORKS Integration Node (Phase 1)

**API-Client Generierung:** → Siehe **[plan-hrworks-integration.md](./plan-hrworks-integration.md)**

> ℹ️ Im finalen `workflow-automation` Projekt wird diese Datei nach `docs/` verschoben.

**Async Job Handling:**
- HR WORKS API verwendet Job-basierte asynchrone Verarbeitung für Write-Operationen (POST/PUT/DELETE)
- Backend pollt automatisch den Job-Status über `/jobs/{jobId}` Endpoint
- Frontend zeigt Node als "running" bis Job abgeschlossen ist (Status: pending → finished/failed)
- UI-Mapping: Async-Calls werden als synchrone Operationen dargestellt - Node bleibt aktiv bis Job fertig
- Timeout-Handling: Nach 60 Sekunden wird Job als fehlgeschlagen markiert
- Retry-Logic: Bei Netzwerkfehlern automatische Wiederholung (max. 3x)
- **Output-Mapping**: Bei Erfolg wird nur das `data` Objekt aus der Job-Response als Node-Output gesetzt (ohne Wrapper)
- **Dictionary Response Flattening**: HR WORKS API liefert Dictionary-Format - alle Werte werden automatisch flattened für einfacheren Zugriff

**Token-Handling:**
- JWT-Token von HR WORKS API hat 15 Minuten Gültigkeit
- Automatische Token-Refresh bei Ablauf
- Token wird im Response-Feld `token` zurückgegeben (nicht `access_token`)
- Sichere Speicherung in Tenant-Konfiguration

**Erweiterte Person-Felder:**
- Unterstützung für alle HR WORKS Person-Felder: personnelNumber, birthday, gender, role, department, etc.
- Automatische Typ-Validierung basierend auf OpenAPI Spec
- Select-Felder für Enum-Werte (z.B. Gender, Salutation)

**Node-Konfiguration im Designer:**
1. **Dropdown: API-Endpoint auswählen**
   - Persons (Get All, Get by ID, Create, Update)
   - Organization Units (Get All, Get by ID)
   - Absences (Get, Create)
   - etc. (aus OpenAPI Spec generiert)

2. **Dynamisches Formular für Parameter**
   - Je nach gewähltem Endpoint werden die benötigten Parameter angezeigt
   - Required-Felder markiert
   - Typ-Validierung (string, number, date, etc.)
   - Autocomplete für Person-IDs, OE-IDs aus synchronisierten Daten
   - Unterstützt sowohl `params` als auch `parameters` Feldnamen

3. **Response-Mapping**
   - Ausgabe-Felder für Verwendung in nachfolgenden Nodes
   - JSON-Path Zugriff auf Response-Daten

**Beispiel UI-Flow:**
```
┌─────────────────────────────────────────────────┐
│  HR WORKS Node                                  │
├─────────────────────────────────────────────────┤
│  Endpoint:  [Get Person by ID        ▼]        │
├─────────────────────────────────────────────────┤
│  Parameter:                                     │
│  ┌─────────────────────────────────────────┐   │
│  │ Person ID*:  [{{trigger.personId}}    ] │   │
│  └─────────────────────────────────────────┘   │
├─────────────────────────────────────────────────┤
│  Output-Variable:  [personData              ]   │
└─────────────────────────────────────────────────┘
```

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
**Template Gallery (Landlord-DB, global verfügbar):**
- Consultants und server_admins können Workflows als Templates publizieren
- Template-Metadaten: Titel, Beschreibung, Kategorie, Tags, Version, Author
- Templates sind Tenant-übergreifend sichtbar
- **"Aktivieren"-Funktion**: Kopiert Template in Tenant-DB zur Nutzung/Bearbeitung
- Kategorien: Onboarding, Offboarding, Approvals, HR-Prozesse, Custom
- Versionierung: Templates können aktualisiert werden, Tenants sehen Update-Hinweis
- Rating & Reviews (optional)

**Template-Workflow:**
```
1. Consultant erstellt Workflow in eigenem Tenant
2. "Als Template publizieren" → Titel, Beschreibung, Kategorie
3. Template wird in Landlord-DB gespeichert (global)
4. Andere Tenants sehen Template in Gallery
5. "Aktivieren" → Workflow wird in Tenant kopiert
6. Tenant kann Workflow anpassen/nutzen
```

**Datenmodell (Landlord-DB):**
```typescript
export const workflowTemplates = pgTable('workflow_templates', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  category: text('category'), // 'onboarding', 'offboarding', 'approvals', etc.
  tags: jsonb('tags'), // ['hr', 'automation', 'approval']
  graph: jsonb('graph').notNull(), // Workflow-Definition
  version: text('version').default('1.0.0'),
  authorId: uuid('author_id').references(() => globalUsers.id),
  isPublic: boolean('is_public').default(true),
  downloadCount: integer('download_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
```

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
- Horizontal Scaling: Stateless Backend, Load Balancing, Queue-based Architecture, Valkey für Shared State
- Rate Limiting: API Call Limits, Workflow Execution Limits, Per-User/Per-OE Quotas

### Integration Ecosystem
- Webhooks (Outbound): Custom Webhook Nodes, Signature Signing, Retry Logic, Payload Templates
- Public API: Workflow-Triggering, Status Queries, Webhook Registration, API Keys & OAuth2
- Pre-built Connectors: Email (SMTP, Exchange, Gmail), Slack/Teams, SharePoint/OneDrive, SAP/DATEV (optional)

### Testing & Quality Assurance
- **Node-by-Node Testing (Phase 1)**:
  - Play-Button an jedem Node für einzelne Ausführung
  - Sequentielle Abhängigkeiten (Node nur ausführbar wenn Vorgänger ausgeführt)
  - Output Caching für Context Panel
  - Mock Trigger Data für Testing
  - Visuelles Status-Feedback (pending, running, waiting, success, error)
  - Output-Preview direkt am Node
  - "Run All"-Button für komplette Workflow-Ausführung
- Workflow Testing: Test Mode (Dry-Run), Mock Data Injection, Step-by-Step Debugging, Unit Tests
- Versioning: Workflow Versions, Rollback, A/B Testing, Canary Deployments
