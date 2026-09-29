import { z } from "zod";

/**
 * Strong password pattern:
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one digit
 * - At least one approved special character (@$!%*?&#)
 */
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

export const passwordValidationSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(
    PASSWORD_REGEX,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&#)"
  );

/**
 * In-memory container for password reset token.
 * Prevents reset token from being stored in localStorage, cookies, or URL query params.
 */
let memoryResetToken: string | null = null;

export function setMemoryResetToken(token: string | null): void {
  memoryResetToken = token;
}

export function getMemoryResetToken(): string | null {
  return memoryResetToken;
}

export function clearMemoryResetToken(): void {
  memoryResetToken = null;
}
