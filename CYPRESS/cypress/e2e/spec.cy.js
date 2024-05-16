import {faker} from '@faker-js/faker';
const url = 'https://ghost-cj7h.onrender.com/ghost/'
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
describe('Invitar a un nuevo miembro del personal nuevo [estrategia dato conocido]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User navigates to staff settings and sends an invitation with known email
  it('Accede a la página de configuración de personal y envía una invitación', () => {
    cy.visit(url+'#/settings/staff');
    cy.wait(2000);

    // WHEN: User clicks on "Invite" and provides a known email
    cy.contains('Invite').click();
    cy.wait(2000);
    cy.get('input[name="email"]').type('miguel.parra@bizagi.com');

    // WHEN: User clicks on "Send invitation now"
    cy.contains('Send invitation now').click();

    cy.wait(5000);
  });
});

// GIVEN: User is logged in
describe('Invitar a un nuevo miembro del personal nuevo [estrategia dato aleatorio valido]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User navigates to staff settings and sends an invitation with a valid random email
  it('Accede a la página de configuración de personal y envía una invitación', () => {
    cy.visit(url+'#/settings/staff');
    cy.wait(2000);

    // WHEN: User clicks on "Invite" and provides a valid random email using faker
    cy.contains('Invite').click();
    cy.wait(2000);
    const email = faker.internet.email();
    cy.get('input[name="email"]').type(email);

    // WHEN: User clicks on "Send invitation now"
    cy.contains('Send invitation now').click();

    cy.wait(5000);
  });
});

// GIVEN: User is logged in
describe('Invitar a un nuevo miembro del personal nuevo [estrategia dato aleatorio ]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User navigates to staff settings and attempts to send an invitation with invalid random email
  it('Accede a la página de configuración de personal y envía una invitación', () => {
    // WHEN: User visits staff settings
    cy.visit(url+'#/settings/staff');
    cy.wait(2000);

    // WHEN: User clicks on "Invite"
    cy.contains('Invite').click();
    cy.wait(2000);

    // WHEN: User provides an invalid random email using faker
    const email = faker.word.words();
    cy.get('input[name="email"]').type(email);

    // WHEN: User clicks on "Send invitation now"
    cy.contains('Send invitation now').click();

    cy.wait(5000);

    // THEN: User should see an error message indicating an invalid email
    cy.contains('Invalid Email.').should('be.visible');
  });
});

// GIVEN: User is logged in
describe('Modificar el campo user-name en la página de configuración de personal [Dato conocido]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User modifies the user-name field with a known value
  it('Modifica el campo user-name y verifica el cambio', () => {
    cy.visit(url+'#/settings/staff/grupo');
    cy.wait(2000);

    // WHEN: User provides a known user-name
    const newUserName = 'nuevoNombreDeUsuario';
    cy.get('#user-name')
    
      .clear()
      .type(newUserName,{ force: true });

    // WHEN: User clicks on the "Save" button
    cy.contains('Save').click();

    cy.wait(5000);

    // THEN: The user-name field should be successfully updated
    cy.get('#user-name').should('have.value', newUserName);
  });
});

// GIVEN: User is logged in
describe('Modificar el campo user-name en la página de configuración de personal [Dato aleatorio valido]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User modifies the user-name field with valid random data
  it('Modifica el campo user-name y verifica el cambio', () => {
    cy.visit(url+'#/settings/staff/grupo');
    cy.wait(2000);

    // WHEN: User generates a valid random user-name using faker
    const newUserName = faker.person.firstName();
    cy.get('#user-name')
      
      .clear()
      .type(newUserName,{ force: true });

    // WHEN: User clicks on the "Save" button
    cy.contains('Save').click();

    cy.wait(5000);

    // THEN: The user-name field should be successfully updated
    cy.get('#user-name').should('have.value', newUserName);
  });
});

