# Claim Search Workflow Test Plan

## Application Overview

Functional and negative test coverage for the Guidewire ClaimCenter Search Claims workflow. Each test starts from a fresh seeded session and covers navigation, Simple Search, Advanced Search, result handling, reset behavior, validation, and filter combinations.

## Test Scenarios

### 1. Search navigation and Simple Search

**Seed:** `seed.spec.ts`

#### 1.1. Open Simple Search from Claims navigation

**File:** `specs/search-navigation.spec.ts`

**Steps:**
  1. Start from a fresh ClaimCenter session on the Claims page and open the Search menu in the left navigation.
    - expect: The Claims submenu displays Simple Search and Advanced Search.
  2. Select Simple Search.
    - expect: The page heading is Search Claims.
    - expect: Claim #, Policy #, First name, Last name, Organization Name, and Tax ID fields are visible.
    - expect: Search and Reset buttons are enabled.
    - expect: Search Results is empty and shows No data to display.

#### 1.2. Search for a claim by exact claim number

**File:** `specs/search-simple-claim-number.spec.ts`

**Steps:**
  1. Open Simple Search and enter a known seeded claim number, such as 000-00-000131, in Claim #.
    - expect: The claim number is accepted in the ###-##-###### field.
  2. Click Search.
    - expect: Search Results loads without an error.
    - expect: The matching claim is shown once with the expected claim number and associated claim data.
    - expect: The result can be opened from its claim number control.
  3. Open the returned claim.
    - expect: The claim detail page opens for the selected claim.
    - expect: The displayed claim number matches the searched value.

#### 1.3. Search Simple Search using claimant name and policy number

**File:** `specs/search-simple-name-policy.spec.ts`

**Steps:**
  1. Start from a fresh Simple Search form and enter a known policy number and claimant name from seeded data, such as policy POLTEST009 and claimant RAO ACC.
    - expect: The entered values remain visible and are associated with the correct fields.
  2. Click Search.
    - expect: Results are filtered by the supplied criteria.
    - expect: Only records matching the supplied policy and claimant criteria are returned, or a clear no-data state is shown if the combination has no exact match.

#### 1.4. Simple Search returns a clear no-match state

**File:** `specs/search-simple-no-match.spec.ts`

**Steps:**
  1. Enter syntactically valid but nonexistent values in Claim # or Policy #.
    - expect: The values can be entered without client-side errors.
  2. Click Search.
    - expect: The request completes without an application error.
    - expect: Search Results remains empty and displays No data to display or an equivalent no-results message.

#### 1.5. Reset clears Simple Search criteria and results

**File:** `specs/search-simple-reset.spec.ts`

**Steps:**
  1. Enter values in multiple Simple Search fields and run Search.
    - expect: The form retains the entered criteria while results are displayed or the no-results state is shown.
  2. Click Reset.
    - expect: All Simple Search fields return to blank values.
    - expect: Search Results is cleared to its initial empty state.
    - expect: No stale result rows remain from the previous search.

#### 1.6. Validate invalid Simple Search claim number format

**File:** `specs/search-simple-invalid-format.spec.ts`

**Steps:**
  1. Enter malformed values such as letters, an incomplete claim number, and an overlong claim number in Claim #.
    - expect: The field does not silently convert the invalid value into a valid claim number.
  2. Click Search after each invalid value.
    - expect: The user receives a clear validation message or the invalid value is rejected according to the field rules.
    - expect: The application does not navigate to an unrelated claim or return an incorrect match.

### 2. Advanced Search

**Seed:** `seed.spec.ts`

#### 2.1. Open Advanced Search and verify default controls

**File:** `specs/search-advanced-defaults.spec.ts`

**Steps:**
  1. Open Search in the left navigation and select Advanced Search.
    - expect: The page heading is Search Claims.
    - expect: The form displays Specify at least one of the following.
    - expect: Claim #, Policy #, party Search For, person/organization identifiers, assignment controls, catastrophe, VIN, and License Plate fields are visible.
    - expect: Optional parameters include Jurisdiction, Claim Status, Line of Business, Loss Type, assignment flags, coverage/litigation filters, high-risk indicators, and date search controls.
    - expect: Search Results starts empty.
  2. Inspect the initial values of select and radio controls.
    - expect: Select controls that are optional default to <none> where applicable.
    - expect: Search For defaults to Claimant.
    - expect: Search For Date defaults to Loss date.
    - expect: No unintended assignment, status, or boolean filter is preselected.

