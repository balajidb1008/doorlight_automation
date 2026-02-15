# Test Plan: <Feature Name>

## Metadata

| Field    | Value                              |
|----------|------------------------------------|
| Plan ID  | PLAN-<NNN>                         |
| Spec ID  | SPEC-<NNN>                         |
| Feature  | <Feature Name>                     |
| Author   | <Name>                             |
| Created  | <YYYY-MM-DD>                       |
| Status   | DRAFT / REVIEW / APPROVED          |
| Priority | P0 / P1 / P2 / P3                 |

---

## Objective

<!-- Why are we testing this? What risk does it mitigate? -->

---

## Scope

### In Scope
- <What IS covered>

### Out of Scope
- <What is NOT covered — prevents scope creep>

---

## Page Objects Required

<!-- List pages that need POM classes — reuse existing, create new only if needed -->

| Page | File | Exists? | Selectors From |
|------|------|---------|----------------|
| <Page name> | `pages/<feature>.page.ts` | Yes / No | SPEC-<NNN> UI Elements |

---

## Reusable Functions Needed

<!-- Identify shared logic — reuse existing, create new only if needed -->

| Function | File | Exists? | Description |
|----------|------|---------|-------------|
| `<functionName>()` | `utils/test-helpers.ts` | Yes / No | <What it does> |

---

## Test Cases

| # | Test Case | Spec Ref | Type | Priority | Assertions |
|---|-----------|----------|------|----------|------------|
| 1 | <Description of test case> | UF-001 | functional | P0 | visible, text, url |
| 2 | <Description of test case> | EC-001 | edge-case | P1 | text, attribute |

---

## Assertions Summary

<!-- Consolidated list of ALL assertions across all test cases -->

| ID | Test Case # | Type | Target (Selector) | Expected | Spec Ref |
|----|-------------|------|--------------------|----------|----------|
| A-001 | 1 | visible | `[data-testid="<id>"]` | visible | UF-001 |
| A-002 | 1 | text | `[data-testid="<id>"]` | `"Welcome"` | UF-001 |
| A-003 | 2 | attribute | `[data-testid="<id>"]` | `disabled` | EC-001 |

---

## Test Data Requirements

| ID | Description | Data | Used In |
|----|-------------|------|---------|
| TD-001 | <Data set description> | `{ "field": "value" }` | UF-001 |

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
