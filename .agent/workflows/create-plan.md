---
description: Create a test plan from an approved feature spec
---

# Create Plan Workflow

## Prerequisites
- Feature spec (`specs/<feature>.spec.md`) exists and is APPROVED
- `AGENT.md` rules have been read

## Steps

1. **Read the approved spec**
   - Read `specs/<feature>.spec.md`
   - Verify status is `APPROVED`
   - If NOT approved → STOP and ask user to approve the spec first

2. **Read context**
   - Read `memory/index.md` for existing features and POM classes
   - Read `docs/naming-conventions.md` for naming rules
   - Check `pages/` for existing POM classes that can be reused
   - Check `utils/` for existing helper functions that can be reused

3. **Create the plan file**
   - Copy `templates/test.plan.template.md` to `plans/<feature>.plan.md`
   - Fill in all sections:
     - Metadata (assign next PLAN-NNN ID, link SPEC-NNN)
     - Objective
     - Scope (in/out) — do NOT expand beyond spec
     - Page objects required (mark existing vs new)
     - Reusable functions needed (mark existing vs new)
     - Test cases — one per user flow + one per edge case
     - **Assertions summary** — every assertion gets an ID (A-NNN)
     - Test data requirements
     - Acceptance criteria

4. **Validate the plan**
   - Every spec user flow has at least one test case
   - Every spec edge case has at least one test case
   - Every test case has at least one assertion in the summary
   - POM classes are identified (reuse first, new only if needed)
   - No scope expansion beyond the spec

5. **Present for review**
   - Show the completed plan to the user
   - Wait for approval (status → `APPROVED`)

## Output
- `plans/<feature>.plan.md`
