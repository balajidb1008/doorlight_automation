# Traceability Guide

> Every test must be traceable back to its spec and plan. This document defines the mapping model.

---

## Traceability Chain

```
Feature Spec (SPEC-001)
  └── Test Plan (PLAN-001)
       ├── Test Case #1 → UF-001 (User Flow)
       │    ├── Assertion A-001 → Report line
       │    ├── Assertion A-002 → Report line
       │    └── Assertion A-003 → Report line
       ├── Test Case #2 → EC-001 (Edge Case)
       │    └── Assertion A-004 → Report line
       └── Acceptance Criteria
            └── Aggregated pass/fail from linked assertions
```

---

## How Traceability Works

### 1. Spec → Plan

The test plan's `Spec ID` field links to the feature spec.

```markdown
| Plan ID | PLAN-001 |
| Spec ID | SPEC-001 |   ← Link to spec
```

### 2. Plan → Test

Every test file header and test block references its plan and spec:

```typescript
// PLAN: PLAN-001
// SPEC: SPEC-001

test('should display login form', {
  annotation: [
    { type: 'spec', description: 'SPEC-001' },
    { type: 'flow', description: 'UF-001' },
  ],
}, async ({ page }) => {
  // ...
});
```

### 3. Test → Assertions

Every assertion in the test references its Assertion ID from the plan:

```typescript
// ASSERTION: A-001 | visible
await expect(loginPage.form).toBeVisible();

// ASSERTION: A-002 | text
await expect(loginPage.heading).toHaveText('Sign In');
```

### 4. Assertions → Report

Playwright annotations appear in HTML and JSON reports, making it easy to trace any failure back through:

```
Report failure line → test name → SPEC-001 / UF-001 → A-001 → Plan → Spec
```

---

## Verification Checklist

When completing a feature, verify:

- [ ] Every spec user flow has at least one test case in the plan
- [ ] Every test case in the plan has a corresponding `test()` block
- [ ] Every assertion in the plan has a corresponding `expect()` in the test
- [ ] Every `test()` block has annotation linking to spec and flow
- [ ] Every `expect()` has a comment with its Assertion ID
- [ ] Acceptance criteria in the plan aggregate linked assertion results

---

## ID Cross-Reference Table

Use this table to quickly map between spec, plan, and test:

| Spec Ref | Plan Test Case # | Assertion IDs | Test File | Test Name |
|----------|-----------------|---------------|-----------|-----------|
| UF-001 | 1 | A-001, A-002 | `<feature>.spec.ts` | `'should ...'` |
| EC-001 | 2 | A-003 | `<feature>.spec.ts` | `'should handle ...'` |
