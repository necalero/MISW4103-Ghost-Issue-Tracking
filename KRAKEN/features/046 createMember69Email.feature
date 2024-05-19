Feature: Crear miembro

@user1 @web
Scenario: createMember69Email...v5.14.1
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
  And I enter a 69 character email for the member
  And I wait for 2 seconds
  And I click on save member
  And I wait for 2 seconds
  Then I should see the saved message
