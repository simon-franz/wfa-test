#!/usr/bin/env bun
/**
 * Umnummerierung aller User Stories nach Verschiebung von Marketplace nach Phase 1
 */

import { readFileSync, writeFileSync } from 'fs';

const files = [
  'prd-phase1-foundation.json',
  'prd-phase1-designer.json',
  'prd-phase1-nodes.json',
  'prd-phase2-persontask.json',
  'prd-phase3-approvals.json',
  'prd-phase4-enterprise.json'
];

let currentId = 1;

files.forEach(file => {
  const data = JSON.parse(readFileSync(file, 'utf-8'));
  
  data.userStories = data.userStories.map(us => {
    const newId = `US-${String(currentId).padStart(3, '0')}`;
    console.log(`${us.id} → ${newId}: ${us.title}`);
    
    return {
      ...us,
      id: newId,
      priority: currentId++
    };
  });
  
  writeFileSync(file, JSON.stringify(data, null, 2));
});

console.log(`\n✅ Alle User Stories umnummeriert (1-${currentId - 1})`);
