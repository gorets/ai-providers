# 🤖 AI Providers Database

Comprehensive, up-to-date database of AI model providers, models, pricing, and capabilities.

[![npm version](https://badge.fury.io/js/%40gorets%2Fai-providers.svg)](https://www.npmjs.com/package/@gorets/ai-providers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Features

- **Comprehensive Provider Data**: Information about major AI providers (OpenAI, Anthropic, Google, etc.)
- **Detailed Model Information**: Context windows, pricing, capabilities, and tags
- **TypeScript Support**: Fully typed for excellent IDE support
- **JSON Access**: Direct access to JSON data via GitHub for non-NPM usage
- **Regular Updates**: Kept up-to-date with the latest models and pricing
- **Easy to Extend**: Simple structure for adding new providers and models

## 📦 Installation

```bash
npm install @gorets/ai-providers
```

or

```bash
yarn add @gorets/ai-providers
```

## 🚀 Usage

### TypeScript/JavaScript

```typescript
import { getDatabase, getModelById, getModelsByProvider } from '@gorets/ai-providers';

// Get complete database
const db = getDatabase();
console.log(`Total providers: ${db.providers.length}`);
console.log(`Total models: ${db.models.length}`);

// Get specific model
const gpt5 = getModelById('gpt-5-2025-08-07');
console.log(`${gpt5.name}: $${gpt5.pricing.input}/1M input tokens`);

// Get all models from a provider
const anthropicModels = getModelsByProvider('anthropic');
console.log(`Anthropic has ${anthropicModels.length} models`);
```

### Filtering Models

```typescript
import { getModelsByTag, getModelsByCapability } from '@gorets/ai-providers';

// Find all cost-effective models
const cheapModels = getModelsByTag('cost-effective');

// Find all models with vision capabilities
const visionModels = getModelsByCapability('vision');

// Find models with reasoning
const reasoningModels = getModelsByTag('reasoning');
```

### Direct JSON Access (No Installation Required)

You can access the latest data directly from GitHub:

```javascript
// Complete database
const response = await fetch(
  'https://raw.githubusercontent.com/gorets/ai-providers/main/dist/data/database.json'
);
const database = await response.json();

// Just models
const modelsResponse = await fetch(
  'https://raw.githubusercontent.com/gorets/ai-providers/main/dist/data/models.json'
);
const models = await modelsResponse.json();

// Models by provider
const openaiModels = await fetch(
  'https://raw.githubusercontent.com/gorets/ai-providers/main/dist/data/models-openai.json'
);
```

## 📊 Data Structure

### Provider Information

```typescript
interface ProviderInfo {
  id: string;
  name: string;
  website: string;
  apiDocsUrl: string;
  icon: string;
  color: string;
  description: string;
  features: string[];
}
```

### Model Information

```typescript
interface ModelInfo {
  id: string;                    // Model identifier for API calls
  name: string;                  // Human-readable name
  provider: string;              // Provider ID
  releaseDate?: string;          // ISO 8601 date
  status: 'stable' | 'beta' | 'experimental' | 'deprecated' | 'preview';
  capabilities: string[];        // e.g., ['chat', 'vision', 'function-calling']
  tags: string[];                // e.g., ['fast', 'cost-effective']
  limits: {
    contextWindow: number;       // Max context in tokens
    maxOutputTokens: number;     // Max output per request
  };
  pricing?: {
    input: number;               // Per 1M input tokens (USD)
    output: number;              // Per 1M output tokens (USD)
    cachedInput?: number;        // Cached input cost (if supported)
  };
  description?: string;
  docsUrl?: string;
}
```

## 🏷️ Model Tags

- `flagship` - Top-tier model from the provider
- `fast` - Optimized for speed
- `cost-effective` - Budget-friendly option
- `balanced` - Good balance of quality and cost
- `experimental` - Experimental/preview version
- `long-context` - Extended context window (>100K tokens)
- `multimodal` - Supports multiple input types (text, images, audio)
- `reasoning` - Enhanced reasoning capabilities
- `coding` - Optimized for code generation
- `deprecated` - No longer recommended for new projects

## 🎯 Model Capabilities

- `text-generation` - Generate text
- `chat` - Conversational AI
- `code-generation` - Code writing and completion
- `vision` - Image understanding
- `image-generation` - Image creation
- `function-calling` - Tool/function calling
- `streaming` - Streaming responses
- `json-mode` - Structured JSON output
- `reasoning` - Advanced reasoning
- `embeddings` - Text embeddings
- `audio-input` - Audio understanding
- `audio-output` - Speech synthesis

## 🔄 Available Endpoints

All JSON files are available at:
`https://raw.githubusercontent.com/gorets/ai-providers/main/dist/data/`

- `database.json` - Complete database
- `providers.json` - All providers
- `models.json` - All models
- `models-{provider}.json` - Models by provider (e.g., `models-openai.json`)
- `metadata.json` - Version and update information

## 🤝 Contributing

Contributions are welcome! To add a new provider or model:

1. Add provider info to `src/providers.ts`
2. Create a new file in `src/models/` (or update existing)
3. Update `src/models/index.ts` to export your models
4. Run `npm run generate` to create JSON files
5. Submit a pull request

### Adding a New Model

```typescript
// src/models/yourprovider.ts
import { ModelInfo } from '../types';

export const YOUR_PROVIDER_MODELS: ModelInfo[] = [
  {
    id: 'model-id',
    name: 'Model Name',
    provider: 'yourprovider',
    releaseDate: '2025-01-01',
    status: 'stable',
    capabilities: ['chat', 'code-generation'],
    tags: ['balanced'],
    limits: {
      contextWindow: 128000,
      maxOutputTokens: 4096,
    },
    pricing: {
      input: 1.0,
      output: 3.0,
    },
    description: 'Model description',
  },
];
```

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

Data is collected from official provider documentation and APIs. Pricing and availability may change. Always verify with the official provider documentation.

## 📮 Support

- Report issues: [GitHub Issues](https://github.com/gorets/ai-providers/issues)
- Questions: Create a discussion on GitHub

---

**Note**: This library provides information as-is. Always check official provider documentation for the most current pricing and availability.
