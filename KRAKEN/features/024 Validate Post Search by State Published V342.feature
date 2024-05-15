Feature: Ver posts

@user1 @web
Scenario: ValidatePostSearchByStatePublished...v3.42.0
  Given I navigate to page "<OLDSIGNINURL>"
  And I wait for 5 seconds
  When I enter my email "<EMAIL>"
  And I wait for 1 seconds
  And I enter my password "<PASSWORD>"
  And I wait for 1 seconds
  And I click on sign in
  And I wait for 5 seconds
  And I click on Published old