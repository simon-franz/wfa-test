# HR WORKS Workflow Automation - Phase 3 Execution Checklist

## Ziel
Generisches Genehmigungssystem mit verschiedenen Modi - "Make it powerful"

## Voraussetzungen
- [ ] Phase 1 & 2 vollständig abgeschlossen
- [ ] Approval Builder API bei HR WORKS verfügbar

---

## 1. Approval Backend - Datenmodell

### Approval Request Schema
- [ ] Datenmodell implementieren:
```typescript
interface ApprovalRequest {
  id: string;
  workflowInstanceId: string;
  nodeId: string;
  title: string;
  description: string;
  requestedBy: PersonId;
  requestedAt: DateTime;
  mode: ApprovalMode;
  approvers: Approver[];
  currentStatus: ApprovalStatus;
  responses: ApprovalResponse[];
  metadata: JSON;
  deadline?: DateTime;
  escalationRules?: EscalationRule[];
}
```

- [ ] ApprovalMode Enum:
  - `ANY` - First-Response-Wins
  - `ALL` - Unanimous (alle müssen zustimmen)
  - `MAJORITY` - >50% müssen zustimmen
  - `SEQUENCE` - Kaskade (nacheinander)

- [ ] Approver Schema:
```typescript
interface Approver {
  id: string;
  personId?: string;      // Direkte Person
  role?: string;          // "VG", "VG_OF_VG", "HR_MANAGER"
  order?: number;         // Für SEQUENCE Mode
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  respondedAt?: DateTime;
  comment?: string;
}
```

### DB Schema
- [ ] `approval_requests` Tabelle erweitern
- [ ] `approval_responses` Tabelle (detaillierte Responses)
- [ ] Indizes für schnelle Abfragen

**Kritische Dateien:**
- `shared/src/db/tenant-schema.ts` (erweitern)
- `shared/src/types/approval.types.ts`

---

## 2. Approval Builder Service

### Core Service
- [ ] `createApproval()` - Approval-Request erstellen
- [ ] `resolveApprovers()` - Dynamische Approver auflösen
- [ ] `processResponse()` - Response verarbeiten
- [ ] `checkStatus()` - Status nach Mode berechnen
- [ ] `cancelPendingApprovers()` - Offene Approvals stornieren
- [ ] `escalate()` - Eskalation triggern

### Dynamische Approver-Resolution
- [ ] VG auflösen (Vorgesetzter des Requestors)
- [ ] VG von VG auflösen
- [ ] Rollen-basierte Auflösung (z.B. alle HR-Manager)
- [ ] OE-basierte Auflösung (z.B. Leiter der OE)
- [ ] Fallback wenn Person nicht gefunden

**Beispiel VG-Resolution:**
```typescript
async resolveApprover(approver: Approver, context: WorkflowContext): Promise<string> {
  if (approver.role === 'VG') {
    const person = await this.getPersonById(context.requestedBy);
    return person.supervisorId;
  }
  if (approver.role === 'VG_OF_VG') {
    const person = await this.getPersonById(context.requestedBy);
    const supervisor = await this.getPersonById(person.supervisorId);
    return supervisor.supervisorId;
  }
  return approver.personId;
}
```

**Kritische Dateien:**
- `backend/src/approval/approval.module.ts`
- `backend/src/approval/approval.service.ts`
- `backend/src/approval/approval-builder.service.ts`
- `backend/src/approval/approver-resolver.service.ts`

---

## 3. Approval Modes Implementierung

### ANY Mode (First-Response-Wins)
- [ ] Erster Response entscheidet
- [ ] Alle anderen Approvals automatisch stornieren
- [ ] Workflow sofort fortsetzen
- [ ] Result: `{ decision: 'approved'|'rejected', approver: {...}, comment: '...' }`

### ALL Mode (Unanimous)
- [ ] Alle müssen genehmigen
- [ ] Bei erster Ablehnung → sofort abgebrochen
- [ ] Tracking wer schon responded hat
- [ ] Parallel-Requests an alle Approver
- [ ] Result: `{ decision: 'approved'|'rejected', responses: [...] }`

### MAJORITY Mode
- [ ] Threshold: >50% der Approver
- [ ] Live-Berechnung bei jeder Response
- [ ] Auto-Cancel wenn Mehrheit erreicht
- [ ] Auto-Cancel wenn Mehrheit unmöglich
- [ ] Result: `{ decision: 'approved'|'rejected', votes: { approved: N, rejected: M }, responses: [...] }`

### SEQUENCE Mode (Kaskade)
- [ ] Order-basierte Abarbeitung
- [ ] Nächster erst nach Genehmigung freigeschaltet
- [ ] Bei Ablehnung → gesamte Kette abbrechen
- [ ] Tracking der aktuellen Stage
- [ ] Result: `{ decision: 'approved'|'rejected', completedStages: N, responses: [...] }`

