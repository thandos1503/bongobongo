Feature: Bongobongo Postman script Api Tests

  Background:
    Given the API base URL is set
    And I have a valid API key 

  Scenario: Login → Update User Profile → Logout
    Given I log in with valid credentials
    When I update the user profile with valid data
    Then the profile update should be successful
    And I should be able to log out successfully

  Scenario: Login with expired or invalid token
    Given I have an expired or invalid token
    When I try to access a protected endpoint
    Then the response code should be 401
    And the error message should indicate unauthorized access

  Scenario: Update Profile with missing required fields
    Given I log in with valid credentials
    When I update the user profile with missing required fields
    Then the response code should be 400
    And the error message should indicate missing fields

  Scenario: Fetch User List with invalid pagination parameters
    Given I log in with valid credentials
    When I fetch the user list with invalid pagination parameters
    Then the response code should be 400
    And the error message should indicate invalid parameters