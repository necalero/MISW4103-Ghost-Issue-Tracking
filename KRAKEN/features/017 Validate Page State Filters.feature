Feature: Ver lista de paginas

@user1 @web
Scenario: 017 Validate Page State Filters
  Given I navigate to page "<SIGNINURL>"
  And I wait for 5 seconds
  When I enter my email "<EMAIL>"
  And I wait for 1 seconds
  And I enter my password "<PASSWORD>"
  And I wait for 1 seconds
  And I click on sign in
  And I wait for 10 seconds
  And I click on pages
  And I click on State
  Then I select Published Pages
