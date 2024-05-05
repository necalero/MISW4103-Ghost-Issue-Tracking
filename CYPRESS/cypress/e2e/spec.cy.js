import {faker} from '@faker-js/faker';
Cypress.Commands.add('login', () => {
  cy.visit('https://ghost-cj7h.onrender.com/ghost/');
 

  cy.get('.email').type('pruebas@gmail.com'); 
  cy.get('.password').type('123456789a'); 

  cy.get('button[type="submit"]').click();
  cy.wait(2000);

  cy.url().should('include', '/dashboard');

  cy.wait(2000);
});

// GIVEN: User is logged in
describe('Crear nueva miembro ', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });
    it('Crea una nuevo miembro', () => {
    // THEN: User creates a new memeber
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/members/new');
    cy.wait(2000);

    // WHEN: User types the known tag name "test"
    const email = faker.internet.email();
    cy.get('#member-name').type('miembro1', { force: true })

    cy.get('#member-email') // Target using data-test attribute
    .type(email);

    cy.contains('Save').click();

    cy.wait(5000);

    // THEN: The new tag with the known name "test" should be created

    cy.contains('miembro1').should('be.visible');
  });
});

// GIVEN: User is logged in
describe('Crear nueva pagina ', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User creates a new page with a name "test" content test
  it('Crea una nueva pagina con el nombre "test"', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
    cy.wait(2000);

    // WHEN: User types the known tag name "test"
    
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
    .type('This is the page title');
    cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]') // Target using data-test attribute
    .type('This is the page content');
    cy.contains('Publish').click();

    cy.wait(5000);

    // THEN: The new tag with the known name "test" should be created

    cy.contains('Continue, final review').click();
    cy.wait(2000);
    cy.contains('Publish page, right now').click();
  });
});

// GIVEN: User is logged in
describe('Validar filtros autores  ', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User go to published pages
  it('display tag created', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/posts?type=published');
    cy.wait(2000);

    // WHEN: User types the author of the page
    const url = faker.internet.url();
    cy.get('[class*="gh-contentfilter-menu gh-contentfilter-author"] ')
    .click();


    cy.wait(5000);

    // THEN: Must show all the authors

    cy.contains('All authors');
 

  });
});


// GIVEN: User is logged in
describe('Validar filtros recientes  ', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User go to published pages
  it('display tag created', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/posts?type=published');
    cy.wait(2000);

    // WHEN: User types the newest fist of the page
    const url = faker.internet.url();
    cy.get('[class*="gh-contentfilter-menu gh-contentfilter-sort"]')
    .click();


    cy.wait(5000);

    // THEN: Must show all the levels of recent added

    cy.contains('Newest');
    cy.contains('Oldest ');
    cy.contains('Recently updated');
    cy.contains('Open rate');

  });
});

// GIVEN: User is logged in
describe('Validar filtros accesos  ', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User go to published pages
  it('display tag created', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/posts?type=published');
    cy.wait(2000);

    // WHEN: User types the visivility of the page
    const url = faker.internet.url();
    cy.get('[class*="gh-contentfilter-menu gh-contentfilter-visibility"]')
    .click();


    cy.wait(5000);

    // THEN: Must show all the levels of access

    cy.contains('All access');
    cy.contains('Public');
    cy.contains('Members-only');
    cy.contains('Paid members-only');
   
  });
});

// GIVEN: User is logged in
describe('Validar filtros miembros  ', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User go to published pages
  it('display tag created', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/posts?type=published');
    cy.wait(2000);

    // WHEN: User types the visivility of the page
    const url = faker.internet.url();
    cy.get('[class*="gh-contentfilter-menu gh-contentfilter-type gh-contentfilter-selected"]')
    .click();


    cy.wait(5000);

    // THEN: Must show all the levels of visibility

    cy.contains('All posts');
    cy.contains('Draft posts');
    cy.contains('Published posts');
   
    cy.contains('Scheduled posts');
    cy.contains('Featured posts');
  });
});

// GIVEN: User is logged in
describe('Crear nueva etiqueta ', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User creates a new tag with a known name "test"
  it('Crea una nueva etiqueta con el nombre "test"', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/tags/new');
    cy.wait(2000);

    // WHEN: User types the known tag name "test"
    const tagName = 'test';
    cy.get('#tag-name')
      .should('be.visible')
      .type(tagName);

    // WHEN: User clicks on the "Save" button
    cy.contains('Save').click();

    cy.wait(5000);

    // THEN: The new tag with the known name "test" should be created
  });
});
// GIVEN: User is logged in
describe('Validar tag creado ', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User go to published pages
  it('display tag created', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/posts?type=published');
    cy.wait(2000);

    // WHEN: User types the known tag name "test"
    const url = faker.internet.url();
    cy.get('[class*="gh-contentfilter-menu gh-contentfilter-tag"]')
    .click();


    cy.wait(5000);

    // THEN: The new tag with the known name "test" should be created

    cy.contains('test');
    
  });
});


// GIVEN: User is logged in
describe('Crear nueva pagina con dominio diferente ', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User creates a new page with a name "test" content test
  it('Crea una nueva pagina con el nombre "test"', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
    cy.wait(2000);

    // WHEN: User types the known tag name "test"
    const url = faker.internet.url();
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
    .type('This is the page title');
    cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]') // Target using data-test attribute
    .type('This is the page content');
    cy.wait(1000);
    cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]')
    .should('be.visible') // Optional assertion for visibility
    .click(); // Click the button
    cy.wait(1000);
    cy.get('#url').type(url);
    cy.wait(1000);
    cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]')
    .should('be.visible') // Optional assertion for visibility
    .click(); // Click the button
    cy.wait(1000);
    cy.contains('Publish').click();

    cy.wait(5000);

    // THEN: The new tag with the known name "test" should be created

    cy.contains('Continue, final review').click();
    cy.wait(2000);
    cy.contains('Publish page, right now').click();
  });
});


// GIVEN: User is logged in
describe('Crear nueva pagina,mostrar  preview ', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User creates a new page must show the preview
  it('Crea una nueva pagina con el nombre "test"', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
    cy.wait(2000);

    // WHEN: User types the known tag name "test"
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
    .type('This is the page title');
    cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]') // Target using data-test attribute
    .type('This is the page content');
    
    cy.contains('Preview').click();

    cy.wait(5000);

    // THEN: The new tag with the known name "test" should be created
    cy.contains('Publish');

  
  });
});





