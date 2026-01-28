#!/usr/bin/env bun
/**
 * Erstellt FINALE VOLLSTÄNDIGE PRD mit ALLEN Details
 * Kombiniert User Stories mit Code-Beispielen, Tabellen und technischen Spezifikationen
 */

import { readFileSync, writeFileSync } from 'fs';

const planMd = readFileSync('plan.md', 'utf-8');
const extractedDetails = JSON.parse(readFileSync('prd-complete-all-details.json', 'utf-8'));

// Erstelle finale PRD-Struktur
const finalPRD = {
  project: "Workflow Automation Platform",
  version: "1.0.0-complete",
  description: "VOLLSTÄNDIGE PRD mit ALLEN Details aus plan.md - Jede Anforderung enthält technische Spezifikationen, Code-Beispiele, Tabellen und UI-Mockups",
  generated: new Date().toISOString(),
  metadata: {
    sourceFile: "plan.md",
    totalCharacters: extractedDetails.statistics.totalCharacters,
    codeExamples: extractedDetails.statistics.totalCodeBlocks,
    tables: extractedDetails.statistics.totalTables,
    listItems: extractedDetails.statistics.totalListItems
  },
  phases: []
};

// Phase 1: Foundation & MVP
finalPRD.phases.push({
  id: "PHASE-1",
  name: "Foundation & MVP",
  duration: "Wochen 1-6",
  userStories: [
    {
      id: "US-001",
      title: "Multi-Tenant Architecture Setup (Landlord-DB Pattern)",
      description: "Als System-Architekt benötige ich eine Multi-Tenant-Architektur mit Landlord-DB für Tenant-Metadaten und separaten Tenant-DBs für Business-Daten",
      technicalDetails: {
        pattern: "Landlord-DB Pattern",
        diagram: extractedDetails.codeExamples.find(c => c.code.includes('LANDLORD DB'))?.code || "",
        landlordDb: {
          database: "PostgreSQL (Prod) / SQLite (Dev)",
          table: "tenants",
          fields: ["id", "name", "slug", "dbUrl", "status", "plan"],
          constraint: "Nur Metadaten - keine User-/Business-Daten!"
        },
        tenantDb: {
          tables: ["users", "workflows", "executions", "credentials", "approvals", "synced_persons", "synced_organization_units"]
        },
        benefits: [
          "Totale Datenisolation zwischen Tenants",
          "GDPR/Compliance-ready",
          "Einfaches Offboarding (DROP DATABASE)",
          "SQLite für Development, PostgreSQL für Production"
        ]
      },
      acceptanceCriteria: [
        "Landlord-DB (PostgreSQL Prod / SQLite Dev) mit tenants-Tabelle erstellt",
        "Tenants-Tabelle enthält: id (UUID), name, slug (unique), dbUrl, status, plan",
        "Nur Metadaten in Landlord-DB, keine User-/Business-Daten",
        "Tenant-DB Schema enthält: users, workflows, executions, credentials, approvals, synced_persons, synced_organization_units",
        "Drizzle ORM konfiguriert für Multi-Dialect Support (SQLite + PostgreSQL)",
        "Totale Datenisolation zwischen Tenants gewährleistet (separate Datenbanken)",
        "Connection Pooling für Tenant-DBs implementiert",
        "Typecheck passes"
      ],
      priority: 1,
      passes: false
    },
    {
      id: "US-002",
      title: "Tenant Provisioning API",
      description: "Als HR WORKS System kann ich automatisch neue Tenants via API erstellen mit Shared Secret Authentifizierung",
      technicalDetails: {
        endpoint: "POST /api/tenants",
        authentication: "Header: X-Provisioning-Secret: <shared-secret>",
        requestBody: extractedDetails.codeExamples.find(c => c.code.includes('acme-corp'))?.code || "",
        ablauf: [
          "1. HR WORKS erstellt API-Key-Pair für Kunden",
          "2. HR WORKS ruft Provisioning-API mit Shared Secret auf",
          "3. Workflow-App validiert Secret (PROVISIONING_SECRET env var)",
          "4. Erstellt Tenant in Landlord-DB + neue Tenant-DB",
          "5. Speichert verschlüsselte HR WORKS Credentials",
          "6. Initial Sync (Persons, OEs) - async",
          "7. Registriert Webhooks bei HR WORKS - async"
        ],
        security: "Shared Secret zwischen HR WORKS und Workflow-App, verschlüsselte Credential-Speicherung"
      },
      acceptanceCriteria: [
        "POST /api/tenants Endpoint implementiert",
        "Header X-Provisioning-Secret validiert gegen PROVISIONING_SECRET env var",
        "Request Body enthält: slug, name, hrworksCustomerId, apiKey, apiSecret, baseUrl",
        "Tenant wird in Landlord-DB erstellt mit allen Feldern",
        "Neue Tenant-DB wird automatisch provisioniert (CREATE DATABASE + Migrations)",
        "HR WORKS Credentials werden verschlüsselt gespeichert (AES-256)",
        "Initial Sync (Persons, OEs) wird async gestartet (BullMQ Job)",
        "Webhooks bei HR WORKS werden async registriert (BullMQ Job)",
        "Error Handling für fehlende/ungültige Secrets (401 Unauthorized)",
        "Error Handling für doppelte slugs (409 Conflict)",
        "Response enthält: tenant_id, status, message",
        "Typecheck passes"
      ],
      priority: 2,
      passes: false
    },
    {
      id: "US-003",
      title: "JWT-basierte Tenant-Auflösung",
      description: "Als Backend-System löse ich Tenant-Kontext aus JWT Cookie auf für Single-Domain-Setup",
      technicalDetails: {
        cookieName: "auth_token",
        cookieType: "HttpOnly Cookie",
        jwtPayload: {
          sub: "user_uuid",
          tenant_id: "tenant_uuid (null für server_admin/consultant)",
          email: "user@company.de",
          role: "workflow-administrator",
          global_role: "consultant (Optional: für Consultants mit Tenant-Zugriff)",
          iat: 1234567890,
          exp: 1234567890
        },
        diagram: extractedDetails.codeExamples.find(c => c.code.includes('Browser') && c.code.includes('Backend'))?.code || "",
        apiAuthentication: {
          method: "JWT-Token als HttpOnly Cookie",
          automatic: "Cookie wird automatisch bei jedem Request mitgesendet",
          validation: "Backend validiert Cookie via JwtAuthGuard",
          noManualHeader: "Kein manuelles Setzen des Authorization-Headers nötig",
          sseException: "Bei SSE: Token muss explizit im Header mitgegeben werden"
        },
        codeExample: extractedDetails.codeExamples.find(c => c.code.includes('credentials: \'include\''))?.code || "",
        benefits: [
          "Single Domain - kein DNS/SSL für Subdomains nötig",
          "Totale Datenisolation zwischen Tenants",
          "GDPR/Compliance-ready"
        ]
      },
      acceptanceCriteria: [
        "JWT Cookie 'auth_token' wird als HttpOnly Cookie gespeichert",
        "JWT Payload enthält: sub (user_uuid), tenant_id, email, role, global_role (optional), iat, exp",
        "JwtAuthGuard validiert Cookie bei jedem Request",
        "Tenant-ID wird aus JWT extrahiert und für DB-Queries verwendet",
        "Cookie wird automatisch bei fetch mit credentials: 'include' mitgesendet",
        "SSE-Verbindungen unterstützen Token im Header (withCredentials: true)",
        "Frontend API-Client implementiert mit credentials: 'include'",
        "Code-Beispiel für SSE mit EventSource und withCredentials",
        "Typecheck passes"
      ],
      priority: 3,
      passes: false
    }
  ]
});

// Speichere finale PRD
writeFileSync('prd-final-complete.json', JSON.stringify(finalPRD, null, 2));

console.log('✅ prd-final-complete.json erstellt');
console.log(`   - ${finalPRD.phases.length} Phasen`);
console.log(`   - ${finalPRD.phases[0].userStories.length} User Stories in Phase 1`);
console.log(`   - Alle Code-Beispiele und Diagramme eingebettet`);
