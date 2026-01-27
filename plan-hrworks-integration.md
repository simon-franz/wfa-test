HR WORKS API Generator - Komplette Setup Anleitung

## Übersicht

Diese Anleitung zeigt dir, wie du aus einer OpenAPI YAML-Datei automatisch TypeScript API-Clients für HR WORKS generierst. 

**🐳 Docker-basiertes Setup:** Der gesamte Generierungsprozess läuft in einem Docker-Container mit `docker-compose`. Der OpenAPI Generator wird als Docker-Image ausgeführt, sodass keine lokale Installation des Generators nötig ist.

**Quelle:** Extrahiert aus dem hrworks/e2e-utils Repository.

## Voraussetzungen

- **WSL2** (Windows Subsystem for Linux) mit Ubuntu 20.04 LTS oder höher
- **Docker** installiert und lauffähig in WSL ⚠️ **WICHTIG: Docker muss laufen!**
- **Node.js** Version 16 oder höher
- **npm** Package Manager

Projektstruktur

Diese Anleitung gehört in das `docs/` Verzeichnis des workflow-automation Monorepos.

Erstelle folgende Verzeichnisstruktur:

```
workflow-automation/
├── backend/                      # NestJS Backend
├── frontend/                     # React Frontend
├── shared/                       # Gemeinsame Types
├── tools/
│   └── generators/
│       └── api-generator/
│           ├── docker-compose.yml
│           ├── generate.js
│           ├── generate.sh (optional)
│           └── input/
│               └── API_internal-fixed.yml  (HR WORKS OpenAPI-Datei)
├── packages/
│   └── hrworks-api-client/
│       ├── auto-client/         (generierter Code landet hier)
│       ├── src/
│       │   └── index.ts         (Wrapper-Klasse)
│       ├── package.json
│       └── tsconfig.json
├── docs/
│   └── plan-hrworks-integration.md  (diese Datei!)
├── package.json                 (Root package.json)
└── lerna.json                   (optional, für Monorepo)
```


## Datei 1: docker-compose.yml

**Pfad:** `tools/generators/api-generator/docker-compose.yml`

**Zweck:** Diese Datei definiert den Docker-Container, der den OpenAPI Generator ausführt. Der Generator läuft komplett isoliert im Container - du musst den OpenAPI Generator **nicht** lokal installieren.

```yaml
version: "3"
services:
  openapi-generator:
    image: openapitools/openapi-generator-cli:latest
    user: "${UID:-1000}:${GID:-1000}"
    volumes:
      - ./input:/local/input
      - ../../../packages/hrworks-api-client/auto-client:/local/output
    command: generate
      -i /local/input/API_internal-fixed.yml
      -g typescript-fetch
      -o /local/output
      --additional-properties=supportsES6=true,npmName=@hrworks/auto-client,npmVersion=1.0.0,withInterfaces=true,nullSafeAdditionalProps=true,modelPropertyNaming=original,stringEnums=true
```

**Wichtige Parameter erklärt:**
- `image: openapitools/openapi-generator-cli:latest` - Docker Image des OpenAPI Generators (wird automatisch heruntergeladen)
- `user: "${UID:-1000}:${GID:-1000}"` - Nutzt die aktuelle User-ID, damit generierte Files die richtigen Permissions haben
- `./input:/local/input` - Mapped das input-Verzeichnis (wo deine YAML liegt) in den Container
- `../../../packages/hrworks-api-client/auto-client:/local/output` - Output-Verzeichnis für generierten Code (wird aus dem Container zurück ins Host-System geschrieben)
- `-i /local/input/API_internal-fixed.yml` - Input OpenAPI-Datei (Pfad **innerhalb** des Containers)
- `-g typescript-fetch` - Generator-Typ (TypeScript mit Fetch API)
- `supportsES6=true` - Nutzt moderne ES6+ JavaScript Features
- `npmName=@hrworks/auto-client` - NPM Package Name
- `withInterfaces=true` - Generiert TypeScript Interfaces
- `nullSafeAdditionalProps=true` - Null-sichere zusätzliche Properties
- `modelPropertyNaming=original` - Behält originale Property-Namen bei
- `stringEnums=true` - Enums als String-Literale

