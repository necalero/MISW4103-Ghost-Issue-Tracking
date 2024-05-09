Feature: Crear etiqueta

@user1 @web
Scenario: Crear etiqueta con nombre
  Given I navigate to page "<OLDSIGNINURL>"
  And I wait for 2 seconds
  When I enter my email "<EMAIL>"
  And I wait for 1 seconds
  And I enter my password "<PASSWORD>"
  And I wait for 1 seconds
  And I click on sign in
  And I wait for 4 seconds
  And I click on tags on the old version
  And I wait for 2 seconds
  And I click on new tag on the old version
  And I wait for 2 seconds
  And I enter the new tag name "<TAGNAME>"
  And I wait for 2 seconds
  And I click on save tag on the old version
  And I wait for 3 seconds
  Then I should see the created tag on the old version