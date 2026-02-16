# Feature Spec: Explore Page

## Metadata

| Field       | Value                     |
|-------------|---------------------------|
| Spec ID     | SPEC-002                  |
| Feature     | Explore Page              |
| Module      | Property Search           |
| URL         | /explore                  |
| Author      | AI Agent                  |
| Created     | 2026-02-16                |
| Status      | APPROVED                     |

## Snapshots (DOM Maps)

| Page | DOM Map | State | Screenshot (optional) |
|------|---------|-------|-----------------------|
| Explore | `dom-maps/explore/explore.dom.json` | default | — |
| Explore | `dom-maps/explore/explore.price-filter.dom.json` | price-filter-open | — |
| Explore | `dom-maps/explore/explore.home-type-filter.dom.json` | home-type-filter-open | — |
| Explore | `dom-maps/explore/explore.beds-baths-filter.dom.json` | beds-baths-filter-open | — |
| Explore | `dom-maps/explore/explore.status-filter.dom.json` | status-filter-open | — |
| Explore | `dom-maps/explore/explore.sort-dropdown.dom.json` | sort-dropdown-open | — |
| Property Detail | `dom-maps/explore/property-detail.dom.json` | default | — |

---

## User Flows

### UF-001: View Explore Page (Post Login)

**Description:** User views the Explore page after logging in, seeing property listings with filters

**Preconditions:**
- User is logged in (valid credentials)

**Steps:**

| # | Action | Target (Selector) | Value / Description |
|---|--------|--------------------|---------------------|
| 1 | navigate | `/explore` | After login |
| 2 | verify | `.react-select__control` | Sort dropdown visible |
| 3 | verify | `button:has-text('Price')` | Price filter visible |
| 4 | verify | `button:has-text('Home Type')` | Home type filter visible |
| 5 | verify | `button:has-text('Beds / Baths')` | Beds/baths filter visible |
| 6 | verify | `button:has-text('Active')` | Status filter visible |
| 7 | verify | `a[href*='/home-for-sale/']` | Property listings visible | 

**Assertions:**

| # | Type | Target (Selector) | Expected | Priority |
|---|------|--------------------|----------|----------|
| 1 | url | — | `/explore` | P0 |
| 2 | visible | Sort dropdown | True | P0 |
| 3 | count | Property listings | > 0 | P0 |

---

### UF-002: Filter by Price Range

**Description:** User filters properties by price using the Price filter dropdown

**Preconditions:**
- User is on Explore page

**Steps:**

| # | Action | Target (Selector) | Value / Description |
|---|--------|--------------------|---------------------|
| 1 | click | `button:has-text('Price')` | Open price filter |
| 2 | fill | `input[placeholder='Enter min']` | `100000` |
| 3 | fill | `input[placeholder='Enter max']` | `500000` |
| 4 | click | `button:has-text('Done')` | Apply filter |
| 5 | wait | — | URL contains price params |

**Assertions:**

| # | Type | Target (Selector) | Expected | Priority |
|---|------|--------------------|----------|----------|
| 1 | url | — | Contains `minPrice` and `maxPrice` | P0 |

---

### UF-003: Filter by Home Type

**Description:** User filters properties by home type (House, Condo, Townhouse, etc.)

**Preconditions:**
- User is on Explore page

**Steps:**

| # | Action | Target (Selector) | Value / Description |
|---|--------|--------------------|---------------------|
| 1 | click | `button:has-text('Home Type')` | Open home type filter |
| 2 | click | `button:has-text('House')` | Select House |
| 3 | click | `button:has-text('Done')` | Apply filter |
| 4 | wait | — | URL contains homeType param |

**Assertions:**

| # | Type | Target (Selector) | Expected | Priority |
|---|------|--------------------|----------|----------|
| 1 | url | — | Contains `homeType=House` | P0 |

---

### UF-004: Filter by Beds and Baths

**Description:** User filters properties by number of bedrooms and bathrooms

**Preconditions:**
- User is on Explore page

**Steps:**

| # | Action | Target (Selector) | Value / Description |
|---|--------|--------------------|---------------------|
| 1 | click | `button:has-text('Beds / Baths')` | Open beds/baths filter |
| 2 | click | `button:has-text('3')` | Select 3+ beds |
| 3 | click | `button:has-text('2+')` | Select 2+ baths |
| 4 | click | `button:has-text('Done')` | Apply filter |
| 5 | wait | — | URL contains beds/baths params |

**Assertions:**

| # | Type | Target (Selector) | Expected | Priority |
|---|------|--------------------|----------|----------|
| 1 | url | — | Contains `minBeds` and `minBaths` | P0 |

---

### UF-005: Filter by Status

**Description:** User filters properties by status (Active, Sold, Pending)

**Preconditions:**
- User is on Explore page

**Steps:**