⚠️ **Anpassen für dein Projekt:**
- Ändere `API_internal-fixed.yml` zum Namen deiner OpenAPI-Datei
- Passe die Volume-Pfade an deine Projektstruktur an
- Optional: Ändere `npmName` und `npmVersion` nach deinen Wünschen

Datei 2: generate.js
Pfad: tools/generators/api-generator/generate.js

#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

// Konfiguration
const REPO_ROOT = path.resolve(__dirname, "../../..");
const INPUT_DIR = path.join(__dirname, "input");
const OUTPUT_DIR = path.join(REPO_ROOT, "packages/api-client");
const API_FILE = path.join(INPUT_DIR, "API_internal-fixed.yml");
const DOCKER_COMPOSE_FILE = path.join(__dirname, "docker-compose.yml");

console.log("🚀 Generiere API-Client...");

try {
  // Prüfen, ob die API-Spezifikation existiert
  if (!fs.existsSync(API_FILE)) {
    console.error("❌ API-Spezifikation nicht gefunden: " + API_FILE);
    console.log(
      "Bitte lege die API-Spezifikation unter tools/generators/api-generator/input/API.yml ab."
    );
    process.exit(1);
  }

  // Prüfen, ob die Docker-Compose-Datei existiert
  if (!fs.existsSync(DOCKER_COMPOSE_FILE)) {
    console.error(
      "❌ Docker-Compose-Datei nicht gefunden: " + DOCKER_COMPOSE_FILE
    );
    process.exit(1);
  }

  // Erstelle Output-Verzeichnis, falls nicht vorhanden
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  } else {
    // Alte Dateien löschen (außer .gitkeep)
    const filesToKeep = [".gitkeep"];
    fs.readdirSync(OUTPUT_DIR)
      .filter((file) => !filesToKeep.includes(file))
      .forEach((file) => {
        const filePath = path.join(OUTPUT_DIR, file);
        if (fs.lstatSync(filePath).isDirectory()) {
          fs.rmSync(filePath, { recursive: true });
        } else {
          fs.unlinkSync(filePath);
        }
      });
  }

  // Docker-Compose für die Code-Generierung ausführen
  console.log("📦 Verwende Docker-Compose für die Generierung...");
  console.log(`   Docker-Compose-Datei: ${DOCKER_COMPOSE_FILE}`);

  execSync(`docker-compose -f "${DOCKER_COMPOSE_FILE}" up`, {
    stdio: "inherit",
    cwd: path.dirname(DOCKER_COMPOSE_FILE),
  });

  console.log("✅ API-Client erfolgreich generiert!");

  /* ----------------------------------- WIP ---------------------------------- */
  // Nachbearbeitung für Typenprobleme
  // console.log("🔄 Führe Nachbearbeitungen durch...");

  // Leere Type-Definitionen fixen
  //   const modelDir = path.join(OUTPUT_DIR, "models");
  //   if (fs.existsSync(modelDir)) {
  //     fs.readdirSync(modelDir)
  //       .filter((file) => file.endsWith(".ts") && file.includes("Response"))
  //       .forEach((file) => {
  //         const filePath = path.join(modelDir, file);
  //         let content = fs.readFileSync(filePath, "utf8");

  //         // Leere Types fixen
  //         content = content.replace(
  //           /export type (\w+) = ;/g,
  //           "export type $1 = any;"
  //         );

  //         // Type Assertions für Discriminator-Typen hinzufügen
  //         content = content.replace(
  //           /return (\w+)FromJSONTyped\(json, ignoreDiscriminator\);/g,
  //           "return $1FromJSONTyped(json, ignoreDiscriminator) as unknown as JobsResponse;"
  //         );

  //         fs.writeFileSync(filePath, content);
  //       });
  //   }
  //   console.log("✅ Nachbearbeitungen abgeschlossen!");
} catch (error) {
  console.error("❌ Fehler bei der Generierung:", error);
  process.exit(1);
}

