'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Database, BarChart3 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AnimatedNumber } from '@/components/animated-number';

import { formatMemorySize } from '@/utils/memory-formulas';
import { getModelById, getModelsByCategoryAndArchitecture } from '@/lib/models-data';
import { GRPOConfig, PrecisionType } from '@/types';
import { useCalculatorStore } from '@/store/calculator-store';
import { useLanguage } from '@/contexts/language-context';

export function GRPOCalculator() {
  const { 
    grpoConfig: config, 
    setGrpoConfig: setConfig,
    grpoResult: memoryResult,
    grpoLoading: isLoading
  } = useCalculatorStore();
  
  const { t } = useLanguage();

  // 获取当前选中模型信息
  const selectedModel = useMemo(() => 
    getModelById(config.modelId), [config.modelId]
  );

  const handleConfigChange = (key: keyof GRPOConfig, value: unknown) => {
    setConfig({ [key]: value });
  };

  // 按系列分组NLP模型
  const modelsByCategory = useMemo(() => {
    return getModelsByCategoryAndArchitecture('nlp');
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
      {/* 配置面板 */}
      <motion.div
        className="glass-card p-6 space-y-6"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl glass-card">
            <Brain className="w-5 h-5 text-purple-500" />
          </div>
          <h3 className="text-xl font-semibold">{t('grpo.config')}</h3>
        </div>

        {/* 模型选择 */}
        <div className="space-y-3">
          <label className="text-sm font-medium">{t('grpo.preset.model')}</label>
          <Select 
            value={config.modelId} 
            onValueChange={(value) => handleConfigChange('modelId', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {Object.entries(modelsByCategory).map(([category, models]) => (
                <div key={category}>
                  <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase">
                    {category}
                  </div>
                  {models.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name} ({model.params}B)
                    </SelectItem>
                  ))}
                </div>
              ))}
            </SelectContent>
          </Select>
          
          {/* 模型信息显示 */}
          {selectedModel && (
            <div className="glass-card p-3 mt-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">{t('grpo.parameters')}:</span>
                  <span className="ml-2 font-mono">{selectedModel.params}B</span>
                </div>
                <div>
                  <span className="text-gray-500">{t('grpo.architecture')}:</span>
                  <span className="ml-2 font-mono">{selectedModel.architecture}</span>
                </div>
                <div>
                  <span className="text-gray-500">{t('grpo.hidden.layers')}:</span>
                  <span className="ml-2 font-mono">{selectedModel.hiddenSize}</span>
                </div>
                <div>
                  <span className="text-gray-500">{t('grpo.num.layers')}:</span>
                  <span className="ml-2 font-mono">{selectedModel.numLayers}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 精度选择 */}
        <div className="space-y-3">
          <label className="text-sm font-medium">{t('grpo.training.precision')}</label>
          <Select 
            value={config.precision} 
            onValueChange={(value: PrecisionType) => handleConfigChange('precision', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FP32">{t('precision.fp32')}</SelectItem>
              <SelectItem value="FP16">{t('precision.fp16')}</SelectItem>
              <SelectItem value="BF16">{t('precision.bf16')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 批量大小 */}
        <div className="space-y-3">
          <label className="text-sm font-medium flex justify-between">
            <span>{t('grpo.batch.size')}</span>
            <span className="font-mono text-purple-600">{config.batchSize}</span>
          </label>
          <Slider
            value={[config.batchSize]}
            onValueChange={([value]) => handleConfigChange('batchSize', value)}
            min={1}
            max={32}
            step={1}
            className="w-full"
          />
        </div>

        {/* 序列长度 */}
        <div className="space-y-3">
          <label className="text-sm font-medium flex justify-between">
            <span>{t('grpo.max.sequence.length')}</span>
            <span className="font-mono text-purple-600">{config.sequenceLength}</span>
          </label>
          <Slider
            value={[config.sequenceLength]}
            onValueChange={([value]) => handleConfigChange('sequenceLength', value)}
            min={512}
            max={8192}
            step={512}
            className="w-full"
          />
        </div>

        {/* 生成数量 */}
        <div className="space-y-3">
          <label className="text-sm font-medium flex justify-between">
            <span>{t('grpo.generations.per.prompt')}</span>
            <span className="font-mono text-purple-600">{config.numGenerations}</span>
          </label>
          <Slider
            value={[config.numGenerations]}
            onValueChange={([value]) => handleConfigChange('numGenerations', value)}
            min={4}
            max={64}
            step={4}
            className="w-full"
          />
          <p className="text-xs text-gray-500">
            {t('grpo.description')}
          </p>
        </div>

        {/* 高级设置 */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <h4 className="text-sm font-medium text-gray-300">{t('grpo.advanced.settings')}</h4>
          
          {/* 梯度累积步数 */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex justify-between">
              <span>{t('grpo.gradient.accumulation.steps')}</span>
              <span className="font-mono text-purple-600">{config.gradientAccumulationSteps}</span>
            </label>
            <Slider
              value={[config.gradientAccumulationSteps]}
              onValueChange={([value]) => handleConfigChange('gradientAccumulationSteps', value)}
              min={1}
              max={32}
              step={1}
              className="w-full"
            />
          </div>

          {/* 8位优化器 */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">{t('grpo.use.8bit.optimizer')}</label>
            <button
              onClick={() => handleConfigChange('use8BitOptimizer', !config.use8BitOptimizer)}
              className={`w-12 h-6 rounded-full transition-all duration-300 ${
                config.use8BitOptimizer ? 'bg-purple-500' : 'bg-gray-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                config.use8BitOptimizer ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          {/* 梯度检查点 */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">{t('grpo.gradient.checkpointing')}</label>
            <button
              onClick={() => handleConfigChange('gradientCheckpointing', !config.gradientCheckpointing)}
              className={`w-12 h-6 rounded-full transition-all duration-300 ${
                config.gradientCheckpointing ? 'bg-purple-500' : 'bg-gray-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                config.gradientCheckpointing ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* 结果面板 */}
      <motion.div
        className="glass-card p-6 relative"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl glass-card">
            <Database className="w-5 h-5 text-purple-500" />
          </div>
          <h3 className="text-xl font-semibold">{t('grpo.memory.requirement')}</h3>
        </div>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-2xl">
            <div className="w-8 h-8 animate-spin text-purple-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
            </div>
          </div>
        )}

        {memoryResult && (
          <div className="space-y-6">
            {/* 总显存需求 */}
            <div className="text-center glass-card p-4">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                <AnimatedNumber 
                  value={memoryResult.total} 
                  format={(n) => formatMemorySize(n)} 
                />
              </div>
              <div className="text-sm text-gray-400">{t('memory.total.requirement')}</div>
            </div>

            {/* 显存分解 */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                {t('memory.breakdown')}
              </h4>
              
              <div className="space-y-4">
                {memoryResult.breakdown.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="space-y-2"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span>{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AnimatedNumber 
                          value={item.value} 
                          format={formatMemorySize}
                          className="font-mono text-xs"
                        />
                        <span className="text-xs text-gray-500">
                          (<AnimatedNumber value={item.percentage} format={(n) => `${n.toFixed(1)}%`} />)
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* GRPO特性说明 */}
            <div className="glass-card p-4 space-y-2">
              <h4 className="text-sm font-medium text-purple-300 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                {t('grpo.features')}
              </h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• {t('grpo.features.policy.reference')}</li>
                <li>• {t('grpo.features.multiple.responses')}</li>
                <li>• {t('grpo.features.8bit.optimizer')}</li>
                <li>• {t('grpo.features.gradient.checkpointing')}</li>
                <li>• {t('grpo.features.memory.saving')}</li>
              </ul>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
} 