Feature: Ver posts

@user1 @web
Scenario: 012 Validate Post Search by State Draft ... v5.14.1
  Given I navigate to page "<OLDSIGNINURL>"
  And I wait for 5 seconds
  When I enter my email "<EMAIL>"
  And I wait for 1 seconds
  And I enter my password "<PASSWORD>"
  And I wait for 1 seconds
  And I click on sign in
  And I wait for 5 seconds
  And I click on Drafts old