Datei 3: generate.sh (Optional)
Pfad: tools/generators/api-generator/generate.sh

##!/bin/bash
export UID=$(id -u)
export GID=$(id -g)
docker-compose run --rm openapi-generator

Führe Docker Compose aus
docker-compose up --abort-on-container-exit

Cleanup
docker-compose down

echo "✅ Fertig!"


Mache es ausführbar:
chmod +x tools/generators/api-generator/generate.sh


Datei 4: package.json (Root)
Pfad: package.json (im Projekt-Root)

{
  "name": "dein-projekt",
  "version": "1.0.0",
  "scripts": {
    "generate-api-client": "node tools/generators/api-generator/generate.js",
    "bootstrap": "lerna bootstrap",
    "build": "lerna run build"
  },
  "devDependencies": {
    "lerna": "^6.0.0"
  },
  "workspaces": [
    "packages/*"
  ]
}


Datei 5: package.json (API-Client Package)
Pfad: packages/hrworks-api-client/package.json

{
  "name": "e2e-utils",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "build": "npm run build --workspaces --if-present",
    "test": "npm run test --workspaces --if-present",
    "lint": "npm run lint --workspaces --if-present",
    "maintain-docker": "docker system prune -f && docker pull openapitools/openapi-generator-cli:latest",
    "generate-api-client": "node tools/generators/api-generator/generate.js"
  },
  "dependencies": {},
  "devDependencies": {
    "lerna": "^8.2.4"
  }
}


Setup-Anleitung

Docker in WSL einrichten

In WSL
sudo apt update
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

Docker Repository hinzufügen
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb\_release -cs) stable"

Docker installieren
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

Docker starten
sudo service docker start

User zur Docker-Gruppe hinzufügen (vermeidet sudo)
sudo usermod -aG docker $USER
newgrp docker

Testen
docker run hello-world


Projekt-Setup

Repository klonen (falls noch nicht geschehen)
cd /path/to/your/project

Verzeichnisstruktur erstellen
mkdir -p tools/generators/api-generator/input
mkdir -p packages/hrworks-api-client/auto-client

Abhängigkeiten installieren
npm install

Falls du Lerna nutzt
npm run bootstrap


OpenAPI-Datei platzieren

Kopiere deine OpenAPI YAML-Datei
cp /pfad/zu/deiner/openapi.yaml tools/generators/api-generator/input/API\_internal-fixed.yml


⚠️ Wichtiger Hinweis zur YAML-Datei:

Das Original-Repository nutzt eine "API\internal-fixed.yml" statt der normalen "API\internal.yml", weil die YAML teilweise oneOf verwendet, was beim OpenAPI-Generator zu Problemen führt.

Du solltest deine YAML-Datei prüfen und ggf. oneOf-Konstrukte manuell anpassen.

API-Client generieren

Docker-Status prüfen
sudo service docker status

Falls nicht läuft, starten
sudo service docker start

API-Client generieren
npm run generate-api-client


Manuelle Anpassungen (WICHTIG!)

Nach der Generierung sind 2 manuelle Anpassungen in TypeScript-Dateien erforderlich:
a) JobsResponse.ts
// Pfad: packages/hrworks-api-client/auto-client/src/models/JobsResponse.ts
// Maskiere die Return-Types mit "as JobResponse"

// Vorher:
return someValue;

// Nachher:
return someValue as JobResponse;

b) JobsResponseType.ts
// Pfad: packages/hrworks-api-client/auto-client/src/models/JobsResponseType.ts
// Maskiere die Return-Types mit "as JobsResponseType"

// Vorher:
return someValue;

// Nachher:
return someValue as JobsResponseType;


⚠️ Spätestens beim Build-Prozess werden diese TypeScript-Fehler angemerkt!

Build ausführen

Alle Packages bauen
npm run build


Fehlerbehebung

Problem: Docker läuft nicht

Status prüfen
sudo service docker status

Starten
sudo service docker start

Logs prüfen
sudo journalctl -u docker


