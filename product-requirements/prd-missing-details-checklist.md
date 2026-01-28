# Fehlende Details in PRDs - Checkliste

## Phase 1 Foundation - Fehlende Details:

### US-002 Tenant Provisioning API
- [ ] Beispiel Request Body mit allen Feldern
- [ ] Ablauf-Schritte (1-7) detailliert
- [ ] Sicherheits-Details: Shared Secret zwischen HR WORKS und Workflow-App

### US-003 JWT-basierte Tenant-Auflösung  
- [ ] Vollständiges JWT Payload Beispiel mit allen Feldern
- [ ] Code-Beispiel für Cookie-Handling
- [ ] SSE-spezifische Token-Handling Details

### US-004 4-Ebenen Rollen-System
- [ ] Vollständige Tabelle mit allen 4 Rollen und deren Berechtigungen
- [ ] JWT Payload mit global_role Feld
- [ ] Zugriffsbeschränkung: Nur workflow-administrator oder master_admin dürfen sich anmelden
- [ ] Andere HR WORKS User haben keinen Zugriff (Integration in HR WORKS UI kommt später)

### US-009 HR WORKS Webhook Handler
- [ ] Vollständiger Code für Signature Verification
- [ ] Beispiel Payload mit allen Feldern
- [ ] stringToSign Berechnung: `${jobId}.${timestamp}`
- [ ] HMAC SHA256 mit secretKey

## Phase 1 Designer - Fehlende Details:

### US-017 Kompakte Node-Darstellung
- [ ] Detaillierte Farbcodierung für jeden Node-Typ
- [ ] Status-Indicator Positionen und Icons
- [ ] "Keine technischen Details" - explizite Beispiele was NICHT gezeigt werden soll

### US-018 Bezier-Kurven Edges
- [ ] Gestrichelte Linien (nicht durchgezogen)
- [ ] Animierte Datenfluss-Visualisierung Details
- [ ] Hover-Effekt Spezifikationen
- [ ] Farbe: Grau (neutral), bei Hover: Primärfarbe

### US-019 Node Configuration Panel
- [ ] Vollständiges Beispiel HR WORKS Node UI
- [ ] Vollständiges Beispiel Data Transformation Node UI
- [ ] Explizite Anti-Patterns (was NICHT gezeigt werden soll)

### US-020 Context Panel / Variable Picker
- [ ] Tree-View Struktur Details
- [ ] Array-Navigation mit [0], [1] Syntax
- [ ] Wert-Anzeige für primitive Typen
- [ ] Array-Metadaten: Länge und Typ

### US-021 Node-by-Node Testing
- [ ] Alle 5 Status-Zustände: pending, running, waiting, success, error
- [ ] waiting-Status für Delay, Approval, PersonTask
- [ ] Sequentielle Ausführung: A → B → C Details
- [ ] Cached Outputs Verhalten

### US-022 Input/Output-Preview
- [ ] 2 Tabs: Input und Output
- [ ] JSON-Darstellung mit Syntax-Highlighting
- [ ] Ein-/ausklappbare Objekte und Arrays
- [ ] Nur sichtbar nach Node-Ausführung

### US-030 Workflow-Übersicht als Tabelle
- [ ] Exakte Spalten: Name, Beschreibung, Status (Badge), Aktualisiert (Datum/Zeit), Aktionen
- [ ] Status-Badges: Aktiv (grün), Inaktiv (gelb), Entwurf (grau)
- [ ] Action-Buttons: Historie, Ausführen, Duplizieren, Export, Löschen
- [ ] Validierung: Pro Workflow nur ein Trigger-Knoten

