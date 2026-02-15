# Feature Spec: User Authentication (Login)

## Metadata

| Field       | Value                              |
|-------------|------------------------------------|
| Spec ID     | SPEC-001                           |
| Feature     | User Authentication (Login)        |
| Module      | Authentication                     |
| URL         | https://doorlightwebdev.db1008.com/sign-in |
| Author      | AI Test Agent                      |
| Created     | 2026-02-15                        |
| Status      | APPROVED                         |

## Snapshots (DOM Maps)

| Page | DOM Map | State | Screenshot (optional) |
|------|---------|-------|-----------------------|
| SignIn Page | `dom-maps/login/signin.dom.json` | default | — |

---

## User Flows

### UF-001: Successful Login with Email and Password

**Description:** User successfully logs in using valid email and password credentials.

**Preconditions:**
- User is not authenticated (guest)
- User has valid credentials (email and password)

**Steps:**

| # | Action | Target (Selector) | Value / Description |
|---|--------|--------------------|---------------------|
| 1 | navigate | `https://doorlightwebdev.db1008.com/sign-in` | — |
| 2 | wait | `form` | Wait for form visible |
| 3 | fill | `input[name="email"]` | `<valid-email>` |
| 4 | fill | `input[name="password"]` | `<valid-password>` |
| 5 | click | `button[type="submit"]:has-text("Sign in")` | Submit login form |
| 6 | wait | `text=Sign out` or `text=Sign in` disappears | Wait for redirect |

**Assertions:**

| # | Type | Target (Selector) | Expected | Priority |
|---|------|--------------------|----------|----------|
| 1 | visible | `form` | Form is visible on load | P0 |
| 2 | visible | `input[name="email"]` | Email field is visible | P0 |
| 3 | visible | `input[name="password"]` | Password field is visible | P0 |
| 4 | visible | `button[type="submit"]:has-text("Sign in")` | Submit button is visible | P0 |
| 5 | enabled | `button[type="submit"]:has-text("Sign in")` | Submit button is enabled | P0 |
| 6 | url | — | `/dashboard` or home page after login | P0 |

**Postconditions:**
- User is authenticated and redirected to dashboard or home page
- Session token is stored in browser

---

### UF-002: Login with Invalid Credentials

**Description:** User attempts to login with invalid email or password and sees error message.

**Preconditions:**
- User is not authenticated (guest)

**Steps:**

| # | Action | Target (Selector) | Value / Description |
|---|--------|--------------------|---------------------|
| 1 | navigate | `https://doorlightwebdev.db1008.com/sign-in` | — |
| 2 | wait | `form` | Wait for form visible |
| 3 | fill | `input[name="email"]` | `<invalid-email>` |
| 4 | fill | `input[name="password"]` | `<invalid-password>` |
| 5 | click | `button[type="submit"]:has-text("Sign in")` | Submit login form |
| 6 | wait | `2000` | Wait for API response |

**Assertions:**

| # | Type | Target (Selector) | Expected | Priority |
|---|------|--------------------|----------|----------|
| 1 | url | — | User stays on `/sign-in` | P0 |

**Postconditions:**
- User remains on sign-in page
- Error feedback is provided

---

### UF-003: Login with Empty Fields

**Description:** User attempts to submit login form without entering credentials.

**Preconditions:**
- User is not authenticated (guest)

**Steps:**

| # | Action | Target (Selector) | Value / Description |
|---|--------|--------------------|---------------------|
| 1 | navigate | `https://doorlightwebdev.db1008.com/sign-in` | — |
| 2 | wait | `form` | Wait for form visible |
| 3 | click | `button[type="submit"]:has-text("Sign in")` | Submit empty form |
| 4 | wait | `1000` | Wait for validation |

**Assertions:**

| # | Type | Target (Selector) | Expected | Priority |
|---|------|--------------------|----------|----------|
| 1 | url | — | User stays on `/sign-in` | P0 |

**Postconditions:**
- User remains on sign-in page

---

### UF-004: Navigate to Sign Up from Login Page

**Description:** User clicks on sign up link to navigate to registration page.

**Preconditions:**
- User is not authenticated (guest)

**Steps:**

| # | Action | Target (Selector) | Value / Description |
|---|--------|--------------------|---------------------|
| 1 | navigate | `https://doorlightwebdev.db1008.com/sign-in` | — |
| 2 | wait | `form` | Wait for form visible |
| 3 | click | `a[href="/sign-up"]` | Click sign up link |
| 4 | wait | `form` | Wait for signup page |

**Assertions:**

