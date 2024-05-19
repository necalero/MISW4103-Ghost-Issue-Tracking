Feature: Login

@user1 @web
Scenario: LoginCorrectEmailIncorrectPassword...v5.14.1
  Given I navigate to page "<SIGNINURL>"
  And I wait for 2 seconds
  When I enter my email "<EMAIL>"
  And I wait for 1 seconds
  And I enter an invalid password "$string"
  And I wait for 1 seconds
  And I click on sign in
  And I wait for 1 seconds
  Then I should see an incorrect password message
