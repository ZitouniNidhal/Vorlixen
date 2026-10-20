"use client";

import { useState, useMemo } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Coins,
  Cpu,
  Database,
  Download,
  Layers,
  Play,
  RotateCcw,
  Search,
  Sparkles,
  Workflow,
  XCircle,
} from "lucide-react";
import {
  INITIAL_TRACES,
  PipelineTrace,
  computeTraceStats,
  generateSimulatedTrace,
} from "@/lib/traceforge";

export default function TraceForgePage() {
  const [traces, setTraces] = useState<PipelineTrace[]>(INITIAL_TRACES);
  const [selectedTraceId, setSelectedTraceId] = useState<string>(INITIAL_TRACES[0]?.traceId || "");
  const [selectedSpanId, setSelectedSpanId] = useState<string | null>(INITIAL_TRACES[0]?.spans[0]?.id || null);
  const [statusFilter, setStatusFilter] = useState<"all" | "ok" | "warning" | "error">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [simulationCounter, setSimulationCounter] = useState(1);

  const stats = useMemo(() => computeTraceStats(traces), [traces]);

  const filteredTraces = useMemo(() => {
    return traces.filter((t) => {
      const matchesStatus = statusFilter === "all" || t.status === statusFilter;
      const matchesSearch =
        t.pipelineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.traceId.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [traces, statusFilter, searchQuery]);

  const activeTrace = useMemo(() => {
    return traces.find((t) => t.traceId === selectedTraceId) || filteredTraces[0] || null;
  }, [traces, selectedTraceId, filteredTraces]);

  const activeSpan = useMemo(() => {
    if (!activeTrace) return null;
    return activeTrace.spans.find((s) => s.id === selectedSpanId) || activeTrace.spans[0] || null;
  }, [activeTrace, selectedSpanId]);

  const handleSimulate = () => {
    const newTrace = generateSimulatedTrace(simulationCounter);
    setSimulationCounter((c) => c + 1);
    setTraces((prev) => [newTrace, ...prev]);
    setSelectedTraceId(newTrace.traceId);
    setSelectedSpanId(newTrace.spans[0]?.id || null);
  };

  const handleReset = () => {
    setTraces(INITIAL_TRACES);
    setSelectedTraceId(INITIAL_TRACES[0].traceId);
    setSelectedSpanId(INITIAL_TRACES[0].spans[0].id);
    setStatusFilter("all");
    setSearchQuery("");
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(traces, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `traceforge-telemetry-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="gitea-surface min-h-screen px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="gitea-panel rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                <Sparkles className="h-3.5 w-3.5" />
                TraceForge-X Telemetry Suite
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Distributed AI & Pipeline Tracing
              </h1>
              <p className="text-sm text-muted-foreground max-w-2xl">
                Real-time execution waterfall, eBPF kernel probes, model token accounting, and span diagnostics for production AI agents and data workloads.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleSimulate}
                className="gitea-button-primary inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium shadow-sm transition active:scale-95"
              >
                <Play className="h-4 w-4 fill-current" />
                Simulate Run
              </button>
              <button
                type="button"
                onClick={handleExport}
                className="gitea-button inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-sm font-medium transition"
                title="Export OpenTelemetry JSON"
              >
                <Download className="h-4 w-4" />
                Export OTel
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="gitea-button inline-flex items-center gap-2 rounded-md p-2 text-sm text-muted-foreground hover:text-white transition"
                title="Reset Traces"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Metric KPI Cards */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <div className="rounded-xl border border-border bg-[#0d1117] p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Activity className="h-3.5 w-3.5 text-cyan-400" />
                Total Traces
              </div>
              <div className="mt-2 text-2xl font-bold text-white">{stats.totalTraces}</div>
              <div className="mt-1 text-[10px] text-emerald-400">Live streaming</div>
            </div>

            <div className="rounded-xl border border-border bg-[#0d1117] p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-blue-400" />
                Avg Latency
              </div>
              <div className="mt-2 text-2xl font-bold text-white">{stats.avgLatencyMs} ms</div>
              <div className="mt-1 text-[10px] text-muted-foreground">End-to-end</div>
            </div>

            <div className="rounded-xl border border-border bg-[#0d1117] p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Layers className="h-3.5 w-3.5 text-violet-400" />
                P95 Latency
              </div>
              <div className="mt-2 text-2xl font-bold text-white">{stats.p95LatencyMs} ms</div>
              <div className="mt-1 text-[10px] text-muted-foreground">95th percentile</div>
            </div>

            <div className="rounded-xl border border-border bg-[#0d1117] p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                Error Rate
              </div>
              <div className="mt-2 text-2xl font-bold text-white">{stats.errorRatePercent}%</div>
              <div className="mt-1 text-[10px] text-muted-foreground">SLO target &lt; 2%</div>
            </div>

            <div className="rounded-xl border border-border bg-[#0d1117] p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Cpu className="h-3.5 w-3.5 text-emerald-400" />
                Tokens
              </div>
              <div className="mt-2 text-2xl font-bold text-white">
                {stats.totalTokensProcessed > 1000
                  ? `${(stats.totalTokensProcessed / 1000).toFixed(1)}k`
                  : stats.totalTokensProcessed}
              </div>
              <div className="mt-1 text-[10px] text-muted-foreground">Prompt + Comp</div>
            </div>

            <div className="rounded-xl border border-border bg-[#0d1117] p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Coins className="h-3.5 w-3.5 text-yellow-400" />
                Est. Cost
              </div>
              <div className="mt-2 text-2xl font-bold text-white">${stats.estimatedCostUsd}</div>
              <div className="mt-1 text-[10px] text-muted-foreground">Blended rate</div>
            </div>
          </div>
        </div>

        {/* Trace List & Waterfall View */}
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1.9fr]">
          {/* Left: Filter & Trace List */}
          <div className="gitea-panel rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Workflow className="h-4 w-4 text-cyan-400" />
                Inference & Pipeline Traces
              </div>
              <span className="text-xs text-muted-foreground">{filteredTraces.length} available</span>
            </div>

            {/* Filter buttons & Search */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Filter pipeline or trace ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-border bg-[#0d1117] py-2 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-1.5 rounded-lg border border-border bg-[#0d1117] p-1">
                {(["all", "ok", "warning", "error"] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setStatusFilter(filter)}
                    className={`flex-1 rounded-md px-2.5 py-1 text-xs font-medium capitalize transition ${
                      statusFilter === filter
                        ? "bg-[#1f2937] text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Trace List Items */}
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {filteredTraces.length === 0 ? (
                <div className="py-12 text-center text-xs text-muted-foreground">
                  No traces match the active filter.
                </div>
              ) : (
                filteredTraces.map((trace) => {
                  const isSelected = trace.traceId === activeTrace?.traceId;
                  return (
                    <button
                      key={trace.traceId}
                      type="button"
                      onClick={() => {
                        setSelectedTraceId(trace.traceId);
                        setSelectedSpanId(trace.spans[0]?.id || null);
                      }}
                      className={`w-full rounded-xl border p-3.5 text-left transition ${
                        isSelected
                          ? "border-cyan-500/50 bg-[#161b22] shadow-sm"
                          : "border-border bg-[#0d1117] hover:border-border/80 hover:bg-[#161b22]/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {trace.status === "ok" && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                          {trace.status === "warning" && <AlertTriangle className="h-4 w-4 text-amber-400" />}
                          {trace.status === "error" && <XCircle className="h-4 w-4 text-rose-400" />}
                          <span className="text-xs font-mono font-medium text-white">{trace.traceId}</span>
                        </div>
                        <span className="text-[11px] font-mono text-muted-foreground">
                          {trace.totalDurationMs} ms
                        </span>
                      </div>

                      <div className="mt-2 text-xs font-medium text-foreground truncate">
                        {trace.pipelineName}
                      </div>

                      <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                        <span>{trace.spans.length} spans</span>
                        <span>{trace.totalTokens} tokens</span>
                        <span>${trace.estimatedCostUsd}</span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Right: Selected Trace Waterfall & Span Inspector */}
          <div className="space-y-6">
            {activeTrace ? (
              <>
                {/* Waterfall Panel */}
                <div className="gitea-panel rounded-2xl p-5 space-y-5">
                  <div className="flex flex-col gap-2 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-muted-foreground">TRACE:</span>
                        <span className="text-sm font-mono font-bold text-cyan-300">{activeTrace.traceId}</span>
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                            activeTrace.status === "ok"
                              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                              : activeTrace.status === "warning"
                              ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                              : "border-rose-500/30 bg-rose-500/10 text-rose-300"
                          }`}
                        >
                          {activeTrace.status}
                        </span>
                      </div>
                      <h2 className="mt-1 text-lg font-semibold text-white">{activeTrace.pipelineName}</h2>
                    </div>

                    <div className="text-right text-xs text-muted-foreground font-mono">
                      <div>Total: {activeTrace.totalDurationMs} ms</div>
                      <div>Spans: {activeTrace.spans.length}</div>
                    </div>
                  </div>

                  {/* Waterfall Timeline Bar Chart */}
                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Execution Spans & Timeline Waterfall
                    </div>

                    <div className="space-y-2">
                      {activeTrace.spans.map((span) => {
                        const total = activeTrace.totalDurationMs || 1;
                        const leftPercent = Math.max(0, Math.min(100, (span.startTimeMs / total) * 100));
                        const widthPercent = Math.max(2, Math.min(100 - leftPercent, (span.durationMs / total) * 100));
                        const isSpanSelected = span.id === activeSpan?.id;

                        const barColor =
                          span.status === "error"
                            ? "bg-rose-500 hover:bg-rose-400"
                            : span.status === "warning"
                            ? "bg-amber-500 hover:bg-amber-400"
                            : "bg-cyan-500 hover:bg-cyan-400";

                        return (
                          <div
                            key={span.id}
                            onClick={() => setSelectedSpanId(span.id)}
                            className={`group cursor-pointer rounded-lg border p-2.5 transition ${
                              isSpanSelected
                                ? "border-cyan-400/80 bg-[#1f2937]/70"
                                : "border-border bg-[#0d1117] hover:border-border/80 hover:bg-[#161b22]"
                            }`}
                          >
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2 truncate">
                                <span className="rounded bg-[#161b22] px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground border border-border">
                                  {span.service}
                                </span>
                                <span className="font-medium text-white truncate">{span.name}</span>
                              </div>
                              <span className="font-mono text-muted-foreground whitespace-nowrap ml-2">
                                {span.durationMs} ms
                              </span>
                            </div>

                            {/* Bar Track */}
                            <div className="relative mt-2 h-2 w-full rounded-full bg-[#161b22] overflow-hidden">
                              <div
                                style={{
                                  left: `${leftPercent}%`,
                                  width: `${widthPercent}%`,
                                }}
                                className={`absolute h-full rounded-full transition-all duration-300 ${barColor}`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Selected Span Detail Inspector */}
                {activeSpan && (
                  <div className="gitea-panel rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <div className="flex items-center gap-2">
                        <Layers className="h-4 w-4 text-cyan-400" />
                        <h3 className="text-sm font-semibold text-white">Span Inspector: {activeSpan.name}</h3>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">ID: {activeSpan.id}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 text-xs">
                      <div className="rounded-lg border border-border bg-[#0d1117] p-2.5">
                        <span className="text-muted-foreground">Service:</span>
                        <div className="font-semibold text-white font-mono mt-0.5">{activeSpan.service}</div>
                      </div>
                      <div className="rounded-lg border border-border bg-[#0d1117] p-2.5">
                        <span className="text-muted-foreground">Kind:</span>
                        <div className="font-semibold text-white font-mono mt-0.5 uppercase">{activeSpan.kind}</div>
                      </div>
                      <div className="rounded-lg border border-border bg-[#0d1117] p-2.5">
                        <span className="text-muted-foreground">Duration:</span>
                        <div className="font-semibold text-white font-mono mt-0.5">{activeSpan.durationMs} ms</div>
                      </div>
                      <div className="rounded-lg border border-border bg-[#0d1117] p-2.5">
                        <span className="text-muted-foreground">Offset:</span>
                        <div className="font-semibold text-white font-mono mt-0.5">+{activeSpan.startTimeMs} ms</div>
                      </div>
                    </div>

                    {activeSpan.errorMessage && (
                      <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300 flex items-start gap-2">
                        <XCircle className="h-4 w-4 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold">Span Execution Error</div>
                          <div className="mt-0.5 font-mono">{activeSpan.errorMessage}</div>
                        </div>
                      </div>
                    )}

                    {/* Span Attributes Table */}
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Span Attributes & Telemetry Context
                      </div>
                      <div className="overflow-hidden rounded-lg border border-border">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-[#161b22] text-muted-foreground">
                            <tr>
                              <th className="px-3 py-2 font-medium">Attribute Key</th>
                              <th className="px-3 py-2 font-medium">Value</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border bg-[#0d1117] font-mono">
                            {Object.entries(activeSpan.attributes).map(([key, val]) => (
                              <tr key={key} className="hover:bg-[#161b22]/50">
                                <td className="px-3 py-1.5 text-cyan-300 font-medium">{key}</td>
                                <td className="px-3 py-1.5 text-foreground">{String(val)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="gitea-panel rounded-2xl p-12 text-center text-sm text-muted-foreground">
                Select a trace from the left to inspect its waterfall and spans.
              </div>
            )}
          </div>
        </div>

        {/* TraceForge-X Architecture Pipeline DAG */}
        <section className="gitea-panel rounded-2xl p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">TraceForge-X Telemetry Architecture</h2>
              <p className="text-sm text-muted-foreground">
                Zero-overhead kernel probes, distributed context propagation, and OpenTelemetry collector pipeline.
              </p>
            </div>
            <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              eBPF RingBuffer Active
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-border bg-[#0d1117] p-4 space-y-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                <Cpu className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-semibold text-white">1. Ingress & eBPF</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Kernel-level socket filters capture L4/L7 packets and model payloads with zero user-space latency penalty.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-[#0d1117] p-4 space-y-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <Workflow className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-semibold text-white">2. Context Propagation</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                W3C TraceContext headers propagate parent-child spans across microservices, RAG vector lookups, and LLMs.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-[#0d1117] p-4 space-y-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                <Database className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-semibold text-white">3. Token & Cost Engine</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Continuous accounting of prompt/completion tokens, pricing tier calculation, and budget guardrail enforcement.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-[#0d1117] p-4 space-y-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                <Activity className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-semibold text-white">4. OTel Ingestion</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Spans exported via standard OTLP/gRPC to ClickHouse, Jaeger, Datadog, or Grafana Tempo backends.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
