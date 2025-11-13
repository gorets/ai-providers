"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZAI_MODELS = void 0;
exports.ZAI_MODELS = [
    {
        id: 'z-chat-pro',
        name: 'Z-Chat Pro',
        provider: 'zai',
        status: 'stable',
        capabilities: [
            'text-generation',
            'chat',
            'code-generation',
            'function-calling',
            'streaming',
            'json-mode',
        ],
        tags: ['balanced', 'coding'],
        limits: {
            contextWindow: 128000,
            maxOutputTokens: 8192,
        },
        pricing: {
            input: 0.5,
            output: 1.5,
        },
        description: 'Flagship model with strong performance across tasks',
        docsUrl: 'https://z.ai/model-api',
    },
    {
        id: 'z-chat-lite',
        name: 'Z-Chat Lite',
        provider: 'zai',
        status: 'stable',
        capabilities: [
            'text-generation',
            'chat',
            'streaming',
            'json-mode',
        ],
        tags: ['fast', 'cost-effective'],
        limits: {
            contextWindow: 64000,
            maxOutputTokens: 4096,
        },
        pricing: {
            input: 0.1,
            output: 0.3,
        },
        description: 'Fast and affordable model for general tasks',
        docsUrl: 'https://z.ai/model-api',
    },
    {
        id: 'z-code',
        name: 'Z-Code',
        provider: 'zai',
        status: 'stable',
        capabilities: [
            'text-generation',
            'chat',
            'code-generation',
            'function-calling',
            'streaming',
        ],
        tags: ['coding', 'balanced'],
        limits: {
            contextWindow: 128000,
            maxOutputTokens: 8192,
        },
        pricing: {
            input: 0.6,
            output: 1.8,
        },
        description: 'Specialized model optimized for code generation',
        docsUrl: 'https://z.ai/model-api',
    },
];
