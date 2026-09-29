/**
 * Utility functions for payment verification and Stripe navigation safety.
 */

/**
 * Validates whether a target URL is strictly hosted on checkout.stripe.com
 */
export function isStripeCheckoutUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "https:" &&
      (parsed.hostname === "checkout.stripe.com" || parsed.hostname.endsWith(".stripe.com"))
    );
  } catch {
    return false;
  }
}

/**
 * Extracts and validates Stripe Checkout Session ID from search parameters.
 * Only accepts valid session IDs (e.g. starting with cs_).
 */
export function getValidStripeSessionId(sessionId: string | null | undefined): string | null {
  if (!sessionId) return null;
  const trimmed = sessionId.trim();
  if (!trimmed) return null;
  // Ensure valid format without injection characters
  if (/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
    return trimmed;
  }
  return null;
}
