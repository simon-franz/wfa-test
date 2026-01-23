# HR WORKS Workflow Automation - Phase 2 Execution Checklist

## Ziel
PersonTask Integration & Advanced Triggers - "Make it useful"

## Voraussetzungen
- [ ] Phase 1 vollständig abgeschlossen
- [ ] PersonTask API bei HR WORKS verfügbar

---

## 1. PersonTask Backend Integration

### PersonTask Node
- [ ] PersonTask Node Executor implementieren
- [ ] Builder für PersonTask API-Calls
- [ ] Validierung von Task-Daten
- [ ] Persistierung in HR WORKS via API
- [ ] PersonTask-ID im Workflow-Kontext speichern
- [ ] Status-Tracking (offen, in Bearbeitung, erledigt, abgelehnt)

### PersonTask Webhook Handler
- [ ] Webhook-Endpoint für PersonTask-Updates
- [ ] Status-Mapping (HR WORKS Status → Workflow Status)
- [ ] Workflow-Fortsetzung bei Task-Completion
- [ ] Error Handling & Retries
- [ ] Timeout-Handling für überfällige Tasks

### PersonTask DB Schema
- [ ] `person_tasks` Tabelle erweitern (falls nötig)
- [ ] Index für schnelle Abfragen nach instanceId/status

**Kritische Dateien:**
- `backend/src/workflow/nodes/action/person-task.node.ts`
- `backend/src/person-task/person-task.module.ts`
- `backend/src/person-task/person-task.service.ts`
- `backend/src/webhooks/person-task-webhook.controller.ts`

---

## 2. PersonTask Frontend

### PersonTask Node UI
- [ ] Custom Node-Komponente für PersonTask
- [ ] Assignee-Auswahl:
  - Direkte Person (aus syncedPersons)
  - Rolle (aus HR WORKS Rollen)
  - VG (Vorgesetzter des Triggers)
  - VG von VG
- [ ] Task-Beschreibung (Template-Editor mit {{}} Support)
- [ ] Deadline-Konfiguration (relativ: +3 Tage, absolut: Datum)
- [ ] Priorität (Niedrig, Normal, Hoch, Dringend)
- [ ] Anhänge-Support (optional)

### PersonTask Config Panel
- [ ] Formular für alle PersonTask-Felder
- [ ] Validierung (Pflichtfelder markiert)
- [ ] Preview der Task-Beschreibung mit aufgelösten Variablen

**Kritische Dateien:**
- `frontend/src/features/designer/nodes/PersonTaskNode.tsx`
- `frontend/src/features/designer/config/PersonTaskConfig.tsx`

---

## 3. Event-basierte Trigger

### Person Events Trigger
- [ ] Trigger für Person Created
- [ ] Trigger für Person Updated
- [ ] Trigger für Person Deleted/Deactivated
- [ ] Filter-Optionen:
  - Nach OE (Organisationseinheit)
  - Nach Rolle
  - Nach Status
  - Nach Feld-Änderungen (z.B. nur wenn supervisorId ändert)
- [ ] Payload-Mapping zu Workflow-Context

### OE Events Trigger
- [ ] Trigger für OE Created
- [ ] Trigger für OE Updated
- [ ] Trigger für OE Deleted
- [ ] Filter nach Parent-OE
- [ ] Trigger bei VG-Wechsel
- [ ] Trigger bei OE-Umbenennung

### Custom Webhook Trigger
- [ ] Generic Webhook Endpoint Generator
- [ ] Eindeutige URL pro Workflow
- [ ] Signature Verification (HMAC-SHA256)
- [ ] Custom Payload Parsing (JSONPath)
- [ ] Header-Extraktion
- [ ] Rate Limiting pro Webhook

### Webhook Management
- [ ] Automatische Webhook-Registrierung bei HR WORKS
- [ ] Webhook-Deregistrierung bei Workflow-Löschung
- [ ] Webhook-Status Dashboard
- [ ] Retry-Queue für fehlgeschlagene Webhooks

**Kritische Dateien:**
- `backend/src/workflow/nodes/trigger/person-event.trigger.ts`
- `backend/src/workflow/nodes/trigger/oe-event.trigger.ts`
- `backend/src/workflow/nodes/trigger/custom-webhook.trigger.ts`
- `backend/src/webhooks/webhook-manager.service.ts`

---

## 4. Erweiterte Action Nodes

### Loop Node
- [ ] Iteration über Arrays
- [ ] Loop-Variable im Context verfügbar (`$item`, `$index`)
- [ ] Parallel vs. Sequential Execution Mode
- [ ] Max Iterations Limit
- [ ] Break/Continue Unterstützung
- [ ] Aggregation der Loop-Ergebnisse

### Email Node
- [ ] SMTP-Konfiguration in Settings
- [ ] Template Engine (Handlebars/Mustache)
- [ ] Recipient Logic:
  - Direkte Email-Adresse
  - Person (aus syncedPersons)
  - OE (alle Personen einer OE)
  - VG (Vorgesetzter)
  - Dynamisch (aus Workflow-Context)
- [ ] CC/BCC Support
- [ ] Attachments Support (aus vorherigen Nodes)
- [ ] HTML/Plain-Text Templates
- [ ] Email-Vorschau im Designer

