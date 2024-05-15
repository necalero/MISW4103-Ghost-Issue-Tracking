Feature: Ver posts

@user1 @web
Scenario: Validate Post Search by Title...v5.14.1
  Given I navigate to page "<SIGNINURL>"
  And I wait for 5 seconds
  When I enter my email "<EMAIL>"
  And I wait for 1 seconds
  And I enter my password "<PASSWORD>"
  And I wait for 1 seconds
  And I click on sign in
  And I wait for 5 seconds
  And I click on search
  And I wait for 1 seconds
  And I enter post name "<POSTSEARCH>"
  And I wait for 2 seconds
  Then I should see the post coming soon
  And I wait for 2 seconds