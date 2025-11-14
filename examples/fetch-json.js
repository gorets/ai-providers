/**
 * Fetch JSON Example
 * Demonstrates how to fetch data directly from GitHub without installing the package
 */

const BASE_URL = 'https://raw.githubusercontent.com/gorets/ai-providers/main/dist/data';

/**
 * Fetch complete database
 */
async function fetchDatabase() {
  const response = await fetch(`${BASE_URL}/database.json`);
  return await response.json();
}

/**
 * Fetch only providers
 */
async function fetchProviders() {
  const response = await fetch(`${BASE_URL}/providers.json`);
  return await response.json();
}

/**
 * Fetch all models
 */
async function fetchModels() {
  const response = await fetch(`${BASE_URL}/models.json`);
  return await response.json();
}

/**
 * Fetch models for a specific provider
 */
async function fetchProviderModels(providerId) {
  const response = await fetch(`${BASE_URL}/models-${providerId}.json`);
  return await response.json();
}

/**
 * Fetch metadata
 */
async function fetchMetadata() {
  const response = await fetch(`${BASE_URL}/metadata.json`);
  return await response.json();
}

// Example usage
async function main() {
  console.log('=== Fetching AI Providers Data from GitHub ===\n');

  // Get metadata
  const metadata = await fetchMetadata();
  console.log('📊 Database Info:');
  console.log(`   Version: ${metadata.version}`);
  console.log(`   Last Updated: ${metadata.lastUpdated}`);
  console.log();

  // Get all providers
  const providers = await fetchProviders();
  console.log(`🏢 Found ${providers.length} providers:`);
  providers.forEach(p => {
    console.log(`   ${p.icon} ${p.name}`);
  });
  console.log();

  // Get OpenAI models
  const openaiModels = await fetchProviderModels('openai');
  console.log(`🤖 OpenAI has ${openaiModels.length} models:`);
  openaiModels.forEach(m => {
    const price = m.pricing
      ? `$${m.pricing.input}/$${m.pricing.output} per 1M`
      : 'Free';
    console.log(`   - ${m.name}: ${price}`);
  });
  console.log();

  // Find all models with vision
  const allModels = await fetchModels();
  const visionModels = allModels.filter(m =>
    m.capabilities.includes('vision')
  );
  console.log(`👁️  Found ${visionModels.length} models with vision:`);
  visionModels.forEach(m => {
    console.log(`   - ${m.name} (${m.provider})`);
  });
  console.log();

  // Find cheapest model
  const modelsWithPricing = allModels.filter(m => m.pricing && m.pricing.input > 0);
  const cheapest = modelsWithPricing.sort((a, b) => {
    const aTotal = a.pricing.input + a.pricing.output;
    const bTotal = b.pricing.input + b.pricing.output;
    return aTotal - bTotal;
  })[0];

  console.log('💰 Cheapest Model:');
  console.log(`   ${cheapest.name} (${cheapest.provider})`);
  console.log(`   $${cheapest.pricing.input + cheapest.pricing.output} per 1M tokens total`);
}

// Run if executed directly
if (typeof window === 'undefined') {
  main().catch(console.error);
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    fetchDatabase,
    fetchProviders,
    fetchModels,
    fetchProviderModels,
    fetchMetadata,
  };
}
