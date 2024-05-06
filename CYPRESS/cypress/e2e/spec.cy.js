import {faker} from '@faker-js/faker';

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

describe('Validar filtro Published para posts', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  it('Debería mostrar las posts Published', () => {
    cy.viewport(1536, 678)

    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/posts?type=published')

    cy.get('.gh-nav-body > .gh-nav-top > .gh-nav-list > .gh-nav-list-new > #ember24').click()

    cy.get('.gh-nav-body > .gh-nav-top > .gh-nav-list > .gh-nav-list-new > #ember24').click()

    cy.get('.gh-nav-body > .gh-nav-top > .gh-nav-list > .gh-nav-list-new > #ember24').click()

    cy.get('.gh-nav-body > .gh-nav-top > .gh-nav-list > .gh-nav-list-new > #ember24').click()

    cy.get('.view-actions > .gh-contentfilter > .gh-contentfilter-type > .ember-view > .ember-power-select-selected-item').click()


    // Verificar que se muestren las posts en published
    cy.contains('Published posts').should('be.visible');
  });
});

describe('Validar filtro Draft para posts', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  it('Debería mostrar las posts Draft', () => {
    cy.viewport(1536, 678)

    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/posts?type=draft')

    cy.get('.gh-nav-body > .gh-nav-top > .gh-nav-list > .gh-nav-list-new > #ember24').click()

    cy.get('.gh-nav-body > .gh-nav-top > .gh-nav-list > .gh-nav-list-new > #ember24').click()

    cy.get('.gh-nav-body > .gh-nav-top > .gh-nav-list > .gh-nav-list-new > #ember24').click()

    cy.get('.gh-nav-body > .gh-nav-top > .gh-nav-list > .gh-nav-list-new > #ember24').click()

    cy.get('.view-actions > .gh-contentfilter > .gh-contentfilter-type > .ember-view > .ember-power-select-selected-item').click()


    // Verificar que se muestren las posts draft
    cy.contains('Draft posts').should('be.visible');
  });
});

describe('Validar filtro Scheduled para posts', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  it('Debería mostrar las posts Scheduled', () => {
    cy.viewport(1536, 678)

    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/posts?type=draft')

    cy.get('.gh-nav-body > .gh-nav-top > .gh-nav-list > .gh-nav-list-new > #ember24').click()

    cy.get('.gh-nav-body > .gh-nav-top > .gh-nav-list > .gh-nav-list-new > #ember24').click()

    cy.get('.gh-nav-body > .gh-nav-top > .gh-nav-list > .gh-nav-list-new > #ember24').click()

    cy.get('.gh-nav-body > .gh-nav-top > .gh-nav-list > .gh-nav-list-new > #ember24').click()

    cy.get('.view-actions > .gh-contentfilter > .gh-contentfilter-type > .ember-view > .ember-power-select-selected-item').click()

    // Verificar que se muestren las posts scheduled
    cy.contains('Scheduled posts').should('be.visible');
  });
});
describe('Validar filtro por titulo', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  it('Debería buscar post por titulo', () => {
    cy.viewport(1536, 730);

    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/posts?type=scheduled');

    cy.get('.gh-nav > .flex > .gh-nav-menu > .gh-nav-menu-details > .gh-nav-menu-details-sitetitle').click();

    cy.get('.gh-nav-menu > .gh-nav-menu-search > .gh-nav-btn-search > span > svg').click();

    cy.get('.modal-content > .gh-nav-search-modal > .gh-nav-search-input > .ember-basic-dropdown > .ember-view').click();

    cy.get('.gh-nav-search-modal > .gh-nav-search-input > .ember-basic-dropdown > .ember-view > .gh-input-with-select-input').click();

    cy.get('.gh-nav-search-modal > .gh-nav-search-input > .ember-basic-dropdown > .ember-view > .gh-input-with-select-input').type('Coming soon');

    // Presionar la tecla Enter
    cy.get('.gh-nav-search-modal > .gh-nav-search-input > .ember-basic-dropdown > .ember-view > .gh-input-with-select-input').type('{enter}');


  });
});

