import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

test("Security: next.config.ts configures essential security headers", () => {
  const configPath = path.join(process.cwd(), "next.config.ts");
  const content = fs.readFileSync(configPath, "utf8");

  const requiredHeaders = [
    "X-Frame-Options",
    "X-Content-Type-Options",
    "Referrer-Policy",
    "Permissions-Policy",
  ];

  for (const header of requiredHeaders) {
    assert.ok(
      content.includes(header),
      `next.config.ts is missing required security header: ${header}`
    );
  }
});

test("Security: path traversal prevention regex rejects malicious slugs", () => {
  const slugRegex = /^[A-Za-z0-9_-]+$/;

  const maliciousPayloads = [
    "../secret",
    "..\\windows\\system32",
    "/etc/passwd",
    "post/subpost",
    "slug?param=1",
    "slug;rm -rf /",
    "slug<script>",
    "slug\0nullbyte",
  ];

  for (const payload of maliciousPayloads) {
    assert.strictEqual(
      slugRegex.test(payload),
      false,
      `Malicious slug was not rejected: ${payload}`
    );
  }
});
