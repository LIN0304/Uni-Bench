// Benchmark datasets. Self-contained to avoid fetch/CORS issues.
// Each dataset: { id, title, unit: 'percent' | 'score', entries: [{ name, value, up?:number, down?:number, notes?:string }] }

// Added optional `source` (string URL) for each dataset.
// Fill each with the original benchmark link you want to display in the UI.
window.BENCHMARK_DATA = [
  {
    id: 'design-arena-web',
    title: 'Design Arena (Web)',
    unit: 'percent',
    source: '', // e.g. 'https://example.com/design-arena-source'
    entries: [
      { name: 'Humanity', value: 100.0 },
      { name: 'GPT-5', value: 79.2 },
      { name: 'Claude Opus 4.1 2025-08-05', value: 72.6 },
      { name: 'Claude Opus 4', value: 72.0 },
      { name: 'DeepSeek Reasoner R1', value: 71.4, up: 1 },
      { name: 'Qwen3 Coder 480B A35B Instruct', value: 71.2, down: 1 },
      { name: 'Claude Sonnet 4', value: 70.4 },
      { name: 'Claude 3.7 Sonnet', value: 70.1 },
      { name: 'Gemini 2.5 Pro', value: 65.9, up: 2 },
      { name: 'DeepSeek Chat', value: 65.7 },
      { name: 'GPT-5 Nano', value: 64.4, down: 2 },
      { name: 'Qwen3 235B A22B Instruct 2507', value: 63.4 },
      { name: 'GLM-4.5', value: 61.9, up: 3 },
      { name: 'Mistral Medium 2505', value: 60.6, down: 1 },
      { name: 'DeepSeek Coder', value: 58.2, up: 2 },
      { name: 'Qwen3 Coder 30B A3B Instruct', value: 57.6, down: 1 },
      { name: 'Grok-3', value: 56.5, up: 1 },
      { name: 'GPT-o3', value: 55.8, up: 1 },
      { name: 'Kimi K2 0711 Preview', value: 55.2, up: 1 },
      { name: 'GPT-5 Mini', value: 55.1 }
    ]
  },
  {
    id: 'artificial-analysis',
    title: 'Artificial Analysis Rankings',
    unit: 'score',
    source: '', // e.g. 'https://example.com/artificial-analysis-source'
    entries: [
      { name: 'GPT-5 (high)', value: 69 },
      { name: 'GPT-5 (medium)', value: 68 },
      { name: 'Grok 4', value: 68 },
      { name: 'o3-pro', value: 68 },
      { name: 'o3', value: 67 },
      { name: 'o4-mini (high)', value: 65 },
      { name: 'Gemini 2.5 Pro', value: 65 },
      { name: 'GPT-5 mini', value: 64 },
      { name: 'Qwen3 235B 2507 (Reasoning)', value: 64 },
      { name: 'GPT-5 (low)', value: 63 },
      { name: 'Claude 4.1 Opus Thinking', value: 61 },
      { name: 'Claude 4 Sonnet Thinking', value: 59 },
      { name: 'DeepSeek R1 0528', value: 59 },
      { name: 'Gemini 2.5 Flash (Reasoning)', value: 58 },
      { name: 'gpt-oss-120B (high)', value: 58 },
      { name: 'Grok 3 mini Reasoning (high)', value: 58 },
      { name: 'GLM-4.5', value: 56 },
      { name: 'o3-mini (high)', value: 55 },
      { name: 'Claude 4 Opus Thinking', value: 55 },
      { name: 'GPT-5 nano', value: 54 }
    ]
  },
  {
    id: 'creative-writing',
    title: 'Creative Writing Benchmark',
    unit: 'score',
    source: '', // e.g. 'https://example.com/creative-writing-source'
    entries: [
      { name: 'GPT-5 (medium reasoning)', value: 8.60 },
      { name: 'Kimi K2', value: 8.56, down: 1 },
      { name: 'Claude Opus 4.1 (no reasoning)', value: 8.47 },
      { name: 'Claude Opus 4.1 Thinking 16K', value: 8.45 },
      { name: 'o3-pro (medium reasoning)', value: 8.44, down: 3 },
      { name: 'o3 (medium reasoning)', value: 8.39, down: 3 },
      { name: 'Gemini 2.5 Pro', value: 8.38, down: 3 },
      { name: 'Claude Opus 4 Thinking 16K', value: 8.36, down: 3 },
      { name: 'Claude Opus 4 (no reasoning)', value: 8.31, down: 3 },
      { name: 'GPT-5 mini (medium reasoning)', value: 8.31 },
      { name: 'Qwen 3 235B A22B', value: 8.30, down: 4 },
      { name: 'DeepSeek R1', value: 8.30, down: 4 },
      { name: 'Qwen 3 235B A22B 25-07 Think', value: 8.24, down: 4 },
      { name: 'DeepSeek R1 05/28', value: 8.19, down: 4 },
      { name: 'GPT-4o Mar 2025', value: 8.18, down: 4 },
      { name: 'Claude Sonnet 4 Thinking 16K', value: 8.14, down: 4 },
      { name: 'Claude 3.7 Sonnet Thinking 16K', value: 8.11, down: 4 },
      { name: 'Claude Sonnet 4 (no reasoning)', value: 8.09, down: 4 },
      { name: 'Gemini 2.5 Pro Preview 05-06', value: 8.09, down: 4 },
      { name: 'Gemini 2.5 Pro Exp 03-25', value: 8.05 }
    ]
  },
  {
    id: 'simplebench',
    title: 'SimpleBench Rankings',
    unit: 'percent',
    source: '', // e.g. 'https://example.com/simplebench-source'
    entries: [
      { name: 'Human Baseline*', value: 83.7 },
      { name: 'Gemini 2.5 Pro (06-05)', value: 62.4 },
      { name: 'Grok 4', value: 60.5 },
      { name: 'Claude 4.1 Opus', value: 60.0 },
      { name: 'Claude 4 Opus (thinking)', value: 58.8 },
      { name: 'GPT-5 (high)', value: 56.7 },
      { name: 'o3 (high)', value: 53.1 },
      { name: 'Gemini 2.5 Pro (03-25)', value: 51.6 },
      { name: 'Claude 3.7 Sonnet (thinking)', value: 46.4 },
      { name: 'Claude 4 Sonnet (thinking)', value: 45.5 },
      { name: 'Claude 3.7 Sonnet', value: 44.9 },
      { name: 'o1-preview', value: 41.7 },
      { name: 'Claude 3.5 Sonnet 10-22', value: 41.4 },
      { name: 'DeepSeek R1 05/28', value: 40.8 },
      { name: 'o1-2024-12-17 (high)', value: 40.1 },
      { name: 'o4-mini (high)', value: 38.7 },
      { name: 'o1-2024-12-17 (med)', value: 36.7 },
      { name: 'Grok 3', value: 36.1 },
      { name: 'GPT-4.5', value: 34.5 },
      { name: 'Gemini-exp-1206', value: 31.1 }
    ]
  },
  {
    id: 'confabulations',
    title: 'Confabulations Benchmark',
    unit: 'score',
    source: '', // e.g. 'https://example.com/confabulations-source'
    entries: [
      { name: 'GPT-5 (medium reasoning)', value: 10.34 },
      { name: 'Gemini 2.5 Pro Preview 05-06', value: 10.62, up: 1 },
      { name: 'Grok 3 Mini Beta (high)', value: 10.80, up: 1 },
      { name: 'Gemini 2.5 Pro Exp 03-25', value: 10.80, up: 1 },
      { name: 'GLM-4.5', value: 11.30, up: 1 },
      { name: 'o1 (medium reasoning)', value: 11.74, up: 1 },
      { name: 'Qwen 3 30B A3B', value: 12.28, up: 1 },
      { name: 'Gemini 2.5 Pro', value: 12.38, up: 1 },
      { name: 'Grok 4', value: 12.41, up: 1 },
      { name: 'Gemini 2.0 Flash Think Exp 01-21', value: 12.43, up: 1 },
      { name: 'DeepSeek R1', value: 12.65, up: 1 },
      { name: 'o1-preview', value: 13.04, up: 1 },
      { name: 'Claude Sonnet 4 Thinking 16K', value: 13.20, up: 1 },
      { name: 'GPT-5 mini (medium reasoning)', value: 13.28 },
      { name: 'Gemini 1.5 Pro (Sept)', value: 13.54, up: 2 },
      { name: 'GPT-4.5 Preview', value: 13.64, up: 2 },
      { name: 'Grok 3 Mini Beta (low)', value: 14.04, up: 2 },
      { name: 'Grok 3 Beta (no reasoning)', value: 14.19, up: 2 },
      { name: 'o3-pro (medium reasoning)', value: 14.22, up: 2 },
      { name: 'o3 (high reasoning)', value: 14.38 }
    ]
  },
  {
    id: 'eq-bench',
    title: 'EQ-Bench Rankings',
    unit: 'score',
    source: '', // e.g. 'https://example.com/eq-bench-source'
    entries: [
      { name: 'openrouter/horizon-alpha', value: 1568.1 },
      { name: 'moonshotai/Kimi-K2-Instruct', value: 1565.3 },
      { name: 'o3', value: 1500.0 },
      { name: 'gemini-2.5-pro-preview-06-05', value: 1470.2 },
      { name: 'chatgpt-4o-latest-2025-03-27', value: 1370.7 },
      { name: 'gpt-5-chat-latest-2025-08-07', value: 1357.1 },
      { name: 'chatgpt-4o-latest-2025-04-25', value: 1320.9 },
      { name: 'zai-org/GLM-4.5', value: 1311.7 },
      { name: 'o4-mini', value: 1291.0 },
      { name: 'claude-opus-4', value: 1290.0 },
      { name: 'gemini-2.5-pro-preview-03-25', value: 1284.5 },
      { name: 'Qwen/Qwen3-235B-A22B', value: 1275.3 },
      { name: 'deepseek-ai/DeepSeek-R1', value: 1270.1 },
      { name: 'claude-sonnet-4', value: 1260.8 },
      { name: 'gemini-2.5-pro-preview-2025-05-07', value: 1247.0 },
      { name: 'gpt-4.1', value: 1234.8 },
      { name: 'qwen/qwq-32b', value: 1214.1 },
      { name: 'grok-4', value: 1193.2 },
      { name: 'deepseek-ai/DeepSeek-V3-0324', value: 1170.4 },
      { name: 'openai/gpt-oss-120b', value: 1152.1 }
    ]
  }
];

// Basic families mapping by keyword
window.BENCHMARK_FAMILIES = [
  { key: 'OpenAI', match: /(gpt|o1|o3|o4|chatgpt|openai)/i },
  { key: 'Anthropic', match: /(claude)/i },
  { key: 'Google', match: /(gemini)/i },
  { key: 'DeepSeek', match: /(deepseek)/i },
  { key: 'Meta', match: /(llama|meta)/i },
  { key: 'Microsoft', match: /(bing|copilot|microsoft)/i },
  { key: 'Qwen', match: /(qwen)/i },
  { key: 'Grok', match: /(grok)/i },
  { key: 'GLM', match: /(glm)/i },
  { key: 'Mistral', match: /(mistral)/i },
  { key: 'Human', match: /(human)/i },
  { key: 'Other', match: /.*/ }
];
