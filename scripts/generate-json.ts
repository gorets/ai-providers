/**
 * Script to generate JSON files from TypeScript data
 * This allows users to fetch the latest data directly from GitHub
 */

import * as fs from 'fs';
import * as path from 'path';
import { getDatabase } from '../src/index';

const OUTPUT_DIR = path.join(__dirname, '..', 'dist');
const DATA_DIR = path.join(OUTPUT_DIR, 'data');

// Create output directories
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Generate complete database
const database = getDatabase();

// Write complete database
fs.writeFileSync(
  path.join(DATA_DIR, 'database.json'),
  JSON.stringify(database, null, 2),
  'utf-8'
);

// Write providers only
fs.writeFileSync(
  path.join(DATA_DIR, 'providers.json'),
  JSON.stringify(database.providers, null, 2),
  'utf-8'
);

// Write models only
fs.writeFileSync(
  path.join(DATA_DIR, 'models.json'),
  JSON.stringify(database.models, null, 2),
  'utf-8'
);

// Write models by provider
const modelsByProvider: Record<string, any[]> = {};
database.providers.forEach(provider => {
  modelsByProvider[provider.id] = database.models.filter(
    m => m.provider === provider.id
  );

  fs.writeFileSync(
    path.join(DATA_DIR, `models-${provider.id}.json`),
    JSON.stringify(modelsByProvider[provider.id], null, 2),
    'utf-8'
  );
});

// Write metadata
fs.writeFileSync(
  path.join(DATA_DIR, 'metadata.json'),
  JSON.stringify(database.metadata, null, 2),
  'utf-8'
);

console.log('✅ JSON files generated successfully!');
console.log(`📁 Output directory: ${DATA_DIR}`);
console.log(`📊 Total providers: ${database.providers.length}`);
console.log(`📊 Total models: ${database.models.length}`);
console.log(`📅 Last updated: ${database.metadata.lastUpdated}`);
