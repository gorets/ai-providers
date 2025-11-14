/**
 * Cost Calculator Example
 * Calculate costs for different models based on token usage
 */

import { getModelById, ALL_MODELS } from '@gorets/ai-providers';

/**
 * Calculate cost for a given model and token usage
 */
function calculateCost(
  modelId: string,
  inputTokens: number,
  outputTokens: number
): { model: string; cost: number; breakdown: string } | null {
  const model = getModelById(modelId);

  if (!model || !model.pricing) {
    return null;
  }

  const inputCost = (inputTokens / 1_000_000) * model.pricing.input;
  const outputCost = (outputTokens / 1_000_000) * model.pricing.output;
  const totalCost = inputCost + outputCost;

  return {
    model: model.name,
    cost: totalCost,
    breakdown: `Input: $${inputCost.toFixed(4)}, Output: $${outputCost.toFixed(4)}`,
  };
}

/**
 * Compare costs across multiple models
 */
function compareCosts(
  modelIds: string[],
  inputTokens: number,
  outputTokens: number
) {
  console.log(`\n=== Cost Comparison ===`);
  console.log(`Input tokens: ${inputTokens.toLocaleString()}`);
  console.log(`Output tokens: ${outputTokens.toLocaleString()}`);
  console.log();

  const results = modelIds
    .map(id => ({ id, result: calculateCost(id, inputTokens, outputTokens) }))
    .filter(r => r.result !== null)
    .sort((a, b) => (a.result!.cost > b.result!.cost ? 1 : -1));

  results.forEach(({ id, result }, index) => {
    if (result) {
      console.log(
        `${index + 1}. ${result.model} (${id}): $${result.cost.toFixed(4)}`
      );
      console.log(`   ${result.breakdown}`);
    }
  });
}

/**
 * Find the best model for your budget
 */
function findBestModelForBudget(
  budget: number,
  inputTokens: number,
  outputTokens: number,
  requiredCapabilities?: string[]
) {
  console.log(`\n=== Best Models for Budget: $${budget} ===`);

  let models = ALL_MODELS.filter(m => m.pricing);

  // Filter by capabilities if specified
  if (requiredCapabilities && requiredCapabilities.length > 0) {
    models = models.filter(m =>
      requiredCapabilities.every(cap => m.capabilities.includes(cap as any))
    );
  }

  const results = models
    .map(model => {
      const cost = calculateCost(model.id, inputTokens, outputTokens);
      return cost ? { model, cost: cost.cost } : null;
    })
    .filter(r => r !== null && r.cost <= budget)
    .sort((a, b) => b!.cost - a!.cost); // Sort by cost descending (get the best within budget)

  if (results.length === 0) {
    console.log('No models found within budget!');
    return;
  }

  console.log(`Found ${results.length} models within budget:\n`);
  results.slice(0, 5).forEach((result, index) => {
    if (result) {
      console.log(
        `${index + 1}. ${result.model.name} (${result.model.provider})`
      );
      console.log(`   Cost: $${result.cost.toFixed(4)}`);
      console.log(`   Tags: ${result.model.tags.join(', ')}`);
      console.log();
    }
  });
}

// Example usage
console.log('=== AI Model Cost Calculator ===');

// Example 1: Compare popular models
compareCosts(
  [
    'gpt-5-2025-08-07',
    'gpt-5-mini-2025-08-07',
    'claude-sonnet-4-5-20250929',
    'claude-haiku-4-5-20251001',
    'gemini-2.5-flash',
  ],
  50000, // 50K input tokens
  10000 // 10K output tokens
);

// Example 2: Large context usage
compareCosts(
  [
    'gpt-5-2025-08-07',
    'claude-opus-4-1',
    'gemini-2.5-pro',
  ],
  500000, // 500K input tokens
  50000 // 50K output tokens
);

// Example 3: Find models within budget
findBestModelForBudget(
  0.5, // $0.50 budget
  100000, // 100K input tokens
  20000, // 20K output tokens
  ['chat', 'function-calling'] // Required capabilities
);

// Example 4: Monthly cost estimation
console.log('\n=== Monthly Cost Estimation ===');
const monthlyInputTokens = 10_000_000; // 10M tokens/month
const monthlyOutputTokens = 2_000_000; // 2M tokens/month

console.log(`Monthly usage: ${(monthlyInputTokens / 1_000_000).toFixed(1)}M input, ${(monthlyOutputTokens / 1_000_000).toFixed(1)}M output tokens\n`);

const modelsToCompare = [
  'gpt-5-nano-2025-08-07',
  'gpt-4o-mini-2024-07-18',
  'claude-haiku-4-5-20251001',
  'gemini-2.5-flash',
];

modelsToCompare.forEach(modelId => {
  const result = calculateCost(modelId, monthlyInputTokens, monthlyOutputTokens);
  if (result) {
    console.log(`${result.model}: $${result.cost.toFixed(2)}/month`);
  }
});
