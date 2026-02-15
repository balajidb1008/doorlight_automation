---
description: Run Playwright tests (user-triggered only)
---

# Run Tests Workflow

## Prerequisites
- Tests have been generated and reviewed
- User has explicitly requested test execution (e.g., "run tests", "run the test")

## Steps

1. **Confirm user intent**
   - This workflow runs ONLY when user explicitly asks
   - Never auto-run after generation

2. **Run tests**
   - For a specific feature:
     ```
     npx playwright test tests/e2e/<feature>/
     ```
   - For all tests:
     ```
     npx playwright test
     ```
   - For tagged tests:
     ```
     npx playwright test --grep @smoke
     ```

3. **Read results**
   - Parse the test output
   - Count passed / failed / skipped

4. **Report to user**
   - If all pass:
     ```
     ✅ All tests passed for <feature>.
     Passed: X | Failed: 0 | Skipped: 0
     ```
   - If some fail:
     ```
     ⚠️ Some tests failed for <feature>.
     Passed: X | Failed: Y | Skipped: Z
     
     Failed tests:
     1. <test name> — <failure reason>
     2. ...
     
     Say 'fix' or 'heal' to fix failures one by one.
     ```

5. **Wait for user**
   - Do NOT auto-heal failures
   - Wait for user to say "fix", "heal", "run and fix", etc.

6. **Update memory**
   - Update `memory/features/<feature>.summary.md` with test results
   - Update `memory/index.md` project status table

## Output
- Test execution results (console output)
- Updated `memory/features/<feature>.summary.md`
- Updated `memory/index.md`