// GIVEN: User is logged in
describe('Modificar el campo user-name en la página de configuración de personal [Dato aleatorio]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User modifies the user-name field with valid random words
  it('Modifica el campo user-name y verifica el cambio', () => {
    cy.visit(url+'#/settings/staff/grupo');
    cy.wait(2000);

    // WHEN: User generates valid random words for user-name using faker
    const newUserName = faker.word.words();
    cy.get('#user-name')

      .clear()
      .type(newUserName,{ force: true });

    // WHEN: User clicks on the "Save" button
    cy.contains('Save').click();

    cy.wait(5000);

    // THEN: The user-name field should be successfully updated
    cy.get('#user-name').should('have.value', newUserName);
  });
});

// GIVEN: User is logged in
describe('Modificar el campo user-location en la página de configuración de personal [Dato conocido]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User modifies the location field with a known value
  it('Modifica el campo location y verifica el cambio', () => {
    cy.visit(url+'#/settings/staff/grupo');
    cy.wait(2000);

    // WHEN: User provides a known location
    const newLocation = 'Bogota';
    cy.get('#user-location').scrollIntoView()
    
      .clear()
      .type(newLocation,{ force: true });

    // WHEN: User clicks on the "Save" button
    cy.contains('Save').click();

    cy.wait(5000);

    // THEN: The location field should be successfully updated
    cy.get('#user-location').scrollIntoView().should('have.value', newLocation);
  });
});

// GIVEN: User is logged in
describe('Modificar el campo user-location en la página de configuración de personal [Dato aleatorio valido]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User modifies the location field with valid random data
  it('Modifica el campo location y verifica el cambio', () => {
    cy.visit(url+'#/settings/staff/grupo');
    cy.wait(2000);

    // WHEN: User generates a valid random location using faker
    const newLocation = faker.location.city();
    cy.get('#user-location').scrollIntoView()

      .clear()
      .type(newLocation,{ force: true });

    // WHEN: User clicks on the "Save" button
    cy.contains('Save').click();

    cy.wait(5000);

    // THEN: The location field should be successfully updated
    cy.get('#user-location').scrollIntoView().should('have.value', newLocation);
  });
});


// GIVEN: User is logged in
describe('Modificar el campo user-location en la página de configuración de personal [Dato aleatorio ]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User modifies the location field with random words
  it('Modifica el campo location y verifica el cambio', () => {
    cy.visit(url +'#/settings/staff/grupo');
    cy.wait(2000);

    // WHEN: User generates random words for location using faker
    const newLocation = faker.word.words();
    cy.get('#user-location').scrollIntoView()

      .clear()
      .type(newLocation,{ force: true });

    // WHEN: User clicks on the "Save" button
    cy.contains('Save').click();

    cy.wait(5000);

    // THEN: The location field should be successfully updated
    cy.get('#user-location').scrollIntoView().should('have.value', newLocation);
  });
});
// GIVEN: User is logged in
describe('Modificar el campo facebook en la página de configuración de personal [Dato conocido]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User modifies the Facebook field with a known value
  it('Modifica el campo fb y verifica el cambio', () => {
    cy.visit(url +'#/settings/staff/grupo');
    cy.wait(2000);

    // WHEN: User provides a known Facebook handle
    const newFB = 'MiguelParra';
    cy.get('#user-facebook').scrollIntoView()
    
      .clear()
      .type(newFB,{ force: true });

    // WHEN: User clicks on the "Save" button
    cy.contains('Save').click();

    cy.wait(5000);

    // THEN: The Facebook field should be successfully updated with the full Facebook URL
    cy.get('#user-facebook').scrollIntoView().should('have.value', 'https://www.facebook.com/' + newFB);
  });
});

// GIVEN: User is logged in
describe('Modificar el campo Facebook en la página de configuración de personal [Dato aleatorio valido]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User modifies the Facebook field with valid random data
  it('Modifica el campo fb y verifica el cambio', () => {
    cy.visit(url+'#/settings/staff/grupo');
    cy.wait(2000);

    // WHEN: User generates a valid random Facebook handle using faker
    const newFB = faker.person.firstName();
    cy.get('#user-facebook').scrollIntoView()
      
      .clear()
      .type(newFB,{ force: true });

    // WHEN: User clicks on the "Save" button
    cy.contains('Save').click();

    cy.wait(5000);

    // THEN: The Facebook field should be successfully updated with the full Facebook URL
    cy.get('#user-facebook').scrollIntoView().should('have.value', 'https://www.facebook.com/' + newFB);
  });
});

