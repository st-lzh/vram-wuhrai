# Wuhr AI VRAM Insight

<div align="center">
  <h1>🧠 AI显存计算器</h1>
  <p>专业的大语言模型和多模态模型显存需求计算工具</p>
  
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
  [![Next.js](https://img.shields.io/badge/Next.js-15.3-black)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-19.0-blue)](https://reactjs.org/)
  
  [在线演示](https://vram.wuhrai.com) | [报告问题](https://github.com/st-lzh/vram-wuhrai/issues) | [功能请求](https://github.com/st-lzh/vram-wuhrai/issues) | [GitHub开源](https://github.com/st-lzh/vram-wuhrai.git) | [博客](https://wuhrai.com)
</div>

---

## 📖 Language / 语言

[English](README.md) | **中文**

---

## 📖 目录

- [功能特性](#-功能特性)
- [新版本亮点](#-新版本亮点)
- [技术栈](#-技术栈)
- [显存计算公式](#-显存计算公式)
- [支持的模型](#-支持的模型)
- [快速开始](#-快速开始)
- [Docker部署](#-docker部署)
- [项目结构](#-项目结构)
- [API文档](#-api文档)
- [MCP协议支持](#-mcp协议支持)
- [贡献指南](#-贡献指南)
- [许可证](#-许可证)

## 🖼️ 演示截图

### 主界面 - 训练显存计算
![训练显存计算界面](https://wuhrai-wordpress.oss-cn-hangzhou.aliyuncs.com/github/vram/%E9%A6%96%E9%A1%B5.png)

*专业的训练显存计算界面，支持模型参数、批次大小、序列长度、精度等配置，实时显示显存需求和GPU推荐*

### 高级微调
![GPU推荐界面](https://wuhrai-wordpress.oss-cn-hangzhou.aliyuncs.com/github/vram/%E9%AB%98%E7%BA%A7%E5%BE%AE%E8%B0%83.png)

### 单卡GPU推荐系统
![GPU推荐界面](https://wuhrai-wordpress.oss-cn-hangzhou.aliyuncs.com/github/vram/v2/vram-v2-02.png)

### 多台多卡GPU推荐系统
![GPU推荐界面](https://wuhrai-wordpress.oss-cn-hangzhou.aliyuncs.com/github/vram/v2/vram-v2-03.png)

*智能GPU推荐系统，根据计算需求自动匹配最适合的GPU，包含利用率分析和价格对比*

## ✨ 功能特性

### 🆕 新版本亮点
- **🔥 高级微调支持**：新增专门的高级微调计算器，支持4种模型类型（NLP、多模态、MoE、CNN）
- **⚡ 参数级显存控制**：精确控制模型架构参数（modelSize、hiddenSize、层数等）
- **🛠️ 最近修复**：重大modelSize参数修复，NLP和多模态模型现在正确影响VRAM计算
- **📊 智能标签页排序**：推理→微调→训练→GRPO→高级微调，更符合使用频率
- **🎯 模型智能分类**：NLP模型和多模态模型完全隔离显示
- **📈 正确计算公式**：基于通用LLM框架重写所有计算公式

### 核心功能
- **🎯 六种计算模式**：推理、微调、训练、GRPO、多模态、高级微调
- **📊 精确计算**：基于最新工程实践和通用LLM框架的显存计算公式
- **🔧 高级微调**：专门的NLP、多模态、MoE、CNN模型计算器，支持参数级控制
- **🎨 可视化展示**：饼图展示显存组成，直观了解各部分占比
- **💾 历史记录**：自动保存计算历史，支持对比分析
- **🔧 配置预设**：12+预设模板，快速开始计算
- **📱 响应式设计**：完美适配移动端和桌面端

### 高级特性
- **🌙 深色模式**：保护眼睛，支持系统主题跟随
- **⚡ PWA支持**：可安装为本地应用，支持离线使用
- **🔗 结果分享**：生成分享链接，导出计算报告
- **⌨️ 键盘快捷键**：提高操作效率
- **📈 性能监控**：实时监控应用性能
- **🛡️ 错误处理**：智能错误提示和恢复
- **🤖 MCP协议支持**：支持Model Context Protocol，AI助手可直接调用显存计算功能

### 数据支持
- **130+ 预训练模型**：覆盖主流中国和国际开源模型，智能分类显示
- **22+ 多模态模型**：支持Qwen2.5-VL、QwQ-VL、LLaVA、Whisper等
- **12+ 向量模型**：支持Qwen3-Embedding、Qwen3-Reranker系列
- **20+ GPU规格**：从消费级到数据中心级，包含最新RTX 50系列
- **智能推荐**：根据显存需求推荐合适的GPU
- **价格分析**：GPU性价比对比

## 🛠 技术栈

- **框架**: Next.js 15.3 + React 19
- **语言**: TypeScript 5.0
- **样式**: Tailwind CSS + 玻璃拟态设计
- **状态管理**: Zustand
- **动画**: Framer Motion
- **图表**: Recharts
- **工具**: ESLint, Prettier, Husky

## 📚 支持的模型

### 🤖 NLP/语言模型 (95+个)

#### Qwen系列
- **Qwen2.5**: 0.5B, 1.5B, 3B, 7B, 14B, 32B, 72B
- **Qwen3**: 1.8B, 7B, 14B, 32B, 72B

#### DeepSeek系列  
- **DeepSeek-V3-671B** (满血版MoE，37B激活)
- **DeepSeek-V3-0324** (最新优化版)
- **DeepSeek-R1-671B** (满血版推理模型)
- **DeepSeek-R1-0528** (最新推理模型，685B参数)
- **deepseek-ai/DeepSeek-R1-0528** (官方Hugging Face版本)
- **deepseek-ai/DeepSeek-R1-0528-Qwen3-8B** (基于Qwen3的8B推理模型)
- **DeepSeek-R1系列**: 1.5B, 7B, 8B, 14B, 32B, 70B
- **DeepSeek-Coder**: 1.3B, 6.7B, 33B
- **DeepSeek-MoE-16B**

#### Llama系列
- **Llama-3.1**: 8B, 70B, 405B
- **Llama-2**: 7B, 13B, 70B

#### ChatGLM系列
- **GLM-4-Plus** (100B，智谱最新大模型)
- **GLM-Z1-32B** (推理模型，对标OpenAI o1)
- **GLM-4-9B**, **ChatGLM3-6B**, **ChatGLM4-9B**

#### Yi系列（零一万物）
- **Yi-Lightning** (1000B MoE，50B激活)
- **Yi-Large** (100B)
- **Yi-Medium** (200B MoE，20B激活)
- **Yi-6B**, **Yi-34B**

#### 其他中国开源模型
- **Qwen3系列**: 1.8B, 7B, 14B, 32B, 72B（阿里最新）
- **Qwen3-Embedding**: 0.6B, 4B, 8B（向量模型）
- **Qwen3-Reranker**: 0.6B, 4B, 8B（重排序模型）
- **MiniMax-ABAB6.5**: 70B, 100B（面壁智能）
- **Moonshot-v1**: 32K/128K（月之暗面）
- **Step-1V** (300B多模态), **Step-2** (800B MoE)（阶跃星辰）
- **InternLM2.5**: 7B, 20B（书生·浦语）
- **Spark-Max** (340B MoE), **Spark-Pro** (175B)（星火）
- **Baichuan2**: 7B, 13B

#### 国际主流模型
- **Mistral-7B**, **Mixtral-8x7B**
- **Gemma**: 2B, 7B
- **Phi-3**: Mini(3.8B), Small(7B)
- **CodeLlama**: 7B, 13B, 34B

### 🎨 多模态模型 (22+个) 🆕

#### 视觉语言模型
- **Qwen2.5-VL系列**: 3B, 7B, 32B, 72B
- **QwQ-VL-72B**: 推理多模态模型，视觉推理能力强
- **LLaVA系列**: 1.5-7B, 1.5-13B, NeXT-34B
- **Idefics2-8B**: 高质量视觉理解

#### 音频模型
- **Whisper系列**: Large-v3, Medium, Small
- **OpenOmni-7B**: 多模态对话

#### 视频理解模型  
- **Video-LLaMA-7B**: 视频内容理解
- **Jamba-1.5-Mini**: 文档+视频理解

#### 多模态对话模型
- **Phi-4-Multimodal**: Microsoft最新多模态模型
- **Nougat-Base**: 文档理解专用

### 🔍 向量模型 (12+个) 🆕

#### Qwen向量模型系列
- **Qwen3-Embedding**: 0.6B, 4B, 8B（文本向量化）
- **Qwen3-Reranker**: 0.6B, 4B, 8B（文档重排序）

### 🎯 模型智能分类

- **NLP分组**：只显示`transformer`、`glm`、`moe`架构的文本模型
- **多模态分组**：只显示`multimodal`架构的多模态模型
- **完全隔离**：避免模型选择混乱，提升用户体验

## 📐 显存计算公式

基于通用LLM框架和最新工程实践的精确计算公式。详细文档请参见 [VRAM计算公式文档](./docs/VRAM_CALCULATION_FORMULAS.zh.md)。

### 🔬 通用LLM框架

```
总显存占用 = 模型权重 + 优化器状态 + 梯度 + 激活值 + 其他开销
```

所有计算器均遵循此框架，关键区别在于**P_train（可训练参数量）**的不同。

### 1. 推理显存计算

```
总显存 = 量化模型权重 + KV缓存 + 激活值（少量）

其中：
- 量化模型权重 = P_total × 精度字节数 × 量化比例
- KV缓存 = batch_size × seq_len × hidden_size × 层数 × 2 × 精度字节数
- 激活值 = 训练激活值的10%（推理时较小）
```

### 2. 微调显存计算

#### 全量微调
```
P_train = P_total（所有参数需要梯度）
总显存 = 模型权重 + (P_train × 优化器系数) + (P_train × 梯度精度) + 激活值
```

#### PEFT方法（LoRA/QLoRA/Prefix）
```
P_train << P_total（只有少量参数需要梯度）

LoRA: P_train = calculateLoRAParams(rank)，约为总参数的1%
QLoRA: 基础模型量化 + LoRA参数
Prefix: P_train = 1% × P_total
```

### 3. 训练显存计算

```
P_train = P_total（全量训练）
总显存 = 模型权重 + 优化器状态 + 梯度 + 激活值 + 其他开销

其中：
- 优化器状态 = P_total × 4字节 × 优化器系数（SGD=1, AdamW=2）
- 梯度 = P_total × 训练精度字节数
- 激活值支持梯度检查点（减少70%）
```

### 4. GRPO显存计算 🆕

**核心特点：激活值 = k × SFT激活值**，其中k是偏好组大小

```
GRPO激活值 = k × SFT激活值
其中k = numGenerations（偏好组大小）

对比：
- SFT: 激活值 = 1 × 基础
- DPO: 激活值 ≈ 2 × 基础  
- GRPO(k=4): 激活值 = 4 × 基础
- GRPO(k=8): 激活值 = 8 × 基础

通常使用PEFT方法：
- 模型权重：INT4量化（8倍压缩）
- P_train = 1% × P_total（LoRA等）
- 显存瓶颈：激活值部分
```

### 5. 多模态显存计算 🆕

**核心：Total_Sequence_Length决定激活值显存**

```
Total_Sequence_Length = 文本Token + 图像Patch + 音频Patch + 视频Patch

其中：
- 图像序列长度 = (分辨率/patch_size)² × 图像数量
- 视频序列长度 = 帧数 × 每帧patch数（序列长度爆炸的根源）
- 音频序列长度 = 时长(ms) / 80ms

激活值显存 = batch_size × Total_Sequence_Length × hidden_size × 层数 × 精度字节数
```

### 6. 高级微调显存计算 🆕

**最近修复：modelSize参数现在正确影响VRAM计算**

#### NLP模型微调
```
总显存 = 模型权重 + 优化器状态 + 梯度 + 激活值 + KV缓存

其中：
- 模型权重 = max(计算参数, modelSize × 1e9) × 精度字节数
- 所有组件现在都能正确随modelSize参数缩放
- 修复：7B→14B现在正确显示约130GB显存增加
```

#### 多模态模型微调
```
总显存 = 视觉编码器 + 文本编码器 + 融合层 + 训练组件

其中：
- 视觉编码器 = max(计算的视觉参数, modelSize × 0.3) × 精度字节数
- 文本编码器 = max(计算的文本参数, modelSize × 0.5) × 精度字节数
- 修复：7B→72B现在正确显示约693GB显存增加
```

#### MoE模型微调
```
专家内存 = (modelSize / numExperts) × numActiveExperts × 精度字节数
反向关系：更多专家 = 更小的单专家大小 = 更少的激活内存
```

#### CNN模型微调
```
总显存 = 卷积层（80%）+ 全连接层（20%）+ 特征图
所有组件都能正确随modelSize参数缩放
```

#### 精度字节数对照表
| 精度类型 | 字节数 | 说明 |
|---------|--------|------|
| FP32 | 4 | 单精度浮点 |
| FP16/BF16 | 2 | 半精度浮点 |
| INT8 | 1 | 8位整数量化（4倍压缩） |
| INT4 | 0.5 | 4位整数量化（8倍压缩） |

#### 量化比例对照表
| 量化类型 | 压缩比例 | 显存节省 |
|---------|---------|---------|
| None | 1.0 | 0% |
| INT8 | 0.25 | 75% |
| INT4 | 0.125 | 87.5% |

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn

### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/st-lzh/vram-wuhrai.git
cd vram-wuhrai

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

访问 http://localhost:3000 查看应用

## 🐳 Docker部署

### 使用Docker Compose（推荐）

1. 创建 `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    image: wuhr/vram-calculator:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  # 可选：Nginx反向代理
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - app
    restart: unless-stopped
```

2. 启动服务：

```bash
# 启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

### 使用Docker构建

```bash
# 构建镜像
docker build -t vram-calculator .

# 运行容器
docker run -d \
  --name vram-calculator \
  -p 3000:3000 \
  -e NODE_ENV=production \
  --restart unless-stopped \
  vram-calculator
```

### 性能优化配置

- **首次加载**: 178KB（极致优化）
- **代码分割**: 懒加载所有计算器组件
- **PWA缓存**: 离线可用
- **Web Worker**: 后台计算，不阻塞UI

### Kubernetes部署

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vram-calculator
spec:
  replicas: 3
  selector:
    matchLabels:
      app: vram-calculator
  template:
    metadata:
      labels:
        app: vram-calculator
    spec:
      containers:
      - name: app
        image: wuhr/vram-calculator:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: vram-calculator-service
spec:
  selector:
    app: vram-calculator
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

## 📁 项目结构

```
ai-memory-calculator/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # 根布局
│   │   ├── page.tsx           # 主页面（二级标签页布局）
│   │   └── api/               # API路由
│   ├── components/            # React组件
│   │   ├── calculators/       # 计算器组件
│   │   │   ├── inference-calculator.tsx      # 推理计算器
│   │   │   ├── fine-tuning-calculator.tsx    # 微调计算器  
│   │   │   ├── training-calculator.tsx       # 训练计算器
│   │   │   ├── grpo-calculator.tsx          # GRPO计算器
│   │   │   └── multimodal-calculator.tsx    # 多模态计算器
│   │   ├── ui/               # UI组件
│   │   └── ...
│   ├── hooks/                # 自定义Hooks
│   ├── lib/                  # 工具库
│   │   └── models-data.ts    # 70+模型数据库+架构分类
│   ├── store/                # Zustand状态管理
│   ├── types/                # TypeScript类型
│   └── utils/                # 工具函数
│       └── memory-formulas.ts # 通用LLM框架计算公式
├── public/                   # 静态资源
│   ├── workers/             # Web Workers
│   └── ...
├── docs/                    # 详细文档
│   ├── VRAM_CALCULATION_FORMULAS.md # 综合计算公式文档（英文）
│   ├── VRAM_CALCULATION_FORMULAS.zh.md # 综合计算公式文档（中文）
│   ├── memory-calculation-formulas.md # 传统计算公式详解
│   └── deployment.md       # 部署指南
├── docker-compose.yml       # Docker编排
├── Dockerfile              # Docker镜像
├── next.config.ts         # Next.js配置
└── package.json          # 项目配置
```

## 📚 API文档

### 健康检查

```http
GET /api/health
```

响应：
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0",
  "uptime": 3600
}
```

### 性能分析

```http
POST /api/analytics
Content-Type: application/json

{
  "event": "calculation",
  "type": "training",
  "duration": 150,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🤖 MCP协议支持

本项目支持 [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)，AI助手可以通过标准化协议直接调用显存计算功能。

### MCP服务器信息

- **服务器名称**: `vram-calculator-mcp-server`
- **协议版本**: `2024-11-05`
- **端点地址**: `http://localhost:3001/api/mcp`

### 支持的功能

#### 📚 资源 (Resources)
- **模型数据库**: 130+预训练模型信息
- **GPU规格库**: 20+GPU详细规格和价格
- **计算公式**: 显存计算公式文档
- **历史记录**: 计算历史和统计信息

#### 🔨 工具 (Tools)
- **显存计算**: 推理、训练、微调、GRPO、多模态计算
- **GPU推荐**: 智能GPU推荐和成本分析
- **配置优化**: 自动配置调优和优化建议

#### 💬 提示模板 (Prompts)
- **优化建议**: 专业的显存优化建议
- **GPU选择**: GPU选择指导
- **技术诊断**: 问题诊断和解决方案

### 快速开始

#### 方式1: npm全局安装（推荐）
```bash
# 安装MCP服务器
npm install -g vram-calculator-mcp-server

# 启动MCP服务器
vram-calculator-mcp
```

**Claude Desktop集成**:
```json
{
  "mcpServers": {
    "vram-calculator": {
      "command": "vram-calculator-mcp"
    }
  }
}
```

#### 方式2: 本地开发模式
```bash
npm run dev
# MCP端点: http://localhost:3001/api/mcp
```

#### 2. 连接测试
```bash
curl -X POST http://localhost:3001/api/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "initialize",
    "params": {
      "protocolVersion": "2024-11-05",
      "capabilities": {},
      "clientInfo": {"name": "test-client", "version": "1.0.0"}
    },
    "id": 1
  }'
```

#### 3. 调用GPU推荐工具
```bash
curl -X POST http://localhost:3001/api/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "recommend_gpu",
      "arguments": {"vramRequired": 16, "useCase": "training"}
    },
    "id": 2
  }'
```

### AI助手集成示例

```javascript
// 初始化MCP连接
const mcpClient = new MCPClient('http://localhost:3001/api/mcp');
await mcpClient.initialize();

// 获取GPU推荐
const recommendation = await mcpClient.callTool('recommend_gpu', {
  vramRequired: 24,
  useCase: 'training'
});

// 读取模型信息
const models = await mcpClient.readResource('models://nlp');
```

### 详细文档

- 📖 [MCP实现总结](./MCP_IMPLEMENTATION_SUMMARY.md)
- 🎯 [MCP使用示例](./MCP_USAGE_EXAMPLES.md)
- 🧪 [测试脚本](./test-mcp.js)
- 📦 [npm包地址](https://www.npmjs.com/package/vram-calculator-mcp-server)

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 如何贡献

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 开发规范

- 遵循 TypeScript 和 React 最佳实践
- 使用 ESLint 和 Prettier 保持代码风格一致
- 编写清晰的提交信息
- 为新功能添加测试
- 更新相关文档

### 计算公式贡献

如果您发现计算公式问题或想要添加新的算法支持：
1. 在Issues中描述问题或需求
2. 提供相关论文或技术文档
3. 如果可能，提供参考实现

### 报告问题

使用 GitHub Issues 报告问题，请包含：
- 问题描述
- 复现步骤
- 期望行为
- 截图（如果适用）
- 环境信息

## 🏆 后续开发维护目标

### 短期目标 (2025年Q1-Q2)

#### 🔧 技术增强
- **模型支持扩展**
  - 新增50+最新LLM支持（GPT-4o、Claude-3.5、Gemini-2.0）
  - 支持新中国模型（Kimi-k1、豆包-pro等）
  - 集成最新多模态模型（GPT-4V、Gemini-Vision）

- **计算精度提升**
  - 实现分布式训练显存计算（多节点、多GPU）
  - 增加内存优化算法（梯度累积、混合精度）
  - 支持新训练范式（MoE训练、稀疏训练）

- **性能优化**
  - 首次加载时间降至100KB以下
  - 实现高级缓存策略
  - 增加计算结果预测缓存

#### 🎨 用户体验增强
- **交互功能**
  - 实时计算结果对比
  - 显存使用时间轴可视化
  - 交互式GPU选择向导

- **高级分析**
  - 成本分析计算器（GPU租赁成本）
  - 训练时间估算
  - 功耗计算

### 中期目标 (2025年Q3-Q4)

#### 🚀 平台集成
- **API服务**
  - RESTful API供第三方集成
  - 开发者CLI工具
  - GitHub Action集成CI/CD

- **企业级功能**
  - 多用户工作空间支持
  - 计算结果导出（PDF、Excel）
  - 自定义模型数据库管理

#### 🌍 社区建设
- **国际化**
  - 支持10+语言
  - 区域模型数据库（日本、欧洲等）
  - UI/UX文化适配

- **文档与教育**
  - 初学者交互式教程
  - 视频课程系列
  - 技术博客文章

### 长期愿景 (2026+)

#### 🔬 研究与创新
- **AI驱动功能**
  - 基于任务需求的智能模型推荐
  - 自动优化建议
  - 机器学习预测显存分析

- **高级计算支持**
  - 量子计算显存估算
  - 边缘设备部署计算
  - 联邦学习资源估算

#### 🌐 生态系统发展
- **平台生态**
  - 自定义计算器插件系统
  - 主流云平台集成（AWS、Azure、GCP）
  - 移动应用开发（iOS、Android）

- **研究合作**
  - 学术机构合作伙伴关系
  - 显存研究开放数据集
  - 显存计算方法论标准化

### 📈 指标与目标

#### 性能目标
- **加载时间**：2025年Q2前<100KB首次加载
- **准确性**：主流模型95%+计算准确率
- **覆盖度**：2025年底支持200+模型

#### 社区目标
- **用户**：2025年底10,000+月活跃用户
- **贡献者**：50+开源贡献者
- **文档**：100+技术文章和教程

#### 技术债务与维护
- **代码质量**：保持95%+测试覆盖率
- **安全性**：定期安全审计和更新
- **依赖**：保持所有依赖项最新
- **兼容性**：支持最新Web标准和框架

### 🤝 如何参与

我们欢迎在各个领域的贡献：

1. **开发**：贡献核心功能和错误修复
2. **文档**：帮助改进和翻译文档
3. **研究**：贡献计算公式准确性
4. **社区**：帮助回答问题和支持用户
5. **测试**：帮助识别和报告问题

加入我们的[GitHub Discussions](https://github.com/st-lzh/vram-wuhrai/discussions)参与功能规划和技术讨论。

## 🏆 更新日志

### v2.1.0 (2024-12-19) 🎉
- 🛠️ **重大参数修复**：修复NLP和多模态模型中关键的modelSize参数问题
- ✨ **高级微调计算器**：新增专门的4种模型类型计算器（NLP、多模态、MoE、CNN）
- 🔧 **参数级控制**：精确控制模型架构参数（hiddenSize、层数等）
- 📊 **系统性验证**：所有8个核心参数经过测试验证，确保正常工作
- 📚 **完善文档**：新增详细的VRAM计算公式文档
- 🎯 **增强标签页顺序**：为专业用户新增高级微调标签页

### v2.0.0 (2024-06-23) 🎉
- ✨ **新增多模态模型支持**：独立分组，支持文本+图像+音频+视频
- ✨ **新增GRPO算法计算**：正确反映偏好组大小的k倍激活值效应
- 🔧 **重构计算公式**：基于通用LLM框架，所有公式统一标准
- 🎯 **优化标签页顺序**：推理→微调→训练→GRPO，符合使用频率
- 🎨 **模型智能分类**：NLP和多模态模型完全隔离
- 📈 **扩展模型数据库**：新增中国开源模型和多模态模型，总计100+模型
- 🚀 **性能优化**：首次加载优化至178KB

### v1.0.0 (2024-01-01)
- 🎉 初始版本发布
- 支持训练、推理、微调三种模式
- 50+NLP模型支持
- GPU推荐系统

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- 感谢所有贡献者
- 基于社区最佳实践的显存计算公式
- 使用了优秀的开源项目：Next.js、React、Tailwind CSS等

## 📞 联系我们

- 博客：[https://wuhrai.com](https://wuhrai.com)
- 模型API：[https://ai.wuhrai.com](https://ai.wuhrai.com)
- 模型Chat：[https://gpt.wuhrai.com](https://gpt.wuhrai.com)
- 邮箱：1139804291@qq.com
- GitHub：[@wuhr-ai](https://github.com/wuhr-ai)

---

<div align="center">
  Made with ❤️ by Wuhr AI Team
</div>
