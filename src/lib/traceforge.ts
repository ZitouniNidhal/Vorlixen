export type SpanKind = "internal" | "server" | "client" | "producer" | "consumer";
export type SpanStatus = "ok" | "warning" | "error";

export interface SpanAttribute {
  key: string;
  value: string | number | boolean;
}

export interface TraceSpan {
  id: string;
  parentId?: string;
  name: string;
  service: string;
  kind: SpanKind;
  status: SpanStatus;
  startTimeMs: number;
  durationMs: number;
  attributes: Record<string, string | number | boolean>;
  errorMessage?: string;
}

export interface PipelineTrace {
  traceId: string;
  pipelineName: string;
  timestamp: string;
  status: SpanStatus;
  totalDurationMs: number;
  totalTokens: number;
  estimatedCostUsd: number;
  spans: TraceSpan[];
}

export interface TraceStats {
  totalTraces: number;
  avgLatencyMs: number;
  p95LatencyMs: number;
  errorRatePercent: number;
  totalTokensProcessed: number;
  estimatedCostUsd: number;
}

export const INITIAL_TRACES: PipelineTrace[] = [
  {
    traceId: "tr-7f9a12c4b8e0",
    pipelineName: "rag-document-summarizer-v2",
    timestamp: "2026-10-20T18:45:12Z",
    status: "ok",
    totalDurationMs: 412,
    totalTokens: 1420,
    estimatedCostUsd: 0.0028,
    spans: [
      {
        id: "sp-01",
        name: "HTTP POST /v1/chat/completions",
        service: "api-gateway",
        kind: "server",
        status: "ok",
        startTimeMs: 0,
        durationMs: 412,
        attributes: {
          "http.method": "POST",
          "http.status_code": 200,
          "client.ip": "10.244.0.18",
        },
      },
      {
        id: "sp-02",
        parentId: "sp-01",
        name: "Tokenize & Validate Payload",
        service: "gateway-auth",
        kind: "internal",
        status: "ok",
        startTimeMs: 8,
        durationMs: 24,
        attributes: {
          "auth.tenant": "prod-enterprise",
          "rate_limit.remaining": 4982,
        },
      },
      {
        id: "sp-03",
        parentId: "sp-01",
        name: "Generate Query Embedding (text-embedding-3-small)",
        service: "embedding-service",
        kind: "client",
        status: "ok",
        startTimeMs: 34,
        durationMs: 78,
        attributes: {
          "embedding.dimensions": 1536,
          "embedding.tokens": 42,
          "cache.hit": false,
        },
      },
      {
        id: "sp-04",
        parentId: "sp-01",
        name: "Qdrant Vector Similarity Search",
        service: "vector-store",
        kind: "client",
        status: "ok",
        startTimeMs: 114,
        durationMs: 46,
        attributes: {
          "vector.top_k": 5,
          "vector.similarity_threshold": 0.82,
          "vector.matches_found": 5,
        },
      },
      {
        id: "sp-05",
        parentId: "sp-01",
        name: "Inference: LLM Reasoning (claude-3-5-sonnet)",
        service: "llm-inference",
        kind: "client",
        status: "ok",
        startTimeMs: 162,
        durationMs: 236,
        attributes: {
          "llm.model": "claude-3-5-sonnet-20241022",
          "llm.temperature": 0.2,
          "llm.prompt_tokens": 1180,
          "llm.completion_tokens": 240,
          "llm.finish_reason": "stop",
        },
      },
      {
        id: "sp-06",
        parentId: "sp-01",
        name: "Security Guardrails & PII Masking",
        service: "guardrails-engine",
        kind: "internal",
        status: "ok",
        startTimeMs: 399,
        durationMs: 12,
        attributes: {
          "guardrail.pii_detected": false,
          "guardrail.toxic_score": 0.001,
          "guardrail.passed": true,
        },
      },
    ],
  },
  {
    traceId: "tr-3e819b7d52a1",
    pipelineName: "ebpf-kernel-telemetry-ingest",
    timestamp: "2026-10-20T18:44:30Z",
    status: "ok",
    totalDurationMs: 68,
    totalTokens: 0,
    estimatedCostUsd: 0.0001,
    spans: [
      {
        id: "sp-11",
        name: "eBPF Socket Filter Ring Buffer Read",
        service: "ebpf-collector",
        kind: "internal",
        status: "ok",
        startTimeMs: 0,
        durationMs: 68,
        attributes: {
          "kernel.probe": "tp/syscalls/sys_enter_connect",
          "events.batch_size": 128,
        },
      },
      {
        id: "sp-12",
        parentId: "sp-11",
        name: "Protocol Parser & Network Enrichment",
        service: "trace-enricher",
        kind: "internal",
        status: "ok",
        startTimeMs: 12,
        durationMs: 32,
        attributes: {
          "network.src_pod": "payments-svc-78bd5",
          "network.dst_pod": "postgres-cluster-0",
          "network.latency_ms": 0.42,
        },
      },
      {
        id: "sp-13",
        parentId: "sp-11",
        name: "ClickHouse Ingestion Batch Write",
        service: "storage-writer",
        kind: "client",
        status: "ok",
        startTimeMs: 46,
        durationMs: 21,
        attributes: {
          "db.system": "clickhouse",
          "db.table": "network_traces",
          "db.rows_written": 128,
        },
      },
    ],
  },
  {
    traceId: "tr-9c402e11a68f",
    pipelineName: "model-evaluation-eval-gate",
    timestamp: "2026-10-20T18:41:05Z",
    status: "warning",
    totalDurationMs: 890,
    totalTokens: 3820,
    estimatedCostUsd: 0.0076,
    spans: [
      {
        id: "sp-21",
        name: "Evaluation Benchmark Suite Execution",
        service: "eval-orchestrator",
        kind: "server",
        status: "warning",
        startTimeMs: 0,
        durationMs: 890,
        attributes: {
          "eval.dataset": "mmlu-pro-sample",
          "eval.total_samples": 50,
        },
      },
      {
        id: "sp-22",
        parentId: "sp-21",
        name: "Batched Model Inference",
        service: "inference-cluster",
        kind: "client",
        status: "warning",
        startTimeMs: 45,
        durationMs: 810,
        attributes: {
          "llm.model": "deepseek-r1-qwen-32b",
          "p99_latency_ms": 780,
          "throttle.occurred": true,
        },
        errorMessage: "Rate limit threshold reached (80% quota utilized), request throttled by 120ms.",
      },
      {
        id: "sp-23",
        parentId: "sp-21",
        name: "Compute Accuracy & Hallucination Metrics",
        service: "metrics-calculator",
        kind: "internal",
        status: "ok",
        startTimeMs: 856,
        durationMs: 32,
        attributes: {
          "eval.accuracy": 0.874,
          "eval.hallucination_rate": 0.021,
        },
      },
    ],
  },
  {
    traceId: "tr-1a55cd90f334",
    pipelineName: "realtime-feature-store-sync",
    timestamp: "2026-10-20T18:38:22Z",
    status: "error",
    totalDurationMs: 1240,
    totalTokens: 0,
    estimatedCostUsd: 0.0002,
    spans: [
      {
        id: "sp-31",
        name: "Kafka Consumer Feature Ingestion",
        service: "feature-consumer",
        kind: "consumer",
        status: "error",
        startTimeMs: 0,
        durationMs: 1240,
        attributes: {
          "kafka.topic": "user-clickstream-events",
          "kafka.partition": 3,
        },
      },
      {
        id: "sp-32",
        parentId: "sp-31",
        name: "Feast Redis Online Store Upsert",
        service: "redis-feature-store",
        kind: "client",
        status: "error",
        startTimeMs: 38,
        durationMs: 1201,
        attributes: {
          "redis.cluster": "redis-cluster-prod.internal",
          "timeout_ms": 1000,
        },
        errorMessage: "ETIMEDOUT: Connection to Redis cluster replica timed out after 1000ms.",
      },
    ],
  },
];

