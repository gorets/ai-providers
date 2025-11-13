export type LLMProvider = 'openai' | 'anthropic' | 'google';

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

export interface ProviderConfig {
  name: string;
  icon: string;
  color: string;
}

export const AVAILABLE_MODELS: ModelInfo[] = [
  // OpenAI Models - GPT-5 Series
  {
    id: 'gpt-5-2025-08-07',
    name: 'GPT-5',
    provider: 'openai',
    contextWindow: 200000,
    maxOutputTokens: 32768,
    pricing: { input: 1.25, output: 10.00 },
    description: 'Smartest frontier model with configurable reasoning',
  },
  {
    id: 'gpt-5-mini-2025-08-07',
    name: 'GPT-5 Mini',
    provider: 'openai',
    contextWindow: 128000,
    maxOutputTokens: 16384,
    pricing: { input: 0.25, output: 2.00 },
    description: 'Balanced performance and cost',
  },
  {
    id: 'gpt-5-nano-2025-08-07',
    name: 'GPT-5 Nano',
    provider: 'openai',
    contextWindow: 128000,
    maxOutputTokens: 16384,
    pricing: { input: 0.05, output: 0.40 },
    description: 'Fastest, most cost-efficient version of GPT-5',
  },

  // OpenAI Models - GPT-4o Series
  {
    id: 'gpt-4o-2024-08-06',
    name: 'GPT-4o',
    provider: 'openai',
    contextWindow: 128000,
    maxOutputTokens: 16384,
    pricing: { input: 2.50, output: 10.00 },
    description: 'Most capable GPT-4o, best for complex tasks',
  },
  {
    id: 'gpt-4o-mini-2024-07-18',
    name: 'GPT-4o Mini',
    provider: 'openai',
    contextWindow: 128000,
    maxOutputTokens: 16384,
    pricing: { input: 0.15, output: 0.60 },
    description: 'Fast and affordable, good for most tasks',
  },
  
  // Anthropic Models (Claude 4.x latest, 3.x series deprecated)
  // Prices per 1M tokens
  {
    id: 'claude-haiku-4-5-20251001',
    name: 'Claude Haiku 4.5',
    provider: 'anthropic',
    contextWindow: 200000,
    maxOutputTokens: 8192,
    pricing: { input: 1.00, output: 5.00 }, // 2x faster than Sonnet!
    description: '2x faster than Sonnet, ultra-cheap',
  },
  {
    id: 'claude-sonnet-4-5-20250929',
    name: 'Claude Sonnet 4.5',
    provider: 'anthropic',
    contextWindow: 200000,
    maxOutputTokens: 8192,
    pricing: { input: 3.00, output: 15.00 },
    description: 'Latest Claude, balanced performance',
  },
  {
    id: 'claude-opus-4-1',
    name: 'Claude Opus 4.1',
    provider: 'anthropic',
    contextWindow: 200000,
    maxOutputTokens: 8192,
    pricing: { input: 15.00, output: 75.00 },
    description: 'Most powerful Claude for complex tasks',
  },

  
  // Google Models (Gemini 2.x - 1.x series deprecated)
  // Prices per 1M tokens
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'google',
    contextWindow: 1000000,
    maxOutputTokens: 8192,
    pricing: { input: 0.35, output: 1.05 }, // $0.35 / $1.05 per 1M tokens
    description: 'Latest stable, fast and affordable',
  },
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    provider: 'google',
    contextWindow: 2000000,
    maxOutputTokens: 8192,
    pricing: { input: 1.25, output: 5.00 }, // $1.25 / $5.00 per 1M tokens
    description: 'Most capable Gemini, largest context',
  },
  {
    id: 'gemini-2.0-flash-exp',
    name: 'Gemini 2.0 Flash Exp',
    provider: 'google',
    contextWindow: 1000000,
    maxOutputTokens: 8192,
    pricing: { input: 0.00, output: 0.00 }, // Free experimental
    description: 'Experimental version, free preview',
  },
  {
    id: 'gemini-flash-latest',
    name: 'Gemini Flash (Latest)',
    provider: 'google',
    contextWindow: 1000000,
    maxOutputTokens: 8192,
    pricing: { input: 0.35, output: 1.05 }, // Same as 2.5-flash
    description: 'Auto-updated to latest stable Flash',
  },
];