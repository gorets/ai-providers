"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSION = void 0;
exports.getDatabase = getDatabase;
__exportStar(require("./types"), exports);
__exportStar(require("./providers"), exports);
__exportStar(require("./models/index"), exports);
__exportStar(require("./utils"), exports);
const providers_1 = require("./providers");
const index_1 = require("./models/index");
exports.VERSION = '1.0.0';
function getDatabase() {
    return {
        metadata: {
            version: exports.VERSION,
            lastUpdated: new Date().toISOString().split('T')[0],
            generatedAt: new Date().toISOString(),
        },
        providers: providers_1.PROVIDERS,
        models: index_1.ALL_MODELS,
    };
}
exports.default = getDatabase();
