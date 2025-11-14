# 🤖 AI Providers Database

Comprehensive, up-to-date database of AI model providers, models, pricing, and capabilities.

[![npm version](https://badge.fury.io/js/%40gorets%2Fai-providers.svg)](https://www.npmjs.com/package/@gorets/ai-providers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Features

- **Comprehensive Provider Data**: Information about 8 major AI providers (OpenAI, Anthropic, Google, xAI, Mistral, Meta, DeepSeek, Z.AI)
- **47+ Models**: Including latest GPT-5.1, Claude 4.5, Gemini 2.5, and more
- **Detailed Model Information**: Context windows, pricing, capabilities, tags, and lifecycle management
- **TypeScript Support**: Fully typed for excellent IDE support
- **MCP Support**: Models with Model Context Protocol (MCP) server support marked
- **Embedding Models**: OpenAI text-embedding models included
- **JSON Access**: Direct access to JSON data via GitHub for non-NPM usage
- **Regular Updates**: Kept up-to-date with the latest models and pricing
- **Easy to Extend**: Simple structure for adding new providers and models

## ✨ Latest Updates

### GPT-5.1 Models (Nov 12, 2025)
- **GPT-5.1 Instant** - Most-used model with adaptive reasoning
- **GPT-5.1 Thinking** - Advanced reasoning model for complex tasks

### OpenAI Embeddings
- **text-embedding-3-large** - 3072 dimensions, best quality
- **text-embedding-3-small** - 1536 dimensions, 5x cheaper than ada-002
- **text-embedding-ada-002** - Legacy embedding model

### Prompt Caching Support
Both OpenAI and Anthropic models support prompt caching for reduced costs on repeated context:
- **OpenAI**: GPT-5.1, GPT-5, GPT-4o, GPT-4o mini, O1 models (50% discount on cached tokens)
- **Anthropic**: Claude 4.5 models (90% discount on cached tokens)

### MCP (Model Context Protocol) Support
Claude 4.5 models (Haiku, Sonnet, Opus) now support MCP servers for connecting to external tools and data sources.

### New Providers
- **xAI** - Grok models with real-time X (Twitter) data access
- **Mistral AI** - Efficient mixture-of-experts models
- **Meta** - Llama 3.x open-source models
- **DeepSeek** - Ultra cost-effective models with reasoning
- **Z.AI** - Chinese AI provider with competitive pricing

## 📦 Installation

```bash
npm install @gorets/ai-providers
```

or

```bash
yarn add @gorets/ai-providers
```

## 📡 Direct JSON Access (Without NPM)

You can access the JSON data files directly from GitHub without installing the package:

### Available JSON Files

All data is available at `https://raw.githubusercontent.com/gorets/ai-providers/main/data/`:

- **[database.json](https://raw.githubusercontent.com/gorets/ai-providers/main/data/database.json)** - Complete database (providers + models + metadata)
- **[providers.json](https://raw.githubusercontent.com/gorets/ai-providers/main/data/providers.json)** - All providers only
- **[models.json](https://raw.githubusercontent.com/gorets/ai-providers/main/data/models.json)** - All models only
- **[metadata.json](https://raw.githubusercontent.com/gorets/ai-providers/main/data/metadata.json)** - Version and update info

### Models by Provider

- **[models-openai.json](https://raw.githubusercontent.com/gorets/ai-providers/main/data/models-openai.json)** - OpenAI models (GPT-5.1, GPT-5, GPT-4o, O1, embeddings)
- **[models-anthropic.json](https://raw.githubusercontent.com/gorets/ai-providers/main/data/models-anthropic.json)** - Anthropic models (Claude 4.5, Claude 3.x)
- **[models-google.json](https://raw.githubusercontent.com/gorets/ai-providers/main/data/models-google.json)** - Google models (Gemini 2.5, Gemini 1.5)
- **[models-xai.json](https://raw.githubusercontent.com/gorets/ai-providers/main/data/models-xai.json)** - xAI models (Grok)
- **[models-mistral.json](https://raw.githubusercontent.com/gorets/ai-providers/main/data/models-mistral.json)** - Mistral models (Mistral, Mixtral, Codestral)
- **[models-meta.json](https://raw.githubusercontent.com/gorets/ai-providers/main/data/models-meta.json)** - Meta models (Llama 3.x)
- **[models-deepseek.json](https://raw.githubusercontent.com/gorets/ai-providers/main/data/models-deepseek.json)** - DeepSeek models
- **[models-zai.json](https://raw.githubusercontent.com/gorets/ai-providers/main/data/models-zai.json)** - Z.AI models

### Example: Fetch JSON in Browser/Node.js

```javascript
// Fetch all models
const response = await fetch('https://raw.githubusercontent.com/gorets/ai-providers/main/data/models.json');
const models = await response.json();

// Fetch OpenAI models only
const openaiResponse = await fetch('https://raw.githubusercontent.com/gorets/ai-providers/main/data/models-openai.json');
const openaiModels = await openaiResponse.json();

// Find GPT-5.1
const gpt51 = openaiModels.find(m => m.id === 'gpt-5.1-instant' || m.shortName === 'gpt-5.1');
console.log(`${gpt51.name}: $${gpt51.pricing.input}/1M input tokens`);
```

### Example: Python

```python
import requests

# Fetch all models
response = requests.get('https://raw.githubusercontent.com/gorets/ai-providers/main/data/models.json')
models = response.json()

# Find models with vision capability
vision_models = [m for m in models if 'vision' in m['capabilities']]
print(f"Found {len(vision_models)} models with vision support")
```

### Example: curl

```bash
# Download all models
curl -O https://raw.githubusercontent.com/gorets/ai-providers/main/data/models.json

# Download specific provider models
curl -O https://raw.githubusercontent.com/gorets/ai-providers/main/data/models-openai.json
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
const gpt5 = getModelById('gpt-5.1-instant');
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

### Utility Functions

The library includes powerful helper functions for common tasks:

#### Cost Calculation

```typescript
import { calculateCost, calculateCostWithCache, compareCosts } from '@gorets/ai-providers';

// Calculate cost for specific usage
const cost = calculateCost('gpt-4o-mini-2024-07-18', 50000, 10000);
console.log(`Total cost: $${cost.totalCost.toFixed(4)}`);

// Calculate with prompt caching (Anthropic & OpenAI models)
const costWithCache = calculateCostWithCache(
  'claude-sonnet-4-5',
  50000,   // new input tokens
  200000,  // cached input tokens
  10000    // output tokens
);

// Works with OpenAI models too
const openaiCached = calculateCostWithCache(
  'gpt-4o-2024-08-06',
  30000,   // new input tokens
  100000,  // cached input tokens
  5000     // output tokens
);

// Compare costs across multiple models
const comparison = compareCosts(
  ['gpt-4o-mini-2024-07-18', 'claude-haiku-4-5', 'gemini-2.5-flash'],
  100000,
  20000
);
```

#### Advanced Search

```typescript
import { searchModels, getCheapestModel, getRecommendedModels } from '@gorets/ai-providers';

// Search with multiple criteria
const results = searchModels({
  provider: 'openai',
  capabilities: ['vision', 'function-calling'],
  maxPrice: 3.0,
  minContextWindow: 100000,
});

// Find cheapest model with specific requirements
const cheapest = getCheapestModel({
  capabilities: ['vision', 'chat'],
  activeOnly: true,
});

// Get recommended models for a use case
const recommended = getRecommendedModels({
  budget: 'low',
  priority: 'speed',
  capabilities: ['chat', 'function-calling'],
});
```

#### Deprecation Management

```typescript
import {
  isModelDeprecated,
  getReplacementModel,
  getModelsShuttingDownSoon,
  getActiveModels
} from '@gorets/ai-providers';

// Check if model is deprecated
const status = isModelDeprecated('gpt-3.5-turbo-0125');
if (status.isDeprecated) {
  console.log(`Deprecated on: ${status.deprecationDate}`);
  console.log(`Shuts down: ${status.shutdownDate}`);

  // Get replacement model
  const replacement = getReplacementModel('gpt-3.5-turbo-0125');
  console.log(`Use instead: ${replacement.name}`);
}

// Find models shutting down in next 90 days
const shuttingDown = getModelsShuttingDownSoon(90);

// Get only active models
const activeModels = getActiveModels();
```

#### Context and Features

```typescript
import { getModelsWithLargestContext, getModelById } from '@gorets/ai-providers';

// Find models with largest context windows
const largestContext = getModelsWithLargestContext(5);

// Search by alias
const model = getModelById('claude-sonnet-4-5'); // Works with aliases!
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
  aliases?: string[];            // Alternative IDs (e.g., 'claude-sonnet-4-5' for 'claude-sonnet-4-5-20250929')
  name: string;                  // Human-readable name
  provider: string;              // Provider ID
  releaseDate?: string;          // ISO 8601 date
  status: 'stable' | 'beta' | 'experimental' | 'deprecated' | 'disabled' | 'preview';
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
  deprecationDate?: string;      // When model was deprecated (ISO 8601)
  shutdownDate?: string;         // When model stops working (ISO 8601)
  replacementModel?: string;     // ID of replacement model
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

## 📊 Model Status

Models go through different lifecycle stages:

- `stable` - Production-ready, fully supported
- `beta` - Feature-complete but may have minor issues
- `experimental` - Early access, may change significantly
- `preview` - Pre-release version for testing
- `deprecated` - Still works but superseded by newer models
- `disabled` - No longer available, API calls will fail

**Deprecated Models:**
When a model is deprecated, check these fields:
- `deprecationDate` - When it was marked as deprecated
- `shutdownDate` - When it will stop working (if known)
- `replacementModel` - Recommended model to migrate to

**Model Aliases:**
Some models have multiple identifiers. The main ID is the simple name, with dated versions in aliases:
```typescript
{
  id: 'claude-sonnet-4-5',  // Simple name as main ID
  aliases: ['claude-sonnet-4-5-20250929', 'claude-sonnet-4.5'],  // Dated version in aliases
  // ... other fields
}
```
You can use either the main ID or any alias when searching for models.

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
- `mcp-servers` - Model Context Protocol (MCP) server support

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