**Kritische Dateien:**
- `backend/src/approval/modes/any-mode.strategy.ts`
- `backend/src/approval/modes/all-mode.strategy.ts`
- `backend/src/approval/modes/majority-mode.strategy.ts`
- `backend/src/approval/modes/sequence-mode.strategy.ts`

---

## 4. Approval Node (Backend)

### Node Executor
- [ ] Approval-Request über HR WORKS API erstellen
- [ ] Approval-IDs im Workflow-Context speichern
- [ ] Workflow pausieren bis Entscheidung
- [ ] Webhook-Handler für Approval-Status-Änderungen
- [ ] Timeout-Handling mit Eskalation

### HR WORKS Integration
- [ ] API-Call zum Erstellen von Approval-Objekten
- [ ] Pro Approver ein Approval-Objekt bei HR WORKS
- [ ] Stornierung von Approvals bei Abbruch
- [ ] Polling/Webhook für Status-Updates

**Kritische Dateien:**
- `backend/src/workflow/nodes/action/approval.node.ts`
- `backend/src/webhooks/approval-webhook.controller.ts`

---

## 5. Approval Node (Frontend)

### Node UI
- [ ] Custom Approval-Node Design
- [ ] Visuelle Unterscheidung der Modi (Icons/Farben)
- [ ] Approver-Badges am Node
- [ ] Status-Anzeige (Pending, Approved, Rejected)

### Config Panel
- [ ] **Titel & Beschreibung** (Template-Editor)
- [ ] **Mode-Auswahl** (ANY/ALL/MAJORITY/SEQUENCE)
  - Visuelle Erklärung jedes Modes
- [ ] **Approver-Konfiguration**:
  - "Person hinzufügen" Button
  - Dropdown: Direkte Person / Rolle / Dynamisch
  - Bei Rolle: VG, VG von VG, HR-Manager, etc.
  - Bei Dynamisch: Expression `{{requestor.supervisorId}}`
  - Drag & Drop für Reihenfolge (SEQUENCE Mode)
- [ ] **Deadline-Konfiguration**:
  - Relativ (z.B. +3 Tage)
  - Absolut (Datum-Picker)
  - Pro Approver oder gesamt
- [ ] **Eskalation Rules**:
  - Nach X Tagen → Reminder
  - Nach Y Tagen → Eskalation an nächste Ebene
  - Auto-Approve/Reject nach Timeout

### Approver-Builder UI
- [ ] Liste der konfigurierten Approver
- [ ] Typ-Icon (Person, Rolle, Dynamisch)
- [ ] Order-Nummer (für SEQUENCE)
- [ ] Remove-Button
- [ ] Reorder (Drag & Drop)

**Kritische Dateien:**
- `frontend/src/features/designer/nodes/ApprovalNode.tsx`
- `frontend/src/features/designer/config/ApprovalConfig.tsx`
- `frontend/src/features/designer/config/ApproverBuilder.tsx`

---

## 6. Approver UI (SmartFace Integration)

### Pending Approvals Liste
- [ ] Dashboard-Widget "Meine offenen Genehmigungen"
- [ ] Liste mit:
  - Titel
  - Requestor (Name, Bild)
  - Workflow-Name
  - Eingereicht am
  - Deadline (mit Warnung wenn nah)
  - Priorität
- [ ] Sortierung (Datum, Deadline, Priorität)
- [ ] Filter (Alle, Dringend, Überfällig)

### Approval Detail View
- [ ] Vollständige Beschreibung
- [ ] Kontext-Informationen aus Workflow
- [ ] Bisherige Responses (bei ALL/MAJORITY/SEQUENCE)
- [ ] Approve-Button (grün)
- [ ] Reject-Button (rot)
- [ ] Kommentar-Feld (optional/pflicht)
- [ ] Delegate-Button (optional)

### Approval History
- [ ] Liste aller abgeschlossenen Approvals
- [ ] Filter nach Zeitraum, Status, Workflow
- [ ] Export (CSV, PDF)

**Kritische Dateien:**
- `frontend/src/pages/ApprovalsPage.tsx`
- `frontend/src/components/ApprovalList.tsx`
- `frontend/src/components/ApprovalDetail.tsx`
- `frontend/src/components/ApprovalHistory.tsx`

---

## 7. Advanced Approval Features

### Delegation
- [ ] Approver kann an andere Person delegieren
- [ ] Delegation-Grund erfassen
- [ ] Original-Approver bleibt sichtbar
- [ ] Delegation-Chain verfolgen

