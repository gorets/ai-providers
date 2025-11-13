import { ModelInfo } from '../types';

/**
 * Mistral AI Models
 * French AI company with Mistral and Mixtral models
 */
export const MISTRAL_MODELS: ModelInfo[] = [
  {
    id: 'mistral-large-2411',
    aliases: ['mistral-large'],
    name: 'Mistral Large',
    provider: 'mistral',
    releaseDate: '2024-11-13',
    status: 'stable',
    capabilities: [
      'text-generation',
      'chat',
      'code-generation',
      'function-calling',
      'streaming',
      'json-mode',
    ],
    tags: ['flagship', 'coding', 'balanced'],
    limits: {
      contextWindow: 128000,
      maxOutputTokens: 8192,
    },
    pricing: {
      input: 2.0,
      output: 6.0,
    },
    description: 'Most capable Mistral model for complex tasks',
    docsUrl: 'https://docs.mistral.ai/platform/endpoints',
  },
  {
    id: 'mistral-small-2409',
    aliases: ['mistral-small'],
    name: 'Mistral Small',
    provider: 'mistral',
    releaseDate: '2024-09-18',
    status: 'stable',
    capabilities: [
      'text-generation',
      'chat',
      'code-generation',
      'function-calling',
      'streaming',
      'json-mode',
    ],
    tags: ['balanced', 'cost-effective'],
    limits: {
      contextWindow: 32000,
      maxOutputTokens: 8192,
    },
    pricing: {
      input: 0.2,
      output: 0.6,
    },
    description: 'Efficient model for everyday tasks',
    docsUrl: 'https://docs.mistral.ai/platform/endpoints',
  },
  {
    id: 'mixtral-8x22b',
    aliases: ['mixtral-large'],
    name: 'Mixtral 8x22B',
    provider: 'mistral',
    releaseDate: '2024-04-17',
    status: 'stable',
    capabilities: [
      'text-generation',
      'chat',
      'code-generation',
      'function-calling',
      'streaming',
    ],
    tags: ['flagship', 'coding'],
    limits: {
      contextWindow: 65536,
      maxOutputTokens: 8192,
    },
    pricing: {
      input: 2.0,
      output: 6.0,
    },
    description: 'Sparse mixture of experts model with excellent performance',
    docsUrl: 'https://docs.mistral.ai/platform/endpoints',
  },
  {
    id: 'mixtral-8x7b',
    aliases: ['mixtral'],
    name: 'Mixtral 8x7B',
    provider: 'mistral',
    releaseDate: '2023-12-11',
    status: 'stable',
    capabilities: [
      'text-generation',
      'chat',
      'code-generation',
      'function-calling',
      'streaming',
    ],
    tags: ['balanced', 'coding'],
    limits: {
      contextWindow: 32768,
      maxOutputTokens: 8192,
    },
    pricing: {
      input: 0.7,
      output: 0.7,
    },
    description: 'Popular mixture of experts model, great cost-performance ratio',
    docsUrl: 'https://docs.mistral.ai/platform/endpoints',
  },
  {
    id: 'codestral-2405',
    aliases: ['codestral'],
    name: 'Codestral',
    provider: 'mistral',
    releaseDate: '2024-05-29',
    status: 'stable',
    capabilities: [
      'text-generation',
      'chat',
      'code-generation',
      'streaming',
    ],
    tags: ['coding', 'fast'],
    limits: {
      contextWindow: 32000,
      maxOutputTokens: 8192,
    },
    pricing: {
      input: 0.2,
      output: 0.6,
    },
    description: 'Specialized code generation model trained on 80+ languages',
    docsUrl: 'https://docs.mistral.ai/platform/endpoints',
  },
];
