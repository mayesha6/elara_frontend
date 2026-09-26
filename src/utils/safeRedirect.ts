/**
 * Sanitizes and validates redirect URLs to prevent Open Redirect vulnerabilities.
 * Only relative paths starting with '/' (and not '//') or approved Elara domains are allowed.
 */
export function getSafeRedirectUrl(url: string | null | undefined, fallback: string = "/"): string {
  if (!url) return fallback;
  const trimmed = url.trim();
  if (!trimmed) return fallback;

  // Allow relative URLs like '/dashboard' or '/pricing' but disallow protocol-relative URLs like '//evil.com'
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
    return trimmed;
  }

  // Allow approved absolute URLs on Elara domains or localhost
  try {
    const parsed = new URL(trimmed);
    const allowedDomains = ["elara.com", "dashboard.elara.com", "localhost", "127.0.0.1"];
    const isAllowed = allowedDomains.some(domain => 
      parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`)
    );
    if (isAllowed) {
      return trimmed;
    }
  } catch {
    // Parsing failed, invalid URL
  }

  return fallback;
}
