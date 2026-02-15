---
description: Heal failing tests one by one (user-triggered only)
---

# Heal Tests Workflow

## Prerequisites
- Tests have been run and some have failed
- User has explicitly requested healing (e.g., "fix", "heal", "run and fix")

## Steps

1. **Confirm user intent**
   - This workflow runs ONLY when user explicitly asks
   - Never auto-heal

2. **Gather failures**
   - List all failed tests sorted by file path, then line number
   - For each failure, record:
     - Test name
     - File path and line
     - Error message
     - Stack trace

3. **Heal one test at a time**
   ```
   FOR each failed test (in order):
   
     a. Read the failure message and stack trace
     
     b. Categorize root cause:
        - SELECTOR_CHANGED  → POM selector outdated
        - TIMING_ISSUE      → Need explicit wait condition
        - DATA_MISMATCH     → Test data doesn't match app state
        - ASSERTION_FAILED  → Assertion expectation wrong or logic error
        - API_CHANGE        → API contract changed
        - ENV_ISSUE         → Environment/config problem
     
     c. Apply the MINIMUM fix:
        - SELECTOR_CHANGED  → Update ONLY the affected selector in POM
        - TIMING_ISSUE      → Add waitForSelector/waitForResponse (NOT waitForTimeout)
        - DATA_MISMATCH     → Update the .data.ts file
        - ASSERTION_FAILED  → Check spec, fix assertion or test logic
        - API_CHANGE        → Update spec AND test
        - ENV_ISSUE         → Escalate to human
     
     d. Re-run ONLY the healed test:
        npx playwright test <file> -g "<test name>"
     
     e. If FIXED:
        - Log in healer/healer.log.md
        - Move to next failure
     
     f. If NOT FIXED (attempt 1):
        - Try one more approach
        - Re-run again
     
     g. If NOT FIXED (attempt 2):
        - Log as ESCALATED in healer/healer.log.md
        - Report to user: "Could not auto-fix: <test name>. Needs manual review."
        - Move to next failure
   
   END
   ```

4. **Regression check**
   - After ALL individual heals are complete:
     ```
     npx playwright test tests/e2e/<feature>/
     ```
   - Report full results to user

5. **Update healer log**
   - Append to `healer/healer.log.md`:
     ```markdown
     ## Heal Session: <YYYY-MM-DD HH:MM>
     
     | Test | Root Cause | Fix Applied | Attempts | Result |
     |------|-----------|-------------|----------|--------|
     | <name> | SELECTOR_CHANGED | Updated POM selector | 1 | FIXED |
     | <name> | ENV_ISSUE | — | 2 | ESCALATED |
     ```

6. **Update memory**
   - Update `memory/features/<feature>.summary.md`
   - Update `memory/index.md`

## Healing Rules
- **ONE test at a time** — never batch fixes
- **MINIMUM change** — smallest possible fix
- **Max 2 attempts** per test — then escalate
- **Never add `page.waitForTimeout()`**
- **Never change POM selectors** without checking all tests that use them
- **Always log** every heal action

## Output
- Fixed test files (minimal changes)
- Updated POM classes (if selectors changed)
- Updated `healer/healer.log.md`
- Updated `memory/` files
