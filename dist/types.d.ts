export type LLMProvider = 'openai' | 'anthropic' | 'google' | 'xai' | 'mistral' | 'meta' | 'deepseek' | 'zai';
export type ModelCapability = 'text-generation' | 'chat' | 'code-generation' | 'vision' | 'image-generation' | 'function-calling' | 'streaming' | 'json-mode' | 'reasoning' | 'embeddings' | 'audio-input' | 'audio-output' | 'mcp-servers';
export type ModelTag = 'flagship' | 'fast' | 'cost-effective' | 'balanced' | 'experimental' | 'long-context' | 'multimodal' | 'reasoning' | 'coding' | 'deprecated';
export type ModelStatus = 'stable' | 'beta' | 'experimental' | 'deprecated' | 'disabled' | 'preview';
export interface ModelPricing {
    input: number;
    output: number;
    cachedInput?: number;
    perImage?: number;
    perAudioMinute?: number;
}
export interface ModelLimits {
    contextWindow: number;
    maxOutputTokens: number;
    rpmLimit?: number;
    tpmLimit?: number;
}
export interface ModelInfo {
    id: string;
    aliases?: string[];
    name: string;
    provider: LLMProvider;
    releaseDate?: string;
    status: ModelStatus;
    capabilities: ModelCapability[];
    tags: ModelTag[];
    limits: ModelLimits;
    pricing?: ModelPricing;
    description?: string;
    docsUrl?: string;
    deprecationDate?: string;
    shutdownDate?: string;
    replacementModel?: string;
}
export interface ProviderInfo {
    id: LLMProvider;
    name: string;
    website: string;
    apiBaseUrl: string;
    apiDocsUrl: string;
    modelsEndpoint?: string;
    icon: string;
    color: string;
    description: string;
    features: string[];
}
export interface AIProvidersDatabase {
    metadata: {
        version: string;
        lastUpdated: string;
        generatedAt: string;
    };
    providers: ProviderInfo[];
    models: ModelInfo[];
}
//# sourceMappingURL=types.d.ts.map