Problem: Permission Errors

User zur Docker-Gruppe hinzufügen
sudo usermod -aG docker $USER

Neu einloggen oder
newgrp docker


Problem: Kein Output generiert

Prüfe ob die YAML-Datei im input/ Verzeichnis liegt
Prüfe die Docker-Logs: docker-compose logs
Prüfe die YAML-Syntax
Teste den Generator manuell:
      cd tools/generators/api-generator
   docker-compose up
   

Problem: TypeScript-Fehler nach Generierung

Das ist normal! Führe die manuellen Anpassungen in JobsResponse.ts und JobsResponseType.ts durch
Falls andere Fehler auftreten, prüfe die generierten Typen

Anpassungen für dein Projekt

Generator-Typ ändern

In docker-compose.yml kannst du den Generator ändern:

-g typescript-fetch     # Fetch API (Standard)
-g typescript-axios     # Axios
-g typescript-node      # Node.js


Alle Generatoren

Zusätzliche Properties

Füge in docker-compose.yml weitere Properties hinzu:

--additional-properties=
  supportsES6=true,
  npmName=@dein-org/api-client,
  npmVersion=2.0.0,
  withInterfaces=true,
  nullSafeAdditionalProps=true,
  modelPropertyNaming=camelCase,  # oder: original, snake\_case
  stringEnums=true,
  useSingleRequestParameter=true


Pfade anpassen

Wenn deine Projektstruktur anders ist, passe die Pfade an:
In docker-compose.yml:
volumes:
  - ./input:/local/input
  - DEIN\OUTPUT\PFAD:/local/output  # Anpassen!

In generate.js:
const OUTPUT\DIR = path.join(SCRIPT\DIR, 'DEIN\RELATIVER\PFAD');


Verwendung des generierten Clients

import { Configuration, DefaultApi } from '@hrworks/hrworks-api-client';

// Konfiguration
const config = new Configuration({
  basePath: 'https://api.hrworks.de',
  apiKey: 'dein-api-key'
});

// API-Client erstellen
const api = new DefaultApi(config);

// API aufrufen
const result = await api.getEmployees();
console.log(result.data);


Zusammenfassung
Einmalig:
Docker in WSL installieren
Projektstruktur erstellen
Dateien (docker-compose.yml, generate.js) erstellen
npm-Scripts einrichten
Bei jeder API-Änderung:
Neue OpenAPI YAML ins input/ Verzeichnis
npm run generate-api-client ausführen
Manuelle TypeScript-Anpassungen (JobsResponse.ts, JobsResponseType.ts)
npm run build ausführen

Weitere Ressourcen

OpenAPI Generator Dokumentation
TypeScript-Fetch Generator Optionen
WSL Dokumentation
Docker in WSL

Fehlende Dateien - Komplettierung

Datei 6: tsconfig.json (API-Client Package)
Pfad: packages/hrworks-api-client/tsconfig.json

{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true
  },
  "include": [
    "src//*",
    "auto-client/src//*"
  ],
  "exclude": [
    "node\_modules",
    "dist",
    "/*.spec.ts",
    "/*.test.ts"
  ]
}


Datei 7: lerna.json (optional, falls Monorepo)
Pfad: lerna.json (im Projekt-Root)

{
  "version": "independent",
  "npmClient": "npm",
  "packages": [
    "packages/*"
  ],
  "command": {
    "bootstrap": {
      "hoist": true
    },
    "run": {
      "stream": true
    }
  }
}

Falls du KEIN Monorepo brauchst, kannst du Lerna weglassen und stattdessen npm workspaces nutzen.

Datei 8: build.js (API-Client Package)
Pfad: packages/hrworks-api-client/build.js

const { execSync } = require('child\_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 Baue HR WORKS API-Client...');

// Schritt 1: Prüfe ob auto-client existiert
const autoClientPath = path.join(\\dirname, 'auto-client');
if (!fs.existsSync(autoClientPath)) {
  console.error('❌ auto-client/ Verzeichnis nicht gefunden!');
  console.error('   Führe zuerst "npm run generate-auto-client" aus.');
  process.exit(1);
}

