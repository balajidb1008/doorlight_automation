---
description: Generate Playwright test code and POM classes from an approved plan
---

# Generate Tests Workflow

## Prerequisites
- Feature spec (`specs/<feature>.spec.md`) is APPROVED
- Test plan (`plans/<feature>.plan.md`) is APPROVED
- `AGENT.md` rules have been read

## Steps

1. **Validate gates**
   - Verify spec status is `APPROVED`
   - Verify plan status is `APPROVED`
   - If either is NOT approved → STOP and ask user

2. **Read context**
   - Read the approved spec and plan
   - Read `docs/naming-conventions.md`
   - Read `docs/folder-structure.md`
   - Check `pages/` for existing POM classes
   - Check `utils/` for existing helpers
   - Read DOM maps from `dom-maps/<feature>/`

3. **Generate Page Object (if needed)**
   - If plan identifies a new POM class needed:
     - Create `pages/<feature>.page.ts`
     - Add selectors from spec UI Elements
     - Add reusable action methods
     - Add reusable assertion methods
   - If POM already exists → reuse, add new selectors/methods only

4. **Generate test data file**
   - Create `tests/e2e/<feature>/<feature>.data.ts`
   - Export test data objects from plan's Test Data Requirements
   - Never hardcode data in test files

5. **Generate test file**
   - Create `tests/e2e/<feature>/<feature>.spec.ts`
   - Follow structure from `templates/test.template.md`
   - File header: `// PLAN: PLAN-NNN` and `// SPEC: SPEC-NNN`
   - One `test()` per test case in the plan
   - Annotations linking to spec and flow
   - Arrange-Act-Assert pattern
   - Assertion comments: `// ASSERTION: A-NNN | type`
   - Use POM class for all selectors and actions
   - Import test data from `.data.ts`

6. **Generate reusable helpers (if needed)**
   - If plan identifies new helper functions:
     - Add to appropriate file in `utils/`
   - If helpers already exist → reuse

7. **Validate generated code**
   - Every `test()` has at least one assertion
   - Every assertion references its Assertion ID
   - No hardcoded selectors (all in POM)
   - No hardcoded test data (all in `.data.ts`)
   - No `page.waitForTimeout()`
   - No unrelated files modified

8. **PAUSE — Do NOT run tests**
   - Output: `"✅ Tests generated for <feature>. Ready to run. Say 'run tests' to execute."`
   - STOP and wait for user instruction

## Output
- `pages/<feature>.page.ts` (new or updated)
- `tests/e2e/<feature>/<feature>.spec.ts`
- `tests/e2e/<feature>/<feature>.data.ts`
- `utils/*` (if new helpers needed)
