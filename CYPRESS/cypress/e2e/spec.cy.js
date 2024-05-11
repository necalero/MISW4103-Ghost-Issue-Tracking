import {faker} from '@faker-js/faker';

const version = 'latest';
Cypress.Commands.add('login', () => {
  cy.visit('https://ghost-cj7h.onrender.com/ghost/');
  cy.get('.email').type('pruebas@gmail.com');
  cy.get('.password').type('f7m9R:Ng8K!EM!c');

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
    const es ='es1'
    let id =0;
    // THEN: User creates a new memeber
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/members/new');
    cy.wait(2000);
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
    // WHEN: User types the known tag name "test"
    const email = faker.internet.email();
    cy.get('#member-name').type('miembro1', { force: true })

    cy.get('#member-email') // Target using data-test attribute
        .type(email);
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
    cy.contains('Save').click();

    cy.wait(5000);
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
    // THEN: The new tag with the known name "test" should be created

    cy.contains('miembro1').should('be.visible');

    // Take screenshot and save it in the "data" folder

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
    const es ='es2'
    let id =0;
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
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
    cy.contains('Publish').click();

    cy.wait(5000);
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
    // THEN: The new tag with the known name "test" should be created

    cy.contains('Continue, final review').click();
    cy.wait(2000);
    cy.contains('Publish page, right now').click();
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
    const es ='es3'
    let id =0;
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/posts?type=published');
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
describe('Validar filtros recientes  ', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User go to published pages
  it('display tag created', () => {
    const es ='es4'
    let id =0;
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/posts?type=published');
    cy.wait(2000);

    // WHEN: User types the newest fist of the page
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
    cy.get('[class*="gh-contentfilter-menu gh-contentfilter-sort"]')
        .click();


    cy.wait(5000);

    // THEN: Must show all the levels of recent added

    cy.contains('Newest');
    cy.contains('Oldest ');
    cy.contains('Recently updated');
    cy.contains('Open rate');
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;

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
    const es ='es5'
    let id =0;
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/posts?type=published');
    cy.wait(2000);

    // WHEN: User types the visivility of the page

    cy.get('[class*="gh-contentfilter-menu gh-contentfilter-visibility"]')
        .click();


    cy.wait(5000);

    // THEN: Must show all the levels of access

    cy.contains('All access');
    cy.contains('Public');
    cy.contains('Members-only');
    cy.contains('Paid members-only');
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
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
    const es ='es6'
    let id =0;
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/posts?type=published');
    cy.wait(2000);
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
    // WHEN: User types the visivility of the page

    cy.get('[class*="gh-contentfilter-menu gh-contentfilter-type gh-contentfilter-selected"]')
        .click();


    cy.wait(5000);

    // THEN: Must show all the levels of visibility

    cy.contains('All posts');
    cy.contains('Draft posts');
    cy.contains('Published posts');

    cy.contains('Scheduled posts');
    cy.contains('Featured posts');
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
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
    const es ='es7'
    let id =0;
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/tags/new');
    cy.wait(2000);
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
    // WHEN: User types the known tag name "test"
    const tagName = 'test';
    cy.get('#tag-name')
        .should('be.visible')
        .type(tagName);
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
    // WHEN: User clicks on the "Save" button
    cy.contains('Save').click();

    cy.wait(5000);
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
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
    const es ='es8'
    let id =0;
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/posts?type=published');
    cy.wait(2000);
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
    // WHEN: User types the known tag name "test"
    const url = faker.internet.url();
    cy.get('[class*="gh-contentfilter-menu gh-contentfilter-tag"]')
        .click();


    cy.wait(5000);

    // THEN: The new tag with the known name "test" should be created

    cy.contains('test');
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
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
    const es ='es9'
    let id =0;
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
    cy.wait(2000);
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
    // WHEN: User types the known tag name "test"
    const url = faker.internet.url();
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type('This is the page title');
    cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]') // Target using data-test attribute
        .type('This is the page content');
    cy.wait(1000);
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
    cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]')
        .should('be.visible') // Optional assertion for visibility
        .click(); // Click the button
    cy.wait(1000);
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
    cy.get('#url').type(url);
    cy.wait(1000);
    cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]')
        .should('be.visible') // Optional assertion for visibility
        .click(); // Click the button
    cy.wait(1000);
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
    cy.contains('Publish').click();

    cy.wait(5000);
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
    // THEN: The new tag with the known name "test" should be created

    cy.contains('Continue, final review').click();
    cy.wait(2000);
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
    id++;
    cy.contains('Publish page, right now').click();
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
    const es ='es10'
    let id =0;
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
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
describe('Validar filtro Published para posts', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Debería mostrar las posts Published', () => {
    const es ='es11'
    let id =0;
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/posts?type=published')
    cy.contains('Published posts').should('be.visible');
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
  });
});

describe('Validar filtro Draft para posts', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Debería mostrar las posts Draft', () => {
    const es ='es12'
    let id =0;
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/posts?type=draft')
    cy.contains('Draft posts').should('be.visible');
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
  });
});

describe('Validar filtro Scheduled para posts', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Debería mostrar las posts Scheduled', () => {
    const es ='es13'
    let id =0;
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/posts?type=scheduled')
    cy.contains('Scheduled posts').should('be.visible');
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
  });
});

describe('Validar filtro por titulo', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Debería buscar post por titulo', () => {
    const es ='es14'
    let id =0;
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/posts')
    cy.get('.gh-nav-btn-search').click();
    cy.get('.gh-nav-search-input').type('Coming soon{enter}');
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
  });
});

describe('Validate Recent Filters Pages', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Debería mostrar los filtros recientes para las paginas', () => {
    const es ='es15'
    let id =0;
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/pages')
    cy.get('.gh-contentfilter-sort .ember-power-select-selected-item').click();
    cy.wait(2000);
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
  });
});
describe('Validar filtros accesos paginas', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Debería mostrar los filtros de accesos para las paginas', () => {
    const es ='es16'
    let id =0;
    cy.viewport(1536, 678)

    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/pages')

    cy.get('.view-actions > .gh-contentfilter > .gh-contentfilter-visibility > .ember-view > .ember-power-select-selected-item').click()
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
  });
});
//
describe('Validar filtro estado paginas', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Debería mostrar los filtros de estado para las paginas', () => {

    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/pages')
    describe('test_name', function() {

      it('deberia verifiacr el filtro por estado de paginas', function() {
        const es ='es17'
        let id =0;
        cy.viewport(1536, 678)

        cy.visit('https://ghost-cj7h.onrender.com/ghost/#/pages')

        cy.get('.gh-canvas-header-content > .view-actions > .gh-contentfilter > .gh-contentfilter-type > .ember-view').click()
        cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });
      })

    })

  });
});
//
describe('Crear nuevo post y publicarlo', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Debería crear un nuevo post y publicarlo', () => {
    const es ='es18'
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
    const es ='es19'
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

describe('Crear post y programarlo', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Debería crear un post y programarlo', () => {
    const es ='es20'
    let id =0;
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/posts')
    cy.get('[class*="ember-view gh-btn gh-btn-primary view-actions-top-row"]') // Target using data-test attribute
        .type('This is the post title');
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type('This is the post content');
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]').type('{enter}');
    cy.wait(20000);
    cy.contains('Publish').click();
    cy.screenshot(`data/${version}/${es}/${id}.png`, { overwrite: true });

  });
});

