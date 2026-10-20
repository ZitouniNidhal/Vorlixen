# NexaForge GitHub Copilot Instructions

These instructions guide GitHub Copilot and automated coding agents when working in the `nexaforge` repository.

---

## 1. Technology Stack & Framework Rules

- **Framework**: Next.js 16.3+ (App Router, Turbopack).
  - Use `async/await` for dynamic route params (e.g. `const { slug } = await params;`).
  - Do not use legacy `pages/` directory conventions.
- **Language**: TypeScript 5+ in strict mode.
  - Never use `any`. Always use explicit interface types.
- **Styling**: Tailwind CSS v4.
  - Leverage predefined Gitea-inspired design tokens: `gitea-surface`, `gitea-panel`, `gitea-button`, `gitea-button-primary`.
  - Avoid ad-hoc utility cascades where existing tokens exist.
- **Testing**: Node.js Native Test Runner (`node:test`, `node:assert`).
  - Do not introduce heavy testing frameworks or runtime bundlers.
  - Tests reside in `tests/*.test.mjs`. Run via `npm test`.

---

## 2. Security & Guardrails (Mandatory)

1. **Markdown & HTML Sanitization**:
   - Always enforce `{ sanitize: true }` when processing user-controlled Markdown via `remark-html`.
   - Never render raw unescaped HTML strings using `dangerouslySetInnerHTML`.
2. **Slug & Path Safety**:
   - Always validate slug inputs against `/^[A-Za-z0-9_-]+$/` before touching the filesystem.
   - Guard against path traversal (`../`, `/etc/`, `\`).
3. **CI/CD Shell Safety**:
   - Never interpolate untrusted LLM outputs or user parameters directly into bash commands.
   - Buffer to temporary files and use `--body-file` or piped inputs.

---

## 3. Behavioral Telemetry & TraceForge-X Guidelines

- When extending telemetry spans, follow OpenTelemetry (OTel) naming conventions (`http.method`, `llm.model`, `cache.hit`, `db.system`).
- Keep AI-generated hypotheses clearly separated from verified empirical evidence.
- Every hypothesis must declare an explicit `refutationCriteria` to remain scientifically falsifiable.

---

## 4. Verification Routine Before Commits

Always ensure all four quality gates pass:
```bash
npm run lint       # ESLint must return 0 errors, 0 warnings
npm run typecheck  # TypeScript compiler check
npm test           # Node native test runner (tests/*.test.mjs)
npm run build      # Next.js static HTML export build (./out)
```
