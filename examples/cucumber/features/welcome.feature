Feature: Welcome

Scenario: User visits the site
  Given I visit the http://localhost:3000/
  Then I should see the home page
