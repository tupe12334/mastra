import { generateHourlyData } from './metrics-utils';

const hourlyData = generateHourlyData();

export const agentRunsData = [
  { name: 'support-agent', runs: 4821, errors: 112 },
  { name: 'research-agent', runs: 3456, errors: 89 },
  { name: 'code-reviewer', runs: 2890, errors: 67 },
  { name: 'onboarding-agent', runs: 1680, errors: 38 },
  { name: 'data-analyst', runs: 2240, errors: 54 },
  { name: 'email-drafter', runs: 1390, errors: 22 },
  { name: 'qa-tester', runs: 980, errors: 41 },
];

export const agentLatencyData = hourlyData.map(h => ({
  time: h.time,
  p50: Math.floor(Math.random() * 250 + 200),
  p95: Math.floor(Math.random() * 500 + 600),
}));

export const tokenUsageTableData = [
  { model: 'gpt-4o', input: '2.4M', output: '680K', cacheRead: '1.1M', cacheWrite: '320K', cost: 16.42 },
  { model: 'claude-3.5-sonnet', input: '1.8M', output: '520K', cacheRead: '890K', cacheWrite: '210K', cost: 11.28 },
  { model: 'gemini-1.5-pro', input: '1.9M', output: '540K', cacheRead: '920K', cacheWrite: '220K', cost: 7.56 },
  { model: 'mistral-large', input: '1.2M', output: '350K', cacheRead: '580K', cacheWrite: '140K', cost: 4.8 },
  { model: 'llama-3.1-70b', input: '2.1M', output: '610K', cacheRead: '1.3M', cacheWrite: '290K', cost: 3.15 },
  { model: 'gpt-4o-mini', input: '4.1M', output: '1.2M', cacheRead: '2.8M', cacheWrite: '560K', cost: 2.38 },
  { model: 'claude-3-haiku', input: '3.2M', output: '940K', cacheRead: '2.1M', cacheWrite: '480K', cost: 1.86 },
  { model: 'deepseek-v3', input: '1.5M', output: '410K', cacheRead: '720K', cacheWrite: '180K', cost: 0.94 },
];

export const tokensByAgentData = [
  { name: 'support-agent', total: 4200000, input: 2800000, output: 1400000, cost: 12.84 },
  { name: 'research-agent', total: 3100000, input: 2200000, output: 900000, cost: 9.46 },
  { name: 'code-reviewer', total: 2600000, input: 1700000, output: 900000, cost: 5.72 },
  { name: 'onboarding-agent', total: 1800000, input: 1200000, output: 600000, cost: 3.92 },
  { name: 'data-analyst', total: 2900000, input: 1900000, output: 1000000, cost: 7.18 },
  { name: 'email-drafter', total: 1500000, input: 1000000, output: 500000, cost: 2.64 },
  { name: 'qa-tester', total: 1100000, input: 750000, output: 350000, cost: 1.91 },
];

export const toolCallsData = [
  { tool: 'web-search', calls: 8420, errors: 342 },
  { tool: 'calculator', calls: 5230, errors: 28 },
  { tool: 'file-reader', calls: 4110, errors: 189 },
  { tool: 'api-caller', calls: 3890, errors: 267 },
  { tool: 'db-query', calls: 2670, errors: 156 },
  { tool: 'code-interpreter', calls: 1840, errors: 73 },
  { tool: 'image-gen', calls: 1210, errors: 45 },
];

export const toolLatencyData = hourlyData.map(h => ({
  time: h.time,
  p50: Math.floor(Math.random() * 80 + 30),
  p95: Math.floor(Math.random() * 200 + 150),
}));

export const workflowRunsData = [
  { name: 'onboarding-flow', completed: 1240, errors: 34 },
  { name: 'review-pipeline', completed: 890, errors: 21 },
  { name: 'data-ingestion', completed: 2100, errors: 67 },
  { name: 'report-generation', completed: 1560, errors: 43 },
  { name: 'user-migration', completed: 740, errors: 18 },
  { name: 'nightly-sync', completed: 3200, errors: 92 },
  { name: 'alert-pipeline', completed: 1890, errors: 51 },
];

export const workflowDurationData = hourlyData.map(h => ({
  time: h.time,
  p50: Math.floor(Math.random() * 1500 + 800),
  p95: Math.floor(Math.random() * 3000 + 2000),
}));

export const actualScoresTableData = [
  { scorer: 'accuracy', avg: 0.91, min: 0.74, max: 0.98, count: 3210 },
  { scorer: 'relevance', avg: 0.87, min: 0.62, max: 0.96, count: 3210 },
  { scorer: 'faithfulness', avg: 0.93, min: 0.81, max: 0.99, count: 2480 },
  { scorer: 'helpfulness', avg: 0.85, min: 0.59, max: 0.95, count: 1890 },
];

export const actualScoresOverTimeData = hourlyData.map(h => ({
  time: h.time,
  accuracy: +(Math.random() * 0.1 + 0.86).toFixed(2),
  relevance: +(Math.random() * 0.12 + 0.81).toFixed(2),
  faithfulness: +(Math.random() * 0.08 + 0.89).toFixed(2),
  helpfulness: +(Math.random() * 0.14 + 0.78).toFixed(2),
}));

export const modelCostOverTimeData = hourlyData.map(h => ({
  time: h.time,
  'gpt-4o': +(Math.random() * 0.8 + 0.3).toFixed(2),
  'gpt-4o-mini': +(Math.random() * 0.15 + 0.05).toFixed(2),
  'claude-3.5-sonnet': +(Math.random() * 0.6 + 0.2).toFixed(2),
  'claude-3-haiku': +(Math.random() * 0.1 + 0.03).toFixed(2),
  'deepseek-v3': +(Math.random() * 0.08 + 0.02).toFixed(2),
  'llama-3.1-70b': +(Math.random() * 0.25 + 0.08).toFixed(2),
  'mistral-large': +(Math.random() * 0.4 + 0.12).toFixed(2),
  'gemini-1.5-pro': +(Math.random() * 0.5 + 0.15).toFixed(2),
}));

export const kpiData = {
  totalAgentRuns: agentRunsData.reduce((s, d) => s + d.runs, 0),
  totalAgentErrors: agentRunsData.reduce((s, d) => s + d.errors, 0),
  avgAgentLatency: Math.round(agentLatencyData.reduce((s, d) => s + d.p50, 0) / agentLatencyData.length),
  totalModelCost: modelCostOverTimeData.reduce((s, d) => {
    const { time: _, ...models } = d;
    return s + Object.values(models).reduce((a, b) => a + b, 0);
  }, 0),
  totalTokens: tokensByAgentData.reduce((s, d) => s + d.total, 0),
  avgScore: +(actualScoresTableData.reduce((s, d) => s + d.avg, 0) / actualScoresTableData.length).toFixed(2),
};
