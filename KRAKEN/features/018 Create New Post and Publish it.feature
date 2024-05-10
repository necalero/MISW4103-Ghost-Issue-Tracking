Feature: Crear Post

@user1 @web
Scenario: 018 Create New Post and Publish it ... v5.14.1
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
  Then I click continue
  Then I click PublishPost