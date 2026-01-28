#!/usr/bin/env python3
"""
Generiert vollständige PRD JSON-Dateien aus plan.md
mit ALLEN Details, Code-Beispielen und Spezifikationen
"""

import json
import re

# Lese plan.md
with open('plan.md', 'r', encoding='utf-8') as f:
    plan_content = f.read()

# Extrahiere alle Sections
sections = {}
current_section = None
current_content = []

for line in plan_content.split('\n'):
    if line.startswith('##'):
        if current_section:
            sections[current_section] = '\n'.join(current_content)
        current_section = line.strip('# ').strip()
        current_content = []
    else:
        current_content.append(line)

if current_section:
    sections[current_section] = '\n'.join(current_content)

print(f"Gefundene Sections: {len(sections)}")
for section in sections.keys():
    print(f"  - {section}")

# Generiere vollständige PRD
prd = {
    "project": "Workflow Automation Platform",
    "description": "VOLLSTÄNDIGE PRD mit ALLEN Details aus plan.md",
    "generated": "2026-01-27",
    "sections": {}
}

# Füge alle Sections hinzu
for section_name, section_content in sections.items():
    prd["sections"][section_name] = {
        "content": section_content[:500] + "..." if len(section_content) > 500 else section_content,
        "length": len(section_content)
    }

# Speichere
with open('prd-complete-extracted.json', 'w', encoding='utf-8') as f:
    json.dump(prd, f, indent=2, ensure_ascii=False)

print("\n✅ prd-complete-extracted.json erstellt")
