Feature: Login

@user1 @web
Scenario: LoginIncorrectEmailCorrectPassword...v5.14.1
  Given I navigate to page "<SIGNINURL>"
  And I wait for 2 seconds
  When I enter my email "$email"
  And I wait for 1 seconds
  And I enter my password "<PASSWORD>"
  And I wait for 1 seconds
  And I click on sign in
  And I wait for 1 seconds
  Then I should see an error message of no user
