# Test Plan: User Authentication (Login)

## Metadata

| Field    | Value                              |
|----------|------------------------------------|
| Plan ID  | PLAN-001                          |
| Spec ID  | SPEC-001                          |
| Feature  | User Authentication (Login)       |
| Author   | AI Test Agent                     |
| Created  | 2026-02-15                        |
| Status   | APPROVED                          |
| Priority | P0                                |

---

## Objective

Verify that users can successfully authenticate using email/password credentials, and that proper error handling exists for invalid credentials, empty fields, and navigation links.

---

## Scope

### In Scope
- Login form visibility and element presence
- Valid credential login flow
- Invalid credential error handling
- Empty field validation
- Navigation to Sign Up page
- Navigation to Forgot Password page
- Navigation to Terms and Privacy Policy pages

### Out of Scope
- OAuth/Google Sign-In functionality (UI exists but not tested)
- Password reset flow (navigation only)
- Session persistence beyond login
- API-level authentication testing (UI flows only)
- Forgot password form testing

---

## Page Objects Required

| Page | File | Exists? | Selectors From |
|------|------|---------|----------------|
| SignIn | `pages/login.page.ts` | No | SPEC-001 UI Elements |

---

## Reusable Functions Needed

| Function | File | Exists? | Description |
|----------|------|---------|-------------|
| `navigateToSignIn()` | `utils/navigation.ts` | No | Navigate to sign-in page |
| `login()` | `pages/login.page.ts` | No | Perform login with credentials |
| `clearAuth()` | `utils/auth.ts` | No | Clear authentication state |

---

## Test Cases

| # | Test Case | Spec Ref | Type | Priority | Assertions |
|---|-----------|----------|------|----------|------------|
| 1 | Login page loads with all elements visible | UF-001 | functional | P0 | visible |
| 2 | Login with valid credentials succeeds | UF-001 | functional | P0 | url |
| 3 | Login with invalid credentials shows error | UF-002 | edge-case | P0 | url |
| 4 | Login with empty fields shows validation | UF-003 | edge-case | P0 | url |
| 5 | Navigate to Sign Up page | UF-004 | functional | P0 | url |
| 6 | Navigate to Forgot Password page | UF-005 | functional | P0 | url |
| 7 | Google Sign In button is visible | UF-001 | functional | P1 | visible |
| 8 | Terms link is visible and clickable | UF-001 | functional | P1 | visible |
| 9 | Privacy Policy link is visible and clickable | UF-001 | functional | P1 | visible |

---

## Assertions Summary

| ID | Test Case # | Type | Target (Selector) | Expected | Spec Ref |
|----|-------------|------|--------------------|----------|----------|
| A-001 | 1 | visible | `form` | visible | UF-001 |
| A-002 | 1 | visible | `input[name="email"]` | visible | UF-001 |
| A-003 | 1 | visible | `input[name="password"]` | visible | UF-001 |
| A-004 | 1 | visible | `button[type="submit"]:has-text("Sign in")` | visible | UF-001 |
| A-005 | 2 | url | — | not `/sign-in` | UF-001 |
| A-006 | 3 | url | `/sign-in` | stays on page | UF-002 |
| A-007 | 4 | url | `/sign-in` | stays on page | UF-003 |
| A-008 | 5 | url | contains `/sign-up` | UF-004 |
| A-009 | 6 | url | contains `/forgot-password` | UF-005 |
| A-010 | 7 | visible | `button:has-text("Continue with Google")` | visible | UF-001 |
| A-011 | 8 | visible | `a[href="/terms-services"]` | visible | UF-001 |
| A-012 | 9 | visible | `a[href="/privacy-policy"]` | visible | UF-001 |

---

## Test Data Requirements

| ID | Description | Data | Used In |
|----|-------------|------|---------|
| TD-001 | Valid login credentials | `{ email: "valid@test.com", password: "validpassword123" }` | Test 2 |
| TD-002 | Invalid login credentials | `{ email: "invalid@test.com", password: "wrongpassword" }` | Test 3 |
| TD-003 | Empty credentials | `{ email: "", password: "" }` | Test 4 |

---

## Acceptance Criteria

- [ ] All spec user flows have test cases
- [ ] All assertions from spec are covered in Assertions Summary
- [ ] All edge cases have test cases
- [ ] Page objects created / reused (no duplicate selectors)
- [ ] Reusable functions identified / created (no duplication)
- [ ] No scope expansion beyond spec

---

## Approval

| Approver | Date | Decision |
|----------|------|----------|
|          |      |          |