| # | Action | Target (Selector) | Value / Description |
|---|--------|--------------------|---------------------|
| 1 | click | `button:has-text('Active')` | Open status filter |
| 2 | click | `page.getByText('Sold', { exact: true })` | Select Sold |
| 3 | wait | — | URL updates |
| 4 | click | `button:has-text('Sold')` | Button shows Sold |

**Assertions:**

| # | Type | Target (Selector) | Expected | Priority |
|---|------|--------------------|----------|----------|
| 1 | text | Status button | `Sold` | P0 |

---

### UF-006: Sort Properties

**Description:** User changes the sort order of property listings

**Preconditions:**
- User is on Explore page

**Steps:**

| # | Action | Target (Selector) | Value / Description |
|---|--------|--------------------|---------------------|
| 1 | click | `.react-select__control` | Open sort dropdown |
| 2 | click | `[role='option']:has-text('Price (low to high)')` | Select price low to high |
| 3 | wait | — | URL contains sortBy param |

**Assertions:**

| # | Type | Target (Selector) | Expected | Priority |
|---|------|--------------------|----------|----------|
| 1 | url | — | Contains `sortBy=PRICE_ASC` or similar | P0 |

---

### UF-007: Search Location

**Description:** User searches for properties in a specific location

**Preconditions:**
- User is on Explore page

**Steps:**

| # | Action | Target (Selector) | Value / Description |
|---|--------|--------------------|---------------------|
| 1 | fill | `input[placeholder='City, Neighbourhood, Address, Zip']` | `San Francisco` |
| 2 | click | `text=San Francisco, CA, USA` | Select suggestion |
| 3 | wait | — | URL contains search param |

**Assertions:**

| # | Type | Target (Selector) | Expected | Priority |
|---|------|--------------------|----------|----------|
| 1 | url | — | Contains `search=San+Francisco` | P0 |

---

### UF-008: View Property Details

**Description:** User clicks on a property to view its details

**Preconditions:**
- User is on Explore page with property listings

**Steps:**

| # | Action | Target (Selector) | Value / Description |
|---|--------|--------------------|---------------------|
| 1 | click | `a[href*='/home-for-sale/']` | Click first property |
| 2 | wait | — | New tab opens with property details |

**Assertions:**

| # | Type | Target (Selector) | Expected | Priority |
|---|------|--------------------|----------|----------|
| 1 | url | — | Contains `/home-for-sale/` | P0 |
| 2 | visible | Property details section | True | P0 |

---

### UF-009: Navigate Property Detail Tabs

**Description:** User navigates between tabs on property detail page

**Preconditions:**
- User is on property detail page

**Steps:**

| # | Action | Target (Selector) | Value / Description |
|---|--------|--------------------|---------------------|
| 1 | click | `button:has-text('Navigate to Neighborhood')` | Click Neighborhood tab |
| 2 | verify | Neighborhood content | Visible |
| 3 | click | `button:has-text('Navigate to Property Details')` | Click Property Details tab |
| 4 | verify | Property Details content | Visible |
| 5 | click | `button:has-text('Navigate to Similar')` | Click Similar tab |
| 6 | verify | Similar properties | Visible |
| 7 | click | `button:has-text('Navigate to Overview section')` | Click Overview tab |
| 8 | verify | Overview content | Visible |

**Assertions:**

| # | Type | Target (Selector) | Expected | Priority |
|---|------|--------------------|----------|----------|
| 1 | visible | Tab content | True | P0 |

---

### UF-010: Pagination

**Description:** User navigates through pages of property listings

**Preconditions:**
- User is on Explore page

**Steps:**

| # | Action | Target (Selector) | Value / Description |
|---|--------|--------------------|---------------------|
| 1 | click | `button[aria-label='Go to page 2']` | Go to page 2 |
| 2 | verify | URL | Contains page param |
| 3 | click | `button[aria-label='Go to next page']` | Go to next page |
| 4 | verify | URL | Page number increased |

**Assertions:**

| # | Type | Target (Selector) | Expected | Priority |
|---|------|--------------------|----------|----------|
| 1 | url | — | Contains pagination param | P0 |

---

### UF-011: Save Search

**Description:** User saves a search for later use

**Preconditions:**
- User is on Explore page with filters applied

**Steps:**

| # | Action | Target (Selector) | Value / Description |
|---|--------|--------------------|---------------------|
| 1 | click | `button:has-text('Save search')` | Click save search |
| 2 | wait | — | Modal or confirmation appears |

**Assertions:**

| # | Type | Target (Selector) | Expected | Priority |
|---|------|--------------------|----------|----------|
| 1 | visible | Save search modal | True | P1 |

---

### UF-012: View Toggle (List/Map/Combined)

**Description:** User changes the view mode of property listings

**Preconditions:**
- User is on Explore page

