/**
 * Utilities Usage Example
 * Demonstrates how to use helper functions from the AI Providers library
 */

import {
  calculateCost,
  calculateCostWithCache,
  getModelById,
  getModelsByTag,
  getModelsByCapability,
  getActiveModels,
  getDeprecatedModels,
  getReplacementModel,
  getCheapestModel,
  searchModels,
  compareCosts,
  isModelDeprecated,
  getModelsShuttingDownSoon,
  getRecommendedModels,
  getModelsWithLargestContext,
} from '@gorets/ai-providers';

console.log('=== AI Providers Utilities Examples ===\n');

// Example 1: Calculate cost for a specific model
console.log('1. Calculate Cost:');
const cost = calculateCost('gpt-4o-mini-2024-07-18', 50000, 10000);
if (cost) {
  console.log(`   Input: $${cost.inputCost.toFixed(4)}`);
  console.log(`   Output: $${cost.outputCost.toFixed(4)}`);
  console.log(`   Total: $${cost.totalCost.toFixed(4)}`);
}
console.log();

// Example 2: Calculate cost with caching (for Anthropic models)
console.log('2. Calculate Cost with Prompt Caching:');
const costWithCache = calculateCostWithCache(
  'claude-sonnet-4-5-20250929',
  50000,  // new input tokens
  200000, // cached input tokens
  10000   // output tokens
);
if (costWithCache) {
  console.log(`   New Input: $${costWithCache.inputCost.toFixed(4)}`);
  console.log(`   Cached Input: $${costWithCache.cachedInputCost.toFixed(4)}`);
  console.log(`   Output: $${costWithCache.outputCost.toFixed(4)}`);
  console.log(`   Total: $${costWithCache.totalCost.toFixed(4)}`);
  console.log(`   Savings: ${((1 - costWithCache.cachedInputCost / costWithCache.inputCost) * 100).toFixed(1)}%`);
}
console.log();

// Example 3: Find models by tag
console.log('3. Find Cost-Effective Models:');
const costEffectiveModels = getModelsByTag('cost-effective');
costEffectiveModels.slice(0, 3).forEach(model => {
  console.log(`   - ${model.name} (${model.provider}): $${((model.pricing?.input ?? 0) + (model.pricing?.output ?? 0)).toFixed(2)}/1M tokens`);
});
console.log();

// Example 4: Find models with vision capability
console.log('4. Models with Vision:');
const visionModels = getModelsByCapability('vision');
console.log(`   Found ${visionModels.length} models with vision`);
visionModels.slice(0, 3).forEach(model => {
  console.log(`   - ${model.name} (${model.provider})`);
});
console.log();

// Example 5: Get the cheapest model
console.log('5. Cheapest Model Overall:');
const cheapest = getCheapestModel({ activeOnly: true });
if (cheapest && cheapest.pricing) {
  console.log(`   ${cheapest.name} (${cheapest.provider})`);
  console.log(`   $${((cheapest.pricing.input + cheapest.pricing.output)).toFixed(2)}/1M tokens total`);
}
console.log();

// Example 6: Get cheapest model with specific capabilities
console.log('6. Cheapest Model with Vision + Function Calling:');
const cheapestVision = getCheapestModel({
  capabilities: ['vision', 'function-calling'],
  activeOnly: true,
});
if (cheapestVision && cheapestVision.pricing) {
  console.log(`   ${cheapestVision.name} (${cheapestVision.provider})`);
  console.log(`   $${((cheapestVision.pricing.input + cheapestVision.pricing.output)).toFixed(2)}/1M tokens`);
}
console.log();

// Example 7: Compare costs between models
console.log('7. Cost Comparison for 100K input, 20K output:');
const comparison = compareCosts(
  ['gpt-4o-mini-2024-07-18', 'claude-haiku-4-5-20251001', 'gemini-2.5-flash'],
  100000,
  20000
);
comparison
  .sort((a, b) => (a?.cost ?? 0) - (b?.cost ?? 0))
  .forEach((item, index) => {
    if (item) {
      console.log(`   ${index + 1}. ${item.modelName}: $${item.cost.toFixed(4)}`);
    }
  });
console.log();

// Example 8: Check if model is deprecated
console.log('8. Check Deprecation Status:');
const deprecationInfo = isModelDeprecated('gpt-3.5-turbo-0125');
if (deprecationInfo.isDeprecated) {
  console.log(`   Status: Deprecated`);
  console.log(`   Deprecation Date: ${deprecationInfo.deprecationDate}`);
  console.log(`   Shutdown Date: ${deprecationInfo.shutdownDate}`);
  console.log(`   Replacement: ${deprecationInfo.replacementModel}`);

  const replacement = getReplacementModel('gpt-3.5-turbo-0125');
  if (replacement) {
    console.log(`   Recommended: ${replacement.name}`);
  }
}
console.log();

// Example 9: Advanced search
console.log('9. Search: OpenAI models with vision, <$3 total cost:');
const searchResults = searchModels({
  provider: 'openai',
  capabilities: ['vision'],
  maxPrice: 3.0,
  tags: ['cost-effective'],
});
searchResults.forEach(model => {
  const totalPrice = (model.pricing?.input ?? 0) + (model.pricing?.output ?? 0);
  console.log(`   - ${model.name}: $${totalPrice.toFixed(2)}/1M tokens`);
});
console.log();

// Example 10: Get recommended models for a use case
console.log('10. Recommended Models for Budget-Friendly Vision Tasks:');
const recommended = getRecommendedModels({
  budget: 'low',
  capabilities: ['vision', 'chat'],
  priority: 'balanced',
});
recommended.forEach(model => {
  console.log(`   - ${model.name} (${model.provider})`);
});
console.log();

// Example 11: Models with largest context
console.log('11. Models with Largest Context Windows:');
const largestContext = getModelsWithLargestContext(3);
largestContext.forEach((model, index) => {
  console.log(`   ${index + 1}. ${model.name}: ${(model.limits.contextWindow / 1000000).toFixed(1)}M tokens`);
});
console.log();

// Example 12: Get models shutting down soon
console.log('12. Models Shutting Down in Next 90 Days:');
const shuttingDown = getModelsShuttingDownSoon(90);
if (shuttingDown.length > 0) {
  shuttingDown.forEach(model => {
    console.log(`   - ${model.name}: Shutdown on ${model.shutdownDate}`);
  });
} else {
  console.log('   No models scheduled for shutdown in the next 90 days');
}
console.log();

// Example 13: Get active vs deprecated models
console.log('13. Model Status Summary:');
const activeModels = getActiveModels();
const deprecatedModels = getDeprecatedModels();
console.log(`   Active: ${activeModels.length} models`);
console.log(`   Deprecated: ${deprecatedModels.length} models`);
console.log();

// Example 14: Find model by alias
console.log('14. Find Model by Alias:');
const modelByAlias = getModelById('claude-sonnet-4-5'); // Using alias instead of full ID
if (modelByAlias) {
  console.log(`   Alias 'claude-sonnet-4-5' -> ${modelByAlias.id}`);
  console.log(`   Model: ${modelByAlias.name}`);
}
