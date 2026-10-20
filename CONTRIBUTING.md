# Contributing to NexaForge

Thank you for your interest in contributing to NexaForge! We welcome contributions from developers, researchers, and technical writers of all experience levels.

This guide outlines our development workflow, contribution guidelines, and quality standards to help you get started smoothly.

---

## Code of Conduct

All contributors and participants are expected to follow our [Code of Conduct](./CODE_OF_CONDUCT.md). Please treat others with respect and constructive professionalism.

---

## Getting Started

### Prerequisites

- **Node.js**: `v20.x` or `v21.x` (LTS recommended)
- **npm**: `v10.x` or higher
- **Git**: `v2.30` or higher

### Local Development Setup

1. **Fork the repository** on GitHub.
2. **Clone your fork**:
   ```bash
   git clone https://github.com/<your-username>/nexaforge.git
   cd nexaforge
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Making a Contribution

### 1. Find or Propose an Issue
- Check existing [GitHub Issues](https://github.com/ZitouniNidhal/nexaforge/issues) for tasks labeled `good first issue` or `help wanted`.
- If you're proposing a new feature or architectural change, please open a **Feature Proposal** or **Research Experiment** issue first so we can align on design before you write code.

### 2. Create a Feature Branch
Use descriptive branch names with conventional prefixes:
- `feat/add-trace-filter-debounce`
- `fix/archive-date-parsing`
- `docs/improve-ebpf-guide`
- `test/add-trace-stats-cases`

```bash
git checkout -b feat/your-feature-name
```

### 3. Verification & Quality Gates
Before submitting a pull request, ensure all local verification checks pass:

```bash
# 1. Linting (ESLint v9)
npm run lint

# 2. Strict Type Checking (TypeScript 5)
npm run typecheck

# 3. Unit Tests (Native Node test runner)
npm test

# 4. Production Build & Static HTML Export
npm run build
```

All 4 commands must exit cleanly without errors or warnings.

---

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```text
<type>(<scope>): <short description in imperative present tense>

[optional body describing motivation and trade-offs]

[optional footer(s), e.g. Closes #123]
```

**Common types**:
- `feat`: A new user-facing feature or capability
- `fix`: A bug fix or security patch
- `docs`: Documentation updates
- `test`: Adding or updating test cases
- `refactor`: Code changes that neither fix a bug nor add a feature
- `ci`: Changes to CI/CD workflows or build configurations

---

## Pull Request Guidelines

1. **Keep PRs focused**: Address a single problem or feature per pull request. Smaller, cohesive PRs are reviewed and merged significantly faster.
2. **Fill out the PR Template**: Describe the problem solved, testing steps taken, and attach screenshots for UI modifications.
3. **Continuous Integration**: Ensure all automated checks in GitHub Actions pass. If a check fails, inspect the workflow logs and push fixes directly to your branch.
4. **Code Review**: A maintainer will review your pull request. Be prepared to discuss implementation trade-offs or address feedback constructively.

---

## Project Structure

```text
nexaforge/
├── .github/              # GitHub Actions workflows & issue templates
├── content/              # Markdown content & engineering workflows
│   └── posts/            # Markdown articles with YAML frontmatter
├── public/               # Static assets & icons
├── src/
│   ├── app/              # Next.js App Router pages & layouts
│   │   ├── about/        # About page
│   │   ├── archives/     # Chronological post archives
│   │   ├── posts/        # Blog & workflow listing and dynamic reader
│   │   └── traceforge/   # TraceForge-X distributed tracing console
│   ├── components/       # Reusable React components (Navbar, Footer, Providers)
│   └── lib/              # Shared utilities, post reader, and telemetry models
└── tests/                # Automated unit test suites (node:test)
```

---

## Questions and Support

If you need help or have questions:
- Open a GitHub Discussion for architectural queries or general ideas.
- File an Issue for reproducible bugs.
- Reach out to the maintainers via the links in the repository footer.
