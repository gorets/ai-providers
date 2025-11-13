/**
 * AI Providers Library
 * A comprehensive database of AI model providers, models, pricing, and capabilities
 */

export * from './types';
export * from './providers';
export * from './models';
export * from './utils';

import { PROVIDERS } from './providers';
import { ALL_MODELS } from './models';
import type { AIProvidersDatabase } from './types';

/**
 * Package version
 */
export const VERSION = '1.0.0';

/**
 * Get the complete database with all providers and models
 */
export function getDatabase(): AIProvidersDatabase {
  return {
    metadata: {
      version: VERSION,
      lastUpdated: new Date().toISOString().split('T')[0],
      generatedAt: new Date().toISOString(),
    },
    providers: PROVIDERS,
    models: ALL_MODELS,
  };
}

/**
 * Default export: complete database
 */
export default getDatabase();
