/**
 * Tests for utility functions
 */

// @ts-ignore - Node.js built-in test module
import { describe, it } from 'node:test';
// @ts-ignore - Node.js built-in assert module
import assert from 'node:assert/strict';
import { getModelById, getModelsByIds, getModelsByProvider } from '../src/utils';
import { ALL_MODELS } from '../src/models/index';

describe('Utils', () => {
  describe('getModelById', () => {
    it('should return a model by its ID', () => {
      const model = getModelById('gpt-4o-mini-2024-07-18');
      assert.ok(model);
      assert.equal(model!.id, 'gpt-4o-mini-2024-07-18');
      assert.equal(model!.provider, 'openai');
    });

    it('should return a model by its short name', () => {
      const model = getModelById('gpt-5.1');
      assert.ok(model);
      assert.equal(model!.shortName, 'gpt-5.1');
      assert.equal(model!.provider, 'openai');
    });

    it('should return a model by its alias', () => {
      // Find a model with aliases to test
      const modelWithAlias = ALL_MODELS.find(m => m.aliases && m.aliases.length > 0);
      if (modelWithAlias && modelWithAlias.aliases) {
        const model = getModelById(modelWithAlias.aliases[0]);
        assert.ok(model);
        assert.equal(model!.id, modelWithAlias.id);
      }
    });

    it('should return undefined for non-existent model', () => {
      const model = getModelById('non-existent-model-id');
      assert.equal(model, undefined);
    });
  });

  describe('getModelsByIds', () => {
    it('should return multiple models by their IDs', () => {
      const ids = ['gpt-4o-mini-2024-07-18', 'claude-haiku-4-5'];
      const models = getModelsByIds(ids);

      assert.equal(models.length, 2);
      assert.ok(models[0]);
      assert.ok(models[1]);
      assert.equal(models[0]?.id, 'gpt-4o-mini-2024-07-18');
      assert.equal(models[1]?.id, 'claude-haiku-4-5');
    });

    it('should return models in the same order as input IDs', () => {
      const ids = ['claude-haiku-4-5', 'gpt-4o-mini-2024-07-18', 'gemini-2.5-flash'];
      const models = getModelsByIds(ids);

      assert.equal(models.length, 3);
      assert.equal(models[0]?.id, 'claude-haiku-4-5');
      assert.equal(models[1]?.id, 'gpt-4o-mini-2024-07-18');
      assert.equal(models[2]?.id, 'gemini-2.5-flash');
    });

    it('should work with short names', () => {
      const ids = ['gpt-5.1', 'gpt-4o'];
      const models = getModelsByIds(ids);

      assert.equal(models.length, 2);
      assert.ok(models[0]);
      assert.ok(models[1]);
      assert.equal(models[0]?.shortName, 'gpt-5.1');
      assert.equal(models[1]?.shortName, 'gpt-4o');
    });

    it('should work with aliases', () => {
      // Find models with aliases
      const modelsWithAliases = ALL_MODELS.filter(m => m.aliases && m.aliases.length > 0);

      if (modelsWithAliases.length >= 2) {
        const ids = [
          modelsWithAliases[0].aliases![0],
          modelsWithAliases[1].aliases![0]
        ];
        const models = getModelsByIds(ids);

        assert.equal(models.length, 2);
        assert.ok(models[0]);
        assert.ok(models[1]);
        assert.equal(models[0]?.id, modelsWithAliases[0].id);
        assert.equal(models[1]?.id, modelsWithAliases[1].id);
      }
    });

    it('should return undefined for non-existent models', () => {
      const ids = ['gpt-4o-mini-2024-07-18', 'non-existent-model', 'claude-haiku-4-5'];
      const models = getModelsByIds(ids);

      assert.equal(models.length, 3);
      assert.ok(models[0]);
      assert.equal(models[1], undefined);
      assert.ok(models[2]);
    });

    it('should handle empty array', () => {
      const models = getModelsByIds([]);
      assert.equal(models.length, 0);
      assert.deepEqual(models, []);
    });

    it('should handle array with single ID', () => {
      const models = getModelsByIds(['gpt-4o-mini-2024-07-18']);
      assert.equal(models.length, 1);
      assert.ok(models[0]);
      assert.equal(models[0]?.id, 'gpt-4o-mini-2024-07-18');
    });

    it('should handle duplicate IDs', () => {
      const ids = ['gpt-4o-mini-2024-07-18', 'gpt-4o-mini-2024-07-18', 'claude-haiku-4-5'];
      const models = getModelsByIds(ids);

      assert.equal(models.length, 3);
      assert.ok(models[0]);
      assert.ok(models[1]);
      assert.ok(models[2]);
      assert.equal(models[0]?.id, 'gpt-4o-mini-2024-07-18');
      assert.equal(models[1]?.id, 'gpt-4o-mini-2024-07-18');
      assert.equal(models[2]?.id, 'claude-haiku-4-5');
    });

    it('should handle mixed valid and invalid IDs', () => {
      const ids = [
        'non-existent-1',
        'gpt-4o-mini-2024-07-18',
        'non-existent-2',
        'claude-haiku-4-5',
        'non-existent-3'
      ];
      const models = getModelsByIds(ids);

      assert.equal(models.length, 5);
      assert.equal(models[0], undefined);
      assert.ok(models[1]);
      assert.equal(models[2], undefined);
      assert.ok(models[3]);
      assert.equal(models[4], undefined);

      assert.equal(models[1]?.id, 'gpt-4o-mini-2024-07-18');
      assert.equal(models[3]?.id, 'claude-haiku-4-5');
    });
  });

  describe('getModelsByProvider', () => {
    it('should return all models from a specific provider', () => {
      const openaiModels = getModelsByProvider('openai');
      assert.ok(openaiModels.length > 0);
      openaiModels.forEach(model => {
        assert.equal(model.provider, 'openai');
      });
    });

    it('should return empty array for non-existent provider', () => {
      const models = getModelsByProvider('non-existent-provider');
      assert.equal(models.length, 0);
    });
  });
});
