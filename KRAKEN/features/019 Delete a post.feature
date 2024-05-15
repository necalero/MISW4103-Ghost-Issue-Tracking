Feature: Borrar post

@user1 @web
Scenario: DeleteAPost...v5.14.1
  Given I navigate to page "<SIGNINURL>"
  And I wait for 5 seconds
  When I enter my email "<EMAIL>"
  And I wait for 1 seconds
  And I enter my password "<PASSWORD>"
  And I wait for 1 seconds
  And I click on sign in
  And I wait for 10 seconds
  And I click on pages
  And I click on State
  Then I select Published Pages
  Then I select first post
  Then I delete the post
  Then I confirm delete the post
