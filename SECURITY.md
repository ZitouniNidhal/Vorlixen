# Security Policy

NexaForge takes software security seriously. We welcome responsible security reports to help keep our users and contributors safe.

## Supported Versions

Only the latest commit on the default branch (`master` / `main`) receives active security patches.

| Version / Branch | Supported          |
| ---------------- | ------------------ |
| `master` / `main`| :white_check_mark: |
| Older releases   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within NexaForge, **please do not disclose it publicly in an open GitHub issue or discussion**.

Instead, follow responsible disclosure:

1. Send an email to the maintainer at **88096539+ZitouniNidhal@users.noreply.github.com** with the subject line `[SECURITY] NexaForge Vulnerability Report`.
2. Include:
   - A clear description of the vulnerability.
   - Exact steps or a Proof-of-Concept (PoC) to reproduce the issue safely.
   - The potential impact and attack vector (e.g. XSS, path traversal, injection).
   - Any proposed remediation or patch if available.
3. You will receive an acknowledgment within **48–72 hours**.
4. We will coordinate a fix, conduct internal verification, and publish a patch alongside appropriate security advisory attribution.

## Scope and Principles

- **Stored / Reflected XSS**: Strict sanitization of markdown inputs (`remark-html` with `sanitize: true`) is enforced.
- **Path Traversal**: Post slug validation (`/^[A-Za-z0-9_-]+$/`) restricts all filesystem operations to safe filenames.
- **CI / Action Injection**: Scripts must buffer untrusted external inputs into temporary files rather than concatenating directly into shell strings.
- **Privacy**: Do not commit secrets, private tokens, or test credentials.
