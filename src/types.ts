/**
 * AI Providers Library - Type Definitions
 * Comprehensive type definitions for AI model providers, models, and capabilities
 */

export type LLMProvider = 'openai' | 'anthropic' | 'google' | 'xai' | 'mistral' | 'meta' | 'deepseek' | 'zai';

/**
 * Model capabilities and features
 */
export type ModelCapability =
  | 'text-generation'
  | 'chat'
  | 'code-generation'
  | 'vision'
  | 'image-generation'
  | 'function-calling'
  | 'streaming'
  | 'json-mode'
  | 'reasoning'
  | 'embeddings'
  | 'audio-input'
  | 'audio-output';

/**
 * Model tags for categorization
 */
export type ModelTag =
  | 'flagship'
  | 'fast'
  | 'cost-effective'
  | 'balanced'
  | 'experimental'
  | 'long-context'
  | 'multimodal'
  | 'reasoning'
  | 'coding'
  | 'deprecated';

/**
 * Model status in lifecycle
 */
export type ModelStatus = 'stable' | 'beta' | 'experimental' | 'deprecated' | 'disabled' | 'preview';

/**
 * Pricing structure for a model
 */
export interface ModelPricing {
  /** Cost per 1M input tokens in USD */
  input: number;
  /** Cost per 1M output tokens in USD */
  output: number;
  /** Optional: Cost per 1M cached input tokens (for providers supporting prompt caching) */
  cachedInput?: number;
  /** Optional: Cost per image for vision models */
  perImage?: number;
  /** Optional: Cost per audio minute */
  perAudioMinute?: number;
}

/**
 * Model limits and constraints
 */
export interface ModelLimits {
  /** Maximum context window in tokens */
  contextWindow: number;
  /** Maximum output tokens per request */
  maxOutputTokens: number;
  /** Requests per minute limit (if publicly known) */
  rpmLimit?: number;
  /** Tokens per minute limit (if publicly known) */
  tpmLimit?: number;
}

/**
 * Complete model information
 */
export interface ModelInfo {
  /** Unique model identifier (as used in API calls) */
  id: string;
  /** Alternative IDs/aliases for this model (e.g., short names without dates) */
  aliases?: string[];
  /** Human-readable model name */
  name: string;
  /** Provider of the model */
  provider: LLMProvider;
  /** Model release date (ISO 8601 format) */
  releaseDate?: string;
  /** Current status of the model */
  status: ModelStatus;
  /** Model capabilities */
  capabilities: ModelCapability[];
  /** Tags for categorization */
  tags: ModelTag[];
  /** Model limits and constraints */
  limits: ModelLimits;
  /** Pricing information */
  pricing?: ModelPricing;
  /** Short description */
  description?: string;
  /** Link to official documentation */
  docsUrl?: string;
  /** Deprecation date (ISO 8601 format, if applicable) */
  deprecationDate?: string;
  /** Shutdown/disabled date (ISO 8601 format, when model stops working) */
  shutdownDate?: string;
  /** ID of the replacement model (if deprecated/disabled) */
  replacementModel?: string;
}

/**
 * Provider information
 */
export interface ProviderInfo {
  /** Provider identifier */
  id: LLMProvider;
  /** Provider display name */
  name: string;
  /** Provider website */
  website: string;
  /** API base URL */
  apiBaseUrl: string;
  /** API documentation URL */
  apiDocsUrl: string;
  /** API endpoint to fetch models list (if available) */
  modelsEndpoint?: string;
  /** Icon/logo identifier (emoji or URL) */
  icon: string;
  /** Brand color (hex) */
  color: string;
  /** Short description */
  description: string;
  /** Supported features */
  features: string[];
}

/**
 * Complete database structure
 */
export interface AIProvidersDatabase {
  /** Metadata about the database */
  metadata: {
    version: string;
    lastUpdated: string;
    generatedAt: string;
  };
  /** List of all providers */
  providers: ProviderInfo[];
  /** List of all models */
  models: ModelInfo[];
}
