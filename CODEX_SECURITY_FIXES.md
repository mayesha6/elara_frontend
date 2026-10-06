# Security corrections

This corrected review copy preserves the submitted Frontend 9 archive separately.

- Production dependencies were updated to remove the identified source-map-js advisory.
- Registration and password-creation validation now use the shared strong-password policy.
- Login only requires a non-empty password so legacy authentication is not incorrectly blocked.
- Dependency audit, lint, TypeScript, 20 tests, and production build were rerun successfully.

Staging behavior and external service integration must still be validated by the authorized development team before production use.
