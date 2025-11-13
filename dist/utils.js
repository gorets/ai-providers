"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCost = calculateCost;
exports.calculateCostWithCache = calculateCostWithCache;
exports.getModelById = getModelById;
exports.getModelsByProvider = getModelsByProvider;
exports.getModelsByTag = getModelsByTag;
exports.getModelsByCapability = getModelsByCapability;
exports.getModelsByStatus = getModelsByStatus;
exports.getActiveModels = getActiveModels;
exports.getDeprecatedModels = getDeprecatedModels;
exports.getDisabledModels = getDisabledModels;
exports.getReplacementModel = getReplacementModel;
exports.getCheapestModel = getCheapestModel;
exports.getMostExpensiveModel = getMostExpensiveModel;
exports.getModelsWithLargestContext = getModelsWithLargestContext;
exports.searchModels = searchModels;
exports.compareCosts = compareCosts;
exports.isModelDeprecated = isModelDeprecated;
exports.getModelsShuttingDownSoon = getModelsShuttingDownSoon;
exports.getRecommendedModels = getRecommendedModels;
const index_1 = require("./models/index");
function calculateCost(modelId, inputTokens, outputTokens) {
    const model = getModelById(modelId);
    if (!model || !model.pricing) {
        return null;
    }
    const inputCost = (inputTokens / 1000000) * model.pricing.input;
    const outputCost = (outputTokens / 1000000) * model.pricing.output;
    const totalCost = inputCost + outputCost;
    return {
        inputCost,
        outputCost,
        totalCost,
    };
}
function calculateCostWithCache(modelId, inputTokens, cachedInputTokens, outputTokens) {
    const model = getModelById(modelId);
    if (!model || !model.pricing) {
        return null;
    }
    const inputCost = (inputTokens / 1000000) * model.pricing.input;
    const cachedInputCost = model.pricing.cachedInput
        ? (cachedInputTokens / 1000000) * model.pricing.cachedInput
        : 0;
    const outputCost = (outputTokens / 1000000) * model.pricing.output;
    const totalCost = inputCost + cachedInputCost + outputCost;
    return {
        inputCost,
        cachedInputCost,
        outputCost,
        totalCost,
    };
}
function getModelById(id) {
    return index_1.ALL_MODELS.find((model) => model.id === id || model.aliases?.includes(id));
}
function getModelsByProvider(provider) {
    return index_1.ALL_MODELS.filter((model) => model.provider === provider);
}
function getModelsByTag(tag) {
    return index_1.ALL_MODELS.filter((model) => model.tags.includes(tag));
}
function getModelsByCapability(capability) {
    return index_1.ALL_MODELS.filter((model) => model.capabilities.includes(capability));
}
function getModelsByStatus(status) {
    return index_1.ALL_MODELS.filter((model) => model.status === status);
}
function getActiveModels() {
    return index_1.ALL_MODELS.filter((model) => model.status !== 'deprecated' && model.status !== 'disabled');
}
function getDeprecatedModels() {
    return index_1.ALL_MODELS.filter((model) => model.status === 'deprecated');
}
function getDisabledModels() {
    return index_1.ALL_MODELS.filter((model) => model.status === 'disabled');
}
function getReplacementModel(modelId) {
    const model = getModelById(modelId);
    if (!model || !model.replacementModel) {
        return undefined;
    }
    return getModelById(model.replacementModel);
}
function getCheapestModel(options) {
    let models = index_1.ALL_MODELS.filter((m) => m.pricing && m.pricing.input > 0);
    if (options?.provider) {
        models = models.filter((m) => m.provider === options.provider);
    }
    if (options?.capabilities) {
        models = models.filter(m => options.capabilities.every(cap => m.capabilities.includes(cap)));
    }
    if (options?.activeOnly) {
        models = models.filter((m) => m.status !== 'deprecated' && m.status !== 'disabled');
    }
    return models.sort((a, b) => {
        const aPrice = (a.pricing?.input ?? 0) + (a.pricing?.output ?? 0);
        const bPrice = (b.pricing?.input ?? 0) + (b.pricing?.output ?? 0);
        return aPrice - bPrice;
    })[0];
}
function getMostExpensiveModel() {
    return index_1.ALL_MODELS.filter((m) => m.pricing)
        .sort((a, b) => {
        const aPrice = (a.pricing?.input ?? 0) + (a.pricing?.output ?? 0);
        const bPrice = (b.pricing?.input ?? 0) + (b.pricing?.output ?? 0);
        return bPrice - aPrice;
    })[0];
}
function getModelsWithLargestContext(limit = 5) {
    return [...index_1.ALL_MODELS]
        .sort((a, b) => b.limits.contextWindow - a.limits.contextWindow)
        .slice(0, limit);
}
function searchModels(criteria) {
    let results = index_1.ALL_MODELS;
    if (criteria.provider) {
        results = results.filter((m) => m.provider === criteria.provider);
    }
    if (criteria.status) {
        results = results.filter((m) => m.status === criteria.status);
    }
    if (criteria.capabilities) {
        results = results.filter(m => criteria.capabilities.every(cap => m.capabilities.includes(cap)));
    }
    if (criteria.tags) {
        results = results.filter(m => criteria.tags.some(tag => m.tags.includes(tag)));
    }
    if (criteria.minContextWindow) {
        results = results.filter((m) => m.limits.contextWindow >= criteria.minContextWindow);
    }
    if (criteria.maxPrice && criteria.maxPrice > 0) {
        results = results.filter((m) => {
            if (!m.pricing)
                return false;
            const totalPrice = m.pricing.input + m.pricing.output;
            return totalPrice <= criteria.maxPrice;
        });
    }
    return results;
}
function compareCosts(modelIds, inputTokens, outputTokens) {
    return modelIds.map(id => {
        const result = calculateCost(id, inputTokens, outputTokens);
        const model = getModelById(id);
        if (!result || !model)
            return null;
        return {
            modelId: id,
            modelName: model.name,
            cost: result.totalCost,
        };
    }).filter(r => r !== null);
}
function isModelDeprecated(modelId) {
    const model = getModelById(modelId);
    if (!model) {
        return { isDeprecated: false, isDisabled: false };
    }
    return {
        isDeprecated: model.status === 'deprecated',
        isDisabled: model.status === 'disabled',
        deprecationDate: model.deprecationDate,
        shutdownDate: model.shutdownDate,
        replacementModel: model.replacementModel,
    };
}
function getModelsShuttingDownSoon(days = 90) {
    const now = new Date();
    const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    return index_1.ALL_MODELS.filter((model) => {
        if (!model.shutdownDate)
            return false;
        const shutdownDate = new Date(model.shutdownDate);
        return shutdownDate >= now && shutdownDate <= futureDate;
    });
}
function getRecommendedModels(useCase) {
    let models = getActiveModels();
    if (useCase.capabilities) {
        models = models.filter(m => useCase.capabilities.every(cap => m.capabilities.includes(cap)));
    }
    if (useCase.budget === 'low') {
        models = models.filter((m) => m.tags.includes('cost-effective'));
    }
    else if (useCase.budget === 'high') {
        models = models.filter((m) => m.tags.includes('flagship'));
    }
    if (useCase.priority === 'speed') {
        models = models.filter((m) => m.tags.includes('fast'));
    }
    else if (useCase.priority === 'quality') {
        models = models.filter((m) => m.tags.includes('flagship') || m.tags.includes('reasoning'));
    }
    else if (useCase.priority === 'balanced') {
        models = models.filter((m) => m.tags.includes('balanced'));
    }
    return models.slice(0, 5);
}
