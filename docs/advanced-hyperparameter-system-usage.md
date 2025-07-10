# 高级超参数系统使用指南

## 概述

新的高级超参数系统已成功集成到AI显存计算器中，支持四种模型类型的精确显存计算和智能优化建议。系统现在提供了独立的"高级微调"主菜单，为专业用户提供更强大的配置和计算功能。

## 主菜单结构

AI显存计算器现在包含三个主要菜单项：

### 1. NLP/语言模型
- 基础的语言模型推理和训练计算
- 包含推理显存、训练显存、微调显存、GRPO显存等基础功能

### 2. 多模态模型
- 多模态模型的显存计算
- 支持图像-文本、视频-文本等多模态场景

### 3. 高级微调 ⭐ **新增功能**
- **专业的超参数配置系统**
- **四种模型类型的精确计算**
- **智能优化建议和参数验证**
- **GPU推荐和成本分析**

## 支持的模型类型

### 1. NLP模型 (自然语言处理)
- **支持架构**: Transformer, BERT, GPT, T5, LLaMA, ChatGLM
- **关键超参数**: 
  - 模型大小: 125M - 175B+
  - 序列长度: 512 - 32768 tokens
  - LoRA配置: rank 4-256, alpha 16-128
  - 学习率: 1e-6 ~ 1e-4

### 2. 多模态模型
- **支持架构**: CLIP, BLIP, LLaVA, GPT-4V, Flamingo
- **关键超参数**:
  - 图像分辨率: 224×224 ~ 1024×1024
  - Patch大小: 14×14 ~ 32×32
  - 视觉/文本编码器配置
  - 模态融合策略

### 3. MoE模型 (专家混合)
- **支持架构**: Switch Transformer, GLaM, PaLM-2, DeepSeek-MoE
- **关键超参数**:
  - 专家数量: 8-2048
  - 激活专家数: 1-8
  - 路由策略: Top-K, Switch, Expert Choice
  - 负载均衡权重

### 4. CNN模型 (卷积神经网络)
- **支持架构**: ResNet, EfficientNet, ConvNeXt, RegNet, DenseNet
- **关键超参数**:
  - 输入图像尺寸: 224×224 ~ 512×512
  - 批次大小: 32-512
  - 学习率: 1e-4 ~ 1e-2
  - 数据增强策略

## 精确数学计算公式

### NLP模型显存计算
```
总显存 = 模型权重显存 + 优化器显存 + 梯度显存 + 激活值显存 + KV缓存显存 + LoRA显存 + 预留显存

其中：
- 模型权重显存 = P × B
- 优化器显存 = P × B × M (M为优化器倍数)
- 梯度显存 = P × B
- 激活值显存 = B × S × H × L × N
- KV缓存显存 = 2 × B × S × H × L × 精度字节数
- LoRA显存 = 2 × Σ(r × (d_in + d_out)) × B
```

### 多模态模型显存计算
```
总显存 = 视觉显存 + 文本显存 + 融合显存 + 图像特征显存 + 跨模态注意力显存 + 优化器显存 + 梯度显存 + 预留显存

其中：
- 视觉显存 = (H×W×C + P_vision) × B_precision
- 文本显存 = P_text × B_precision
- 融合显存 = P_fusion × B_precision
- 图像特征显存 = B × (H×W/P²) × D × B_precision
- 跨模态注意力显存 = B × S_text × S_vision × B_precision
```

### MoE模型显存计算
```
总显存 = 路由器显存 + 激活专家显存 + 路由概率显存 + 专家分配显存 + 负载均衡显存 + 优化器显存 + 梯度显存 + 预留显存

其中：
- 路由器显存 = H × E × B_precision
- 激活专家显存 = K × P_expert × B_precision
- 路由概率显存 = B × S × E × B_precision
- 专家分配显存 = B × S × K × B_precision
- 负载均衡显存 = E × B_precision
```

### CNN模型显存计算
```
总显存 = 卷积层显存 + 特征图显存 + 全连接层显存 + BN显存 + 数据增强显存 + 优化器显存 + 梯度显存 + 预留显存

其中：
- 卷积层显存 = (K×K×C_in×C_out + C_out) × B_precision
- 特征图显存 = B × Σ(H_i × W_i × C_i) × B_precision
- 全连接层显存 = (D_in × D_out + D_out) × B_precision
- BN显存 = 4 × C × B_precision
- 数据增强显存 = B × H × W × C × B_precision × 2
```

## 智能优化功能

### 1. 实时参数验证
高级微调系统提供三层验证机制：

#### **错误检查** (红色提示)
- 参数超出有效范围
- 架构参数不兼容
- 必需参数缺失
- 数学约束违反（如隐藏层维度必须能被注意力头数整除）

#### **警告提示** (橙色提示)
- 参数在有效范围内但不在最优范围
- 可能影响性能的配置
- 资源利用率不理想的设置

