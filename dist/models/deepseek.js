"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEEPSEEK_MODELS = void 0;
exports.DEEPSEEK_MODELS = [
    {
        id: 'deepseek-chat',
        aliases: ['deepseek-v3'],
        name: 'DeepSeek Chat',
        provider: 'deepseek',
        releaseDate: '2024-12-26',
        status: 'stable',
        capabilities: [
            'text-generation',
            'chat',
            'code-generation',
            'function-calling',
            'streaming',
            'json-mode',
        ],
        tags: ['flagship', 'coding', 'cost-effective'],
        limits: {
            contextWindow: 64000,
            maxOutputTokens: 8192,
        },
        pricing: {
            input: 0.14,
            output: 0.28,
        },
        description: 'Latest DeepSeek model with excellent coding and reasoning',
        docsUrl: 'https://platform.deepseek.com/api-docs',
    },
    {
        id: 'deepseek-coder',
        name: 'DeepSeek Coder',
        provider: 'deepseek',
        releaseDate: '2024-01-25',
        status: 'stable',
        capabilities: [
            'text-generation',
            'chat',
            'code-generation',
            'streaming',
        ],
        tags: ['coding', 'cost-effective'],
        limits: {
            contextWindow: 32000,
            maxOutputTokens: 4096,
        },
        pricing: {
            input: 0.14,
            output: 0.28,
        },
        description: 'Specialized model optimized for code generation and completion',
        docsUrl: 'https://platform.deepseek.com/api-docs',
    },
    {
        id: 'deepseek-reasoner',
        aliases: ['deepseek-r1'],
        name: 'DeepSeek Reasoner',
        provider: 'deepseek',
        releaseDate: '2025-01-20',
        status: 'stable',
        capabilities: [
            'text-generation',
            'chat',
            'reasoning',
            'code-generation',
            'streaming',
        ],
        tags: ['reasoning', 'flagship', 'cost-effective'],
        limits: {
            contextWindow: 64000,
            maxOutputTokens: 8192,
        },
        pricing: {
            input: 0.55,
            output: 2.19,
        },
        description: 'Advanced reasoning model competitive with top-tier models at fraction of cost',
        docsUrl: 'https://platform.deepseek.com/api-docs',
    },
];