// Schritt 2: TypeScript kompilieren
console.log('📦 Kompiliere TypeScript...');
try {
  execSync('tsc', {
    cwd: \\dirname,
    stdio: 'inherit'
  });
  console.log('✅ Build erfolgreich!');
} catch (error) {
  console.error('❌ TypeScript-Kompilierung fehlgeschlagen');
  process.exit(1);
}

// Schritt 3: Prüfe Output
const distPath = path.join(\\dirname, 'dist');
if (fs.existsSync(distPath)) {
  const files = fs.readdirSync(distPath);
  console.log(\n📊 ${files.length} Dateien in dist/ generiert);
} else {
  console.warn('⚠️  Warnung: dist/ Verzeichnis nicht gefunden');
}


Datei 9: Konkrete Beispiele für manuelle Fixes

Fix 1: JobsResponse.ts
Pfad: packages/hrworks-api-client/auto-client/src/models/JobsResponse.ts
Problem: TypeScript-Fehler bei Return-Types
Vorher (generierter Code):
export const JobsResponseFromJSON = (json: any): JobsResponse => {
    return JobsResponseFromJSONTyped(json, false);
}

export const JobsResponseFromJSONTyped = (
    json: any,
    ignoreDiscriminator: boolean
): JobsResponse => {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'jobs': !exists(json, 'jobs') ? undefined : json['jobs'],
        'total': !exists(json, 'total') ? undefined : json['total'],
    };
}

Nachher (mit Fix):
export const JobsResponseFromJSON = (json: any): JobsResponse => {
    return JobsResponseFromJSONTyped(json, false) as JobResponse;  // ← FIX HIER
}

export const JobsResponseFromJSONTyped = (
    json: any,
    ignoreDiscriminator: boolean
): JobsResponse => {
    if ((json === undefined) || (json === null)) {
        return json as JobResponse;  // ← FIX HIER
    }
    return {
        'jobs': !exists(json, 'jobs') ? undefined : json['jobs'],
        'total': !exists(json, 'total') ? undefined : json['total'],
    } as JobResponse;  // ← FIX HIER
}


Fix 2: JobsResponseType.ts
Pfad: packages/hrworks-api-client/auto-client/src/models/JobsResponseType.ts
Vorher:
export const JobsResponseTypeFromJSON = (json: any): JobsResponseType => {
    return JobsResponseTypeFromJSONTyped(json, false);
}

export const JobsResponseTypeFromJSONTyped = (
    json: any,
    ignoreDiscriminator: boolean
): JobsResponseType => {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'type': !exists(json, 'type') ? undefined : json['type'],
    };
}

Nachher:
export const JobsResponseTypeFromJSON = (json: any): JobsResponseType => {
    return JobsResponseTypeFromJSONTyped(json, false) as JobsResponseType;  // ← FIX
}

export const JobsResponseTypeFromJSONTyped = (
    json: any,
    ignoreDiscriminator: boolean
): JobsResponseType => {
    if ((json === undefined) || (json === null)) {
        return json as JobsResponseType;  // ← FIX
    }
    return {
        'type': !exists(json, 'type') ? undefined : json['type'],
    } as JobsResponseType;  // ← FIX
}

Warum diese Fixes nötig sind:

Der OpenAPI Generator hat Probleme mit oneOf-Konstrukten in der YAML. Die generierten TypeScript-Typen passen nicht 100% zu den Return-Werten. Mit as Type erzwingen wir den korrekten Typ.

Datei 10: .gitignore Ergänzungen
Pfad: .gitignore (im Projekt-Root)

Node
node\_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

Build Output
dist/
build/
*.tsbuildinfo

Generierter API-Client (wird nicht committed)
packages/hrworks-api-client/auto-client/

Docker
.docker/

IDE
.vscode/
.idea/
*.swp
*.swo
*~

OS
.DS\_Store
Thumbs.db

Logs
logs/
*.log

Env files (falls API Keys)
.env
.env.local
.env.*.local