#### 2.2. Advanced Search with party role and identity criteria

**File:** `specs/search-advanced-party.spec.ts`

**Steps:**
  1. Select each supported Search For party role in turn: Additional Insured, Any Party Involved, Claimant, and Insured.
    - expect: Each role can be selected and remains selected after focus changes.
    - expect: The identity fields remain available for the selected role.
  2. Enter a known first name, last name, organization name, or tax ID and click Search.
    - expect: Results contain only claims matching the selected party role and supplied identity criteria.
    - expect: No result from an unrelated party role is returned.

#### 2.3. Advanced Search with assignment and claim filters

**File:** `specs/search-advanced-filters.spec.ts`

**Steps:**
  1. Select available values for Assigned To Group, Include Child Groups, Assigned To User, Created By, Claim Status, Line of Business, and Loss Type.
    - expect: Each selected filter remains visible and can be combined with the other filters.
    - expect: Yes and No options for Include Child Groups are mutually exclusive.
  2. Click Search.
    - expect: Every returned claim satisfies all selected filters.
    - expect: The result list is stable and does not discard selected criteria.
  3. Repeat with Include Child Groups switched from Yes to No.
    - expect: The result set changes or remains identical based on the data, but the selected radio value is honored.

#### 2.4. Advanced Search with catastrophe, vehicle, jurisdiction, and boolean filters

**File:** `specs/search-advanced-optional-filters.spec.ts`

**Steps:**
  1. Select a Cat #, enter VIN and License Plate values, and choose a Jurisdiction.
    - expect: The catastrophe, vehicle, and jurisdiction criteria are accepted and displayed.
  2. Set Claim Status, Pending Assignment, Incident Report, Reinsurance Reportable, Coverage in Question, Flagged Type, and Litigation Status to specific values.
    - expect: Each chosen value remains selected and can be cleared back to <none>.
  3. Click Search.
    - expect: Returned claims satisfy the selected optional criteria.
    - expect: A valid no-results state is shown when the combination has no matching claims.

#### 2.5. Manage Advanced Search high-risk indicators

**File:** `specs/search-advanced-risk-indicators.spec.ts`

**Steps:**
  1. Select Fatalities, Large Loss, SIU, Subrogation, and Predictions in the available-items list and click Add to selected.
    - expect: The chosen indicators move to selected items.
    - expect: Add is unavailable or has no effect for already-selected items.
  2. Select one or more selected indicators and click Remove from selected.
    - expect: The indicators move back to available items.
    - expect: Remove is disabled when no selected item is highlighted.
  3. Run Search with selected high-risk indicators.
    - expect: Results honor the selected indicator criteria.

#### 2.6. Search by each supported date type and boundary range

**File:** `specs/search-advanced-dates.spec.ts`

**Steps:**
  1. Choose Loss date, Reported date, Closed date, and Creation date in separate fresh searches.
    - expect: The selected date type is retained and the corresponding date controls are available.
  2. Run searches with a valid start date, valid end date, start date equal to end date, and a range crossing a month or year boundary.
    - expect: Results include records within the selected inclusive range according to the chosen date type.
    - expect: Equal start and end dates are handled consistently.
  3. Enter an end date earlier than the start date and search.
    - expect: A clear date-range validation message is displayed or the search is prevented.
    - expect: No misleading result set is shown.

#### 2.7. Reject Advanced Search with no qualifying criteria

**File:** `specs/search-advanced-required-criteria.spec.ts`

**Steps:**
  1. Leave all Advanced Search fields at their fresh defaults and click Search.
    - expect: The application indicates that at least one search criterion is required, or otherwise prevents an unrestricted search.
    - expect: No unfiltered claim list is returned accidentally.
  2. Enter only optional parameters and click Search.
    - expect: The application either accepts the optional-only query according to the documented rule or clearly explains which qualifying criterion is missing.

#### 2.8. Reset Advanced Search to fresh defaults

**File:** `specs/search-advanced-reset.spec.ts`

**Steps:**
  1. Populate identifiers, party role, assignment controls, optional filters, high-risk indicators, and a date range, then run Search.
    - expect: The selected criteria and returned results reflect the configured query.
  2. Click Reset.
    - expect: Text fields are blank.
    - expect: Select controls return to their default values.
    - expect: Radio controls return to their default state.
    - expect: High-risk selected items are removed.
    - expect: Search Results returns to the initial empty state.