### Data Transformation Node (Erweiterung)
- [ ] JSONPath-Editor mit Autocomplete
- [ ] Erweiterte Aggregations-Funktionen:
  - groupBy
  - pivot
  - flatten
  - merge
- [ ] Typ-Konvertierungen (string → number, etc.)
- [ ] Datum-Transformationen
- [ ] String-Manipulationen (split, join, regex)

**Kritische Dateien:**
- `backend/src/workflow/nodes/action/loop.node.ts`
- `backend/src/workflow/nodes/action/email.node.ts`
- `backend/src/workflow/nodes/action/data-transform.node.ts` (erweitern)
- `frontend/src/features/designer/nodes/LoopNode.tsx`
- `frontend/src/features/designer/nodes/EmailNode.tsx`

---

## 5. Frontend Erweiterungen

### Trigger Node UI
- [ ] Event-Trigger Konfiguration
- [ ] Filter-Builder UI
- [ ] Webhook-URL Anzeige (für Custom Webhooks)
- [ ] Test-Event Sender (Simulierter Webhook)

### Loop Node UI
- [ ] Visueller Loop-Container
- [ ] Verschachtelte Nodes innerhalb des Loops
- [ ] Loop-Statistiken (Iterationen, Dauer)

### Email Node UI
- [ ] Rich-Text-Editor für Email-Body
- [ ] Variable-Picker Integration
- [ ] Email-Vorschau mit Test-Daten
- [ ] Attachment-Manager

### Node Palette Erweiterung
- [ ] Neue Kategorie "Events" für Event-Trigger
- [ ] Neue Kategorie "Communication" für Email
- [ ] Neue Kategorie "Flow Control" für Loop
- [ ] Such-Funktion in Node Palette

**Kritische Dateien:**
- `frontend/src/features/designer/nodes/EventTriggerNode.tsx`
- `frontend/src/features/designer/nodes/LoopNode.tsx`
- `frontend/src/features/designer/nodes/EmailNode.tsx`
- `frontend/src/features/designer/NodePalette.tsx` (erweitern)
- `frontend/src/features/designer/config/EmailConfig.tsx`

---

## 6. Settings Erweiterungen

### SMTP-Konfiguration
- [ ] SMTP Server Settings (Host, Port, Encryption)
- [ ] SMTP Credentials (Username, Password)
- [ ] Sender-Adresse und Name
- [ ] Test-Email-Button
- [ ] Connection-Test

### Webhook-Einstellungen
- [ ] Webhook Secret Key Management
- [ ] Webhook-Log (letzte 100 Einträge)
- [ ] Retry-Konfiguration

**Kritische Dateien:**
- `frontend/src/pages/SettingsPage.tsx` (erweitern)
- `backend/src/settings/settings.service.ts` (erweitern)

---

## 7. Demo-Workflow: Offboarding

- [ ] Workflow-Template erstellen
- [ ] End-to-End Test
- [ ] Dokumentation

**Offboarding-Workflow Struktur:**
```
[Trigger: Person Status = "Austritt"]
  → [PersonTask: IT → Geräte zurücknehmen]
  → [PersonTask: HR → Exit-Interview planen]
  → [PersonTask: Buchhaltung → Abrechnung]
  → [Loop: Für jede PersonTask]
      → [Condition: Task erledigt?]
          Yes → [Weiter]
          No → [Delay: 1 Tag] → [Email: Reminder]
  → [Condition: Alle Tasks erledigt?]
      Yes → [HTTP: Person deaktivieren]
      No → [Email: Eskalation an HR-Manager]
  → [End]
```

---

## 8. Verification & Testing

### Backend Tests
- [ ] PersonTask Node Unit Tests
- [ ] Event Trigger Unit Tests
- [ ] Loop Node Unit Tests
- [ ] Email Node Unit Tests (mit Mock SMTP)
- [ ] Webhook Signature Verification Tests

### Integration Tests
- [ ] PersonTask Workflow E2E
- [ ] Event-Trigger → Workflow Start
- [ ] Loop Execution mit verschiedenen Array-Größen
- [ ] Email Delivery (Staging SMTP)

### Manual E2E Testing
- [ ] PersonTask erstellen und abschließen
- [ ] Event-Trigger testen (Person anlegen)
- [ ] Custom Webhook testen
- [ ] Loop mit 10+ Iterationen
- [ ] Email-Versand prüfen
- [ ] Offboarding Demo-Workflow durchspielen

---

## Abhängigkeiten (zusätzlich zu Phase 1)

**Backend:**
- nodemailer (Email)
- handlebars (Templates)

**Frontend:**
- react-email-editor oder ähnlich (optional)

---

## Deliverables Phase 2

- [ ] PersonTask Node mit Webhook-Integration
- [ ] 3 Event-Trigger (Person, OE, Custom Webhook)
- [ ] Loop Node
- [ ] Email Node
- [ ] Data Transformation Node erweitert
- [ ] SMTP-Konfiguration in Settings
- [ ] Offboarding Demo-Workflow
- [ ] 2-3 produktive Use Cases dokumentiert
