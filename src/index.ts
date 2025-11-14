/**
 * AI Providers Library
 * A comprehensive database of AI model providers, models, pricing, and capabilities
 */

export * from './types';
export * from './providers';
export * from './models/index';
export * from './utils';

import { PROVIDERS } from './providers';
import { ALL_MODELS } from './models/index';
import type { AIProvidersDatabase } from './types';

// @ts-ignore - package.json is not in TypeScript path but exists at runtime!!!
import packageJson from '../package.json';

/**
 * Package version (read from package.json)
 */
export const VERSION = packageJson.version;

/**
 * Get the complete database with all providers and models
 */
export function getDatabase(): AIProvidersDatabase {
  return {
    metadata: {
      version: VERSION,
      lastUpdated: new Date().toISOString().split('T')[0],
      generatedAt: new Date().toISOString().split('T')[0], // Use date only for reproducibility
    },
    providers: PROVIDERS,
    models: ALL_MODELS,
  };
}

/**
 * Default export: complete database
 */
export default getDatabase();