**Steps:**

| # | Action | Target (Selector) | Value / Description |
|---|--------|--------------------|---------------------|
| 1 | click | `button:has-text('Map View')` | Switch to map view |
| 2 | verify | Map visible | True |
| 3 | click | `button:has-text('Combined View')` | Switch to combined view |
| 4 | verify | Map and list visible | True |
| 5 | click | `button:has-text('List View')` | Switch to list view |
| 6 | verify | List visible, map hidden | True |

**Assertions:**

| # | Type | Target (Selector) | Expected | Priority |
|---|------|--------------------|----------|----------|
| 1 | visible | View elements | True | P1 |

---

## UI Elements

| ID | Name | Selector | Type | Page | Required | Notes |
|----|------|----------|------|------|----------|-------|
| UI-001 | Logo | `a[href='/']` | link | Explore | Yes | Navigate to home |
| UI-002 | Search Input | `input[placeholder='City, Neighbourhood, Address, Zip']` | input | Explore | Yes | Location search |
| UI-003 | User Menu | `button:has-text('Balaji V')` | button | Explore | Yes | User dropdown |
| UI-004 | Price Filter | `button:has-text('Price')` | button | Explore | Yes | Opens price dropdown |
| UI-005 | Home Type Filter | `button:has-text('Home Type')` | button | Explore | Yes | Opens home type dropdown |
| UI-006 | Beds/Baths Filter | `button:has-text('Beds / Baths')` | button | Explore | Yes | Opens beds/baths dropdown |
| UI-007 | Status Filter | `button:has-text('Active'), button:has-text('Sold'), button:has-text('Pending'), button:has-text('Contingent')` | button | Explore | Yes | Opens status dropdown, shows current status |
| UI-008 | Sort Dropdown | `.react-select__control` | dropdown | Explore | Yes | Sort options |
| UI-009 | Filters Button | `button[aria-label='Filters']` | button | Explore | Yes | Opens filters modal |
| UI-010 | Save Search | `button:has-text('Save search')` | button | Explore | Yes | Save current search |
| UI-011 | Property Listings | `a[href*='/home-for-sale/']` | links | Explore | Yes | Property cards |
| UI-012 | Pagination | `button[aria-label*='Go to page']` | buttons | Explore | Yes | Page navigation |
| UI-013 | View Toggle | `button:has-text('List View'), button:has-text('Map View'), button:has-text('Combined View')` | buttons | Explore | Yes | View mode switch |
| UI-014 | Price Min Input | `input[placeholder='Enter min']` | input | Price Filter | Yes | Min price entry |
| UI-015 | Price Max Input | `input[placeholder='Enter max']` | input | Price Filter | Yes | Max price entry |
| UI-016 | Home Type Options | `button:has-text('House'), button:has-text('Condo'), button:has-text('Town House')` | checkboxes | Home Type Filter | Yes | Home type selection |
| UI-017 | Beds Options | `button:has-text('1'), button:has-text('2'), button:has-text('3')` | buttons | Beds/Baths Filter | Yes | Bed selection |
| UI-018 | Baths Options | `button:has-text('1+'), button:has-text('2+'), button:has-text('2.5+')` | buttons | Beds/Baths Filter | Yes | Bath selection |
| UI-019 | Status Options | `page.getByText('Active', { exact: true })`, `page.getByText('Sold', { exact: true })`, `page.getByText('Pending', { exact: true })`, `page.getByText('Contingent', { exact: true })` | checkboxes | Status Filter | Yes | Status selection - use exact match |
| UI-020 | Sort Options | `[role='option']:has-text('Price (low to high)')` | option | Sort Dropdown | Yes | Sort selection |
| UI-021 | Property Details | Property detail page elements | various | Property Detail | Yes | Property information |
| UI-022 | Property Tabs | `button:has-text('Navigate to Neighborhood')`, etc. | tabs | Property Detail | Yes | Tab navigation |

---

## Edge Cases

| ID | Flow Ref | Scenario | Expected Behavior | Priority |
|----|----------|----------|--------------------|----------|
| EC-001 | UF-002 | Enter invalid price (negative) | Should validate input | P1 |
| EC-002 | UF-002 | Enter min > max price | Should show error or auto-swap | P1 |
| EC-003 | UF-003 | Select multiple home types | Should filter for any selected type | P1 |
| EC-004 | UF-005 | Select all status options | Should show all matching properties | P1 |
| EC-005 | UF-007 | Search with no results | Should show empty state message | P0 |
| EC-006 | UF-008 | Click on sold property | Should show sold indicator | P0 |
| EC-007 | UF-010 | Navigate beyond last page | Should disable next button | P1 |
| EC-008 | UF-011 | Save search without filters | Should allow saving empty search | P1 |

---

## Tags

`smoke`, `regression`, `explore`, `filters`
