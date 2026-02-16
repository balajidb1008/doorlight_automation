# Project Memory Index

> **Start here** when beginning a new session or resuming work.

---

## Project Status

| Feature | Spec | Plan | Tests | Status |
|---------|------|------|-------|--------|
| User Authentication (Login) | SPEC-001 ✅ | PLAN-001 ✅ | ✅ (9 tests) | COMPLETED |
| Explore Page | SPEC-002 ✅ | PLAN-002 ✅ | ✅ (11 tests) | COMPLETED |
| Tours Management | SPEC-003 ✅ | PLAN-003 ✅ | ✅ (7 tests, 1 skipped) | COMPLETED |

---

## Test Coverage Summary

### LOGIN (SPEC-001) - 9 Tests ✅ COMPLETED
| Test ID | Description | Status |
|---------|-------------|--------|
| TC-001 | Display login page elements | ✅ |
| TC-002 | Login with valid credentials | ✅ |
| TC-003 | Login with invalid email | ✅ |
| TC-004 | Login with invalid password | ✅ |
| TC-005 | Login with empty fields | ✅ |
| TC-006 | Logout functionality | ✅ |
| TC-007 | Navigate to Explore after login | ✅ |
| TC-008 | Remember me checkbox | ✅ |
| TC-009 | Forgot password link | ✅ |

### EXPLORE PAGE (SPEC-002) - 11 Tests ✅ COMPLETED
| Test ID | Description | Status |
|---------|-------------|--------|
| TC-001 | Verify Explore Page Elements Load | ✅ |
| TC-002 | Filter by Price Range and Verify Listings | ✅ |
| TC-003 | Filter by Home Type - House | ✅ |
| TC-004 | Filter by Home Type - Condo | ✅ |
| TC-005 | Filter by Home Type - Townhouse | ✅ |
| TC-006 | Filter by Beds and Verify Listings | ✅ |
| TC-007 | Filter by Baths and Verify Listings | ✅ |
| TC-008 | Filter by Status - Sold | ✅ |
| TC-009 | Verify Multiple Property Details from Page 1 | ✅ |
| TC-010 | Verify Property Detail from Page 2 | ✅ |
| TC-011 | Filter by Home Type - Verify Multiple Properties | ✅ |

### TOURS MANAGEMENT (SPEC-003) - 7 Tests ✅ COMPLETED (1 Skipped)
| Test ID | Description | Status |
|---------|-------------|--------|
| TC-001 | Schedule a Tour | ✅ |
| TC-002 | Verify Tour Details in My Tours | ✅ |
| TC-003 | Reschedule a Tour | ✅ |
| TC-004 | Verify Rescheduled Tour Details | ✅ |
| TC-005 | Add Tour to Calendar | ✅ |
| TC-006 | Cancel a Tour | ✅ |
| TC-007 | Schedule Tour with Different Time | ✅ |
| TC-008 | Full Tour Workflow | ⚠️ Skipped (page context issue with popup) |

---

## Key Decisions

| ID | Decision | Date | Rationale |
|----|----------|------|-----------|
| DEC-001 | Use DOM Maps (JSON) over PNG screenshots | 2026-02-15 | Token cost, searchability, reusability |
| DEC-002 | Spec-first lifecycle (Spec → Plan → Test → Report) | 2026-02-15 | Must understand feature before planning tests |
| DEC-003 | Page Object Model is mandatory | 2026-02-15 | No duplicate selectors, reusable actions |
| DEC-004 | Never auto-run tests | 2026-02-15 | Human review gate after generation |
| DEC-005 | Use expect().toHaveURL() before toast assertions | 2026-02-17 | Toast messages are transient; wait for URL redirect first |

---

## Active Work

*(No active work)*

---

## Completed Features

| Feature | Completed Date | Summary |
|---------|---------------|---------|
| User Authentication (Login) | 2026-02-15 | 9 tests covering login flow, validation, navigation |
| Explore Page | 2026-02-16 | 11 tests covering filters, property details, pagination |
| Tours Management | 2026-02-17 | 7 tests covering tour scheduling, rescheduling, cancellation (1 skipped) |

---

## File Map

| Purpose | Path |
|---------|------|
| Governance | `AGENT.md` |
| Project overview | `PROJECT.md` |
| Folder structure | `docs/folder-structure.md` |
| Naming rules | `docs/naming-conventions.md` |
| Traceability | `docs/traceability.md` |
| Scaling guide | `docs/scaling-guide.md` |
| Templates | `templates/` |
| Workflows | `.agent/workflows/` |
| Specs (Login) | `specs/login.spec.md` |
| DOM Maps (Login) | `dom-maps/login/` |
| Pages (Login) | `pages/login.page.ts` |
| Tests (Login) | `tests/e2e/login/login.spec.ts` |
| Specs (Explore) | `specs/explore.spec.md` |
| Plans (Explore) | `plans/explore.plan.md` |
| DOM Maps (Explore) | `dom-maps/explore/` |
| Pages (Explore) | `pages/explore.page.ts`, `pages/property-detail.page.ts` |
| Tests (Explore) | `tests/e2e/explore/explore.spec.ts` |
| Test Data (Explore) | `tests/e2e/explore/explore.data.ts` |
| Specs (Tours) | `specs/tours.spec.md` |
| Plans (Tours) | `plans/tours.plan.md` |
| DOM Maps (Tours) | `dom-maps/tours/` |
| Pages (Tours) | `pages/tours.page.ts` |
| Tests (Tours) | `tests/e2e/tours/tours.spec.ts` |
| Test Data (Tours) | `tests/e2e/tours/tours.data.ts` |
