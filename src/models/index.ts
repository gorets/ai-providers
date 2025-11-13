import { OPENAI_MODELS } from './openai';
import { ANTHROPIC_MODELS } from './anthropic';
import { GOOGLE_MODELS } from './google';
import { ZAI_MODELS } from './zai';
import { ModelInfo } from '../types';

/**
 * All available AI models from all providers
 */
export const ALL_MODELS: ModelInfo[] = [
  ...OPENAI_MODELS,
  ...ANTHROPIC_MODELS,
  ...GOOGLE_MODELS,
  ...ZAI_MODELS,
];

export { OPENAI_MODELS, ANTHROPIC_MODELS, GOOGLE_MODELS, ZAI_MODELS };
