import { OPENAI_MODELS } from './openai';
import { ANTHROPIC_MODELS } from './anthropic';
import { GOOGLE_MODELS } from './google';
import { ModelInfo } from '../types';

/**
 * All available AI models from all providers
 */
export const ALL_MODELS: ModelInfo[] = [
  ...OPENAI_MODELS,
  ...ANTHROPIC_MODELS,
  ...GOOGLE_MODELS,
];

export { OPENAI_MODELS, ANTHROPIC_MODELS, GOOGLE_MODELS };

/**
 * Helper functions for working with models
 */

export function getModelById(id: string): ModelInfo | undefined {
  return ALL_MODELS.find(model => model.id === id);
}

export function getModelsByProvider(provider: string): ModelInfo[] {
  return ALL_MODELS.filter(model => model.provider === provider);
}

export function getModelsByTag(tag: string): ModelInfo[] {
  return ALL_MODELS.filter(model => model.tags.includes(tag as any));
}

export function getModelsByCapability(capability: string): ModelInfo[] {
  return ALL_MODELS.filter(model => model.capabilities.includes(capability as any));
}

export function getCheapestModel(): ModelInfo | undefined {
  return ALL_MODELS.filter(m => m.pricing && m.pricing.input > 0)
    .sort((a, b) => {
      const aPrice = (a.pricing?.input ?? 0) + (a.pricing?.output ?? 0);
      const bPrice = (b.pricing?.input ?? 0) + (b.pricing?.output ?? 0);
      return aPrice - bPrice;
    })[0];
}

export function getMostExpensiveModel(): ModelInfo | undefined {
  return ALL_MODELS.filter(m => m.pricing)
    .sort((a, b) => {
      const aPrice = (a.pricing?.input ?? 0) + (a.pricing?.output ?? 0);
      const bPrice = (b.pricing?.input ?? 0) + (b.pricing?.output ?? 0);
      return bPrice - aPrice;
    })[0];
}
