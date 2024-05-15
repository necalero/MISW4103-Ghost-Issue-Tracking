Feature: Crear página

@user1 @web
Scenario: PrevisualizarCreaciónDePáginaConNombreYContenido...v5.14.1
  Given I navigate to page "<SIGNINURL>"
  And I wait for 2 seconds
  When I enter my email "<EMAIL>"
  And I wait for 1 seconds
  And I enter my password "<PASSWORD>"
  And I wait for 1 seconds
  And I click on sign in
  And I wait for 4 seconds
  And I click on pages
  And I wait for 2 seconds
  And I click on new page
  And I wait for 2 seconds
  And I enter my page name "<PAGENAME>"
  And I wait for 2 seconds
  And I enter my page content "<PAGECONTENT>"
  And I wait for 3 seconds
  Then I should see the option to view the page preview
  And I wait for 3 seconds
  And I should be able to preview the page

