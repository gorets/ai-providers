/**
 * Utility functions for working with AI providers and models
 */

import { ModelInfo, ModelCapability, ModelTag, ModelStatus } from './types';
import { ALL_MODELS } from './models/index';

/**
 * Calculate cost for a given model and token usage
 */
export function calculateCost(
  modelId: string,
  inputTokens: number,
  outputTokens: number
): { inputCost: number; outputCost: number; totalCost: number } | null {
  const model = getModelById(modelId);

  if (!model || !model.pricing) {
    return null;
  }

  const inputCost = (inputTokens / 1_000_000) * model.pricing.input;
  const outputCost = (outputTokens / 1_000_000) * model.pricing.output;
  const totalCost = inputCost + outputCost;

  return {
    inputCost,
    outputCost,
    totalCost,
  };
}

/**
 * Calculate cost with cached tokens (for providers supporting prompt caching)
 */
export function calculateCostWithCache(
  modelId: string,
  inputTokens: number,
  cachedInputTokens: number,
  outputTokens: number
): { inputCost: number; cachedInputCost: number; outputCost: number; totalCost: number } | null {
  const model = getModelById(modelId);

  if (!model || !model.pricing) {
    return null;
  }

  const inputCost = (inputTokens / 1_000_000) * model.pricing.input;
  const cachedInputCost = model.pricing.cachedInput
    ? (cachedInputTokens / 1_000_000) * model.pricing.cachedInput
    : 0;
  const outputCost = (outputTokens / 1_000_000) * model.pricing.output;
  const totalCost = inputCost + cachedInputCost + outputCost;

  return {
    inputCost,
    cachedInputCost,
    outputCost,
    totalCost,
  };
}

/**
 * Get model by ID or alias
 */
export function getModelById(id: string): ModelInfo | undefined {
  return ALL_MODELS.find(
    (model: ModelInfo) => model.id === id || model.aliases?.includes(id)
  );
}

/**
 * Get all models from a specific provider
 */
export function getModelsByProvider(provider: string): ModelInfo[] {
  return ALL_MODELS.filter((model: ModelInfo) => model.provider === provider);
}

/**
 * Get models by tag
 */
export function getModelsByTag(tag: ModelTag): ModelInfo[] {
  return ALL_MODELS.filter((model: ModelInfo) => model.tags.includes(tag));
}

/**
 * Get models by capability
 */
export function getModelsByCapability(capability: ModelCapability): ModelInfo[] {
  return ALL_MODELS.filter((model: ModelInfo) => model.capabilities.includes(capability));
}

/**
 * Get models by status
 */
export function getModelsByStatus(status: ModelStatus): ModelInfo[] {
  return ALL_MODELS.filter((model: ModelInfo) => model.status === status);
}

/**
 * Get only active (non-deprecated, non-disabled) models
 */
export function getActiveModels(): ModelInfo[] {
  return ALL_MODELS.filter(
    (model: ModelInfo) => model.status !== 'deprecated' && model.status !== 'disabled'
  );
}

/**
 * Get deprecated models
 */
export function getDeprecatedModels(): ModelInfo[] {
  return ALL_MODELS.filter((model: ModelInfo) => model.status === 'deprecated');
}

/**
 * Get disabled models
 */
export function getDisabledModels(): ModelInfo[] {
  return ALL_MODELS.filter((model: ModelInfo) => model.status === 'disabled');
}

/**
 * Get replacement model for a deprecated/disabled model
 */
export function getReplacementModel(modelId: string): ModelInfo | undefined {
  const model = getModelById(modelId);
  if (!model || !model.replacementModel) {
    return undefined;
  }
  return getModelById(model.replacementModel);
}

/**
 * Find the cheapest model (by total cost per 1M tokens)
 */
export function getCheapestModel(options?: {
  provider?: string;
  capabilities?: ModelCapability[];
  activeOnly?: boolean;
}): ModelInfo | undefined {
  let models = ALL_MODELS.filter((m: ModelInfo) => m.pricing && m.pricing.input > 0);

  if (options?.provider) {
    models = models.filter((m: ModelInfo) => m.provider === options.provider);
  }

  if (options?.capabilities) {
    models = models.filter(m =>
      options.capabilities!.every(cap => m.capabilities.includes(cap))
    );
  }

  if (options?.activeOnly) {
    models = models.filter((m: ModelInfo) => m.status !== 'deprecated' && m.status !== 'disabled');
  }

  return models.sort((a, b) => {
    const aPrice = (a.pricing?.input ?? 0) + (a.pricing?.output ?? 0);
    const bPrice = (b.pricing?.input ?? 0) + (b.pricing?.output ?? 0);
    return aPrice - bPrice;
  })[0];
}

/**
 * Find the most expensive model (by total cost per 1M tokens)
 */
