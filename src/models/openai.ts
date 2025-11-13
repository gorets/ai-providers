import { ModelInfo } from '../types';

/**
 * OpenAI Models
 * Updated with latest models and pricing
 */
export const OPENAI_MODELS: ModelInfo[] = [
  // GPT-5 Series
  {
    id: 'gpt-5-2025-08-07',
    name: 'GPT-5',
    provider: 'openai',
    releaseDate: '2025-08-07',
    status: 'stable',
    capabilities: [
      'text-generation',
      'chat',
      'code-generation',
      'function-calling',
      'streaming',
      'json-mode',
      'reasoning',
    ],
    tags: ['flagship', 'reasoning', 'coding'],
    limits: {
      contextWindow: 200000,
      maxOutputTokens: 32768,
    },
    pricing: {
      input: 1.25,
      output: 10.0,
    },
    description: 'Smartest frontier model with configurable reasoning',
    docsUrl: 'https://platform.openai.com/docs/models/gpt-5',
  },
  {
    id: 'gpt-5-mini-2025-08-07',
    name: 'GPT-5 Mini',
    provider: 'openai',
    releaseDate: '2025-08-07',
    status: 'stable',
    capabilities: [
      'text-generation',
      'chat',
      'code-generation',
      'function-calling',
      'streaming',
      'json-mode',
      'reasoning',
    ],
    tags: ['balanced', 'fast', 'reasoning'],
    limits: {
      contextWindow: 128000,
      maxOutputTokens: 16384,
    },
    pricing: {
      input: 0.25,
      output: 2.0,
    },
    description: 'Balanced performance and cost',
    docsUrl: 'https://platform.openai.com/docs/models/gpt-5-mini',
  },
  {
    id: 'gpt-5-nano-2025-08-07',
    name: 'GPT-5 Nano',
    provider: 'openai',
    releaseDate: '2025-08-07',
    status: 'stable',
    capabilities: [
      'text-generation',
      'chat',
      'code-generation',
      'function-calling',
      'streaming',
      'json-mode',
    ],
    tags: ['fast', 'cost-effective'],
    limits: {
      contextWindow: 128000,
      maxOutputTokens: 16384,
    },
    pricing: {
      input: 0.05,
      output: 0.4,
    },
    description: 'Fastest, most cost-efficient version of GPT-5',
    docsUrl: 'https://platform.openai.com/docs/models/gpt-5-nano',
  },

  // GPT-4o Series
  {
    id: 'gpt-4o-2024-08-06',
    name: 'GPT-4o',
    provider: 'openai',
    releaseDate: '2024-08-06',
    status: 'stable',
    capabilities: [
      'text-generation',
      'chat',
      'code-generation',
      'vision',
      'function-calling',
      'streaming',
      'json-mode',
    ],
    tags: ['multimodal', 'coding'],
    limits: {
      contextWindow: 128000,
      maxOutputTokens: 16384,
    },
    pricing: {
      input: 2.5,
      output: 10.0,
    },
    description: 'Most capable GPT-4o, best for complex tasks',
    docsUrl: 'https://platform.openai.com/docs/models/gpt-4o',
  },
  {
    id: 'gpt-4o-mini-2024-07-18',
    name: 'GPT-4o Mini',
    provider: 'openai',
    releaseDate: '2024-07-18',
    status: 'stable',
    capabilities: [
      'text-generation',
      'chat',
      'code-generation',
      'vision',
      'function-calling',
      'streaming',
      'json-mode',
    ],
    tags: ['fast', 'cost-effective', 'multimodal'],
    limits: {
      contextWindow: 128000,
      maxOutputTokens: 16384,
    },
    pricing: {
      input: 0.15,
      output: 0.6,
    },
    description: 'Fast and affordable, good for most tasks',
    docsUrl: 'https://platform.openai.com/docs/models/gpt-4o-mini',
  },

  // O1 Series (Reasoning models)
  {
    id: 'o1-2024-12-17',
    name: 'O1',
    provider: 'openai',
    releaseDate: '2024-12-17',
    status: 'stable',
    capabilities: ['text-generation', 'chat', 'reasoning', 'code-generation'],
    tags: ['reasoning', 'flagship', 'coding'],
    limits: {
      contextWindow: 200000,
      maxOutputTokens: 100000,
    },
    pricing: {
      input: 15.0,
      output: 60.0,
    },
    description: 'Most advanced reasoning model for complex problem-solving',
    docsUrl: 'https://platform.openai.com/docs/models/o1',
  },
  {
    id: 'o1-mini-2024-09-12',
    name: 'O1 Mini',
    provider: 'openai',
    releaseDate: '2024-09-12',
    status: 'stable',
    capabilities: ['text-generation', 'chat', 'reasoning', 'code-generation'],
    tags: ['reasoning', 'cost-effective', 'coding'],
    limits: {
      contextWindow: 128000,
      maxOutputTokens: 65536,
    },
    pricing: {
      input: 3.0,
      output: 12.0,
    },
    description: 'Faster and cheaper reasoning model',
    docsUrl: 'https://platform.openai.com/docs/models/o1-mini',
  },
];
