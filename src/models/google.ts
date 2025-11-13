import { ModelInfo } from '../types';

/**
 * Google (Gemini) Models
 * Updated with latest Gemini 2.x series
 */
export const GOOGLE_MODELS: ModelInfo[] = [
  // Gemini 2.5 Series
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'google',
    releaseDate: '2025-02-15',
    status: 'stable',
    capabilities: [
      'text-generation',
      'chat',
      'vision',
      'audio-input',
      'function-calling',
      'streaming',
      'json-mode',
      'code-generation',
    ],
    tags: ['fast', 'cost-effective', 'multimodal', 'long-context'],
    limits: {
      contextWindow: 1000000,
      maxOutputTokens: 8192,
    },
    pricing: {
      input: 0.35,
      output: 1.05,
    },
    description: 'Latest stable, fast and affordable with 1M token context',
    docsUrl: 'https://ai.google.dev/gemini-api/docs/models/gemini',
  },
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    provider: 'google',
    releaseDate: '2025-03-01',
    status: 'stable',
    capabilities: [
      'text-generation',
      'chat',
      'vision',
      'audio-input',
      'function-calling',
      'streaming',
      'json-mode',
      'code-generation',
      'reasoning',
    ],
    tags: ['flagship', 'long-context', 'multimodal', 'reasoning'],
    limits: {
      contextWindow: 2000000,
      maxOutputTokens: 8192,
    },
    pricing: {
      input: 1.25,
      output: 5.0,
    },
    description: 'Most capable Gemini with massive 2M token context window',
    docsUrl: 'https://ai.google.dev/gemini-api/docs/models/gemini',
  },

  // Gemini 2.0 Series
  {
    id: 'gemini-2.0-flash-exp',
    name: 'Gemini 2.0 Flash Exp',
    provider: 'google',
    releaseDate: '2024-12-11',
    status: 'experimental',
    capabilities: [
      'text-generation',
      'chat',
      'vision',
      'audio-input',
      'function-calling',
      'streaming',
      'json-mode',
    ],
    tags: ['experimental', 'fast', 'multimodal'],
    limits: {
      contextWindow: 1000000,
      maxOutputTokens: 8192,
    },
    pricing: {
      input: 0.0,
      output: 0.0,
    },
    description: 'Experimental version, free preview',
    docsUrl: 'https://ai.google.dev/gemini-api/docs/models/experimental-models',
  },

  // Convenience aliases
  {
    id: 'gemini-flash-latest',
    name: 'Gemini Flash (Latest)',
    provider: 'google',
    status: 'stable',
    capabilities: [
      'text-generation',
      'chat',
      'vision',
      'audio-input',
      'function-calling',
      'streaming',
      'json-mode',
      'code-generation',
    ],
    tags: ['fast', 'cost-effective', 'multimodal', 'long-context'],
    limits: {
      contextWindow: 1000000,
      maxOutputTokens: 8192,
    },
    pricing: {
      input: 0.35,
      output: 1.05,
    },
    description: 'Auto-updated to latest stable Flash version (currently 2.5)',
    docsUrl: 'https://ai.google.dev/gemini-api/docs/models/gemini',
  },
  {
    id: 'gemini-pro-latest',
    name: 'Gemini Pro (Latest)',
    provider: 'google',
    status: 'stable',
    capabilities: [
      'text-generation',
      'chat',
      'vision',
      'audio-input',
      'function-calling',
      'streaming',
      'json-mode',
      'code-generation',
      'reasoning',
    ],
    tags: ['flagship', 'long-context', 'multimodal', 'reasoning'],
    limits: {
      contextWindow: 2000000,
      maxOutputTokens: 8192,
    },
    pricing: {
      input: 1.25,
      output: 5.0,
    },
    description: 'Auto-updated to latest stable Pro version (currently 2.5)',
    docsUrl: 'https://ai.google.dev/gemini-api/docs/models/gemini',
  },

  // Gemini 1.5 Series (Previous generation)
  {
    id: 'gemini-1.5-flash',
    name: 'Gemini 1.5 Flash',
    provider: 'google',
    releaseDate: '2024-05-14',
    status: 'stable',
    capabilities: [
      'text-generation',
      'chat',
      'vision',
      'function-calling',
      'streaming',
      'json-mode',
    ],
    tags: ['fast', 'cost-effective', 'multimodal', 'long-context'],
    limits: {
      contextWindow: 1000000,
      maxOutputTokens: 8192,
    },
    pricing: {
      input: 0.35,
      output: 1.05,
    },
    description: 'Previous generation Flash, still excellent',
    docsUrl: 'https://ai.google.dev/gemini-api/docs/models/gemini',
  },
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'google',
    releaseDate: '2024-05-14',
    status: 'stable',
    capabilities: [
      'text-generation',
      'chat',
      'vision',
      'function-calling',
      'streaming',
      'json-mode',
      'reasoning',
    ],
    tags: ['long-context', 'multimodal', 'reasoning'],
    limits: {
      contextWindow: 2000000,
      maxOutputTokens: 8192,
    },
    pricing: {
      input: 1.25,
      output: 5.0,
    },
    description: 'Previous generation Pro with 2M context',
    docsUrl: 'https://ai.google.dev/gemini-api/docs/models/gemini',
  },
];
