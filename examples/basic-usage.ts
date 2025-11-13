/**
 * Basic Usage Example
 * Demonstrates how to use the AI Providers library
 */

import {
  getDatabase,
  getModelById,
  getModelsByProvider,
  getModelsByTag,
  getModelsByCapability,
  getCheapestModel,
  PROVIDERS,
} from '@gorets/ai-providers';

// Get the complete database
const db = getDatabase();

console.log('=== AI Providers Database ===');
console.log(`Version: ${db.metadata.version}`);
console.log(`Last Updated: ${db.metadata.lastUpdated}`);
console.log(`Total Providers: ${db.providers.length}`);
console.log(`Total Models: ${db.models.length}`);
console.log();

// List all providers
console.log('=== Available Providers ===');
PROVIDERS.forEach(provider => {
  console.log(`${provider.icon} ${provider.name} - ${provider.description}`);
});
console.log();

// Get a specific model
console.log('=== Specific Model Info ===');
const gpt5 = getModelById('gpt-5-2025-08-07');
if (gpt5) {
  console.log(`Model: ${gpt5.name}`);
  console.log(`Provider: ${gpt5.provider}`);
  console.log(`Context Window: ${gpt5.limits.contextWindow.toLocaleString()} tokens`);
  console.log(`Max Output: ${gpt5.limits.maxOutputTokens.toLocaleString()} tokens`);
  if (gpt5.pricing) {
    console.log(`Input Cost: $${gpt5.pricing.input}/1M tokens`);
    console.log(`Output Cost: $${gpt5.pricing.output}/1M tokens`);
  }
  console.log(`Capabilities: ${gpt5.capabilities.join(', ')}`);
  console.log(`Tags: ${gpt5.tags.join(', ')}`);
}
console.log();

// Get all models from a provider
console.log('=== Anthropic Models ===');
const anthropicModels = getModelsByProvider('anthropic');
anthropicModels.forEach(model => {
  const price = model.pricing
    ? `$${model.pricing.input}/$${model.pricing.output}`
    : 'N/A';
  console.log(`- ${model.name} (${model.id}) - ${price}`);
});
console.log();

// Find cost-effective models
console.log('=== Cost-Effective Models ===');
const cheapModels = getModelsByTag('cost-effective');
cheapModels.forEach(model => {
  if (model.pricing) {
    const totalCost = model.pricing.input + model.pricing.output;
    console.log(`- ${model.name}: $${totalCost}/1M tokens total`);
  }
});
console.log();

// Find the cheapest model
console.log('=== Cheapest Model ===');
const cheapest = getCheapestModel();
if (cheapest && cheapest.pricing) {
  console.log(`${cheapest.name} (${cheapest.provider})`);
  console.log(`Total cost: $${cheapest.pricing.input + cheapest.pricing.output}/1M tokens`);
}
console.log();

// Find models with vision capabilities
console.log('=== Models with Vision ===');
const visionModels = getModelsByCapability('vision');
visionModels.forEach(model => {
  console.log(`- ${model.name} (${model.provider})`);
});