#### **配置建议** (蓝色提示)
- 基于最佳实践的参数建议
- 针对特定硬件的优化建议
- 成本效益优化建议

### 2. 智能优化建议系统

#### **显存优化** (Memory Optimization)
- **高优先级**: 显存不足的紧急优化方案
  - 减少批次大小
  - 启用梯度检查点
  - 使用更激进的量化
- **中优先级**: 显存使用率优化
  - 调整序列长度
  - 优化LoRA配置
  - 启用CPU卸载
- **低优先级**: 内存效率提升
  - 特征图重计算
  - 模型并行策略

#### **性能优化** (Performance Optimization)
- **计算效率分析**: 基于配置评估计算效率
- **优化器建议**: 针对不同模型类型的最佳优化器选择
- **并行策略**: 数据并行、模型并行、序列并行建议
- **混合精度**: 自动混合精度训练建议

#### **成本优化** (Cost Optimization)
- **硬件成本**: 基于显存需求推荐最经济的GPU配置
- **PEFT方法**: 参数高效微调技术建议
- **云服务**: 按需付费vs自建硬件的成本分析
- **训练时间**: 效率vs成本的平衡建议

#### **稳定性优化** (Stability Optimization)
- **学习率调整**: 基于模型类型和大小的学习率建议
- **正则化**: 权重衰减、Dropout等正则化参数优化
- **梯度处理**: 梯度裁剪和累积策略
- **专家均衡**: MoE模型的负载均衡优化

### 3. GPU推荐系统

#### **智能匹配算法**
系统基于以下因素进行GPU推荐：
- **显存需求**: 精确的显存计算结果
- **利用率目标**: 75%为最佳利用率
- **成本效益**: 性能价格比分析
- **可用性**: 市场供应情况

#### **推荐等级**
- **🟢 优秀 (Excellent)**: 利用率60-80%，性价比最佳
- **🟡 良好 (Good)**: 利用率45-85%，性能充足
- **🟠 可接受 (Acceptable)**: 利用率85-95%，接近上限
- **🔴 不足 (Insufficient)**: 利用率>95%，显存不足

#### **推荐示例**
```
显存需求: 15.2GB
推荐配置:
🟢 RTX 4090 (24GB) - 利用率63% - 性价比最佳
🟡 RTX 4080 (16GB) - 利用率95% - 接近上限
🟠 A100 PCIe (40GB) - 利用率38% - 性能过剩
```

## 使用方式

### 1. Web界面
1. 打开AI显存计算器主页面
2. 点击顶部的 **"高级微调"** 主菜单标签
3. 选择模型类型（NLP/多模态/MoE/CNN）
4. 在配置面板中选择：
   - **基础配置**: 核心参数设置
   - **高级配置**: 详细架构参数
   - **优化设置**: 性能和稳定性参数
5. 实时查看：
   - 精确的显存计算结果
   - 参数验证和错误提示
   - 智能优化建议
   - GPU推荐和成本分析

### 2. MCP API调用

#### 新增API接口：`calculate_advanced_finetuning_vram`

这是专门为高级微调功能设计的MCP工具接口，支持四种模型类型的精确计算。

**接口地址**: `POST /api/mcp/tools/call`

**工具名称**: `calculate_advanced_finetuning_vram`

**必需参数**:
- `modelType`: 模型类型 ("nlp" | "multimodal" | "moe" | "cnn")
- `modelSize`: 模型大小(B)
- `architectureType`: 架构类型
- `precision`: 训练精度 ("fp32" | "fp16" | "bf16" | "int8" | "int4")
- `batchSize`: 批次大小
- `learningRate`: 学习率
- `optimizer`: 优化器类型 ("sgd" | "adam" | "adamw")
- `trainingEpochs`: 训练轮数

**可选参数**（根据模型类型）:
- NLP: `sequenceLength`, `hiddenSize`, `numLayers`, `loraRank`, `loraAlpha`
- 多模态: `imageResolution`, `patchSize`, `visionFeatureDim`
- MoE: `numExperts`, `numActiveExperts`, `expertCapacityFactor`
- CNN: `inputImageSize`, `kernelSize`

**示例调用**:

