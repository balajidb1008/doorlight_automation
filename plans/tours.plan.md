# Test Plan: Tours Management

## Metadata

| Field       | Value                     |
|-------------|---------------------------|
| Plan ID     | PLAN-003                  |
| Spec ID     | SPEC-003                  |
| Feature     | Tours Management          |
| Author      | AI Agent                  |
| Created     | 2026-02-16               |
| Status      | APPROVED                  |

---

## Test Cases

### TC-001: Schedule a Tour

**Description:** User schedules a tour for a property with tomorrow's date

**Preconditions:**
- User is logged in
- User is on Explore page

**Steps:**
1. Navigate to Explore page
2. Apply random home type filter (House, Condo, or Townhouse)
3. Click on first property from top 10
4. Click Tour button
5. Select tomorrow's date (dynamic - current day + 1)
6. Select time: 10:00 AM
7. Click Submit

**Assertions:**
| # | Type | Target | Expected |
|---|------|--------|----------|
| 1 | url | — | Contains `/tours` |
| 2 | text | Success message | "Tour Request Created" |

**Priority:** P0

---

### TC-002: Verify Tour Details in My Tours

**Description:** Verify the scheduled tour appears in My Tours with correct details

**Preconditions:**
- User has a scheduled tour

**Steps:**
1. Navigate to `/tours`
2. Verify tour is listed
3. Verify date and time are correct

**Assertions:**
| # | Type | Target | Expected |
|---|------|--------|----------|
| 1 | visible | Tour listing | true |
| 2 | text | Tour date/time | Contains selected date and time |

**Priority:** P0

---

### TC-003: Reschedule a Tour

**Description:** User reschedules an existing tour to a later date

**Preconditions:**
- User has an existing scheduled tour

**Steps:**
1. Navigate to `/tours`
2. Click Manage Tour button
3. Click Reschedule Tour option
4. Select day after tomorrow (current day + 2)
5. Select time: 11:00 AM
6. Click Submit

**Assertions:**
| # | Type | Target | Expected |
|---|------|--------|----------|
| 1 | text | Success message | "Tour Rescheduled Successfully" |

**Priority:** P0

---

### TC-004: Verify Rescheduled Tour Details

**Description:** Verify the rescheduled tour shows updated date/time

**Preconditions:**
- User has a rescheduled tour

**Steps:**
1. Navigate to `/tours`
2. Verify tour shows new date and time

**Assertions:**
| # | Type | Target | Expected |
|---|------|--------|----------|
| 1 | text | Tour date/time | Contains new date and time |

**Priority:** P0

---

### TC-005: Add Tour to Calendar

**Description:** User adds a tour to their calendar

**Preconditions:**
- User has an existing scheduled tour

**Steps:**
1. Navigate to `/tours`
2. Click Manage Tour button
3. Click "Add tour to my calendar" option
4. Verify modal is displayed
5. Click Close button

**Assertions:**
| # | Type | Target | Expected |
|---|------|--------|----------|
| 1 | visible | Close button | true |

**Priority:** P1

---

### TC-006: Cancel a Tour

**Description:** User cancels an existing tour

**Preconditions:**
- User has an existing scheduled tour

**Steps:**
1. Navigate to `/tours`
2. Click Manage Tour button
3. Click "Cancel Tour Request" option
4. Click "Cancel Request" button to confirm

**Assertions:**
| # | Type | Target | Expected |
|---|------|--------|----------|
| 1 | url | — | `/tours` |

**Priority:** P0

---

### TC-007: Schedule Tour with Different Time

**Description:** User schedules a tour with a different time slot

**Preconditions:**
- User is logged in

**Steps:**
1. Navigate to Explore page
2. Apply random home type filter
3. Click on first property
4. Click Tour button
5. Select tomorrow's date
6. Select time: 10:30 AM
7. Click Submit

**Assertions:**
| # | Type | Target | Expected |
|---|------|--------|----------|
| 1 | text | Success message | "Tour Request Created" |

**Priority:** P1

---

### TC-008: Full Tour Workflow

**Description:** Complete workflow - schedule, reschedule, add to calendar, cancel

**Preconditions:**
- User is logged in

**Steps:**
1. Schedule a tour (tomorrow, 10:00 AM)
2. Verify tour is created
3. Reschedule tour (day+2, 11:00 AM)
4. Verify reschedule success
5. Add to calendar
6. Cancel tour

**Assertions:**
| # | Type | Target | Expected |
|---|------|--------|----------|
| 1 | text | "Tour Request Created" | visible |
| 2 | text | "Tour Rescheduled Successfully" | visible |
| 3 | url | /tours | after cancel |

**Priority:** P0

---

## Test Data

### Dynamic Dates

| Purpose | Calculation |
|---------|-------------|
| Schedule tour date | Tomorrow = current day + 1 |
| Reschedule tour date | Day after tomorrow = current day + 2 |

### Time Slots for Testing

| Test Case | Time |
|-----------|------|
| TC-001, TC-008 | 10:00 AM |
| TC-003, TC-008 | 11:00 AM |
| TC-007 | 10:30 AM |

### Home Types for Random Selection

- House
- Condo
- Town House

---

## Acceptance Criteria

1. User can schedule a tour with dynamic tomorrow's date
2. Scheduled tour appears in My Tours page with correct details
3. User can reschedule a tour with dynamic date (day+2)
4. Rescheduled tour shows updated date/time
5. User can add tour to calendar
6. User can cancel a tour
7. Tour count decreases after cancellation
8. Success messages appear for all actions
9. URL redirects correctly after actions

---

## Priority Summary

| Priority | Test Cases |
|----------|------------|
| P0 | TC-001, TC-002, TC-003, TC-004, TC-006, TC-008 |
| P1 | TC-005, TC-007 |
