---
description: Create a feature spec by browsing the app, capturing DOM maps, and documenting the feature
---

# Create Spec Workflow

## Prerequisites
- Application is running and accessible
- Feature name and entry URL are known

## Steps

1. **Read governance rules**
   - Read `AGENT.md` for all rules
   - Read `docs/folder-structure.md` for target layout
   - Read `docs/naming-conventions.md` for naming rules
   - Read `memory/index.md` for existing feature state

2. **Check for existing DOM maps**
   - Check `dom-maps/<feature>/` for previously captured pages
   - Reuse existing maps — do NOT re-capture visited pages

3. **Browse the feature's pages**
   - Navigate to the feature's entry URL using the browser
   - For EACH page in the user flow:
     a. If DOM map exists → reuse it
     b. If DOM map does NOT exist → capture a new one:
        - Extract all interactive elements (buttons, inputs, links, forms)
        - Record `data-testid` attributes (prefer these as selectors)
        - Fall back to CSS selectors if no testid
        - Save to `dom-maps/<feature>/<page>.dom.json`
     c. If the page has multiple states (error, loaded, empty):
        - Capture each state as `<page>.<state>.dom.json`
   - Optional: take a PNG screenshot ONLY if visual ambiguity exists

4. **Create the spec file**
   - Copy `templates/feature.spec.template.md` to `specs/<feature>.spec.md`
   - Fill in all sections:
     - Metadata (assign next SPEC-NNN ID)
     - Snapshots table (link DOM maps)
     - User flows with steps and **assertions**
     - UI elements from DOM maps
     - API contracts (if applicable)
     - Edge cases
     - Tags

5. **Validate the spec**
   - Every user flow has at least one assertion
   - Every UI element has a valid selector
   - Every edge case references a user flow
   - Spec status is set to `DRAFT`

6. **Present for review**
   - Show the completed spec to the user
   - Wait for approval (status → `APPROVED`)

## Output
- `dom-maps/<feature>/<page>.dom.json` (one or more)
- `specs/<feature>.spec.md`
