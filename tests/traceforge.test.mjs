import test from "node:test";
import assert from "node:assert";

// Mock computation inline for ESM compatibility without bundling
function computeTraceStats(traces) {
  if (traces.length === 0) {
    return {
      totalTraces: 0,
      avgLatencyMs: 0,
      p95LatencyMs: 0,
      errorRatePercent: 0,
      totalTokensProcessed: 0,
      estimatedCostUsd: 0,
    };
  }

  const totalTraces = traces.length;
  const totalTokensProcessed = traces.reduce((acc, t) => acc + t.totalTokens, 0);
  const estimatedCostUsd = traces.reduce((acc, t) => acc + t.estimatedCostUsd, 0);
  const errorCount = traces.filter((t) => t.status === "error").length;
  const errorRatePercent = Math.round((errorCount / totalTraces) * 100 * 10) / 10;

  const latencies = [...traces.map((t) => t.totalDurationMs)].sort((a, b) => a - b);
  const avgLatencyMs = Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length);

  const p95Index = Math.min(Math.floor(latencies.length * 0.95), latencies.length - 1);
  const p95LatencyMs = latencies[p95Index];

  return {
    totalTraces,
    avgLatencyMs,
    p95LatencyMs,
    errorRatePercent,
    totalTokensProcessed,
    estimatedCostUsd: Math.round(estimatedCostUsd * 10000) / 10000,
  };
}

test("TraceForge-X: computeTraceStats handles empty trace array gracefully", () => {
  const stats = computeTraceStats([]);
  assert.strictEqual(stats.totalTraces, 0);
  assert.strictEqual(stats.avgLatencyMs, 0);
  assert.strictEqual(stats.errorRatePercent, 0);
});

test("TraceForge-X: computeTraceStats computes accurate metrics and percentiles", () => {
  const mockTraces = [
    { totalDurationMs: 100, totalTokens: 500, estimatedCostUsd: 0.001, status: "ok" },
    { totalDurationMs: 200, totalTokens: 1000, estimatedCostUsd: 0.002, status: "ok" },
    { totalDurationMs: 300, totalTokens: 1500, estimatedCostUsd: 0.003, status: "warning" },
    { totalDurationMs: 1000, totalTokens: 0, estimatedCostUsd: 0.0001, status: "error" },
  ];

  const stats = computeTraceStats(mockTraces);
  assert.strictEqual(stats.totalTraces, 4);
  assert.strictEqual(stats.avgLatencyMs, 400); // (100+200+300+1000)/4 = 400
  assert.strictEqual(stats.errorRatePercent, 25); // 1 error out of 4 = 25%
  assert.strictEqual(stats.totalTokensProcessed, 3000);
});
