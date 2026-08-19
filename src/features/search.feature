Feature: Login and Search

Background: User logs in with valid credentials
  Given the user is logged in

  Scenario: User searches for a claim by claim number
  When the user clicks the Search menu at the top level
  And the user selects the Simple Search option
  And the user enters a valid claim number "claimNumber"
  And the user clicks the Search button
  Then the claim search results should include the claim "claimNumber"
  And the selected claim should open in the claim details page