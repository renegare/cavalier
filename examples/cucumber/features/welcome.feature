Feature: Welcome

Scenario: User visits the site
  Given I visit the http://localhost:3000/
  Then I should see the home page
  When I fill in the field
  And I click submit on the page
  Then I should see "Hello World"
  And there should be four list items
  And the last item should display the text "Fourth Item"
