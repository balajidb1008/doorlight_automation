# Project Glossary

> Definitions of terms, abbreviations, and IDs used in this project.

## Lifecycle Terms

| Term | Definition |
|------|-----------|
| Spec | Feature specification — defines what the feature is |
| Plan | Test plan — defines how to test a feature |
| POM | Page Object Model — class that wraps a page's selectors and actions |
| DOM Map | Structured JSON capture of a page's interactive elements |
| Healer | Process that fixes failing tests one at a time |

## ID Prefixes

| Prefix | Meaning | Example |
|--------|---------|---------|
| SPEC | Feature specification | SPEC-001 |
| PLAN | Test plan | PLAN-001 |
| UF | User flow | UF-001 |
| UI | UI element | UI-001 |
| API | API contract | API-001 |
| EC | Edge case | EC-001 |
| A | Assertion | A-001 |
| VAL | Validation | VAL-001 |
| TD | Test data | TD-001 |
| DEC | Decision | DEC-001 |

## Status Values

| Status | Used In | Meaning |
|--------|---------|---------|
| DRAFT | Spec, Plan | Initial creation |
| REVIEW | Spec, Plan | Under review |
| APPROVED | Spec, Plan | Ready for next step |
| REJECTED | Spec, Plan | Needs rework |
| NOT_STARTED | Feature summary | No work begun |
| SPEC_DONE | Feature summary | Spec approved |
| PLAN_DONE | Feature summary | Plan approved |
| TESTS_GENERATED | Feature summary | Code generated, not yet run |
| PASSING | Feature summary | All tests pass |
| FAILING | Feature summary | Some tests fail |

## Assertion Types

| Type | Meaning |
|------|---------|
| visible | Element is visible on page |
| hidden | Element is not visible |
| text | Element has exact text |
| contain-text | Element contains text |
| url | Page URL matches |
| title | Page title matches |
| count | Number of elements matches |
| attribute | Element attribute matches |
| value | Input value matches |
| checked | Checkbox is checked |
| enabled | Element is enabled |
| disabled | Element is disabled |
| api-status | API response status code |
| api-body | API response body content |
| screenshot | Visual regression match |
