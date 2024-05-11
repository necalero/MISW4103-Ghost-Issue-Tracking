import {faker} from '@faker-js/faker';
const version = 'version3_42_0';
const url ='https://ghost-a76u.onrender.com/ghost/'
Cypress.Commands.add('login', () => {
  cy.visit(url);


  cy.get('.email').type('pruebas@gmail.com');
  cy.get('.password').type('f7m9R:Ng8K!EM!c');

  cy.get('button[type="submit"]').click();
  cy.wait(2000);

  
});


// GIVEN: User is logged in
describe('Crear nueva pagina ', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User creates a new page with a name "test" content test
  it('Crea una nueva pagina con el nombre "test"', () => {
    const es ='es1'
    let id =0;
    cy.visit(url+'#/editor/page');
    cy.wait(2000);
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
    // WHEN: User types the known tag name "test"

    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type('This is the page title');
    cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]') // Target using data-test attribute
        .type('This is the page content');
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
    cy.wait(5000);
    cy.contains('Publish').click();

    cy.wait(5000);
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
    // THEN: The new tag with the known name "test" should be created

    cy.contains('Publish').click();
    cy.wait(2000);
    
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
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
    const es ='es2'
    let id =0;
    cy.visit(url+'#/posts?type=published');
    cy.wait(2000);
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
    // WHEN: User types the author of the page
    
    cy.get('[class*="gh-contentfilter-menu gh-contentfilter-author"] ')
        .click();


    cy.wait(5000);

    // THEN: Must show all the authors

    cy.contains('All authors');
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;

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
    const es ='es3'
    let id =0;
    cy.visit(url+'#/editor/page');
    cy.wait(2000);
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
    // WHEN: User types the known tag name "test"
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type('This is the page title');
    cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]') // Target using data-test attribute
        .type('This is the page content');
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
    cy.contains('Preview').click();

    cy.wait(5000);

    // THEN: The new tag with the known name "test" should be created
    cy.contains('Publish');
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;

  });
});

describe('Crear nuevo post y publicarlo', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Debería crear un nuevo post y publicarlo', () => {
    const es ='es4'
    let id =0;
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/posts')
    cy.get('[class*="ember-view gh-btn gh-btn-primary view-actions-top-row"]') // Target using data-test attribute
        .type('This is the post title');
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type('This is the post content');
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]').type('{enter}');
    cy.wait(20000);
    cy.contains('Publish').click();
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
    cy.contains('Continue, final review →').click();
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
    cy.contains('Publish post, right now').click();
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });

  });
});
//
describe('Eliminar post', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Debería eliminar un post', () => {
    cy.viewport(1536, 678)
    const es ='es5'
    let id =0;

    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/posts')
    cy.get('[class*="ember-view gh-btn gh-btn-primary view-actions-top-row"]') // Target using data-test attribute
        .type('This is the post title');
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type('This is the post content');
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
    cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
    cy.contains('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click();
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    cy.contains('Delete').click();

  });
});