⚠️ Wichtig: Der generierte auto-client/ Code sollte NICHT ins Repository committed werden, da er jederzeit neu generiert werden kann.

Datei 11: src/index.ts (Wrapper für den generierten Client)
Pfad: packages/hrworks-api-client/src/index.ts

Dies ist ein Wrapper, um den auto-generierten Client benutzerfreundlicher zu machen:

// Re-export des generierten Clients
export * from '../auto-client/src';

// Custom Wrapper-Klasse
import { Configuration, DefaultApi } from '../auto-client/src';

export interface HRWorksClientConfig {
  baseUrl: string;
  apiKey?: string;
  accessToken?: string;
}

export class HRWorksClient {
  private api: DefaultApi;

  constructor(config: HRWorksClientConfig) {
    const configuration = new Configuration({
      basePath: config.baseUrl,
      apiKey: config.apiKey,
      accessToken: config.accessToken,
    });

    this.api = new DefaultApi(configuration);
  }

  /
   * Hole alle Mitarbeiter
   */
  async getEmployees() {
    return this.api.getEmployees();
  }

  /
   * Hole einen spezifischen Mitarbeiter
   */
  async getEmployee(id: string) {
    return this.api.getEmployee({ id });
  }

  // Weitere Helper-Methoden hier hinzufügen...
}

// Beispiel-Usage:
// const client = new HRWorksClient({
//   baseUrl: 'https://api.hrworks.de',
//   apiKey: 'your-api-key'
// });
// const employees = await client.getEmployees();


Datei 12: Vollständiges package.json (Root)
Pfad: package.json (Projekt-Root, vollständige Version)

{
  "name": "hr-works-integration",
  "version": "1.0.0",
  "private": true,
  "description": "HR WORKS API Integration mit auto-generiertem TypeScript Client",
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "generate-api-client": "node tools/generators/api-generator/generate.js",
    "bootstrap": "lerna bootstrap || npm install",
    "build": "lerna run build || npm run build:client",
    "build:client": "cd packages/hrworks-api-client && npm run build",
    "clean": "lerna clean -y && rm -rf node\_modules",
    "test": "lerna run test"
  },
  "devDependencies": {
    "lerna": "^6.0.0",
    "typescript": "^4.9.5"
  },
  "engines": {
    "node": ">=16.0.0",
    "npm": ">=8.0.0"
  }
}


Vollständige Checkliste zum Setup

✅ Phase 1: Initiales Setup

[ ] WSL2 installiert und konfiguriert
[ ] Docker in WSL läuft (sudo service docker start)
[ ] Node.js >= 16 installiert
[ ] Projektstruktur erstellt (siehe oben)

✅ Phase 2: Dateien erstellen

[ ] tools/generators/api-generator/docker-compose.yml
[ ] tools/generators/api-generator/generate.js
[ ] tools/generators/api-generator/input/ Verzeichnis erstellt
[ ] packages/hrworks-api-client/package.json
[ ] packages/hrworks-api-client/tsconfig.json
[ ] packages/hrworks-api-client/build.js
[ ] packages/hrworks-api-client/src/index.ts
[ ] Root package.json
[ ] .gitignore
[ ] lerna.json (optional)

✅ Phase 3: OpenAPI YAML beschaffen

[ ] HR WORKS OpenAPI Spec von HR WORKS erhalten
[ ] Als API\_internal-fixed.yml in tools/generators/api-generator/input/ speichern
[ ] YAML validieren (z.B. mit Swagger Editor)
[ ] oneOf-Konstrukte prüfen und ggf. manuell fixen

✅ Phase 4: Dependencies installieren

cd /path/to/your/project
npm install
npm run bootstrap  # Falls Lerna genutzt wird


✅ Phase 5: API-Client generieren

Docker starten falls nötig
sudo service docker start

Client generieren
npm run generate-api-client


✅ Phase 6: Manuelle Fixes

