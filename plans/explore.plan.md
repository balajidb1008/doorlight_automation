# Test Plan: Explore Page

## Metadata

| Field       | Value                     |
|-------------|---------------------------|
| Plan ID     | PLAN-002                  |
| Spec ID     | SPEC-002                  |
| Feature     | Explore Page              |
| Author      | AI Agent                  |
| Created     | 2026-02-16               |
| Status      | APPROVED                    |

---

## Test Cases

### TC-001: Verify Explore Page Elements Load

**Description:** Verify all explore page elements are visible after login

**Preconditions:**
- User is logged in

**Steps:**
1. Navigate to `/explore` after login
2. Verify logo is visible
3. Verify search input is visible
4. Verify user menu button is visible
5. Verify Price filter button is visible
6. Verify Home Type filter button is visible
7. Verify Beds / Baths filter button is visible
8. Verify Status filter button is visible
9. Verify Sort dropdown is visible
10. Verify Filters button is visible
11. Verify Save Search button is visible
12. Verify property listings are visible

**Assertions:**
| # | Type | Target | Expected |
|---|------|--------|----------|
| 1 | visible | Logo | true |
| 2 | visible | Search input | true |
| 3 | visible | User menu | true |
| 4 | visible | Price filter | true |
| 5 | visible | Home Type filter | true |
| 6 | visible | Beds / Baths filter | true |
| 7 | visible | Status filter | true |
| 8 | visible | Sort dropdown | true |
| 9 | visible | Filters button | true |
| 10 | visible | Save Search button | true |
| 11 | count | Property listings | > 0 |

**Priority:** P0

---

### TC-002: Filter by Price Range and Verify Listings

**Description:** Apply price filter and verify property listings match the price range

**Preconditions:**
- User is on Explore page

**Steps:**
1. Click Price filter button
2. Enter minimum price: $100,000
3. Enter maximum price: $500,000
4. Click Done button
5. Collect all property prices from listings
6. Click on first property (opens in new tab)
7. Assert property price is within range in detail page

**Assertions:**
| # | Type | Target | Expected |
|---|------|--------|----------|
| 1 | url | — | Contains minPrice and maxPrice |
| 2 | price-values | Property listings | All >= $100,000 AND <= $500,000 |
| 3 | visible | Property detail page | true |
| 4 | price | Property detail | Within selected range |

**Priority:** P0

---

### TC-003: Filter by Home Type - House

**Description:** Apply House home type filter and verify property type in details

**Preconditions:**
- User is on Explore page

**Steps:**
1. Click Home Type filter button
2. Select House checkbox
3. Click Done button
4. Verify URL contains homeType=House
5. Verify property URLs contain "/home-for-sale/"
6. Click on first property
7. In property detail, verify Property Type is "Single-Family-Residence"

**Assertions:**
| # | Type | Target | Expected |
|---|------|--------|----------|
| 1 | url | — | Contains homeType |
| 2 | url-pattern | Property URLs | Contains "/home-for-sale/" |
| 3 | visible | Property detail | true |
| 4 | text | Property Type | Contains "Single-Family-Residence" |

**Priority:** P0

---

### TC-004: Filter by Home Type - Condo

**Description:** Apply Condo home type filter and verify property type in details

**Preconditions:**
- User is on Explore page

**Steps:**
1. Click Home Type filter button
2. Select Condo checkbox
3. Click Done button
4. Verify URL contains homeType
5. Verify property URLs contain "/condo-for-sale/"
6. Click on first property
7. In property detail, verify Property Type is "Condo"

**Assertions:**
| # | Type | Target | Expected |
|---|------|--------|----------|
| 1 | url | — | Contains homeType |
| 2 | url-pattern | Property URLs | Contains "/condo-for-sale/" |
| 3 | visible | Property detail | true |
| 4 | text | Property Type | Contains "Condo" |

**Priority:** P0

---

### TC-005: Filter by Home Type - Townhouse

**Description:** Apply Townhouse home type filter and verify property type in details

**Preconditions:**
- User is on Explore page

**Steps:**
1. Click Home Type filter button
2. Select Town House checkbox
3. Click Done button
4. Verify URL contains homeType
5. Verify property URLs contain "/townhouse-for-sale/"
6. Click on first property
7. In property detail, verify Property Type is "Townhouse"

**Assertions:**
| # | Type | Target | Expected |
|---|------|--------|----------|
| 1 | url | — | Contains homeType |
| 2 | url-pattern | Property URLs | Contains "/townhouse-for-sale/" |
| 3 | visible | Property detail | true |
| 4 | text | Property Type | Contains "Townhouse" |

**Priority:** P0

---

### TC-006: Filter by Beds and Verify Listings

**Description:** Apply beds filter and verify property bed count in details

**Preconditions:**
- User is on Explore page

**Steps:**
1. Click Beds / Baths filter button
2. Select 3+ beds
3. Click Done button
4. Click on first property
5. In property detail, verify bedrooms >= 3

**Assertions:**
| # | Type | Target | Expected |
|---|------|--------|----------|
| 1 | url | — | Contains minBeds |
| 2 | visible | Property detail | true |
| 3 | beds | Property detail | >= 3 |

**Priority:** P0

---

### TC-007: Filter by Baths and Verify Listings

**Description:** Apply baths filter and verify property bath count in details

**Preconditions:**
- User is on Explore page

