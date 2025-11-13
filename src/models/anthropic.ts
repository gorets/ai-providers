import { ModelInfo } from '../types';

/**
 * Anthropic (Claude) Models
 * Updated with latest Claude 4.x series
 */
export const ANTHROPIC_MODELS: ModelInfo[] = [
  // Claude 4.5 Series
  {
    id: 'claude-haiku-4-5-20251001',
    name: 'Claude Haiku 4.5',
    provider: 'anthropic',
    releaseDate: '2025-10-01',
    status: 'stable',
    capabilities: [
      'text-generation',
      'chat',
      'vision',
      'function-calling',
      'streaming',
      'json-mode',
    ],
    tags: ['fast', 'cost-effective'],
    limits: {
      contextWindow: 200000,
      maxOutputTokens: 8192,
    },
    pricing: {
      input: 1.0,
      output: 5.0,
      cachedInput: 0.1,
    },
    description: '2x faster than Sonnet, ultra-cheap with prompt caching',
    docsUrl: 'https://docs.anthropic.com/en/docs/models-overview',
  },
  {
    id: 'claude-sonnet-4-5-20250929',
    name: 'Claude Sonnet 4.5',
    provider: 'anthropic',
    releaseDate: '2025-09-29',
    status: 'stable',
    capabilities: [
      'text-generation',
      'chat',
      'vision',
      'function-calling',
      'streaming',
      'json-mode',
      'code-generation',
    ],
    tags: ['balanced', 'coding', 'multimodal'],
    limits: {
      contextWindow: 200000,
      maxOutputTokens: 8192,
    },
    pricing: {
      input: 3.0,
      output: 15.0,
      cachedInput: 0.3,
    },
    description: 'Latest Claude, balanced performance with excellent coding abilities',
    docsUrl: 'https://docs.anthropic.com/en/docs/models-overview',
  },
  {
    id: 'claude-opus-4-1',
    name: 'Claude Opus 4.1',
    provider: 'anthropic',
    releaseDate: '2025-05-15',
    status: 'stable',
    capabilities: [
      'text-generation',
      'chat',
      'vision',
      'function-calling',
      'streaming',
      'json-mode',
      'reasoning',
      'code-generation',
    ],
    tags: ['flagship', 'reasoning', 'multimodal', 'coding'],
    limits: {
      contextWindow: 200000,
      maxOutputTokens: 8192,
    },
    pricing: {
      input: 15.0,
      output: 75.0,
      cachedInput: 1.5,
    },
    description: 'Most powerful Claude for complex reasoning and analysis tasks',
    docsUrl: 'https://docs.anthropic.com/en/docs/models-overview',
  },

  // Claude 3.5 Series (Previous generation)
  {
    id: 'claude-3-5-sonnet-20241022',
    name: 'Claude 3.5 Sonnet',
    provider: 'anthropic',
    releaseDate: '2024-10-22',
    status: 'stable',
    capabilities: [
      'text-generation',
      'chat',
      'vision',
      'function-calling',
      'streaming',
      'json-mode',
      'code-generation',
    ],
    tags: ['balanced', 'coding', 'multimodal'],
    limits: {
      contextWindow: 200000,
      maxOutputTokens: 8192,
    },
    pricing: {
      input: 3.0,
      output: 15.0,
      cachedInput: 0.3,
    },
    description: 'Previous generation Claude 3.5, still excellent for most tasks',
    docsUrl: 'https://docs.anthropic.com/en/docs/models-overview',
  },
  {
    id: 'claude-3-5-haiku-20241022',
    name: 'Claude 3.5 Haiku',
    provider: 'anthropic',
    releaseDate: '2024-10-22',
    status: 'stable',
    capabilities: [
      'text-generation',
      'chat',
      'vision',
      'function-calling',
      'streaming',
      'json-mode',
    ],
    tags: ['fast', 'cost-effective'],
    limits: {
      contextWindow: 200000,
      maxOutputTokens: 8192,
    },
    pricing: {
      input: 0.8,
      output: 4.0,
      cachedInput: 0.08,
    },
    description: 'Fast and affordable Claude 3.5 variant',
    docsUrl: 'https://docs.anthropic.com/en/docs/models-overview',
  },
];
