import assert from "node:assert";
import { test, describe } from "node:test";
import { getSafeRedirectUrl } from "../utils/safeRedirect";

describe("Security & Customer Journey Validation", () => {
  describe("Open Redirect Protection (getSafeRedirectUrl)", () => {
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

    test("allows approved Elara domains", () => {
      assert.strictEqual(getSafeRedirectUrl("https://elara.com/dashboard"), "https://elara.com/dashboard");
      assert.strictEqual(getSafeRedirectUrl("https://dashboard.elara.com"), "https://dashboard.elara.com");
    });

    test("falls back cleanly on empty or null values", () => {
      assert.strictEqual(getSafeRedirectUrl(null), "/");
      assert.strictEqual(getSafeRedirectUrl(undefined), "/");
      assert.strictEqual(getSafeRedirectUrl(""), "/");
    });
  });
});