### Urlaubsvertretung
- [ ] Vertretung in Stammdaten (aus HR WORKS)
- [ ] Automatische Weiterleitung bei Abwesenheit
- [ ] Vertretungs-Zeitraum berücksichtigen
- [ ] Benachrichtigung an Vertreter

### Eskalation
- [ ] Timeout-basierte Eskalation
- [ ] Eskalation an nächsthöhere Ebene
- [ ] Reminder-Emails vor Deadline
- [ ] Eskalations-Log

### Notifications
- [ ] Email bei neuer Approval-Anfrage
- [ ] Email-Reminder vor Deadline
- [ ] Email bei Eskalation
- [ ] Push-Notification (optional)

**Kritische Dateien:**
- `backend/src/approval/delegation.service.ts`
- `backend/src/approval/escalation.service.ts`
- `backend/src/approval/notification.service.ts`

---

## 8. Demo-Workflows

### Urlaubsgenehmigung (SEQUENCE)
- [ ] Template erstellen
- [ ] Test durchführen

```
[Trigger: Custom Form "Urlaubsantrag"]
  → [Condition: Tage > 10?]
      Yes → [Approval: Mode=SEQUENCE]
              1. VG von Requestor
              2. HR-Manager
      No → [Approval: Mode=ANY]
              VG von Requestor
  → [Condition: Approved?]
      Yes → [HR WORKS: Urlaub eintragen]
           → [Email: Bestätigung an Mitarbeiter]
      No → [Email: Ablehnungsgrund an Mitarbeiter]
  → [End]
```

### Budget-Genehmigung (MAJORITY)
- [ ] Template erstellen
- [ ] Test durchführen

```
[Trigger: Budget Request Form]
  → [Condition: Amount > 5000?]
      Yes → [Approval: Mode=MAJORITY]
              Approvers: [CEO, CFO, COO]
      No → [Approval: Mode=ANY]
              Approvers: [Team Lead, Department Manager]
  → [Condition: Approved?]
      Yes → [HTTP: Create PO in ERP]
      No → [Email: Rejection to Requestor]
  → [End]
```

### Einstellungsfreigabe (ALL)
- [ ] Template erstellen
- [ ] Test durchführen

```
[Trigger: Hiring Request]
  → [Approval: Mode=ALL]
      Approvers: [Fachbereich, HR, Geschäftsführung]
  → [Condition: Approved?]
      Yes → [PersonTask: HR → Vertrag erstellen]
      No → [Email: Absage an Recruiting]
  → [End]
```

---

## 9. REST API Erweiterungen

### Approval Endpoints
- [ ] `GET /api/approvals` - Meine offenen Approvals
- [ ] `GET /api/approvals/:id` - Approval Details
- [ ] `POST /api/approvals/:id/approve` - Genehmigen
- [ ] `POST /api/approvals/:id/reject` - Ablehnen
- [ ] `POST /api/approvals/:id/delegate` - Delegieren
- [ ] `GET /api/approvals/history` - Abgeschlossene Approvals

**Kritische Dateien:**
- `backend/src/approval/approval.controller.ts`

---

## 10. Verification & Testing

### Backend Tests
- [ ] Approval Builder Unit Tests
- [ ] ANY Mode Tests
- [ ] ALL Mode Tests
- [ ] MAJORITY Mode Tests
- [ ] SEQUENCE Mode Tests
- [ ] Approver Resolution Tests
- [ ] Delegation Tests
- [ ] Eskalation Tests

### Integration Tests
- [ ] Kompletter Approval-Workflow (alle Modi)
- [ ] Webhook-Integration mit HR WORKS
- [ ] Email-Notifications
- [ ] Timeout & Eskalation

### Manual E2E Testing
- [ ] Approval als Approver erhalten
- [ ] Approval genehmigen/ablehnen
- [ ] Delegation testen
- [ ] Eskalation nach Timeout prüfen
- [ ] Alle Demo-Workflows durchspielen

---

## Abhängigkeiten (zusätzlich zu Phase 1 & 2)

**Backend:**
- Keine zusätzlichen (nutzt bestehende)

**Frontend:**
- React DnD (für Approver-Reihenfolge)

---

## Deliverables Phase 3

- [ ] Generisches Approval-Objekt mit Builder
- [ ] 4 Approval Modes (ANY, ALL, MAJORITY, SEQUENCE)
- [ ] Dynamische Approver-Resolution (VG, VG von VG)
- [ ] Approval Node im Designer
- [ ] Approver UI in SmartFace (Liste, Detail, History)
- [ ] Delegation & Urlaubsvertretung
- [ ] Eskalation mit Timeouts
- [ ] Email-Notifications
- [ ] 3 Demo-Workflows (Urlaub, Budget, Einstellung)
- [ ] 3-5 produktive Genehmigungsprozesse dokumentiert
