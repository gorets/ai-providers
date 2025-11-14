/**
 * Build JSON files from compiled TypeScript sources
 * This ensures we don't duplicate data
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Check if dist directory exists from TypeScript compilation
const distDir = path.join(__dirname, '..', 'dist');
const dataDir = path.join(__dirname, '..', 'data');

// Create data directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

try {
  // Try to import from compiled TypeScript
  const indexPath = path.join(distDir, 'index.js');

  if (!fs.existsSync(indexPath)) {
    console.log('📦 Compiled files not found. Skipping JSON generation.');
    console.log('💡 Run `npm run build` first to compile TypeScript before generating JSON.');
    process.exit(0);
  }

  const { getDatabase } = require(indexPath);
  const database = getDatabase();

  // Write complete database
  fs.writeFileSync(
    path.join(dataDir, 'database.json'),
    JSON.stringify(database, null, 2)
  );

  // Write providers only
  fs.writeFileSync(
    path.join(dataDir, 'providers.json'),
    JSON.stringify(database.providers, null, 2)
  );

  // Write models only
  fs.writeFileSync(
    path.join(dataDir, 'models.json'),
    JSON.stringify(database.models, null, 2)
  );

  // Write models by provider
  database.providers.forEach(provider => {
    const providerModels = database.models.filter(m => m.provider === provider.id);
    fs.writeFileSync(
      path.join(dataDir, `models-${provider.id}.json`),
      JSON.stringify(providerModels, null, 2)
    );
  });

  // Write metadata
  fs.writeFileSync(
    path.join(dataDir, 'metadata.json'),
    JSON.stringify(database.metadata, null, 2)
  );

  console.log('✅ JSON files generated successfully from TypeScript sources!');
  console.log(`📁 Output directory: ${dataDir}`);
  console.log(`📊 Total providers: ${database.providers.length}`);
  console.log(`📊 Total models: ${database.models.length}`);
  console.log(`📅 Last updated: ${database.metadata.lastUpdated}`);
} catch (error) {
  console.error('❌ Error generating JSON files:', error.message);
  console.log('💡 Make sure to run `npm run build` first.');
  process.exit(1);
}
