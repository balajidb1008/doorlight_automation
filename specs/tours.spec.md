# Feature Spec: Tours Management

## Metadata

| Field       | Value                     |
|-------------|---------------------------|
| Spec ID     | SPEC-003                  |
| Feature     | Tours Management          |
| Module      | Property Tours            |
| URL         | /tours                   |
| Author      | AI Agent                  |
| Created     | 2026-02-16                |
| Status      | APPROVED                     |

---

## Snapshots (DOM Maps)

| Page | DOM Map | State | Screenshot (optional) |
|------|---------|-------|-----------------------|
| Property Detail | `dom-maps/tours/property-detail-tour.dom.json` | tour-button-visible | — |
| Schedule Tour Modal | TBD | schedule-tour-open | — |
| Tours Page | TBD | default | — |

---

## User Flows

### UF-001: Schedule a Tour

**Description:** User schedules a tour for a property

**Preconditions:**
- User is logged in
- User is on Explore page

**Steps:**

| # | Action | Target (Selector) | Value / Description |
|---|--------|--------------------|---------------------|
| 1 | navigate | Explore page | Apply random home type filter |
| 2 | click | Property listing | Click on random property from top 10 |
| 3 | click | `getByRole('button', { name: 'Tour' })` | Open schedule tour modal |
| 4 | click | Dynamic date | Select tomorrow's date (day = current day + 1) |
| 5 | click | `getByRole('button', { name: '10:00 AM' })` | Select time |
| 6 | click | `getByRole('button', { name: 'Submit' })` | Submit tour request |

**Dynamic Values:**
- Date: Tomorrow's date (get tomorrow's day number dynamically)

**Assertions:**

| # | Type | Target (Selector) | Expected | Priority |
|---|------|--------------------|----------|----------|
| 1 | url | — | Contains `/tours` | P0 |
| 2 | text | Success message | "Tour Request Created" | P0 |

---

### UF-002: Reschedule a Tour

**Description:** User reschedules an existing tour

**Preconditions:**
- User has an existing scheduled tour

**Steps:**

| # | Action | Target (Selector) | Value / Description |
|---|--------|--------------------|---------------------|
| 1 | navigate | `/tours` | Go to tours page |
| 2 | click | `getByRole('button', { name: 'Manage Tour' }).first()` | Open manage tour |
| 3 | click | `locator('div').filter({ hasText: /^Reschedule Tour$/ })` | Click reschedule |
| 4 | click | Dynamic date | Select day after tomorrow (day = current day + 2) |
| 5 | click | `getByRole('button', { name: '11:00 AM' })` | Select new time |
| 6 | click | `getByRole('button', { name: 'Submit' })` | Submit reschedule |

**Dynamic Values:**
- Date: Day after tomorrow (get day number dynamically - current day + 2)

**Assertions:**

| # | Type | Target (Selector) | Expected | Priority |
|---|------|--------------------|----------|----------|
| 1 | text | Success message | "Tour Rescheduled Successfully" | P0 |

---

### UF-003: Add Tour to Calendar

**Description:** User adds a tour to their calendar

**Preconditions:**
- User has an existing scheduled tour

**Steps:**

| # | Action | Target (Selector) | Value / Description |
|---|--------|--------------------|---------------------|
| 1 | navigate | `/tours` | Go to tours page |
| 2 | click | `getByRole('button', { name: 'Manage Tour' }).first()` | Open manage tour |
| 3 | click | `locator('div').filter({ hasText: /^Add tour to my calendar$/ })` | Add to calendar |
| 4 | verify | Modal visible | Calendar options shown |
| 5 | click | `getByRole('button', { name: 'Close' })` | Close modal |

**Assertions:**

| # | Type | Target (Selector) | Expected | Priority |
|---|------|--------------------|----------|----------|
| 1 | visible | Close button | True | P1 |

---

### UF-004: Cancel a Tour

**Description:** User cancels an existing tour

**Preconditions:**
- User has an existing scheduled tour

**Steps:**

| # | Action | Target (Selector) | Value / Description |
|---|--------|--------------------|---------------------|
| 1 | navigate | `/tours` | Go to tours page |
| 2 | click | `getByRole('button', { name: 'Manage Tour' }).first()` | Open manage tour |
| 3 | click | `locator('div').filter({ hasText: /^Cancel Tour Request$/ })` | Click cancel |
| 4 | click | `getByRole('button', { name: 'Cancel Request' })` | Confirm cancellation |

**Assertions:**

| # | Type | Target (Selector) | Expected | Priority |
|---|------|--------------------|----------|----------|
| 1 | url | — | `/tours` | P0 |
| 2 | count | Manage Tour buttons | Decreased | P1 |

---

## UI Elements

| ID | Name | Selector | Type | Page | Required | Notes |
|----|------|----------|------|------|----------|-------|
| UI-001 | Tour Button | `getByRole('button', { name: 'Tour' })` | button | Property Detail | Yes | Opens schedule tour modal |
| UI-002 | Date Picker | `getByRole('gridcell', { name: DYNAMIC })` | gridcell | Schedule Tour | Yes | Select date - dynamic (tomorrow for schedule, day+2 for reschedule |
| UI-003 | Time Button | `getByRole('button', { name: '10:00 AM' })` | button | Schedule Tour | Yes | Select time |
| UI-004 | Reset Button | `getByRole('button', { name: 'Reset' })` | button | Schedule Tour | Yes | Reset selection |
| UI-005 | Submit Button | `getByRole('button', { name: 'Submit' })` | button | Schedule Tour | Yes | Submit tour request |
| UI-006 | Manage Tour Button | `getByRole('button', { name: 'Manage Tour' })` | button | Tours Page | Yes | Open tour management |
| UI-007 | Reschedule Option | `locator('div').filter({ hasText: /^Reschedule Tour$/ })` | element | Manage Tour Modal | Yes | Reschedule tour |
| UI-008 | Add to Calendar Option | `locator('div').filter({ hasText: /^Add tour to my calendar$/ })` | element | Manage Tour Modal | Yes | Add to calendar |
| UI-009 | Cancel Tour Option | `locator('div').filter({ hasText: /^Cancel Tour Request$/ })` | element | Manage Tour Modal | Yes | Cancel tour |
| UI-010 | Cancel Request Button | `getByRole('button', { name: 'Cancel Request' })` | button | Cancel Confirmation | Yes | Confirm cancellation |
| UI-011 | Close Button | `getByRole('button', { name: 'Close' })` | button | Modal | Yes | Close modal |

---

## Edge Cases

| ID | Flow Ref | Scenario | Expected Behavior | Priority |
|----|----------|----------|--------------------|----------|
| EC-001 | UF-001 | Select past date | Should not allow or show error | P1 |
| EC-002 | UF-001 | No time selected | Should show validation error | P1 |
| EC-003 | UF-001 | No date selected | Should show validation error | P1 |
| EC-004 | UF-004 | Cancel last tour | Should show empty state | P1 |

---

## Tags

`smoke`, `regression`, `tours`, `schedule`, `reschedule`, `cancel`
