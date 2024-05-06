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
  And I click on NewPost
  And I write post title "<POSTNAME>"
  And I wait for 2 seconds
  And I write post body "<POSTNAME>"
  And I wait for 2 seconds
  Then I publish post
  And I wait for 2 seconds
  Then I select Right Now
  And I wait for 2 seconds
  Then I click continue
  And I wait for 2 seconds
  Then I click PublishPost
  And I wait for 2 seconds