| # | Type | Target (Selector) | Expected | Priority |
|---|------|--------------------|----------|----------|
| 1 | url | — | Contains `/sign-up` | P0 |
| 2 | visible | `form` | Sign up form is visible | P0 |

**Postconditions:**
- User is on sign-up/registration page

---

### UF-005: Navigate to Forgot Password

**Description:** User clicks on forgot password link to reset credentials.

**Preconditions:**
- User is not authenticated (guest)

**Steps:**

| # | Action | Target (Selector) | Value / Description |
|---|--------|--------------------|---------------------|
| 1 | navigate | `https://doorlightwebdev.db1008.com/sign-in` | — |
| 2 | wait | `form` | Wait for form visible |
| 3 | click | `a[href="/forgot-password"]` | Click forgot password link |
| 4 | wait | `form` | Wait for reset page |

**Assertions:**

| # | Type | Target (Selector) | Expected | Priority |
|---|------|--------------------|----------|----------|
| 1 | url | — | Contains `/forgot-password` | P0 |
| 2 | visible | `form` | Reset password form is visible | P0 |

**Postconditions:**
- User is on forgot/reset password page

---

## UI Elements

| ID | Name | Selector | Type | Page | Required | Notes |
|----|------|----------|------|------|----------|-------|
| UI-001 | Logo Link | `a[href="/"]` | link | SignIn | Yes | Site logo |
| UI-002 | Sign In Heading | `form p:has-text("Sign in")` | heading | SignIn | Yes | Page title |
| UI-003 | Subtitle | `form p:has-text("Access your personalized")` | text | SignIn | No | Description |
| UI-004 | Google Sign In | `button:has-text("Continue with Google")` | button | SignIn | No | OAuth login |
| UI-005 | Email Input | `input[name="email"]` | input | SignIn | Yes | Email field |
| UI-006 | Password Input | `input[name="password"]` | input | SignIn | Yes | Password field |
| UI-007 | Forgot Password Link | `a[href="/forgot-password"]` | link | SignIn | No | Password recovery |
| UI-008 | Submit Button | `button[type="submit"]:has-text("Sign in")` | button | SignIn | Yes | Login button |
| UI-009 | Sign Up Link | `a[href="/sign-up"]` | link | SignIn | No | Registration |
| UI-010 | Terms Link | `a[href="/terms-services"]` | link | SignIn | No | Terms of use |
| UI-011 | Privacy Link | `a[href="/privacy-policy"]` | link | SignIn | No | Privacy policy |
| UI-012 | Login Form | `form[action="#"]` | form | SignIn | Yes | Main form |

---

## API Contracts

### API-001: User Login

- **Endpoint:** `POST /api/auth/login`
- **Description:** Authenticate user with email and password
- **Request:**
  ```json
  {
    "headers": { "Content-Type": "application/json" },
    "body": { 
      "email": "string",
      "password": "string"
    }
  }
  ```
- **Response (Success):**
  ```json
  {
    "status": 200,
    "body": { 
      "token": "string",
      "user": {
        "id": "string",
        "email": "string",
        "name": "string"
      }
    }
  }
  ```
- **Response (Invalid Credentials):**
  ```json
  {
    "status": 401,
    "body": { 
      "error": "Invalid email or password"
    }
  }
  ```
- **Assertions:**
  - Status code is 200 for valid credentials
  - Status code is 401 for invalid credentials
  - Response body contains `token` on success
  - Response body contains `error` on failure
  - Response time < 2000ms

---

## Edge Cases

| ID | Flow Ref | Scenario | Expected Behavior | Priority |
|----|----------|----------|--------------------|----------|
| EC-001 | UF-001 | Login with valid email but wrong password | Display error "Invalid email or password" | P0 |
| EC-002 | UF-001 | Login with unregistered email | Display error "Invalid email or password" | P0 |
| EC-003 | UF-001 | Login when already authenticated | Redirect to dashboard (no duplicate login) | P1 |
| EC-004 | UF-001 | Login with SQL injection attempt in email | Display error or sanitize input | P1 |
| EC-005 | UF-001 | Login with XSS attempt in password | Display error or sanitize input | P1 |
| EC-006 | UF-003 | Login with invalid email format | Display "Please enter a valid email" | P0 |
| EC-007 | UF-003 | Login with very long email (>200 chars) | Display validation error | P1 |
| EC-008 | UF-001 | Network timeout during login | Display "Connection error, please try again" | P1 |
| EC-009 | UF-001 | Login button spam click | Prevent multiple submissions, show loading | P1 |

---

## Tags

`smoke`, `regression`, `authentication`, `login`