// GIVEN: User is logged in
describe('Modificar el campo FACEBOOK en la página de configuración de personal [Dato aleatorio ]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User modifies the Facebook field with valid random words
  it('Modifica el campo fb y verifica el cambio', () => {
    cy.visit(url+'#/settings/staff/grupo');
    cy.wait(2000);

    // WHEN: User generates valid random words using faker
    const newFB = faker.word.adjective();
    cy.get('#user-facebook').scrollIntoView()
      
      .clear()
      .type(newFB,{ force: true });

    // WHEN: User clicks on the "Save" button
    cy.contains('Save').click();

    cy.wait(5000);

    // THEN: The Facebook field should be successfully updated with the full Facebook URL
    cy.get('#user-facebook').scrollIntoView().should('have.value', 'https://www.facebook.com/' + newFB);
  });
});


// GIVEN: User is logged in
describe('Modificar el campo twiter en la página de configuración de personal [Dato conocido]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User modifies the Twitter field with a known value
  it('Modifica el campo twiter y verifica el cambio', () => {
    cy.visit(url+'#/settings/staff/grupo');
    cy.wait(2000);

    // WHEN: User provides a known Twitter handle
    const newt = 'MiguelParra';
    cy.get('#user-twitter').scrollIntoView()
  
      .clear()
      .type(newt,{ force: true });

    // WHEN: User clicks on the "Save" button
    cy.contains('Save').click();

    cy.wait(5000);

    // THEN: The Twitter field should be successfully updated with the full Twitter URL
    cy.get('#user-twitter').scrollIntoView().should('have.value', 'https://twitter.com/' + newt);
  });
});

// GIVEN: User is logged in
describe('Modificar el campo Twiter en la página de configuración de personal [Dato aleatorio valido]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User modifies the Twitter field with valid random data
  it('Modifica el campo twiter y verifica el cambio', () => {
    cy.visit(url+'#/settings/staff/grupo');
    cy.wait(2000);

    // WHEN: User generates a valid random Twitter handle using faker
    const newT = faker.person.firstName();
    cy.get('#user-twitter').scrollIntoView()
     
      .clear()
      .type(newT,{ force: true });

    // WHEN: User clicks on the "Save" button
    cy.contains('Save').click();

    cy.wait(5000);

    // THEN: The Twitter field should be successfully updated with the full Twitter URL
    cy.get('#user-twitter').scrollIntoView().should('have.value', 'https://twitter.com/' + newT);
  });
});

// GIVEN: User is logged in
describe('Modificar el campo Twiter en la página de configuración de personal [Dato aleatorio ]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User modifies the Twitter field with valid random words
  it('Modifica el campo fb y verifica el cambio', () => {
    cy.visit(url +'#/settings/staff/grupo');
    cy.wait(2000);

    // WHEN: User generates valid random words using faker
    const newT = faker.word.adjective();
    cy.get('#user-twitter').scrollIntoView()
      
      .clear()
      .type(newT,{ force: true });

    // WHEN: User clicks on the "Save" button
    cy.contains('Save').click();

    cy.wait(5000);

    // THEN: The Twitter field should be successfully updated with the full Twitter URL
    cy.get('#user-twitter').scrollIntoView().should('have.value', 'https://twitter.com/' + newT);
  });
});

// GIVEN: User is logged in
describe('Modificar el campo bio en la página de configuración de personal [Dato conocido]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User modifies the bio field with a known value
  it('Modifica el campo bio y verifica el cambio', () => {
    cy.visit(url+'#/settings/staff/grupo');
    cy.wait(2000);

    // WHEN: User provides a known bio
    const newBio = 'Escritor reconocido en el campo de las pruebas automaticas, esta triste porque los tutores no reconocen su trabajo como tester.';
    cy.get('#user-bio').scrollIntoView()
      
      .clear()
      .type(newBio,{ force: true });

    // WHEN: User clicks on the "Save" button
    cy.contains('Save').click();

    cy.wait(5000);

    // THEN: The bio field should be successfully updated
    cy.get('#user-bio').scrollIntoView().should('have.value', newBio);
  });
});

