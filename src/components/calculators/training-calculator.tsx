'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Settings, Zap, Activity } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AnimatedNumber } from '@/components/animated-number';
import { LoadingOverlay } from '@/components/ui/loading-spinner';
import { formatMemorySize } from '@/utils/memory-formulas';
import { TrainingConfig, PrecisionType, OptimizerType } from '@/types';
import { useCalculatorStore } from '@/store/calculator-store';
import { useLanguage } from '@/contexts/language-context';

export function TrainingCalculator() {
  const { 
    trainingConfig: config, 
    setTrainingConfig: setConfig,
    trainingResult: memoryResult,
    trainingLoading: isLoading
  } = useCalculatorStore();
  
  const { t } = useLanguage();

  const handleConfigChange = (key: keyof TrainingConfig, value: unknown) => {
    setConfig({ [key]: value });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
      {/* 配置面板 */}
      <motion.div
        className="glass-card p-4 md:p-6 space-y-4 md:space-y-6"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl glass-card">
            <Brain className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold">{t('training.config')}</h3>
        </div>

        {/* 模型参数量 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">{t('model.parameters.count')}</label>
            <div className="flex items-center gap-2">
              <AnimatedNumber 
                value={config.modelParams} 
                format={(n) => `${Math.round(n)}B`}
                className="text-sm font-mono text-blue-600"
              />
            </div>
          </div>
          <Slider
            value={[config.modelParams]}
            onValueChange={([value]) => handleConfigChange('modelParams', Math.round(value))}
            max={175}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1B</span>
            <span>175B</span>
          </div>
        </div>

        {/* 批次大小 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">批次大小</label>
            <AnimatedNumber 
              value={config.batchSize} 
              className="text-sm font-mono text-green-600"
            />
          </div>
          <Slider
            value={[config.batchSize]}
            onValueChange={([value]) => handleConfigChange('batchSize', value)}
            max={128}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1</span>
            <span>128</span>
          </div>
        </div>

        {/* 序列长度 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">序列长度</label>
            <AnimatedNumber 
              value={config.sequenceLength} 
              className="text-sm font-mono text-purple-600"
            />
          </div>
          <Slider
            value={[config.sequenceLength]}
            onValueChange={([value]) => handleConfigChange('sequenceLength', value)}
            max={8192}
            min={512}
            step={512}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>512</span>
            <span>8192</span>
          </div>
        </div>

        {/* 精度选择 */}
        <div className="space-y-3">
                      <label className="text-sm font-medium">{t('numerical.precision')}</label>
          <Select 
            value={config.precision} 
            onValueChange={(value: PrecisionType) => handleConfigChange('precision', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FP32">{t('fp32.32bit')}</SelectItem>
              <SelectItem value="FP16">{t('fp16.16bit')}</SelectItem>
              <SelectItem value="BF16">{t('bf16.brain.float')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 优化器选择 */}
        <div className="space-y-3">
          <label className="text-sm font-medium">{t('optimizer')}</label>
          <Select 
            value={config.optimizer} 
            onValueChange={(value: OptimizerType) => handleConfigChange('optimizer', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AdamW">{t('adamw.recommended')}</SelectItem>
              <SelectItem value="Adam">Adam</SelectItem>
              <SelectItem value="SGD">SGD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 高级选项 */}
        <div className="space-y-4 pt-4 border-t border-white/20">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{t('gradient.checkpointing')}</span>
            <button
              onClick={() => handleConfigChange('gradientCheckpointing', !config.gradientCheckpointing)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                config.gradientCheckpointing ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                config.gradientCheckpointing ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{t('training.mixed.precision')}</span>
            <button
              onClick={() => handleConfigChange('mixedPrecision', !config.mixedPrecision)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                config.mixedPrecision ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                config.mixedPrecision ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* 结果面板 */}
      <motion.div
        className="space-y-6"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <LoadingOverlay isLoading={isLoading}>
        {/* 总显存需求 */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl glass-card">
              <Zap className="w-5 h-5 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold">{t('memory.requirement')}</h3>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
              <AnimatedNumber 
                value={memoryResult?.total || 0} 
                format={formatMemorySize}
              />
            </div>
            <p className="text-sm text-gray-600">{t('total.memory.requirement')}</p>
          </div>
        </div>

        {/* 显存分解 */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl glass-card">
              <Activity className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold">{t('memory.breakdown')}</h3>
          </div>
          
          <div className="space-y-4">
                          {memoryResult?.breakdown?.map((item, index) => (
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

        {/* 优化建议 */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl glass-card">
              <Settings className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold">{t('optimization.suggestions')}</h3>
          </div>
          
          <div className="space-y-3 text-sm">
            {!config.gradientCheckpointing && (
              <div className="flex items-start gap-2 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                <span>{t('enable.gradient.checkpointing')}</span>
              </div>
            )}
            
            {config.precision === 'FP32' && (
              <div className="flex items-start gap-2 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                <span>{t('use.fp16.bf16')}</span>
              </div>
            )}
            
            {config.optimizer === 'AdamW' && config.modelParams > 30 && (
              <div className="flex items-start gap-2 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                <span>{t('large.model.sgd')}</span>
              </div>
            )}
          </div>
        </div>
        </LoadingOverlay>
      </motion.div>
    </div>
  );
} 