import { describe, test } from "node:test";
import assert from "node:assert";
import { isStripeCheckoutUrl, getValidStripeSessionId } from "../utils/paymentVerification";
import { getSafeRedirectUrl } from "../utils/safeRedirect";

describe("Payment Verification & Stripe Security Helpers", () => {
  describe("isStripeCheckoutUrl", () => {
    test("accepts valid checkout.stripe.com HTTPS URLs", () => {
      assert.strictEqual(isStripeCheckoutUrl("https://checkout.stripe.com/c/pay/cs_test_12345"), true);
      assert.strictEqual(isStripeCheckoutUrl("https://sub.stripe.com/pay"), true);
    });

    test("rejects non-Stripe or insecure HTTP URLs", () => {
      assert.strictEqual(isStripeCheckoutUrl("http://checkout.stripe.com/pay"), false);
      assert.strictEqual(isStripeCheckoutUrl("https://evil-stripe.com/pay"), false);
      assert.strictEqual(isStripeCheckoutUrl("https://example.com/checkout"), false);
      assert.strictEqual(isStripeCheckoutUrl("invalid-url"), false);
      assert.strictEqual(isStripeCheckoutUrl(null), false);
    });
  });

  describe("getValidStripeSessionId", () => {
    test("extracts clean alphanumeric session IDs", () => {
      assert.strictEqual(getValidStripeSessionId("cs_test_a1b2c3d4e5"), "cs_test_a1b2c3d4e5");
      assert.strictEqual(getValidStripeSessionId("  cs_live_xyz123  "), "cs_live_xyz123");
    });

    test("returns null for invalid or malicious session ID strings", () => {
      assert.strictEqual(getValidStripeSessionId(""), null);
      assert.strictEqual(getValidStripeSessionId("cs_test_<script>"), null);
      assert.strictEqual(getValidStripeSessionId(null), null);
    });
  });

  describe("getSafeRedirectUrl", () => {
    test("allows safe relative paths", () => {
      assert.strictEqual(getSafeRedirectUrl("/dashboard"), "/dashboard");
      assert.strictEqual(getSafeRedirectUrl("/pricing"), "/pricing");
    });

    test("disallows protocol-relative open redirects", () => {
      assert.strictEqual(getSafeRedirectUrl("//malicious.com"), "/");
    });

    test("allows approved domains and fallbacks for unsafe domains", () => {
      assert.strictEqual(getSafeRedirectUrl("https://greetely.com/page"), "https://greetely.com/page");
      assert.strictEqual(getSafeRedirectUrl("https://checkout.stripe.com/pay"), "https://checkout.stripe.com/pay");
      assert.strictEqual(getSafeRedirectUrl("https://attacker.com"), "/");
    });
  });
});
