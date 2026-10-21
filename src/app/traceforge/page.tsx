"use client";

import { useState, useMemo } from "react";
import {
  Activity,
  AlertTriangle,
  Check,
  CheckCircle2,
  Clock,
  Code2,
  Coins,
  Copy,
  Cpu,
  Database,
  Download,
  GitCompare,
  HelpCircle,
  Layers,
  Lightbulb,
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
import {
  INITIAL_HYPOTHESES,
  compareTraces,
  generateRegressionTestCode,
} from "@/lib/behavioral";

type ActiveTab = "waterfall" | "differential" | "hypotheses" | "regression_gen";

export default function TraceForgePage() {
  const [traces, setTraces] = useState<PipelineTrace[]>(INITIAL_TRACES);
  const [selectedTraceId, setSelectedTraceId] = useState<string>(INITIAL_TRACES[0]?.traceId || "");
  const [selectedSpanId, setSelectedSpanId] = useState<string | null>(INITIAL_TRACES[0]?.spans[0]?.id || null);
  const [statusFilter, setStatusFilter] = useState<"all" | "ok" | "warning" | "error">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [simulationCounter, setSimulationCounter] = useState(1);
  const [activeTab, setActiveTab] = useState<ActiveTab>("waterfall");

  // Differential Analysis states
  const [baselineTraceId, setBaselineTraceId] = useState<string>(INITIAL_TRACES[0]?.traceId || "");
  const [candidateTraceId, setCandidateTraceId] = useState<string>(
    INITIAL_TRACES[2]?.traceId || INITIAL_TRACES[1]?.traceId || ""
  );

  // Hypothesis Workbench states
  const hypotheses = INITIAL_HYPOTHESES;
  const [selectedHypothesisId, setSelectedHypothesisId] = useState<string>(
    INITIAL_HYPOTHESES[0]?.id || ""
  );

  // Copy-to-clipboard feedback
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

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

  // Differential Comparison Report
  const differentialReport = useMemo(() => {
    const base = traces.find((t) => t.traceId === baselineTraceId) || traces[0];
    const cand = traces.find((t) => t.traceId === candidateTraceId) || traces[1] || traces[0];
    if (!base || !cand) return null;
    return compareTraces(base, cand);
  }, [traces, baselineTraceId, candidateTraceId]);

  const selectedHypothesis = useMemo(() => {
    return (
      hypotheses.find((h) => h.id === selectedHypothesisId) || hypotheses[0] || null
    );
  }, [hypotheses, selectedHypothesisId]);

  const generatedRegressionCode = useMemo(() => {
    if (selectedHypothesis) {
      return generateRegressionTestCode(selectedHypothesis);
    }
    if (differentialReport) {
      return generateRegressionTestCode(differentialReport);
    }
    return "// Select a hypothesis or differential comparison to generate regression test code.";
  }, [selectedHypothesis, differentialReport]);

  const handleSimulate = () => {
    const newTrace = generateSimulatedTrace(simulationCounter);
    setSimulationCounter((c) => c + 1);
    setTraces((prev) => {
      const updated = [newTrace, ...prev];
      try {
        localStorage.setItem("nexaforge_custom_traces", JSON.stringify(updated.slice(0, 20)));
      } catch {
        // Ignore quota limits
      }
      return updated;
    });
    setSelectedTraceId(newTrace.traceId);
    setSelectedSpanId(newTrace.spans[0]?.id || null);
  };

  const handleReset = () => {
    setTraces(INITIAL_TRACES);
    setSelectedTraceId(INITIAL_TRACES[0].traceId);
    setSelectedSpanId(INITIAL_TRACES[0].spans[0].id);
    setStatusFilter("all");
    setSearchQuery("");
    setBaselineTraceId(INITIAL_TRACES[0].traceId);
    setCandidateTraceId(INITIAL_TRACES[2]?.traceId || INITIAL_TRACES[1]?.traceId || "");
    try {
      localStorage.removeItem("nexaforge_custom_traces");
    } catch {
      // Ignore
    }
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

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  return (
    <div className="gitea-surface min-h-screen px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header Panel */}
        <div className="gitea-panel rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                <Sparkles className="h-3.5 w-3.5" />
                TraceForge-X Telemetry &amp; Behavioral Engine
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Distributed AI Tracing &amp; Behavioral Analysis
              </h1>
              <p className="text-sm text-muted-foreground max-w-2xl">
                Sub-millisecond waterfall visualization, differential behavioral anomaly detection, hypothesis provenance, and automated regression test generation.
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
                title="Reset Traces to Default"
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

          {/* Workbench Tabs Navigation */}
          <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-border/80 pb-3">
            <button
              type="button"
              onClick={() => setActiveTab("waterfall")}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                activeTab === "waterfall"
                  ? "bg-[#1f2937] text-white shadow-sm"
                  : "text-muted-foreground hover:bg-[#161b22] hover:text-foreground"
              }`}
            >
              <Workflow className="h-4 w-4 text-cyan-400" />
              Waterfall &amp; Spans
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("differential")}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                activeTab === "differential"
                  ? "bg-[#1f2937] text-white shadow-sm"
                  : "text-muted-foreground hover:bg-[#161b22] hover:text-foreground"
              }`}
            >
              <GitCompare className="h-4 w-4 text-purple-400" />
              Differential Analysis
              {differentialReport && differentialReport.anomalies.length > 0 && (
                <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-[10px] font-bold text-rose-300">
                  {differentialReport.anomalies.length}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("hypotheses")}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                activeTab === "hypotheses"
                  ? "bg-[#1f2937] text-white shadow-sm"
                  : "text-muted-foreground hover:bg-[#161b22] hover:text-foreground"
              }`}
            >
              <Lightbulb className="h-4 w-4 text-amber-400" />
              Hypotheses &amp; Provenance
              <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                {hypotheses.length}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("regression_gen")}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                activeTab === "regression_gen"
                  ? "bg-[#1f2937] text-white shadow-sm"
                  : "text-muted-foreground hover:bg-[#161b22] hover:text-foreground"
              }`}
            >
              <Code2 className="h-4 w-4 text-emerald-400" />
              Regression Test Gen
            </button>
          </div>
        </div>

        {/* TAB 1: Waterfall & Telemetry */}
        {activeTab === "waterfall" && (
          <div className="grid gap-6 lg:grid-cols-[1.1fr_1.9fr]">
            {/* Left: Filter & Trace List */}
            <div className="gitea-panel rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Workflow className="h-4 w-4 text-cyan-400" />
                  Inference &amp; Pipeline Traces
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

            {/* Right: Waterfall Panel */}
            <div className="space-y-6">
              {activeTrace ? (
                <>
                  <div className="gitea-panel rounded-2xl p-5 space-y-5">
                    <div className="flex flex-col gap-2 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-muted-foreground">TRACE:</span>
                          <span className="text-sm font-mono font-bold text-cyan-300">{activeTrace.traceId}</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(activeTrace.traceId, "trace-id")}
                            className="text-muted-foreground hover:text-white transition"
                            title="Copy Trace ID"
                          >
                            {copiedKey === "trace-id" ? (
                              <Check className="h-3.5 w-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </button>
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

                    {/* Timeline Waterfall Bar Chart */}
                    <div className="space-y-3">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Execution Spans &amp; Timeline Waterfall
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

                  {/* Span Detail Inspector */}
                  {activeSpan && (
                    <div className="gitea-panel rounded-2xl p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-border pb-3">
                        <div className="flex items-center gap-2">
                          <Layers className="h-4 w-4 text-cyan-400" />
                          <h3 className="text-sm font-semibold text-white">Span Inspector: {activeSpan.name}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-muted-foreground">ID: {activeSpan.id}</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(activeSpan.id, "span-id")}
                            className="text-muted-foreground hover:text-white transition"
                            title="Copy Span ID"
                          >
                            {copiedKey === "span-id" ? (
                              <Check className="h-3.5 w-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
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

                      <div className="space-y-2">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Span Attributes &amp; Telemetry Context
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
        )}

        {/* TAB 2: Differential Analysis */}
        {activeTab === "differential" && differentialReport && (
          <div className="space-y-6">
            <div className="gitea-panel rounded-2xl p-6 space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
                <div>
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <GitCompare className="h-5 w-5 text-purple-400" />
                    Differential Behavioral Analysis
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Compare execution timing, token divergence, and anomaly flags between two pipeline runs.
                  </p>
                </div>

                {/* Trace Selectors */}
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <div>
                    <label className="text-muted-foreground block mb-1">Baseline Profile:</label>
                    <select
                      value={baselineTraceId}
                      onChange={(e) => setBaselineTraceId(e.target.value)}
                      className="rounded-lg border border-border bg-[#0d1117] px-3 py-1.5 text-foreground font-mono"
                    >
                      {traces.map((t) => (
                        <option key={t.traceId} value={t.traceId}>
                          {t.traceId} ({t.totalDurationMs}ms - {t.pipelineName.slice(0, 20)}...)
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-muted-foreground block mb-1">Candidate Profile:</label>
                    <select
                      value={candidateTraceId}
                      onChange={(e) => setCandidateTraceId(e.target.value)}
                      className="rounded-lg border border-border bg-[#0d1117] px-3 py-1.5 text-foreground font-mono"
                    >
                      {traces.map((t) => (
                        <option key={t.traceId} value={t.traceId}>
                          {t.traceId} ({t.totalDurationMs}ms - {t.status})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Differential Comparison Summary Banner */}
              <div
                className={`rounded-xl border p-4 text-xs ${
                  differentialReport.totalDurationDeltaMs > 0
                    ? "border-amber-500/30 bg-amber-500/10 text-amber-200"
                    : "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                }`}
              >
                <div className="font-semibold text-sm">Differential Analysis Summary:</div>
                <div className="mt-1">{differentialReport.summary}</div>
              </div>

              {/* Metrics Comparison Row */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-xl border border-border bg-[#0d1117] p-4 text-xs">
                  <span className="text-muted-foreground">Baseline Duration:</span>
                  <div className="text-xl font-bold font-mono text-white mt-1">
                    {differentialReport.baselineDurationMs} ms
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-[#0d1117] p-4 text-xs">
                  <span className="text-muted-foreground">Candidate Duration:</span>
                  <div className="text-xl font-bold font-mono text-white mt-1">
                    {differentialReport.candidateDurationMs} ms
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-[#0d1117] p-4 text-xs">
                  <span className="text-muted-foreground">Latency Delta:</span>
                  <div
                    className={`text-xl font-bold font-mono mt-1 ${
                      differentialReport.totalDurationDeltaMs > 0 ? "text-rose-400" : "text-emerald-400"
                    }`}
                  >
                    {differentialReport.totalDurationDeltaMs > 0 ? "+" : ""}
                    {differentialReport.totalDurationDeltaMs} ms ({differentialReport.totalDurationPercentChange}%)
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-[#0d1117] p-4 text-xs">
                  <span className="text-muted-foreground">Token Shift:</span>
                  <div className="text-xl font-bold font-mono text-white mt-1">
                    {differentialReport.tokenDelta > 0 ? "+" : ""}
                    {differentialReport.tokenDelta} tokens
                  </div>
                </div>
              </div>

              {/* Detected Anomalies */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white">
                  Identified Behavioral Anomalies ({differentialReport.anomalies.length})
                </h3>
                {differentialReport.anomalies.length === 0 ? (
                  <div className="rounded-xl border border-border bg-[#0d1117] p-6 text-center text-xs text-muted-foreground">
                    No statistically significant anomalies detected between these two traces.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {differentialReport.anomalies.map((anom) => (
                      <div
                        key={anom.id}
                        className={`rounded-xl border p-4 text-xs space-y-2 ${
                          anom.severity === "critical"
                            ? "border-rose-500/40 bg-rose-500/10 text-rose-200"
                            : "border-amber-500/40 bg-amber-500/10 text-amber-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                                anom.severity === "critical"
                                  ? "bg-rose-500/30 text-rose-300"
                                  : "bg-amber-500/30 text-amber-300"
                              }`}
                            >
                              {anom.severity}
                            </span>
                            <span className="font-semibold text-white">{anom.title}</span>
                          </div>
                          <span className="font-mono text-[10px] opacity-80">Span: {anom.spanId}</span>
                        </div>
                        <p className="text-foreground">{anom.description}</p>
                        <div className="flex items-center gap-4 text-[11px] opacity-90 font-mono">
                          <span>Baseline: {String(anom.baselineValue)}</span>
                          <span>&rarr;</span>
                          <span>Observed: {String(anom.observedValue)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Span-by-Span Diff Table */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white">Span Execution Breakdown</h3>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#161b22] text-muted-foreground">
                      <tr>
                        <th className="px-3 py-2 font-medium">Service / Span</th>
                        <th className="px-3 py-2 font-medium">Baseline Duration</th>
                        <th className="px-3 py-2 font-medium">Candidate Duration</th>
                        <th className="px-3 py-2 font-medium">Duration Delta</th>
                        <th className="px-3 py-2 font-medium">Status Diff</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-[#0d1117] font-mono">
                      {differentialReport.spanDiffs.map((diff, idx) => (
                        <tr key={idx} className="hover:bg-[#161b22]/50">
                          <td className="px-3 py-2 text-white">
                            <div className="font-sans font-medium">{diff.name}</div>
                            <div className="text-[10px] text-muted-foreground">{diff.service}</div>
                          </td>
                          <td className="px-3 py-2 text-muted-foreground">{diff.baselineDurationMs} ms</td>
                          <td className="px-3 py-2 text-white">{diff.candidateDurationMs} ms</td>
                          <td
                            className={`px-3 py-2 font-bold ${
                              diff.durationDeltaMs > 0 ? "text-rose-400" : "text-emerald-400"
                            }`}
                          >
                            {diff.durationDeltaMs > 0 ? "+" : ""}
                            {diff.durationDeltaMs} ms ({diff.durationPercentChange}%)
                          </td>
                          <td className="px-3 py-2">
                            {diff.statusDivergence ? (
                              <span className="rounded bg-rose-500/20 px-1.5 py-0.5 text-[10px] text-rose-300">
                                {diff.baselineStatus} &rarr; {diff.candidateStatus}
                              </span>
                            ) : (
                              <span className="text-emerald-400 font-sans text-xs">Matched</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Hypotheses & Provenance */}
        {activeTab === "hypotheses" && (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1.8fr]">
            {/* Left: Hypotheses List */}
            <div className="gitea-panel rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Lightbulb className="h-4 w-4 text-amber-400" />
                  Behavioral Hypotheses
                </div>
                <span className="text-xs text-muted-foreground">{hypotheses.length} total</span>
              </div>

              <div className="space-y-3">
                {hypotheses.map((hypo) => {
                  const isSelected = hypo.id === selectedHypothesis?.id;
                  return (
                    <div
                      key={hypo.id}
                      onClick={() => setSelectedHypothesisId(hypo.id)}
                      className={`cursor-pointer rounded-xl border p-4 text-left transition ${
                        isSelected
                          ? "border-amber-500/50 bg-[#161b22] shadow-sm"
                          : "border-border bg-[#0d1117] hover:border-border/80 hover:bg-[#161b22]/50"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-mono text-amber-300 border border-amber-500/20 uppercase">
                          {hypo.category.replace("_", " ")}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                            hypo.status === "verified"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : "bg-blue-500/20 text-blue-300"
                          }`}
                        >
                          {hypo.status}
                        </span>
                      </div>
                      <h4 className="mt-2 text-sm font-semibold text-white">{hypo.title}</h4>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{hypo.description}</p>
                      <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
                        <span>Confidence: {(hypo.confidenceScore * 100).toFixed(0)}%</span>
                        <span>{hypo.evidenceProvenance.length} evidence links</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Selected Hypothesis Provenance & Counterfactual */}
            {selectedHypothesis && (
              <div className="gitea-panel rounded-2xl p-6 space-y-6">
                <div className="border-b border-border pb-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-mono text-amber-300 border border-amber-500/20 uppercase">
                      {selectedHypothesis.category}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">ID: {selectedHypothesis.id}</span>
                  </div>
                  <h2 className="mt-2 text-xl font-bold text-white">{selectedHypothesis.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {selectedHypothesis.description}
                  </p>
                </div>

                {/* Evidence Provenance Links */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Database className="h-4 w-4 text-cyan-400" />
                    Observed Evidence Provenance
                  </h3>
                  <div className="space-y-2">
                    {selectedHypothesis.evidenceProvenance.map((ev, idx) => (
                      <div key={idx} className="rounded-xl border border-border bg-[#0d1117] p-3 text-xs space-y-1">
                        <div className="flex items-center justify-between font-mono text-[11px]">
                          <span className="text-cyan-300">Trace: {ev.traceId}</span>
                          <span className="text-muted-foreground">Span: {ev.spanId}</span>
                        </div>
                        <div className="text-muted-foreground">
                          Service: <span className="text-white font-medium">{ev.service}</span> | Metric:{" "}
                          <span className="text-amber-300 font-mono font-semibold">
                            {ev.metric} = {String(ev.value)}
                          </span>
                        </div>
                        <div className="text-[10px] text-muted-foreground font-mono">Timestamp: {ev.timestamp}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Refutation Criteria */}
                <div className="rounded-xl border border-purple-500/30 bg-purple-500/10 p-4 text-xs space-y-1 text-purple-200">
                  <div className="font-semibold flex items-center gap-1.5">
                    <HelpCircle className="h-4 w-4" />
                    Falsification / Refutation Criteria
                  </div>
                  <p className="leading-relaxed opacity-90">{selectedHypothesis.refutationCriteria}</p>
                </div>

                {/* Counterfactual Proposal */}
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs space-y-1 text-emerald-200">
                  <div className="font-semibold flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4" />
                    Proposed Counterfactual Intervention
                  </div>
                  <p className="leading-relaxed opacity-90">{selectedHypothesis.counterfactualProposal}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Automated Regression Test Generator */}
        {activeTab === "regression_gen" && (
          <div className="gitea-panel rounded-2xl p-6 space-y-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
              <div>
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-emerald-400" />
                  Automated Regression Test Generator
                </h2>
                <p className="text-xs text-muted-foreground">
                  Transform observed trace bottlenecks and verified hypotheses into executable Node.js native unit tests.
                </p>
              </div>

              <button
                type="button"
                onClick={() => copyToClipboard(generatedRegressionCode, "test-code")}
                className="gitea-button-primary inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs font-medium"
              >
                {copiedKey === "test-code" ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy Test Code
                  </>
                )}
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Target: tests/generated_regression.test.mjs</span>
                <span>Framework: node:test + node:assert</span>
              </div>
              <pre className="overflow-x-auto rounded-xl border border-border bg-[#0d1117] p-5 text-xs font-mono text-emerald-300 leading-relaxed">
                <code>{generatedRegressionCode}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Architecture Pipeline DAG */}
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
              <h4 className="text-sm font-semibold text-white">1. Ingress &amp; eBPF</h4>
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
              <h4 className="text-sm font-semibold text-white">3. Token &amp; Cost Engine</h4>
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