```bash
# NLP模型 - LLaMA-7B LoRA微调
curl -X POST http://localhost:3000/api/mcp/tools/call \
  -H "Content-Type: application/json" \
  -d '{
    "name": "calculate_advanced_finetuning_vram",
    "arguments": {
      "modelType": "nlp",
      "modelSize": 7.0,
      "architectureType": "LLaMA",
      "precision": "fp16",
      "batchSize": 4,
      "sequenceLength": 2048,
      "learningRate": 2e-5,
      "optimizer": "adamw",
      "trainingEpochs": 3,
      "hiddenSize": 4096,
      "numLayers": 32,
      "loraRank": 16,
      "loraAlpha": 32
    }
  }'

# 多模态模型 - LLaVA微调
curl -X POST http://localhost:3000/api/mcp/tools/call \
  -H "Content-Type: application/json" \
  -d '{
    "name": "calculate_advanced_finetuning_vram",
    "arguments": {
      "modelType": "multimodal",
      "modelSize": 7.0,
      "architectureType": "LLaVA",
      "precision": "fp16",
      "batchSize": 8,
      "sequenceLength": 1024,
      "learningRate": 1e-5,
      "optimizer": "adamw",
      "trainingEpochs": 5,
      "imageResolution": 336,
      "patchSize": 14,
      "visionFeatureDim": 1024
    }
  }'

# MoE模型 - Switch Transformer
curl -X POST http://localhost:3000/api/mcp/tools/call \
  -H "Content-Type: application/json" \
  -d '{
    "name": "calculate_advanced_finetuning_vram",
    "arguments": {
      "modelType": "moe",
      "modelSize": 8.0,
      "architectureType": "Switch Transformer",
      "precision": "bf16",
      "batchSize": 16,
      "sequenceLength": 2048,
      "learningRate": 3e-5,
      "optimizer": "adamw",
      "trainingEpochs": 2,
      "numExperts": 8,
      "numActiveExperts": 2,
      "expertCapacityFactor": 1.25
    }
  }'

# CNN模型 - ResNet微调
curl -X POST http://localhost:3000/api/mcp/tools/call \
  -H "Content-Type: application/json" \
  -d '{
    "name": "calculate_advanced_finetuning_vram",
    "arguments": {
      "modelType": "cnn",
      "modelSize": 0.05,
      "architectureType": "ResNet",
      "precision": "fp32",
      "batchSize": 64,
      "learningRate": 1e-3,
      "optimizer": "sgd",
      "trainingEpochs": 100,
      "inputImageSize": 224,
      "kernelSize": 3
    }
  }'
```

**返回结果格式**:
```json
{
  "content": [{
    "type": "text",
    "text": "{
      \"totalVRAM\": 15.2,
      \"breakdown\": {
        \"modelWeights\": 7.0,
        \"optimizer\": 4.2,
        \"gradients\": 1.8,
        \"activations\": 1.5,
        \"kvCache\": 0.5,
        \"other\": 0.2
      },
      \"recommendations\": {
        \"gpus\": [...],
        \"optimizations\": [...]
      },
      \"metadata\": {
        \"modelType\": \"NLP\",
        \"optimizationSuggestions\": [...],
        \"memoryEfficiency\": 85.3,
        \"computeEfficiency\": 72.1,
        \"hardwareRecommendations\": [...]
      }
    }"
  }]
}
```

## 配置示例

### LLaMA-7B LoRA微调
```typescript
const nlpConfig = {
  modelSize: 7.0,
  architectureType: 'LLaMA',
  precision: 'FP16',
  batchSize: 4,
  sequenceLength: 2048,
  learningRate: 2e-5,
  optimizer: 'AdamW',
  loraRank: 16,
  loraAlpha: 32,
  loraTargetModules: ['q_proj', 'v_proj']
};
```

### LLaVA多模态微调
```typescript
const multimodalConfig = {
  modelSize: 7.0,
  architectureType: 'LLaVA',
  imageResolution: 336,
  patchSize: 14,
  batchSize: 8,
  visionEncoderType: 'ViT',
  textEncoderType: 'BERT'
};
```

### Switch Transformer MoE微调
```typescript
const moeConfig = {
  modelSize: 8.0,
  architectureType: 'Switch Transformer',
  numExperts: 8,
  numActiveExperts: 2,
  expertCapacityFactor: 1.25,
  routingStrategy: 'Top-K'
};
```

### ResNet CNN微调
```typescript
const cnnConfig = {
  modelSize: 0.05,
  architectureType: 'ResNet',
  inputImageSize: 224,
  batchSize: 64,
  learningRate: 1e-3,
  optimizer: 'SGD'
};
```

## 技术特性

- ✅ **精确计算**: 基于严谨的数学公式，避免近似估算
- ✅ **实时验证**: 配置参数的实时验证和错误提示
- ✅ **智能建议**: AI驱动的优化建议系统
- ✅ **GPU推荐**: 基于需求的硬件推荐
- ✅ **MCP兼容**: 标准化的API接口
- ✅ **类型安全**: 完整的TypeScript类型定义
- ✅ **响应式UI**: 现代化的用户界面

## 注意事项

1. **参数范围**: 请确保参数在推荐范围内以获得最佳结果
2. **显存预留**: 系统会自动预留1-2GB显存用于系统开销
3. **优化建议**: 建议优先采用高优先级的优化建议
4. **硬件兼容**: 确保选择的GPU支持所需的精度类型

## 更新日志

- **v1.0.0**: 初始版本，支持四种模型类型的精确计算
- 完整的超参数配置系统
- 智能优化建议功能
- MCP工具集成
- 实时参数验证