### US-032 Ausführungshistorie-Seite
- [ ] Split-Layout: Liste links (350px), Details rechts
- [ ] Nummerierte Einträge (#1, #2, #3)
- [ ] Node-Namen-Mapping Tabelle (condition-123456 → "Bedingung")
- [ ] Node-Icons Tabelle (▶️ Trigger, ⏰ Scheduled, 🔀 Condition, etc.)
- [ ] JSON-Viewer Features: Syntax-Highlighting, Item/Key-Zähler, Einrückung

### US-033 Echtzeit-Execution-Updates via SSE
- [ ] @microsoft/fetch-event-source mit withCredentials: true
- [ ] Automatische Reconnect-Logik
- [ ] Keine automatischen Retries (attempts: 1)
- [ ] Alert nach Abschluss

## Phase 1 Nodes - Fehlende Details:

### US-038 Error Handling
- [ ] Nur für externe Systeme: HTTP Request, HR WORKS, Email, Webhook
- [ ] NICHT für interne Nodes: Delay, Condition, Data Transformation, Trigger
- [ ] Error-Output Struktur: errorMessage, errorCode, nodeId, timestamp
- [ ] Retry nur bei: 5xx, Timeout, Network Error (NICHT bei 4xx)
- [ ] Timeout default: 30000ms
- [ ] retryCount: 0-5, default 0
- [ ] retryDelay: default 1000ms
- [ ] retryBackoff: default 2 (exponentiell)

### US-039 Data Transformation Node
- [ ] Vollständige Operations-Liste: count, filter, map, reduce, sort, distinct
- [ ] JSONPath-Expressions
- [ ] Wrapping von Ergebnissen
- [ ] UI-Beispiel mit Operation-Dropdown

### US-041 Condition Node
- [ ] First-Match Logik Details
- [ ] Visual Feedback: Gematchte Bedingung grün
- [ ] Use Case Beispiel: Betrag > 1000 → Manager, > 500 → Team Lead, sonst → Auto-Approve

### US-042 Condition Builder UI
- [ ] 3-Felder-Layout: [Variable] [Operator] [Wert/Variable]
- [ ] Vollständige Operator-Liste: =, !=, >, >=, <, <=, contains, startsWith, endsWith, isEmpty, isNotEmpty
- [ ] Backend generiert JSONata automatisch
- [ ] Vorteile: Keine Syntax-Kenntnisse, keine Fallstricke (= vs ==, and vs &&)

### US-044 HR WORKS Async Job Handling
- [ ] Backend pollt /jobs/{jobId}
- [ ] Timeout: 60 Sekunden
- [ ] Retry: max 3x bei Netzwerkfehlern
- [ ] Output-Mapping: Nur data Objekt (ohne Wrapper)
- [ ] Dictionary Response Flattening

### US-045 HR WORKS Token-Handling
- [ ] JWT-Token: 15 Minuten Gültigkeit
- [ ] Response-Feld: token (NICHT access_token)
- [ ] Automatische Refresh-Logik

### US-047 HR WORKS Node UI
- [ ] Vollständiges UI-Beispiel mit allen Feldern
- [ ] Autocomplete für Person-IDs, OE-IDs
- [ ] Unterstützt params UND parameters Feldnamen

### US-048 JSONata Integration
- [ ] Templates: {{expression}} Syntax
- [ ] Conditions: Pure JSONata
- [ ] Template Engine Code-Beispiel mit Regex
- [ ] Wichtig: JSONata verwendet = nicht == für Vergleiche

### US-049 JSONata Funktionen
- [ ] Vollständige Funktions-Tabelle mit Kategorien
- [ ] Custom Datum-Funktionen: $now(), $formatDate(), $addDays(), $diffDays()

## Phase 2 - Fehlende Details:
- [ ] PersonTask Webhook Payload
- [ ] Event-basierte Trigger Filter-Optionen
- [ ] Loop Node Parallel vs Sequential Details

## Phase 3 - Fehlende Details:
- [ ] Approval Modes detaillierte Logik
- [ ] Approver-Struktur mit order Feld
- [ ] Dynamic Approver Resolution Algorithmus

## Phase 4 - Fehlende Details:
- [ ] Template Gallery Workflow (6 Schritte)
- [ ] Datenmodell workflow_templates vollständig
- [ ] Composite Triggers Kombinationen
- [ ] Rate Limiting Quotas

## Zusätzliche fehlende Spezifikationen:
- [ ] API-Authentifizierung Code-Beispiele (fetch mit credentials: 'include')
- [ ] SSE Code-Beispiel (EventSource mit withCredentials)
- [ ] Workflow Export/Import JSON-Schema
- [ ] Canvas Controls vollständige Liste
- [ ] Context Menu Keyboard-Shortcuts
- [ ] Workflow-Versionierung Audit-Trail Details