export function getMostExpensiveModel(): ModelInfo | undefined {
  return ALL_MODELS.filter((m: ModelInfo) => m.pricing)
    .sort((a, b) => {
      const aPrice = (a.pricing?.input ?? 0) + (a.pricing?.output ?? 0);
      const bPrice = (b.pricing?.input ?? 0) + (b.pricing?.output ?? 0);
      return bPrice - aPrice;
    })[0];
}

/**
 * Find models with the largest context window
 */
export function getModelsWithLargestContext(limit: number = 5): ModelInfo[] {
  return [...ALL_MODELS]
    .sort((a, b) => b.limits.contextWindow - a.limits.contextWindow)
    .slice(0, limit);
}

/**
 * Search models by multiple criteria
 */
export function searchModels(criteria: {
  provider?: string;
  status?: ModelStatus;
  capabilities?: ModelCapability[];
  tags?: ModelTag[];
  minContextWindow?: number;
  maxPrice?: number; // total price per 1M tokens
}): ModelInfo[] {
  let results = ALL_MODELS;

  if (criteria.provider) {
    results = results.filter((m: ModelInfo) => m.provider === criteria.provider);
  }

  if (criteria.status) {
    results = results.filter((m: ModelInfo) => m.status === criteria.status);
  }

  if (criteria.capabilities) {
    results = results.filter(m =>
      criteria.capabilities!.every(cap => m.capabilities.includes(cap))
    );
  }

  if (criteria.tags) {
    results = results.filter(m =>
      criteria.tags!.some(tag => m.tags.includes(tag))
    );
  }

  if (criteria.minContextWindow) {
    results = results.filter((m: ModelInfo) => m.limits.contextWindow >= criteria.minContextWindow!);
  }

  if (criteria.maxPrice && criteria.maxPrice > 0) {
    results = results.filter((m: ModelInfo) => {
      if (!m.pricing) return false;
      const totalPrice = m.pricing.input + m.pricing.output;
      return totalPrice <= criteria.maxPrice!;
    });
  }

  return results;
}

/**
 * Compare costs between different models for a given usage
 */
export function compareCosts(
  modelIds: string[],
  inputTokens: number,
  outputTokens: number
): Array<{ modelId: string; modelName: string; cost: number } | null> {
  return modelIds.map(id => {
    const result = calculateCost(id, inputTokens, outputTokens);
    const model = getModelById(id);
    if (!result || !model) return null;

    return {
      modelId: id,
      modelName: model.name,
      cost: result.totalCost,
    };
  }).filter(r => r !== null);
}

/**
 * Check if a model is deprecated or will be deprecated soon
 */
export function isModelDeprecated(modelId: string): {
  isDeprecated: boolean;
  isDisabled: boolean;
  deprecationDate?: string;
  shutdownDate?: string;
  replacementModel?: string;
} {
  const model = getModelById(modelId);

  if (!model) {
    return { isDeprecated: false, isDisabled: false };
  }

  return {
    isDeprecated: model.status === 'deprecated',
    isDisabled: model.status === 'disabled',
    deprecationDate: model.deprecationDate,
    shutdownDate: model.shutdownDate,
    replacementModel: model.replacementModel,
  };
}

/**
 * Get models that will be shut down soon (within specified days)
 */
export function getModelsShuttingDownSoon(days: number = 90): ModelInfo[] {
  const now = new Date();
  const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

  return ALL_MODELS.filter((model: ModelInfo) => {
    if (!model.shutdownDate) return false;
    const shutdownDate = new Date(model.shutdownDate);
    return shutdownDate >= now && shutdownDate <= futureDate;
  });
}

/**
 * Get recommended models based on use case
 */
export function getRecommendedModels(useCase: {
  budget?: 'low' | 'medium' | 'high';
  priority?: 'speed' | 'quality' | 'balanced';
  capabilities?: ModelCapability[];
}): ModelInfo[] {
  let models = getActiveModels();

  // Filter by capabilities
  if (useCase.capabilities) {
    models = models.filter(m =>
      useCase.capabilities!.every(cap => m.capabilities.includes(cap))
    );
  }

  // Filter by budget
  if (useCase.budget === 'low') {
    models = models.filter((m: ModelInfo) => m.tags.includes('cost-effective'));
  } else if (useCase.budget === 'high') {
    models = models.filter((m: ModelInfo) => m.tags.includes('flagship'));
  }

  // Filter by priority
  if (useCase.priority === 'speed') {
    models = models.filter((m: ModelInfo) => m.tags.includes('fast'));
  } else if (useCase.priority === 'quality') {
    models = models.filter((m: ModelInfo) => m.tags.includes('flagship') || m.tags.includes('reasoning'));
  } else if (useCase.priority === 'balanced') {
    models = models.filter((m: ModelInfo) => m.tags.includes('balanced'));
  }

  return models.slice(0, 5);
}