describe('Validate Recent Filters Pages', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  it('Debería mostrar los filtros recientes para las paginas', () => {
    cy.viewport(1536, 678)

    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/pages')

    cy.get('.gh-viewport > .gh-main > .gh-canvas > .gh-canvas-header > .gh-canvas-header-content').click()

    cy.get('.gh-nav-body > .gh-nav-top > .gh-nav-list > li > #ember81').click()

    cy.get('.view-actions > .gh-contentfilter > .gh-contentfilter-sort > .ember-view > .ember-power-select-selected-item').click()

    cy.get('.view-actions > .gh-contentfilter > .gh-contentfilter-sort > .ember-view > .ember-power-select-selected-item').click()

    cy.get('.view-actions > .gh-contentfilter > .gh-contentfilter-sort > .ember-view > .ember-power-select-selected-item').click()

    cy.get('.view-actions > .gh-contentfilter > .gh-contentfilter-sort > .ember-view > .ember-power-select-selected-item').click()


    cy.wait(2000);


    cy.contains('Newest');
    cy.contains('Oldest');
    cy.contains('Recently updated');
  });
});

describe('Validar filtros accesos paginas', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  it('Debería  filtros accesos paginas', () => {
    cy.viewport(1536, 678)

    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/dashboard')

    cy.get('.gh-nav-body > .gh-nav-top > .gh-nav-list > li > #ember26').click()

    cy.get('.view-actions > .gh-contentfilter > .gh-contentfilter-visibility > .ember-view > .ember-power-select-selected-item').click()


    cy.wait(2000);


    cy.contains('All access');
  });
});

describe('Validar filtro estado paginas', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  it('Debería  filtros estado paginas', () => {
    cy.viewport(1536, 678)

    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/dashboard')

    cy.get('.gh-nav-body > .gh-nav-top > .gh-nav-list > li > #ember11').click()

    cy.get('.gh-canvas-header-content > .view-actions > .gh-contentfilter > .gh-contentfilter-type > .ember-view').click()


    cy.wait(2000);


    cy.contains('All posts');
  });
});

describe('Crear nuevo post y publicarlo', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  it('Debería  Crear un nuevo post y publicarlo', () => {
    cy.viewport(1536, 678)

    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/dashboard')

    cy.get('.gh-nav-body > .gh-nav-top > .gh-nav-list > .gh-nav-list-new > #ember9').click()

    cy.get('.gh-canvas-header > .gh-canvas-header-content > .view-actions > #ember95 > span').click()

    cy.get('.flex > #ember162 > .gh-koenig-editor > .gh-koenig-editor-pane > #ember166').click()

    cy.get('#ember162 > .gh-editor-header > .flex > .darkgrey > span').click()
    cy.wait(2000);

    cy.get('.flex > .gh-publish-settings-container > .gh-publish-cta > .gh-btn > span').click()

    cy.get('.flex > .gh-publish-settings-container > .gh-publish-cta > #ember182 > span').click()
    cy.wait(2000);

    cy.get('.gh-publish-settings-container > .gh-post-bookmark-wrapper > .gh-post-bookmark-container > .gh-post-bookmark > .gh-post-bookmark-content').click()

    cy.visit('https://ghost-cj7h.onrender.com/nuevo-post/')

    cy.get('#ember172 > .flex > .gh-publish-header > .gh-btn-editor > span').click()

    cy.get('#ember162 > .gh-editor-header > .flex > #ember163 > span').click()
  });
});

describe('Eliminar post', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  it('Debería  Eliminar posts', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/pages');
    cy.get('.darkgrey:nth-child(2) > span').click();
    cy.get('.gh-revert-to-draft > span').click();
    cy.contains('Draft').should('be.visible');
  });
});

describe('Crear post y programarlo', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  it('Debería Crear post y programarlo', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/pages');
    cy.get('#ember1506').type('post schedule');
    cy.get('.gh-koenig-editor-pane').click();
    cy.get('.gh-editor-header .darkgrey > span').click();
    cy.get('.last .gh-publish-setting-trigger > span').click();
    cy.get('.active > label').click();
    cy.get('.gh-revert-to-draft > span').click();

  });
});




