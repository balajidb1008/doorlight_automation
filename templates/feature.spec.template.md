# Feature Spec: <Feature Name>

## Metadata

| Field       | Value                     |
|-------------|---------------------------|
| Spec ID     | SPEC-<NNN>                |
| Feature     | <Feature Name>            |
| Module      | <Application module>      |
| URL         | <Base URL or route>       |
| Author      | <Name>                    |
| Created     | <YYYY-MM-DD>              |
| Status      | DRAFT / REVIEW / APPROVED |

## Snapshots (DOM Maps)

<!-- Reference DOM maps captured during browser analysis -->

| Page | DOM Map | State | Screenshot (optional) |
|------|---------|-------|-----------------------|
| <Page name> | `dom-maps/<feature>/<page>.dom.json` | default | — |
| <Page name> | `dom-maps/<feature>/<page>.error.dom.json` | error | — |

---

## User Flows

### UF-001: <Flow Name>

**Description:** <What the user does end-to-end>

**Preconditions:**
- <Precondition 1>
- <Precondition 2>

**Steps:**

| # | Action | Target (Selector) | Value / Description |
|---|--------|--------------------|---------------------|
| 1 | navigate | `<URL>` | — |
| 2 | click | `[data-testid="<id>"]` | <What this does> |
| 3 | fill | `[data-testid="<id>"]` | `<test value>` |
| 4 | select | `[data-testid="<id>"]` | `<option value>` |
| 5 | wait | `[data-testid="<id>"]` | Wait for element visible |

**Assertions:**

| # | Type | Target (Selector) | Expected | Priority |
|---|------|--------------------|----------|----------|
| 1 | visible | `[data-testid="<id>"]` | Element is visible | P0 |
| 2 | text | `[data-testid="<id>"]` | `"Expected text"` | P0 |
| 3 | url | — | `/expected-route` | P0 |
| 4 | count | `<selector>` | `5` | P1 |
| 5 | attribute | `[data-testid="<id>"]` | `aria-disabled="false"` | P1 |
| 6 | api-response | `POST /api/endpoint` | `status: 200` | P0 |

**Postconditions:**
- <Expected state after flow>

---

## UI Elements

| ID | Name | Selector | Type | Page | Required | Notes |
|----|------|----------|------|------|----------|-------|
| UI-001 | <Name> | `[data-testid="<id>"]` | button | <Page> | Yes | — |
| UI-002 | <Name> | `[data-testid="<id>"]` | input | <Page> | Yes | — |

---

## API Contracts (if applicable)

### API-001: <Endpoint Description>

- **Endpoint:** `<METHOD> <path>`
- **Description:** <Purpose>
- **Request:**
  ```json
  {
    "headers": { "Content-Type": "application/json" },
    "body": { "field1": "<type>" }
  }
  ```
- **Response:**
  ```json
  {
    "status": 200,
    "body": { "field1": "<type>" }
  }
  ```
- **Assertions:**
  - Status code is 200
  - Response body contains `field1`
  - Response time < 2000ms

---

## Edge Cases

| ID | Flow Ref | Scenario | Expected Behavior | Priority |
|----|----------|----------|--------------------|----------|
| EC-001 | UF-001 | <Edge case description> | <What should happen> | P0 |
| EC-002 | UF-001 | <Edge case description> | <What should happen> | P1 |

---

## Tags

`smoke`, `regression`, `<custom-tag>`
