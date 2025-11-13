import { ModelInfo, ModelCapability, ModelTag, ModelStatus } from './types';
export declare function calculateCost(modelId: string, inputTokens: number, outputTokens: number): {
    inputCost: number;
    outputCost: number;
    totalCost: number;
} | null;
export declare function calculateCostWithCache(modelId: string, inputTokens: number, cachedInputTokens: number, outputTokens: number): {
    inputCost: number;
    cachedInputCost: number;
    outputCost: number;
    totalCost: number;
} | null;
export declare function getModelById(id: string): ModelInfo | undefined;
export declare function getModelsByProvider(provider: string): ModelInfo[];
export declare function getModelsByTag(tag: ModelTag): ModelInfo[];
export declare function getModelsByCapability(capability: ModelCapability): ModelInfo[];
export declare function getModelsByStatus(status: ModelStatus): ModelInfo[];
export declare function getActiveModels(): ModelInfo[];
export declare function getDeprecatedModels(): ModelInfo[];
export declare function getDisabledModels(): ModelInfo[];
export declare function getReplacementModel(modelId: string): ModelInfo | undefined;
export declare function getCheapestModel(options?: {
    provider?: string;
    capabilities?: ModelCapability[];
    activeOnly?: boolean;
}): ModelInfo | undefined;
export declare function getMostExpensiveModel(): ModelInfo | undefined;
export declare function getModelsWithLargestContext(limit?: number): ModelInfo[];
export declare function searchModels(criteria: {
    provider?: string;
    status?: ModelStatus;
    capabilities?: ModelCapability[];
    tags?: ModelTag[];
    minContextWindow?: number;
    maxPrice?: number;
}): ModelInfo[];
export declare function compareCosts(modelIds: string[], inputTokens: number, outputTokens: number): Array<{
    modelId: string;
    modelName: string;
    cost: number;
} | null>;
export declare function isModelDeprecated(modelId: string): {
    isDeprecated: boolean;
    isDisabled: boolean;
    deprecationDate?: string;
    shutdownDate?: string;
    replacementModel?: string;
};
export declare function getModelsShuttingDownSoon(days?: number): ModelInfo[];
export declare function getRecommendedModels(useCase: {
    budget?: 'low' | 'medium' | 'high';
    priority?: 'speed' | 'quality' | 'balanced';
    capabilities?: ModelCapability[];
}): ModelInfo[];
//# sourceMappingURL=utils.d.ts.map