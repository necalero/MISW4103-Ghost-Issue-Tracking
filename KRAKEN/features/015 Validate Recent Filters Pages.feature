Feature: Validate Post Search by Title

@user1 @web
Scenario: Crear miembro con nombre y correo ya existentes
  Given I navigate to page "<SIGNINURL>"
  And I wait for 5 seconds
  When I enter my email "<EMAIL>"
  And I wait for 1 seconds
  And I enter my password "<PASSWORD>"
  And I wait for 1 seconds
  And I click on sign in
  And I wait for 10 seconds
  And I click on pages
  And I click on SortBy
  Then I SortBy Recently updated
