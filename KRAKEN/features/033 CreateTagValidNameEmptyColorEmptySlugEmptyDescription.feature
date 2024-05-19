Feature: Crear etiqueta

@user1 @web
Scenario: CreateTagValidNameEmptyColorEmptySlugEmptyDescription...v5.14.1
  Given I navigate to page "<SIGNINURL>"
  And I wait for 2 seconds
  When I enter my email "<EMAIL>"
  And I wait for 1 seconds
  And I enter my password "<PASSWORD>"
  And I wait for 1 seconds
  And I click on sign in
  And I wait for 4 seconds
  And I click on tags
  And I wait for 2 seconds
  And I click on new tag
  And I wait for 2 seconds
  And I enter the new tag name "$name"
  And I wait for 2 seconds
  And I click on save tag
  And I wait for 3 seconds
  Then I should see the created tag