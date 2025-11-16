import { OPENAI_MODELS } from './openai';
import { ANTHROPIC_MODELS } from './anthropic';
import { GOOGLE_MODELS } from './google';
import { XAI_MODELS } from './xai';
import { MISTRAL_MODELS } from './mistral';
import { META_MODELS } from './meta';
import { DEEPSEEK_MODELS } from './deepseek';
import { ZAI_MODELS } from './zai';
import { ALIBABA_MODELS } from './alibaba';
import { ModelInfo } from '../types';

/**
 * All available AI models from all providers
 */
export const ALL_MODELS: ModelInfo[] = [
  ...OPENAI_MODELS,
  ...ANTHROPIC_MODELS,
  ...GOOGLE_MODELS,
  ...XAI_MODELS,
  ...MISTRAL_MODELS,
  ...META_MODELS,
  ...DEEPSEEK_MODELS,
  ...ZAI_MODELS,
  ...ALIBABA_MODELS,
];