// GIVEN: User is logged in
describe('Modificar el campo bio en la página de configuración de personal [Dato aleatorio valido]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User modifies the bio field with valid random data
  it('Modifica el campo bio y verifica el cambio', () => {
    cy.visit(url+'#/settings/staff/grupo');
    cy.wait(2000);

    // WHEN: User generates valid random bio using faker
    const newBio = faker.lorem.paragraph();
    cy.get('#user-bio').scrollIntoView()
     
      .clear()
      .type(newBio,{ force: true });

    // WHEN: User clicks on the "Save" button
    cy.contains('Save').click();

    cy.wait(5000);

    // THEN: The bio field should be successfully updated
    cy.get('#user-bio').scrollIntoView().should('have.value', newBio);
  });
});


// GIVEN: User is logged in
describe('Modificar el campo Bio en la página de configuración de personal [Dato aleatorio ]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User modifies the bio field with valid random words
  it('Modifica el campo  bio y verifica el cambio', () => {
    cy.visit(url+'#/settings/staff/grupo');
    cy.wait(2000);

    // WHEN: User generates valid random words using faker
    const newBio = faker.word.words();
    cy.get('#user-bio').scrollIntoView()
  
      .clear()
      .type(newBio,{ force: true });

    // WHEN: User clicks on the "Save" button
    cy.contains('Save').click();

    cy.wait(5000);

    // THEN: The bio field should be successfully updated
    cy.get('#user-bio').scrollIntoView().should('have.value', newBio);
  });
});


// GIVEN: User is logged in
describe('Modificar el campo website en la página de configuración de personal [Dato conocido]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User modifies the website field with a known value
  it('Modifica el campo website y verifica el cambio', () => {
    cy.visit(url+'#/settings/staff/grupo');
    cy.wait(2000);

    // WHEN: User provides a known website
    const newWebsite = 'https://sistemas.uniandes.edu.co/es/isis';
    cy.get('#user-website').scrollIntoView()
      .clear()
      .type(newWebsite,{ force: true });

    // WHEN: User clicks on the "Save" button
    cy.contains('Save').click();

    cy.wait(5000);

    // THEN: The website field should be successfully updated
    cy.get('#user-website').scrollIntoView().should('have.value', newWebsite);
  });
});

// GIVEN: User is logged in
describe('Modificar el campo website en la página de configuración de personal [Dato aleatorio valido]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User modifies the website field with valid random data
  it('Modifica el campo website y verifica el cambio', () => {
    cy.visit(url+'#/settings/staff/grupo');
    cy.wait(2000);

    // WHEN: User generates a valid random website using faker
    const newWebsite = faker.internet.url();
    cy.get('#user-website').scrollIntoView()
      
      .clear()
      .type(newWebsite,{ force: true });

    // WHEN: User clicks on the "Save" button
    cy.contains('Save').click();

    cy.wait(5000);

    // THEN: The website field should be successfully updated
    cy.get('#user-website').scrollIntoView().should('have.value', newWebsite);
  });
});


// GIVEN: User is logged in
describe('Modificar el campo website en la página de configuración de personal [Dato aleatorio ]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User attempts to modify the website field with valid random words
  it('Modifica el campo website y verifica el cambio', () => {
    cy.visit(url+'#/settings/staff/grupo');
    cy.wait(2000);

    // WHEN: User generates valid random words using faker
    const newWebsite = faker.word.words();
    cy.get('#user-website').scrollIntoView()
      
      .clear()
      .type(newWebsite,{ force: true });

    // WHEN: User clicks on the "Save" button
    cy.contains('Save').click();

    cy.wait(5000);

    // THEN: The system should display a message indicating that the website is not a valid URL
    cy.contains('Website is not a valid url');
  });
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

