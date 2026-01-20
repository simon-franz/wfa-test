#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SCRIPT_DIR = __dirname;
const OUTPUT_DIR = path.join(SCRIPT_DIR, '../../packages/hrworks-api-client/auto-client');
const INPUT_DIR = path.join(SCRIPT_DIR, 'input');

console.log('🚀 Starte HR WORKS API-Client-Generierung...');

// Schritt 1: Docker prüfen
console.log('\n🐳 Prüfe Docker-Status...');
try {
  execSync('docker info', { stdio: 'ignore' });
  console.log('✅ Docker läuft');
} catch (error) {
  console.error('❌ Docker läuft nicht. Bitte starte Docker:');
  console.error('   sudo service docker start');
  process.exit(1);
}

// Schritt 2: Prüfe Input-Datei
console.log('\n📄 Prüfe OpenAPI-Datei...');
const inputFiles = fs.readdirSync(INPUT_DIR).filter(f => f.endsWith('.yml') || f.endsWith('.yaml'));
if (inputFiles.length === 0) {
  console.error('❌ Keine YAML-Datei im input/ Verzeichnis gefunden!');
  process.exit(1);
}
console.log(`✅ Gefunden: ${inputFiles.join(', ')}`);

// Schritt 3: Output-Verzeichnis vorbereiten
console.log('\n🧹 Bereite Output-Verzeichnis vor...');
if (fs.existsSync(OUTPUT_DIR)) {
  console.log('   Bereinige alten Output...');
  const files = fs.readdirSync(OUTPUT_DIR);
  for (const file of files) {
    const filePath = path.join(OUTPUT_DIR, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      fs.rmSync(filePath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(filePath);
    }
  }
}
fs.mkdirSync(OUTPUT_DIR, { recursive: true });
console.log('✅ Output-Verzeichnis bereit');

// Schritt 4: Docker Compose ausführen
console.log('\n⚙️  Führe OpenAPI Generator aus...');
console.log('   Dies kann einige Minuten dauern...\n');

try {
  const env = {
    ...process.env,
    UID: process.getuid ? process.getuid().toString() : '1000',
    GID: process.getgid ? process.getgid().toString() : '1000'
  };

  execSync('docker compose up --abort-on-container-exit', {
    cwd: SCRIPT_DIR,
    stdio: 'inherit',
    env: env
  });

  console.log('\n✅ API-Client erfolgreich generiert!');
} catch (error) {
  console.error('\n❌ Fehler bei der Generierung:', error.message);
  process.exit(1);
}

// Schritt 5: Cleanup
console.log('\n🧹 Räume Docker-Container auf...');
try {
  execSync('docker compose down', {
    cwd: SCRIPT_DIR,
    stdio: 'ignore'
  });
  console.log('✅ Cleanup abgeschlossen');
} catch (error) {
  console.warn('⚠️  Warnung: Container-Cleanup fehlgeschlagen');
}

// Schritt 6: Prüfe Output
console.log('\n📊 Prüfe generierten Output...');
const outputFiles = fs.readdirSync(OUTPUT_DIR);
if (outputFiles.length === 0) {
  console.error('❌ Kein Output generiert!');
  process.exit(1);
}

console.log(`✅ ${outputFiles.length} Dateien/Ordner generiert`);

console.log('\n' + '='.repeat(60));
console.log('✨ FERTIG! API-Client wurde erfolgreich generiert.');
console.log('='.repeat(60));
console.log('\nNächste Schritte:');
console.log('1. Prüfe den generierten Code in packages/hrworks-api-client/auto-client');
console.log('2. Führe "npm run build" aus');
console.log('\n');
