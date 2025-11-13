/**
 * Legacy file for backward compatibility
 * This file maintains the old interface while using the new data structure
 */

import { ALL_MODELS } from './models';
import type { ModelInfo as NewModelInfo } from './types';

export type LLMProvider = 'openai' | 'anthropic' | 'google';

/**
 * Legacy ModelInfo interface
 * @deprecated Use the new ModelInfo from './types' instead
 */
export interface ModelInfo {
  id: string;
  name: string;
  provider: LLMProvider;
  contextWindow: number;
  maxOutputTokens: number;
  pricing?: {
    input: number; // per 1M tokens
    output: number; // per 1M tokens
  };
  description?: string;
}

/**
 * @deprecated Use ProviderInfo from './providers' instead
 */
export interface ProviderConfig {
  name: string;
  icon: string;
  color: string;
}

/**
 * Convert new model format to legacy format
 */
function toLegacyModel(model: NewModelInfo): ModelInfo {
  return {
    id: model.id,
    name: model.name,
    provider: model.provider as LLMProvider,
    contextWindow: model.limits.contextWindow,
    maxOutputTokens: model.limits.maxOutputTokens,
    pricing: model.pricing
      ? {
          input: model.pricing.input,
          output: model.pricing.output,
        }
      : undefined,
    description: model.description,
  };
}

/**
 * Legacy export for backward compatibility
 * @deprecated Import models from './models' instead
 */
export const AVAILABLE_MODELS: ModelInfo[] = ALL_MODELS.map(toLegacyModel);