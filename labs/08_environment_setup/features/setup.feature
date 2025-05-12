Feature: Web Testing Environment Setup
  As a developer
  I want to set up a web testing environment
  So that I can automate browser testing

  Scenario: Navigate to a website
    Given I navigate to "https://www.example.com"
    Then I should see "Example Domain" in the page title
    And I should see text "Example Domain" on the page

  Scenario: Check page elements
    Given I navigate to "https://www.example.com"
    Then I should see an element with selector "h1"
    And I should see text "This domain is for use in illustrative examples" on the page

  Scenario: Verify links on the page
    Given I navigate to "https://www.example.com"
    Then I should see a link with text "More information..."
    And the link with text "More information..." should have URL containing "iana.org"
