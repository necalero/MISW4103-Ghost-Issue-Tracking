Feature: Login

@user1 @web
Scenario: LoginIncorrectEmailEmptyPassword...v5.14.1
  Given I navigate to page "<SIGNINURL>"
  And I wait for 2 seconds
  When I enter my email "$email"
  And I wait for 1 seconds
  And I click on sign in
  And I wait for 1 seconds
  Then I should see a message to fill out the form