export function computeTraceStats(traces: PipelineTrace[]): TraceStats {
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

export function generateSimulatedTrace(counter: number): PipelineTrace {
  const isError = counter % 5 === 0;
  const isWarn = counter % 3 === 0 && !isError;
  const status: SpanStatus = isError ? "error" : isWarn ? "warning" : "ok";
  const duration = isError ? 1340 : 180 + Math.floor(Math.random() * 320);
  const tokens = isError ? 0 : 800 + Math.floor(Math.random() * 1200);

  const traceId = `tr-${Math.random().toString(16).substring(2, 14)}`;

  return {
    traceId,
    pipelineName: `agentic-code-reviewer-task-${counter}`,
    timestamp: new Date().toISOString(),
    status,
    totalDurationMs: duration,
    totalTokens: tokens,
    estimatedCostUsd: tokens > 0 ? Math.round((tokens * 0.000002) * 10000) / 10000 : 0.0001,
    spans: [
      {
        id: `${traceId}-s1`,
        name: "Agent Orchestration Loop",
        service: "traceforge-agent-core",
        kind: "server",
        status,
        startTimeMs: 0,
        durationMs: duration,
        attributes: {
          "agent.loop_iteration": 1,
          "agent.tool_count": 3,
        },
      },
      {
        id: `${traceId}-s2`,
        parentId: `${traceId}-s1`,
        name: isError ? "Semantic Search Failover" : "Context Window Assembly",
        service: "agent-memory",
        kind: "internal",
        status: isError ? "error" : "ok",
        startTimeMs: 15,
        durationMs: isError ? 1320 : 65,
        attributes: {
          "memory.retrieved_chunks": isError ? 0 : 8,
          "memory.cache_hit": !isError,
        },
        errorMessage: isError ? "Downstream embedding index unavailable (503 Service Unavailable)" : undefined,
      },
      {
        id: `${traceId}-s3`,
        parentId: `${traceId}-s1`,
        name: "LLM Completion Call",
        service: "llm-runtime",
        kind: "client",
        status: isError ? "error" : "ok",
        startTimeMs: 85,
        durationMs: isError ? 0 : duration - 95,
        attributes: {
          "llm.model": "claude-3-5-sonnet",
          "llm.tokens": tokens,
        },
      },
    ],
  };
}

/**
 * Filters traces that exceed a given duration threshold (e.g. for SLA violation analysis).
 */
export function filterTracesByLatencyThreshold(
  traces: PipelineTrace[],
  minDurationMs: number
): PipelineTrace[] {
  return traces.filter((t) => t.totalDurationMs >= minDurationMs);
}

/**
 * Inspects a trace and extracts all spans with errors or excessive latencies.
 */
export function detectTraceAnomalies(
  trace: PipelineTrace,
  slowSpanThresholdMs = 250
): {
  hasError: boolean;
  slowSpans: TraceSpan[];
  errorSpans: TraceSpan[];
} {
  const errorSpans = trace.spans.filter((s) => s.status === "error");
  const slowSpans = trace.spans.filter((s) => s.durationMs >= slowSpanThresholdMs);

  return {
    hasError: trace.status === "error" || errorSpans.length > 0,
    slowSpans,
    errorSpans,
  };
}

/**
 * Formats a PipelineTrace into a pretty-printed JSON string suitable for export.
 */
export function exportTraceAsJson(trace: PipelineTrace): string {
  return JSON.stringify(trace, null, 2);
}
