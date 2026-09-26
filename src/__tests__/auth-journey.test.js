import assert from "node:assert";
import { test, describe } from "node:test";

// Inline unit implementation check for safe redirect
function getSafeRedirectUrl(url, fallback = "/") {
  if (!url) return fallback;
  const trimmed = url.trim();
  if (!trimmed) return fallback;

  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    const allowedDomains = ["greetely.com", "dashboard.greetely.com", "localhost", "127.0.0.1"];
    const isAllowed = allowedDomains.some((domain) =>
      parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`)
    );
    if (isAllowed) {
      return trimmed;
    }
  } catch {
    // invalid URL
  }

  return fallback;
}

describe("Security & Customer Journey Automated Test Set", () => {
  describe("Open Redirect Protection", () => {
    test("allows safe relative paths", () => {
      assert.strictEqual(getSafeRedirectUrl("/pricing"), "/pricing");
      assert.strictEqual(getSafeRedirectUrl("/dashboard/user"), "/dashboard/user");
      assert.strictEqual(getSafeRedirectUrl("/recognition?page=1"), "/recognition?page=1");
    });

    test("disallows protocol-relative URLs (e.g. //evil.com)", () => {
      assert.strictEqual(getSafeRedirectUrl("//evil.com"), "/");
      assert.strictEqual(getSafeRedirectUrl("//attacker.org/phish"), "/");
    });

    test("disallows malicious external domain redirects", () => {
      assert.strictEqual(getSafeRedirectUrl("https://evil.com/login"), "/");
      assert.strictEqual(getSafeRedirectUrl("http://phishing-site.com"), "/");
    });

    test("allows approved Greetely domains", () => {
      assert.strictEqual(getSafeRedirectUrl("https://greetely.com/dashboard"), "https://greetely.com/dashboard");
      assert.strictEqual(getSafeRedirectUrl("https://dashboard.greetely.com"), "https://dashboard.greetely.com");
    });

    test("falls back cleanly on empty or null values", () => {
      assert.strictEqual(getSafeRedirectUrl(null), "/");
      assert.strictEqual(getSafeRedirectUrl(undefined), "/");
      assert.strictEqual(getSafeRedirectUrl(""), "/");
    });
  });
});