[ ] packages/hrworks-api-client/auto-client/src/models/JobsResponse.ts - Return-Types mit as JobResponse maskieren
[ ] packages/hrworks-api-client/auto-client/src/models/JobsResponseType.ts - Return-Types mit as JobsResponseType maskieren
[ ] Bei Build-Fehlern: Weitere TypeScript-Errors in generierten Files fixen

✅ Phase 7: Build & Test

Build ausführen
npm run build

Bei Erfolg: dist/ Verzeichnis prüfen
ls -la packages/hrworks-api-client/dist/


✅ Phase 8: Verwendung

import { HRWorksClient } from '@hrworks/hrworks-api-client';

const client = new HRWorksClient({
  baseUrl: 'https://api.hrworks.de',
  apiKey: process.env.HRWORKS\API\KEY
});

const employees = await client.getEmployees();
console.log(employees);


Schnellstart-Script

Falls du alles automatisieren möchtest, hier ein Bash-Script:
Pfad: setup.sh

#!/bin/bash

set -e

echo "🚀 HR WORKS API-Client Setup"
echo "============================="

Prüfe Voraussetzungen
echo "\n📋 Prüfe Voraussetzungen..."

if ! command -v docker &> /dev/null; then
    echo "❌ Docker nicht gefunden. Bitte installiere Docker."
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "❌ Node.js nicht gefunden. Bitte installiere Node.js >= 16."
    exit 1
fi

echo "✅ Docker: $(docker --version)"
echo "✅ Node.js: $(node --version)"
echo "✅ npm: $(npm --version)"

Erstelle Verzeichnisstruktur
echo "\n📁 Erstelle Projektstruktur..."
mkdir -p tools/generators/api-generator/input
mkdir -p packages/hrworks-api-client/auto-client/src
mkdir -p packages/hrworks-api-client/src

echo "✅ Verzeichnisse erstellt"

Installiere Dependencies
echo "\n📦 Installiere Dependencies..."
npm install

if [ -f "lerna.json" ]; then
    echo "Lerna erkannt, führe Bootstrap aus..."
    npm run bootstrap
fi

echo "✅ Dependencies installiert"

Prüfe ob OpenAPI YAML existiert
echo "\n📄 Prüfe OpenAPI YAML..."
if [ ! -f "tools/generators/api-generator/input/API\_internal-fixed.yml" ]; then
    echo "⚠️  Warnung: API\_internal-fixed.yml nicht gefunden!"
    echo "   Bitte platziere deine OpenAPI YAML in:"
    echo "   tools/generators/api-generator/input/API\_internal-fixed.yml"
    echo ""
    echo "Möchtest du das Setup trotzdem fortsetzen? (y/n)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "✅ OpenAPI YAML gefunden"
fi

echo "\n✨ Setup abgeschlossen!"
echo ""
echo "Nächste Schritte:"
echo "1. Stelle sicher dass Docker läuft: sudo service docker start"
echo "2. Generiere den API-Client: npm run generate-api-client"
echo "3. Führe die manuellen TypeScript-Fixes durch (siehe Dokumentation)"
echo "4. Baue das Projekt: npm run build"
echo ""


Mache es ausführbar:
chmod +x setup.sh
./setup.sh


Prompt für ein anderes LLM

Wenn du diese Anleitung an ein anderes LLM weitergibst, nutze folgenden Prompt:

Ich habe eine vollständige Anleitung zum Setup eines OpenAPI-Generators für HR WORKS API-Clients.

Die Anleitung enthält:
Komplette Dateiinhalte (docker-compose.yml, generate.js, package.json)
Setup-Schritte für WSL + Docker
Verzeichnisstruktur
Manuelle Anpassungen die erforderlich sind

Ich möchte dies in meinem Projekt implementieren. Die Projektstruktur ist:
[DEINE PROJEKTSTRUKTUR HIER EINFÜGEN]

Bitte hilf mir dabei:
Die Dateien an meine Projektstruktur anzupassen
Die Pfade korrekt zu setzen
[WEITERE SPEZIFISCHE ANFORDERUNGEN]

[FÜGE DIE KOMPLETTE ANLEITUNG HIER EIN]
