# NexaForge

NexaForge is a modern AI, data, and product engineering platform built to help teams design, ship, and scale intelligent workflows with clarity and confidence.

## Overview
NexaForge brings together the structure of a developer workspace with the energy of an AI platform. It is designed for data teams, ML engineers, product builders, and technical operators who want a cleaner way to collaborate, manage projects, and deliver production-ready systems.

## Core Capabilities
- **TraceForge-X**: Distributed AI execution tracing, eBPF telemetry, and token cost attribution.
- **AI & Data Workflow Orchestration**: Reusable inference, evaluation, and pipeline deployment.
- **Repository-style Project Organization**: Clean, developer-centric workspaces with fine-grained lineage.
- **Production Guardrails**: Automated schema validation, security headers, and output sanitization.
- **Operational Observability**: Real-time span waterfalls, latency percentiles (P95), and error budgets.

## Tech Stack
- **Framework**: [Next.js 16](https://nextjs.org) (Turbopack, App Router, React 19)
- **Language**: [TypeScript 5](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Icons**: [Lucide React](https://lucide.dev)
- **Content Engine**: gray-matter + remark (with strict XSS sanitization)
- **Test Runner**: Node.js Native Test Runner (`node:test`, `node:assert`)
- **CI/CD**: GitHub Actions automated lint, typecheck, unit test, and build pipeline

## Getting Started

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Quality Gates & Verification

Run the full validation suite:

```bash
# Lint check
npm run lint

# TypeScript strict typecheck
npm run typecheck

# Unit tests
npm test

# Production build & static generation
npm run build
```

## TraceForge-X Telemetry Engine
TraceForge-X provides full-lifecycle tracing for LLM and data pipelines:
- **Real-Time Waterfall**: Proportional timeline rendering of parent/child spans.
- **Token Accounting**: Automatic tracking of prompt tokens, completion tokens, and dollar costs.
- **Span Inspector**: Interactive attributes exploration (`llm.model`, `cache.hit`, `db.system`).
- **OpenTelemetry Compatible**: In-browser export of trace spans in standard OTel JSON format.

## License
This project is currently under active development and is intended for product and portfolio use.
