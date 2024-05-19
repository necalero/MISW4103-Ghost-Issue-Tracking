Feature: Crear miembro

@user1 @web
Scenario: createMemberValidNameValidEmail499Note...v5.14.1
  Given I navigate to page "<SIGNINURL>"
  And I wait for 5 seconds
  When I enter my email "<EMAIL>"
  And I wait for 1 seconds
  And I enter my password "<PASSWORD>"
  And I wait for 1 seconds
  And I click on sign in
  And I wait for 5 seconds
  And I click on members
  And I wait for 2 seconds
  And I click on new member
  And I wait for 2 seconds
  And I enter the new member name "$name"
  And I wait for 2 seconds
  And I enter the new member valid email "$$name"
  And I wait for 2 seconds
  And I enter a 499 character note
  And I wait for 2 seconds
  And I click on save member
  And I wait for 2 seconds
  Then I should see the saved message