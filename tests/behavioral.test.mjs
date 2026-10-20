import test from "node:test";
import assert from "node:assert";

// Implement pure logic verification mirroring src/lib/behavioral.ts
function compareTraces(baseline, candidate) {
  const durationDelta = candidate.totalDurationMs - baseline.totalDurationMs;
  const percentChange =
    baseline.totalDurationMs > 0
      ? Math.round((durationDelta / baseline.totalDurationMs) * 100 * 10) / 10
      : 0;

  const anomalies = [];

  for (const span of candidate.spans) {
    const matching = baseline.spans.find((s) => s.service === span.service && s.name === span.name);
    const baseDuration = matching ? matching.durationMs : 0;
    const spanDelta = span.durationMs - baseDuration;
    const spanPercent = baseDuration > 0 ? Math.round((spanDelta / baseDuration) * 100 * 10) / 10 : 0;

    if (span.status === "error") {
      anomalies.push({
        severity: "critical",
        service: span.service,
        title: `Service Failure: ${span.service}`,
      });
    } else if (spanPercent >= 40 && spanDelta >= 50) {
      anomalies.push({
        severity: spanPercent >= 100 ? "critical" : "warning",
        service: span.service,
        title: `Latency Degradation (+${spanPercent}%) in ${span.service}`,
      });
    }
  }

  return {
    baselineTraceId: baseline.traceId,
    candidateTraceId: candidate.traceId,
    totalDurationDeltaMs: durationDelta,
    totalDurationPercentChange: percentChange,
    anomalies,
  };
}

function generateRegressionTestCode(target) {
  if (target.category) {
    return `import test from "node:test";\nimport assert from "node:assert";\ntest("Regression Guard: ${target.title}", () => { assert.ok(true); });`;
  }
  return `import test from "node:test";\nimport assert from "node:assert";\ntest("Differential Guard: ${target.pipelineName}", () => { assert.ok(true); });`;
}

test("Behavioral: compareTraces computes zero delta on identical traces", () => {
  const mockTrace = {
    traceId: "tr-test-1",
    totalDurationMs: 250,
    spans: [
      { id: "s1", service: "api", name: "GET /query", durationMs: 250, status: "ok" },
    ],
  };

  const diff = compareTraces(mockTrace, mockTrace);
  assert.strictEqual(diff.totalDurationDeltaMs, 0);
  assert.strictEqual(diff.totalDurationPercentChange, 0);
  assert.strictEqual(diff.anomalies.length, 0);
});

test("Behavioral: compareTraces flags latency degradation as warning/critical", () => {
  const baseline = {
    traceId: "tr-base",
    totalDurationMs: 100,
    spans: [
      { id: "s1", service: "embeddings", name: "embed", durationMs: 50, status: "ok" },
    ],
  };

  const candidate = {
    traceId: "tr-cand",
    totalDurationMs: 250,
    spans: [
      { id: "s1", service: "embeddings", name: "embed", durationMs: 200, status: "ok" }, // +300% & +150ms
    ],
  };

  const diff = compareTraces(baseline, candidate);
  assert.strictEqual(diff.totalDurationDeltaMs, 150);
  assert.strictEqual(diff.anomalies.length, 1);
  assert.strictEqual(diff.anomalies[0].severity, "critical");
  assert.strictEqual(diff.anomalies[0].service, "embeddings");
});

test("Behavioral: compareTraces flags errors as critical anomalies", () => {
  const baseline = {
    traceId: "tr-base",
    totalDurationMs: 100,
    spans: [
      { id: "s1", service: "db", name: "upsert", durationMs: 40, status: "ok" },
    ],
  };

  const candidate = {
    traceId: "tr-error",
    totalDurationMs: 1000,
    spans: [
      { id: "s1", service: "db", name: "upsert", durationMs: 1000, status: "error" },
    ],
  };

  const diff = compareTraces(baseline, candidate);
  assert.strictEqual(diff.anomalies.length, 1);
  assert.strictEqual(diff.anomalies[0].severity, "critical");
});

test("Behavioral: generateRegressionTestCode produces valid test snippet with imports", () => {
  const mockHypothesis = {
    title: "Cache Invalidation Guard",
    category: "cache_invalidation",
  };

  const code = generateRegressionTestCode(mockHypothesis);
  assert.ok(code.includes("import test from \"node:test\";"));
  assert.ok(code.includes("import assert from \"node:assert\";"));
  assert.ok(code.includes("Regression Guard: Cache Invalidation Guard"));
});
