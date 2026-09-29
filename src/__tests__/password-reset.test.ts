import { describe, test, beforeEach } from "node:test";
import assert from "node:assert";
import {
  PASSWORD_REGEX,
  passwordValidationSchema,
  setMemoryResetToken,
  getMemoryResetToken,
  clearMemoryResetToken,
} from "../utils/authFlows";

describe("Password Reset & Security Validation Utility", () => {
  beforeEach(() => {
    clearMemoryResetToken();
  });

  test("rejects passwords shorter than 8 characters", () => {
    assert.strictEqual(PASSWORD_REGEX.test("Pass1@"), false);
  });

  test("rejects passwords without uppercase letters", () => {
    assert.strictEqual(PASSWORD_REGEX.test("password123@"), false);
  });

  test("rejects passwords without lowercase letters", () => {
    assert.strictEqual(PASSWORD_REGEX.test("PASSWORD123@"), false);
  });

  test("rejects passwords without numbers", () => {
    assert.strictEqual(PASSWORD_REGEX.test("Password@"), false);
  });

  test("rejects passwords without special characters", () => {
    assert.strictEqual(PASSWORD_REGEX.test("Password123"), false);
  });

  test("accepts valid passwords matching backend policy", () => {
    assert.strictEqual(PASSWORD_REGEX.test("SecurePass123!"), true);
    assert.strictEqual(PASSWORD_REGEX.test("Valid#Password2026"), true);
  });

  test("zod schema validates strong passwords correctly", () => {
    const valid = passwordValidationSchema.safeParse("StrongPass123!");
    assert.strictEqual(valid.success, true);

    const invalid = passwordValidationSchema.safeParse("weak");
    assert.strictEqual(invalid.success, false);
  });

  test("manages reset token strictly in component memory", () => {
    assert.strictEqual(getMemoryResetToken(), null);

    setMemoryResetToken("test-reset-token-12345");
    assert.strictEqual(getMemoryResetToken(), "test-reset-token-12345");

    clearMemoryResetToken();
    assert.strictEqual(getMemoryResetToken(), null);
  });
});
