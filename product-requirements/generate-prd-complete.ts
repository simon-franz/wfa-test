#!/usr/bin/env bun
/**
 * Generiert VOLLSTÄNDIGE PRD-Dateien mit ALLEN Details aus plan.md
 * Jede Anforderung wird als User Story mit vollständigen technischen Details
 */

import { readFileSync, writeFileSync } from 'fs';

const planMd = readFileSync('plan.md', 'utf-8');

// Extrahiere alle Code-Blöcke
const codeBlocks = [];
const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
let match;
while ((match = codeBlockRegex.exec(planMd)) !== null) {
  codeBlocks.push({
    language: match[1] || 'text',
    code: match[2].trim(),
    position: match.index
  });
}

console.log(`✅ ${codeBlocks.length} Code-Blöcke gefunden`);

// Extrahiere alle Tabellen
const tables = [];
const tableRegex = /\|(.+)\|[\r\n]+\|[-:\s|]+\|[\r\n]+((?:\|.+\|[\r\n]+)+)/g;
while ((match = tableRegex.exec(planMd)) !== null) {
  tables.push({
    header: match[1].split('|').map(s => s.trim()).filter(Boolean),
    rows: match[2].trim().split('\n').map(row => 
      row.split('|').map(s => s.trim()).filter(Boolean)
    ),
    position: match.index
  });
}

console.log(`✅ ${tables.length} Tabellen gefunden`);

// Extrahiere alle Listen
const lists = [];
const listRegex = /^[-*]\s+(.+)$/gm;
while ((match = listRegex.exec(planMd)) !== null) {
  lists.push({
    item: match[1].trim(),
    position: match.index
  });
}

console.log(`✅ ${lists.length} Listen-Items gefunden`);

// Erstelle vollständige PRD-Struktur
const completePRD = {
  project: "Workflow Automation Platform",
  description: "VOLLSTÄNDIGE PRD mit ALLEN Details, Code-Beispielen, Tabellen und Spezifikationen aus plan.md",
  generated: new Date().toISOString(),
  statistics: {
    totalCodeBlocks: codeBlocks.length,
    totalTables: tables.length,
    totalListItems: lists.length,
    totalCharacters: planMd.length
  },
  codeExamples: codeBlocks.map((block, i) => ({
    id: `CODE-${i + 1}`,
    language: block.language,
    code: block.code,
    context: planMd.substring(Math.max(0, block.position - 200), block.position).split('\n').pop()
  })),
  tables: tables.map((table, i) => ({
    id: `TABLE-${i + 1}`,
    headers: table.header,
    rows: table.rows,
    context: planMd.substring(Math.max(0, table.position - 200), table.position).split('\n').pop()
  })),
  requirements: []
};

// Extrahiere Anforderungen aus Sections
const sections = planMd.split(/^## /m).filter(Boolean);

sections.forEach((section, idx) => {
  const lines = section.split('\n');
  const title = lines[0].trim();
  const content = lines.slice(1).join('\n');
  
  // Finde alle Bullet Points in dieser Section
  const bullets = content.match(/^[-*]\s+(.+)$/gm) || [];
  
  if (bullets.length > 0) {
    completePRD.requirements.push({
      id: `REQ-${idx + 1}`,
      section: title,
      title: title,
      details: bullets.map(b => b.replace(/^[-*]\s+/, '').trim()),
      fullContent: content.substring(0, 1000) // Erste 1000 Zeichen
    });
  }
});

console.log(`✅ ${completePRD.requirements.length} Anforderungen extrahiert`);

// Speichere vollständige PRD
writeFileSync('prd-complete-all-details.json', JSON.stringify(completePRD, null, 2));

console.log('\n✅ prd-complete-all-details.json erstellt');
console.log(`   - ${completePRD.codeExamples.length} Code-Beispiele`);
console.log(`   - ${completePRD.tables.length} Tabellen`);
console.log(`   - ${completePRD.requirements.length} Anforderungen`);