**Steps:**
1. Click Beds / Baths filter button
2. Select 2+ baths
3. Click Done button
4. Click on first property
5. In property detail, verify bathrooms >= 2

**Assertions:**
| # | Type | Target | Expected |
|---|------|--------|----------|
| 1 | url | — | Contains minBaths |
| 2 | visible | Property detail | true |
| 3 | baths | Property detail | >= 2 |

**Priority:** P0

---

### TC-008: Filter by Status - Sold

**Description:** Apply Sold status filter and verify property status in details

**Preconditions:**
- User is on Explore page

**Steps:**
1. Click Status filter button (currently Active) - use getByText('Active', { exact: true })
2. Select Sold checkbox - use getByText('Sold', { exact: true })
3. Click on first property
4. In property detail, verify status shows "Sold"

**Assertions:**
| # | Type | Target | Expected |
|---|------|--------|----------|
| 1 | visible | Property detail | true |
| 2 | text | Property Status | Contains "Sold" |

**Priority:** P0

---

### TC-009: Verify Multiple Property Details from Page 1

**Description:** Open multiple properties from first page and verify details

**Preconditions:**
- User is on Explore page

**Steps:**
1. Click on first property
2. Switch to new tab
3. Verify property details (price, beds, baths, sqft)
4. Close tab
5. Go back to explore page
6. Click on second property
7. Switch to new tab
8. Verify property details

**Assertions:**
| # | Type | Target | Expected |
|---|------|--------|----------|
| 1 | visible | Property 1 details | true |
| 2 | price | Property 1 | Valid price value |
| 3 | beds | Property 1 | Valid bed count |
| 4 | baths | Property 1 | Valid bath count |
| 5 | visible | Property 2 details | true |
| 6 | price | Property 2 | Valid price value |
| 7 | beds | Property 2 | Valid bed count |
| 8 | baths | Property 2 | Valid bath count |

**Priority:** P0

---

### TC-010: Verify Property Detail from Page 2

**Description:** Navigate to page 2 and verify property details

**Preconditions:**
- User is on Explore page

**Steps:**
1. Click on "Go to page 2" button
2. Verify URL contains page parameter
3. Click on first property
4. Switch to new tab
5. Verify property details

**Assertions:**
| # | Type | Target | Expected |
|---|------|--------|----------|
| 1 | url | — | Contains page=2 or similar |
| 2 | visible | Property detail | true |
| 3 | price | Property | Valid price value |
| 4 | beds | Property | Valid bed count |
| 5 | baths | Property | Valid bath count |
| 6 | sqft | Property | Valid sqft value |

**Priority:** P0

---

### TC-011: Filter by Home Type - Verify Multiple Properties

**Description:** Apply home type filter and verify multiple properties

**Preconditions:**
- User is on Explore page

**Steps:**
1. Click Home Type filter
2. Select Condo
3. Click Done
4. Verify property URLs contain "/condo-for-sale/"
5. Click on first property - verify type
6. Go back
7. Click on second property - verify type

**Assertions:**
| # | Type | Target | Expected |
|---|------|--------|----------|
| 1 | url-pattern | Property URLs | Contains "/condo-for-sale/" |
| 2 | type | Property 1 | Contains "Condo" |
| 3 | type | Property 2 | Contains "Condo" |

**Priority:** P1

---

## Home Type to Property Type Mapping

| Home Type Filter | URL Pattern | Expected Property Type Values |
|-----------------|-------------|------------------------------|
| House | /home-for-sale/ | Single-Family-Residence |
| Condo | /condo-for-sale/ | Condo |
| Town House | /townhouse-for-sale/ | Townhouse |
| Land | /home-for-sale/ | Residential-Lot |
| Multi-Family | /home-for-sale/ | Fourplex |
| Mobile | /home-for-sale/ | Double-Wide-Mobile-Home |
| Commercial | /home-for-sale/ | Commercial-Property |
| Other | /home-for-sale/ | Other |

---

## Property Type Display Values

| API Property Type | Display Value |
|------------------|---------------|
| Single-Family-Residence | House |
| Townhouse | Townhouse |
| Condo | Condo |
| Residential-Lot | Land |
| Fourplex | Multi-Family |
| Double-Wide-Mobile-Home | Mobile |
| Commercial-Property | Commercial |
| Other | Other |

---

## Test Data

### Price Ranges for Testing

| Test Case | Min Price | Max Price |
|-----------|-----------|-----------|
| TC-002 | $100,000 | $500,000 |
| TC-011 | $200,000 | $400,000 |

### Beds/Baths Values

| Test Case | Beds | Baths |
|-----------|------|-------|
| TC-006 | 3+ | Any |
| TC-007 | Any | 2+ |

---

## Acceptance Criteria

1. All filter buttons are clickable and open their respective dropdowns
2. Price filter updates URL and property listings reflect the price range
3. Home type filter correctly maps to property type in details
4. Beds/Baths filter correctly filters and details match
5. Status filter shows correct status on properties
6. Multiple properties from same page can be opened and verified
7. Pagination works and properties on page 2 can be verified
8. Property details page shows accurate information matching the listing

---

## Priority Summary

| Priority | Test Cases |
|----------|------------|
| P0 | TC-001, TC-002, TC-003, TC-004, TC-005, TC-006, TC-007, TC-008, TC-009, TC-010 |
| P1 | TC-011 |
