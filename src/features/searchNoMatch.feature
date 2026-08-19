Feature: Simple Claim Search

  Background: User logs in with valid credentials
    Given the user is logged in

  Scenario: Simple Search returns a clear no-match state
    When the user clicks the Search menu at the top level
    And the user selects the Simple Search option
    And the user enters a syntactically valid but nonexistent claim number "claimNumberDoesNotExist"
    And the user clicks the Search button
    Then the search request should complete without an application error
    And the search results should display "No data to display"