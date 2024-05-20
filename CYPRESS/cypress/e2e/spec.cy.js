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
Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false here prevents Cypress from failing the test
  return false;
});
// GIVEN: User is logged in

describe('Modificar email miembro n [estrategia dato conocido]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN:User modifty member info
  it('Modify user email', () => {
    cy.visit(url+'#/members/66453639fc0cfa0022f23401');
    cy.wait(2000);

    // WHEN: User mofify  name
 
    cy.get('#member-email').clear().type('MemberN@gmail.com',{force: true});

    // WHEN: User clicks on "Save"
    cy.contains('Save').click();

    cy.wait(5000);

    // THEN: User should see a success message indicating the member was updated  
    cy.contains("MemberN@gmail.com");
  });
});

// GIVEN: User is logged in
describe('Modificar email miembro n [estrategia dato aleatorio valido]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN:User modifty member info
  it('Modify user email', () => {
    cy.visit(url+'#/members/66453639fc0cfa0022f23401');
    cy.wait(2000);

    // WHEN: User mofify  name
    const name = faker.internet.email();
    cy.get('#member-email').clear().type(name,{force: true});

    // WHEN: User clicks on "Save"
    cy.contains('Save').click();

    cy.wait(5000);

    // THEN: User should see a success message indicating the member was updated  
    cy.contains(name);
  });
});

// GIVEN: User is logged in
describe('Modificar email miembro n [estrategia dato aleatorio ]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN:User modifty member info
  it('Modify user email', () => {
    cy.visit(url+'#/members/66453639fc0cfa0022f23401');
    cy.wait(2000);

    // WHEN: User mofify  name
    const name = faker.word.words();
    cy.get('#member-email').clear().type(name,{force: true});

    // WHEN: User clicks on "Save"
    cy.contains('Save').click();

    cy.wait(5000);

   
  });
});
// GIVEN: User is logged in
describe('Modificar nombre miembro n [estrategia dato conocido]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN:User modifty member info
  it('Modify user name', () => {
    cy.visit(url+'#/members/66453639fc0cfa0022f23401');
    cy.wait(2000);

    // WHEN: User mofify  name
 
    cy.get('#member-name').clear().type('MemberN',{force: true});

    // WHEN: User clicks on "Save"
    cy.contains('Save').click();

    cy.wait(5000);

    // THEN: User should see a success message indicating the member was updated  
    cy.contains("MemberN").should('be.visible');
  });
});

// GIVEN: User is logged in
describe('Modificar nombre miembro n [estrategia dato aleatorio valido]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN:User modifty member info
  it('Modify user name', () => {
    cy.visit(url+'#/members/66453639fc0cfa0022f23401');
    cy.wait(2000);

    // WHEN: User mofify  name
    const name = faker.name.firstName();
    cy.get('#member-name').clear().type(name,{force: true});

    // WHEN: User clicks on "Save"
    cy.contains('Save').click();

    cy.wait(5000);

    // THEN: User should see a success message indicating the member was updated  
    cy.contains(name).should('be.visible');
  });
});

// GIVEN: User is logged in
describe('Modificar nombre miembro n [estrategia dato aleatorio ]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN:User modifty member info
  it('Modify user name', () => {
    cy.visit(url+'#/members/66453639fc0cfa0022f23401');
    cy.wait(2000);

    // WHEN: User mofify  name
    const name = faker.word.words();
    cy.get('#member-name').clear().type(name,{force: true});

    // WHEN: User clicks on "Save"
    cy.contains('Save').click();

    cy.wait(5000);

    // THEN: User should see a success message indicating the member was updated  
    cy.contains(name).should('be.visible');
  });
});
// GIVEN: User is logged in
describe('Crear un newsletter  [estrategia dato conocido]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN:User creates a new newsletter
  it('Crear un newsletter', () => {
    cy.visit(url+'#/settings/newsletters');
    cy.wait(2000);

    // WHEN: User clicks on "Add newsletter" 
    cy.contains('Add newsletter').click();
    cy.wait(2000);
    cy.get('#newsletter-title').type('My newsletter topic');

    // WHEN: User clicks on "Create"
    cy.get('[class="gh-btn gh-btn-icon gh-btn-primary ember-view"]').click();

    cy.wait(5000);

    // THEN: User should see a success message indicating the newsletter was created  
    cy.contains("A newsletter with the same name already exists").should('be.visible');
  });
});

// GIVEN: User is logged in
describe('Crear un newsletter  [estrategia dato aleatorio valido]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User creates a new newsletter
  it('User creates a new newsletter', () => {
    cy.visit(url+'#/settings/newsletters');
    cy.wait(2000);
    const title = faker.lorem.words();
    // WHEN: User clicks on "Add newsletter" 
    cy.contains('Add newsletter').click();
    cy.wait(2000);
    cy.get('#newsletter-title').type(title);

    // WHEN: User clicks on "Create"
    cy.get('[class="gh-btn gh-btn-icon gh-btn-primary ember-view"]').click();

    cy.wait(5000);

    // THEN: User should see a success message indicating the newsletter was created  
    cy.contains(title).should('be.visible');
  });
});
// GIVEN: User is logged in
describe('Crear un newsletter  [estrategia dato aleatorio ]', () => {
  beforeEach(() => {
    // WHEN: User logs in before each test
    cy.login();
  });

  // THEN: User creates a new newsletterl
  it('User creates a new newsletter', () => {
    cy.visit(url+'#/settings/newsletters');
    cy.wait(2000);
    const title = faker.word.words();
    // WHEN: User clicks on "Add newsletter" 
    cy.contains('Add newsletter').click();
    cy.wait(2000);
    cy.get('#newsletter-title').type(title);

    // WHEN: User clicks on "Create"
    cy.get('[class="gh-btn gh-btn-icon gh-btn-primary ember-view"]').click();

    cy.wait(5000);

    // THEN: User should see a success message indicating the newsletter was created  
    cy.contains(title).should('be.visible');
  });
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




describe('Crear Post con titulo y descripcion vacia  [estrategia dato conocido]', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Crear Post con titulo y descripcion vacia  [estrategia dato conocido]', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/post')
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
        .type('This is the post content',{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]').type('{enter}');
    cy.wait(2000);
    cy.contains('Publish').click();
    cy.contains('Continue, final review →').click();
    cy.contains('Publish post, right now').click();

  });
});
describe('Crear Post con titulo y descripcion vacia  [estrategia dato aleatorio]', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Debería crear un nuevo post y publicarlo  [estrategia dato aleatorio]', () => {
    const words = faker.word.words();
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/post')
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type(words,{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]').type('{enter}');
    cy.wait(2000);
    cy.contains('Publish').click();
    cy.contains('Continue, final review →').click();
    cy.contains('Publish post, right now').click();
  });
});
describe('Crear Post con titulo y descripcion vacia  [estrategia dato conocido]', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Debería crear un nuevo post y publicarlo  [estrategia dato conocido]', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/post')
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type('Know data',{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]').type('{enter}');
    cy.wait(2000);
    cy.contains('Publish').click();
    cy.contains('Continue, final review →').click();
    cy.contains('Publish post, right now').click();
  });
});
describe('Crear Post con titulo y descripcion de varios caracteres y saltos de linea [estrategia dato conocido]', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Crear Post con titulo y descripcion vacia  [estrategia dato conocido]', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/posts')
    cy.get('[class*="ember-view gh-btn gh-btn-primary view-actions-top-row"]') // Target using data-test attribute
        .type('This is the post title',{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type('This is the post content',{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]').type('{enter}');
    cy.wait(2000);
    cy.contains('Publish').click();
    cy.contains('Continue, final review →').click();
    cy.contains('Publish post, right now').click();

  });
});
describe('Crear Post con titulo y descripcion de varios caracteres y saltos de linea  [estrategia dato aleatorio]', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Debería crear un nuevo post y publicarlo  [estrategia dato aleatorio]', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/posts')
    const words = faker.word.words();
    cy.get('[class*="ember-view gh-btn gh-btn-primary view-actions-top-row"]') // Target using data-test attribute
        .type(words,{force: true});
    const wordsDescription = faker.word.words();
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type(wordsDescription,{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]').type('{enter}');
    cy.wait(2000);
    cy.contains('Publish').click();
    cy.contains('Continue, final review →').click();
    cy.contains('Publish post, right now').click();
  });
});
describe('Crear Post con titulo y descripcion de varios caracteres y saltos de linea [estrategia dato conocido]', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Debería crear un nuevo post y publicarlo  [estrategia dato conocido]', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/posts')
    cy.get('[class*="ember-view gh-btn gh-btn-primary view-actions-top-row"]') // Target using data-test attribute
        .type('Know data',{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type('Know data',{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]').type('{enter}');
    cy.wait(2000);
    cy.contains('Publish').click();
    cy.contains('Continue, final review →').click();
    cy.contains('Publish post, right now').click();
  });
});
describe('Crear Post  progamado con titulo y descripcion de varios caracteres y saltos de linea [estrategia dato conocido]', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Crear Post  progamado con titulo y descripcion de varios caracteres y saltos de linea [estrategia dato conocido]', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/posts')
    cy.get('[class*="ember-view gh-btn gh-btn-primary view-actions-top-row"]') // Target using data-test attribute
        .type('This is the post title',{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type('This is the post content',{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]').type('{enter}');
    cy.wait(2000);
    cy.contains('Publish').click();

  });
});
describe('Crear Post  progamado con titulo y descripcion de varios caracteres y saltos de linea [estrategia dato aleatorio]', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Crear Post  progamado con titulo y descripcion de varios caracteres y saltos de linea [estrategia dato aleatorio]', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/posts')
    const words = faker.word.words();
    cy.get('[class*="ember-view gh-btn gh-btn-primary view-actions-top-row"]') // Target using data-test attribute
        .type(words,{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type('This is the post content',{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]').type('{enter}');
    cy.wait(2000);
    cy.contains('Publish').click();

  });
});
describe('Crear Post  progamado con titulo y descripcion de varios caracteres y saltos de linea  [estrategia dato conocido]', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Crear Post  progamado con titulo y descripcion de varios caracteres y saltos de linea  [estrategia dato conocido]', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/posts')
    cy.get('[class*="ember-view gh-btn gh-btn-primary view-actions-top-row"]') // Target using data-test attribute
        .type('This is the post content know',{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type('This is the post content',{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]').type('{enter}');
    cy.wait(2000);
    cy.contains('Publish').click();

  });
});
describe('Crear Post  progamado con titulo vacio y descripcion de caracteres [estrategia dato conocido]', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Crear Post  progamado con titulo vacio y descripcion de caracteres [estrategia dato conocido]', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/post')
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type('This is the post content',{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]').type('{enter}');
    cy.wait(2000);
    cy.contains('Publish').click();

  });
});
describe('Crear Post  progamado con titulo vacio y descripcion de caracteres [estrategia dato aleatorio]', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Crear Post  progamado con titulo vacio y descripcion de caracteres [estrategia dato aleatorio]', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/post')
    const words = faker.word.words();
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type(words,{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]').type('{enter}');
    cy.wait(2000);
    cy.contains('Publish').click();

  });
});
describe('Crear Post  progamado con titulo vacio y descripcion de caracteres  [estrategia dato conocido]', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Crear Post  progamado con titulo vacio y descripcion de caracteres  [estrategia dato conocido]', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/post')
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type('This is the post content',{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]').type('{enter}');
    cy.wait(2000);
    cy.contains('Publish').click();

  });
});

describe('CCrear un post con solo titulo, descripcion y Excerpt  [estrategia dato conocido]', () => {
  beforeEach(() => {
    cy.login();
  });

  it('CCrear un post con solo titulo, descripcion y Excerpt  [estrategia dato conocido]', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/post')
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type('This is the post title',{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]').type('{enter}');
    cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click();
    cy.get('[class*="post-setting-custom-excerpt ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type('content',{force: true});
    cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click();
    cy.wait(2000);
    cy.contains('Publish').click();
    cy.contains('Continue, final review →').click();
    cy.contains('Publish post, right now').click();

  });
});

describe('CCrear un post con solo titulo, descripcion y Excerpt  [estrategia dato aleatorio]', () => {
  beforeEach(() => {
    cy.login();
  });

  it('CCrear un post con solo titulo, descripcion y Excerpt  [estrategia dato aleatorio]', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/post')
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type('This is the post title',{force: true});
    const words = faker.word.words()
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]').type('{enter}');
    cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click();
    cy.get('[class*="post-setting-custom-excerpt ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type(words,{force: true});
    cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click();
    cy.wait(2000);
    cy.contains('Publish').click();
    cy.contains('Continue, final review →').click();
    cy.contains('Publish post, right now').click();

  });
});

describe('Crear un post con solo titulo, descripcion y Excerpt  [estrategia dato conocido]', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Crear un post con solo titulo, descripcion y Excerpt  [estrategia dato conocido]', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/post')
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type('This is the post title know',{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]').type('{enter}');
    cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click();
    cy.get('[class*="post-setting-custom-excerpt ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type('content konw',{force: true});
    cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click();
    cy.wait(2000);
    cy.contains('Publish').click();
    cy.contains('Continue, final review →').click();
    cy.contains('Publish post, right now').click();

  });
});

describe('Modificar Titulo del post  [estrategia dato conocido]', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Modificar Titulo del post   [estrategia dato conocido]', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/post')
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
        .type('This is the post content',{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]').type('{enter}');
    cy.wait(2000);
    cy.contains('Publish').click();
    cy.contains('Continue, final review →').click();
    cy.contains('Publish post, right now').click();

  });
});
describe('Modificar Titulo del post   [estrategia dato aleatorio]', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Debería Modificar Titulo del post   [estrategia dato aleatorio]', () => {
    const words = faker.word.words();
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/post')
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type(words,{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]').type('{enter}');
    cy.wait(2000);
    cy.contains('Publish').click();
    cy.contains('Continue, final review →').click();
    cy.contains('Publish post, right now').click();
  });
});
describe('Modificar Titulo del post   [estrategia dato conocido]', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Debería Modificar Titulo del post   [estrategia dato conocido]', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/post')
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type('Know data',{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]').type('{enter}');
    cy.wait(2000);
    cy.contains('Publish').click();
    cy.contains('Continue, final review →').click();
    cy.contains('Publish post, right now').click();
  });
});


describe('CCrear un post con solo titulo, descripcion y Excerpt vacio  [estrategia dato conocido]', () => {
  beforeEach(() => {
    cy.login();
  });

  it('CCrear un post con solo titulo, descripcion y  Excerpt vacio  [estrategia dato conocido]', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/post')
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type('This is the post title',{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]').type('{enter}');
    cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click();
    cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click();
    cy.wait(2000);
    cy.contains('Publish').click();
    cy.contains('Continue, final review →').click();
    cy.contains('Publish post, right now').click();

  });
});

describe('CCrear un post con solo titulo, descripcion y  Excerpt vacio  [estrategia dato aleatorio]', () => {
  beforeEach(() => {
    cy.login();
  });

  it('CCrear un post con solo titulo, descripcion y  Excerpt vacio  [estrategia dato aleatorio]', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/post')
    const words = faker.word.words()
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type(words,{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]').type('{enter}');
    cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click();
    cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click();
    cy.wait(2000);
    cy.contains('Publish').click();
    cy.contains('Continue, final review →').click();
    cy.contains('Publish post, right now').click();

  });
});

describe('CCrear un post con solo titulo, descripcion y Excerpt vacio [estrategia dato conocido]', () => {
  beforeEach(() => {
    cy.login();
  });

  it('CCrear un post con solo titulo, descripcion y  Excerpt vacio  [estrategia dato conocido]', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/post')
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type('This is the post title know',{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]').type('{enter}');
    cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click();
    cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click();
    cy.wait(2000);
    cy.contains('Publish').click();
    cy.contains('Continue, final review →').click();
    cy.contains('Publish post, right now').click();

  });
});

describe('Crear una Tag desde el Post  [estrategia dato conocido]', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Crear una Tag desde el Post  [estrategia dato conocido]', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/post')
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type('This is the post title',{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]').type('{enter}');
    cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click();
    cy.get('[class*="post-setting-custom-excerpt ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type('content',{force: true});
    cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click();
    cy.wait(2000);
    cy.contains('Publish').click();
    cy.contains('Continue, final review →').click();
    cy.contains('Publish post, right now').click();

  });
});

describe('Crear una Tag desde el Post  [estrategia dato aleatorio]', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Crear una Tag desde el Post  [estrategia dato aleatorio]', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/post')
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type('This is the post title',{force: true});
    const words = faker.word.words()
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]').type('{enter}');
    cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click();
    cy.get('[class*="post-setting-custom-excerpt ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type(words,{force: true});
    cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click();
    cy.wait(2000);
    cy.contains('Publish').click();
    cy.contains('Continue, final review →').click();
    cy.contains('Publish post, right now').click();

  });
});

describe('Crear una Tag desde el Post  [estrategia dato conocido]', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Crear una Tag desde el Post  [estrategia dato conocido]', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/post')
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type('This is the post title know',{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]').type('{enter}');
    cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click();
    cy.get('[class*="post-setting-custom-excerpt ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type('content konw',{force: true});
    cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click();
    cy.wait(2000);
    cy.contains('Publish').click();
    cy.contains('Continue, final review →').click();
    cy.contains('Publish post, right now').click();

  });
});

describe('Crear un post con titulo Vacio y descripcion con caracteres especiales [estrategia dato conocido]', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Crear un post con titulo Vacio y descripcion con caracteres especiales [estrategia dato conocido]', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/post')
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type('This is the post content',{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]').type('{enter}');
    cy.wait(2000);
    cy.contains('Publish').click();

  });
});
describe('Crear un post con titulo Vacio y descripcion con caracteres especiales [estrategia dato aleatorio]', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Crear un post con titulo Vacio y descripcion con caracteres especiales [estrategia dato aleatorio]', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/post')
    const words = faker.word.words();
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type(words,{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]').type('{enter}');
    cy.wait(2000);
    cy.contains('Publish').click();

  });
});
describe('Crear un post con titulo Vacio y descripcion con caracteres especiales  [estrategia dato conocido]', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Crear un post con titulo Vacio y descripcion con caracteres especiales  [estrategia dato conocido]', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/post')
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]') // Target using data-test attribute
        .type('This is the post content',{force: true});
    cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]').type('{enter}');
    cy.wait(2000);
    cy.contains('Publish').click();

  });
});


describe('Crear página con título y contenido válido (aleatorio)', () => {
    beforeEach(() => {
      cy.login();
    });
  
    it('Crear página con título y contenido válido ', () => {
      cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
      cy.wait(2000);
  
      // WHEN: User types the known tag name "test"
  
      cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
       .type(faker.lorem.words(1));
      cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]')
          .type(faker.lorem.lines({min: 1, max:10}));
      cy.contains('Publish').click();
  
      cy.wait(5000);
  
      // THEN: The new tag with the known name "test" should be created
  
      cy.contains('Continue, final review').click();
      cy.wait(2000);
      cy.contains('Publish page, right now').click();
    });
  });

describe('Crear página con título y contenido válido (pseudo-aleatorio)', () => {
  before(()=>{
    faker.seed(123)
  })  
  
  beforeEach(() => {
      cy.login();
    });
    
  
    it('Crear página con título y contenido válido ', () => {
      cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
      cy.wait(2000);
      
      // WHEN: User types the known tag name "test"
  
      cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
       .type(faker.lorem.words(1));
      cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]')
          .type(faker.lorem.lines({min: 1, max:10}));
      cy.contains('Publish').click();
  
      cy.wait(5000);
  
      // THEN: The new tag with the known name "test" should be created
  
      cy.contains('Continue, final review').click();
      cy.wait(2000);
      cy.contains('Publish page, right now').click();
    });
  });
   
  describe('Crear página con título mayor a 255 caracteres y contenido válido (aleatorio)', () => {
    beforeEach(() => {
      cy.login();
    });
  
    it('Crear página con título mayor a 255 caracteres y contenido válido (aleatorio)', () => {
      cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
      cy.wait(2000);
  
  
      cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
       .type(faker.string.alphanumeric(300));
      cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]')
          .type(faker.lorem.lines({min: 1, max:10}));
      cy.contains('Publish').should('not.exist')
  
    });
  });

describe('Crear página con título mayor a 255 caracteres y contenido válido (pseudo-aleatorio)', () => {
  before(()=>{
    faker.seed(123)
  })  
  
  beforeEach(() => {
      cy.login();
    });
    
  
    it('Crear página con título mayor a 255 caracteres y contenido válido (pseudo-aleatorio)', () => {
      cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
      cy.wait(2000);
      
  
      cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
      .type(faker.string.alphanumeric(300));
      cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]')
          .type(faker.lorem.lines({min: 1, max:10}));
      cy.contains('Publish').should('not.exist')
    });
  });
  
  describe('Crear página con título vacío y contenido válido (aleatorio)', () => {
    beforeEach(() => {
      cy.login();
    });
  
    it('Crear página con título vacío y contenido válido (aleatorio)', () => {
      cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
      cy.wait(2000);
  
  
      cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
       .click();
      cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]')
          .type(faker.lorem.lines({min: 1, max:10}));
      cy.contains('Publish').click();
  
      cy.wait(5000);
  
  
      cy.contains('Continue, final review').click();
      cy.wait(2000);
      cy.contains('Publish page, right now').click();
    });
  });

describe('Crear página con título vacío y contenido válido (pseudo-aleatorio)', () => {
  before(()=>{
    faker.seed(123)
  })  
  
  beforeEach(() => {
      cy.login();
    });
    
  
    it('Crear página con título vacío y contenido válido (pseudo-aleatorio)', () => {
      cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
      cy.wait(2000);
      
  
      cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
      .click();
      cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]')
          .type(faker.lorem.lines({min: 1, max:10}));

    });
  });

  describe('Crear página con caracteres especiales y contenido válido (aleatorio)', () => {
    beforeEach(() => {
      cy.login();
    });
  
    it('Crear página con caracteres especiales y contenido válido (aleatorio)', () => {
      cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
      cy.wait(2000);
  
  
      cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
       .type(faker.string.fromCharacters(['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', ';', ':', "'", '"', '\\', '|', ',', '<', '>', '.', '/', '?', '`', '~', '¢', '£', '¤', '¥', '¦', '§', '¨', '©', 'ª', '«', '¬', '®', '¯', '°', '±', '²', '³', 'µ', '¶', '·', '¸', '¹', 'º', '»', '¼', '½', '¾', '¿', '×', '÷', 'ƒ', '«', '»', '‚', '„', '†', '‡', '•', '…', '‰', '⁄', '⁂', '⁜', '⁂', '℘', 'ℑ', 'ℜ', 'ℵ', '∂', '∆', '∏', '∑', '−', '∕', '∗', '∘', '∫', '≈', '≠', '≡', '≤', '≥', '⊂', '⊃', '⊄', '⊆', '⊇', '⊗', '⊕', '⊥', '⋅', '⌈', '⌉', '⌊', '⌋', '〈', '〉', '◊', '♠', '♣', '♥', '♦', '♪', '♭', '♯', '✶', '✷', '✸', '✹', '✺', '✻', '✼', '✽', '✾', '✿', '❀', '❁', '❂', '❃', '❄', '❅', '❆', '❇', '❈', '❉', '❊', '❋'], {min:5, max:254}
      ), { parseSpecialCharSequences: false})
      cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]')
          .type(faker.lorem.lines({min: 1, max:10}));
      cy.contains('Publish').click();
  

    });
  });

describe('Crear página con caracteres especiales y contenido válido (pseudo-aleatorio)', () => {
  before(()=>{
    faker.seed(123)
  })  
  
  beforeEach(() => {
      cy.login();
    });
    
  
    it('Crear página con caracteres especiales y contenido válido (pseudo-aleatorio)', () => {
      cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
      cy.wait(2000);
      
  
      cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
      .type(faker.string.fromCharacters(['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', ';', ':', "'", '"', '\\', '|', ',', '<', '>', '.', '/', '?', '`', '~', '¢', '£', '¤', '¥', '¦', '§', '¨', '©', 'ª', '«', '¬', '®', '¯', '°', '±', '²', '³', 'µ', '¶', '·', '¸', '¹', 'º', '»', '¼', '½', '¾', '¿', '×', '÷', 'ƒ', '«', '»', '‚', '„', '†', '‡', '•', '…', '‰', '⁄', '⁂', '⁜', '⁂', '℘', 'ℑ', 'ℜ', 'ℵ', '∂', '∆', '∏', '∑', '−', '∕', '∗', '∘', '∫', '≈', '≠', '≡', '≤', '≥', '⊂', '⊃', '⊄', '⊆', '⊇', '⊗', '⊕', '⊥', '⋅', '⌈', '⌉', '⌊', '⌋', '〈', '〉', '◊', '♠', '♣', '♥', '♦', '♪', '♭', '♯', '✶', '✷', '✸', '✹', '✺', '✻', '✼', '✽', '✾', '✿', '❀', '❁', '❂', '❃', '❄', '❅', '❆', '❇', '❈', '❉', '❊', '❋'], {min:5, max:254}
    ), { parseSpecialCharSequences: false})
      cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]')
          .type(faker.lorem.lines({min: 1, max:10}));
      cy.contains('Publish').click();
  
      cy.wait(5000);  
      cy.contains('Continue, final review').click();
      cy.wait(2000);
      cy.contains('Publish page, right now').click();
    });
  });

  describe('Crear página con título válido y contenido vacio (aleatorio)', () => {
    beforeEach(() => {
      cy.login();
    });
  
    it('Crear página con título válido y contenido vacio (aleatorio)', () => {
      cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
      cy.wait(2000);
  
  
      cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
      .type(faker.lorem.words(1))
      cy.contains('Publish').should('not.exist')

    });
  });

describe('Crear página con título válido y contenido vacio (pseudo-aleatorio)', () => {
  before(()=>{
    faker.seed(123)
  })  
  
  beforeEach(() => {
      cy.login();
    });
    
  
    it('Crear página con título válido y contenido vacio (pseudo-aleatorio)', () => {
      cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
      cy.wait(2000);
      
  
      cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
      .type(faker.lorem.words(1))
      cy.contains('Publish').should('not.exist')
  
     
    });
  });
  

  describe('Crear página con un excerpt menor a 300 caracteres (aleatorio)', () => {
    beforeEach(() => {
      cy.login();
    });
  
    it('Crear página con un excerpt menor a 300 caracteres (aleatorio)', () => {
      cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
      cy.wait(2000);
  
  
      cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
       .type(faker.lorem.words(1));
      cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]')
          .type(faker.lorem.lines({min: 1, max:10}));

      cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
      cy.get('[class*="post-setting-custom-excerpt ember-text-area gh-input ember-view"]').type(faker.string.alphanumeric({length: {min:1,max:299}}));
      cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()



      cy.contains('Publish').click();
  
      cy.wait(5000);
    
      cy.contains('Continue, final review').click();
      cy.wait(2000);
      cy.contains('Publish page, right now').click();
    });
  });

  describe('Crear página con un excerpt menor a 300 caracteres (pseudo-aleatorio)', () => {
    before(()=>{
      faker.seed(123)
    })  
    beforeEach(() => {
      cy.login();
    });
  
    it('Crear página con un excerpt menor a 300 caracteres (pseudo-aleatorio)', () => {
      cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
      cy.wait(2000);
  
  
      cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
       .type(faker.lorem.words(1));
      cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]')
          .type(faker.lorem.lines({min: 1, max:10}));

      cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
      cy.get('[class*="post-setting-custom-excerpt ember-text-area gh-input ember-view"]').type(faker.string.alphanumeric({length: {min:1,max:299}}));
      cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()



      cy.contains('Publish').click();
  
      cy.wait(5000);
    
      cy.contains('Continue, final review').click();
      cy.wait(2000);
      cy.contains('Publish page, right now').click();
    });
  });
  

  describe('Crear página con un excerpt mayor a 300 caracteres (aleatorio)', () => {
    beforeEach(() => {
      cy.login();
    });
  
    it('Crear página con un excerpt mayor a 300 caracteres (aleatorio)', () => {
      cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
      cy.wait(2000);
      
      
      cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
      .type(faker.lorem.words(1));
      cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]')
      .type(faker.lorem.lines({min: 1, max:10}));
      
      cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
      cy.get('[class*="post-setting-custom-excerpt ember-text-area gh-input ember-view"]').type(faker.string.alphanumeric({length: {min:300,max:500}}));
      cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
      cy.wait(500);
      cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
      
      cy.get('[class*="response"]').should('exist');
    });
  });
  
  describe('Crear página con un excerpt mayor a 300 caracteres (pseudo-aleatorio)', () => {
    before(()=>{
      faker.seed(123)
    })  
    beforeEach(() => {
      cy.login();
    });
    
    it('Crear página con un excerpt mayor a 300 caracteres (pseudo-aleatorio)', () => {
      cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
      cy.wait(2000);
      
      
      cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
       .type(faker.lorem.words(1));
      cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]')
      .type(faker.lorem.lines({min: 1, max:10}));
      
      cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
      cy.get('[class*="post-setting-custom-excerpt ember-text-area gh-input ember-view"]').type(faker.string.alphanumeric({length: {min:300,max:500}}));
      cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
      
      cy.wait(500);
      cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
      cy.get('[class*="response"]').should('exist');
    });
  });
  

  describe('Crear una página con un Twitter description mayor a 500 caracteres (aleatorio)', () => {
    beforeEach(() => {
      cy.login();
    });
  
    it('Crear una página con un Twitter description mayor a 500 caracteres (aleatorio)', () => {
      cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
      cy.wait(2000);
      var title = faker.lorem.words(1)
      
      
      cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
      .type(title);
      cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]')
      .type(faker.lorem.lines({min: 1, max:10}));
      
      cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
      cy.get('[class*="settings-menu settings-menu-pane settings-menu-pane-main"]').scrollTo('bottom');
      cy.get('button[type="button"][data-ember-action][data-ember-action-108="108"]').click();
      cy.get('[class*="post-setting-twitter-title ember-text-field gh-input ember-view"]').type(title)
      cy.get('[class*="post-setting-twitter-description ember-text-area gh-input ember-view"]').type(faker.string.alphanumeric({length: {min:500,max:600}}));
      cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
      cy.wait(500);
      cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
      
      cy.get('[class*="response"]').should('exist');
    });
  });

  describe('Crear una página con un Twitter description mayor a 500 caracteres (pseudo-aleatorio)', () => {
    before(()=>{
      faker.seed(123)
    })  
    beforeEach(() => {
      cy.login();
    });
    
    it('Crear una página con un Twitter description mayor a 500 caracteres (pseudo-aleatorio)', () => {
      cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
      cy.wait(2000);
      
      var title = faker.lorem.words(1)
      
      
      cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
      .type(title);
      cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]')
      .type(faker.lorem.lines({min: 1, max:10}));
      
      cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
      cy.get('[class*="settings-menu settings-menu-pane settings-menu-pane-main"]').scrollTo('bottom');
      cy.get('button[type="button"][data-ember-action][data-ember-action-108="108"]').click();
      cy.get('[class*="post-setting-twitter-title ember-text-field gh-input ember-view"]').type(title)
      cy.get('[class*="post-setting-twitter-description ember-text-area gh-input ember-view"]').type(faker.string.alphanumeric({length: {min:500,max:600}}));
      cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
      cy.wait(500);
      cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
      
      cy.get('[class*="response"]').should('exist');
    });
  }); 
  
  describe('Crear una página con una fecha de publicación formato YYYY-MM-DD (aleatorio)', () => {
    beforeEach(() => {
      cy.login();
    });
  
    it('Crear una página con una fecha de publicación formato YYYY-MM-DD (aleatorio)', () => {
      cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
      cy.wait(2000);
      
      
      cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
      .type(faker.lorem.words(1));
      cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]')
      .type(faker.lorem.lines({min: 1, max:10}));

      const randomDate = faker.date.past();
      const formattedDate = randomDate.toISOString().split('T')[0];
      
      cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
      cy.get('[class*=gh-date-time-picker-date]').clear().type(formattedDate)
    });
  });
  
  describe('Crear una página con una fecha de publicación formato YYYY-MM-DD (pseudo-aleatorio)', () => {
    before(()=>{
      faker.seed(123)
    })  
    beforeEach(() => {
      cy.login();
    });
    
    it('Crear una página con una fecha de publicación formato YYYY-MM-DD (pseudo-aleatorio)', () => {
      cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
      cy.wait(2000);
      
      
      cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
       .type(faker.lorem.words(1));
      cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]')
      .type(faker.lorem.lines({min: 1, max:10}));
      
      const randomDate = faker.date.past();
      const formattedDate = randomDate.toISOString().split('T')[0];
      
      cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
      cy.get('[class*=gh-date-time-picker-date]').clear().type(formattedDate)
    });
  });
  describe('Crear una página con una fecha de publicación con letras y numeros (aleatorio)', () => {
    beforeEach(() => {
      cy.login();
    });
  
    it('Crear una página con una fecha de publicación con letras y numeros (aleatorio)', () => {
      cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
      cy.wait(2000);
      
      
      cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
      .type(faker.lorem.words(1));
      cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]')
      .type(faker.lorem.lines({min: 1, max:10}));

      const fecha = faker.string.alphanumeric({length:4}) + "-" + faker.string.alphanumeric({length:2}) + "-" +  faker.string.alphanumeric({length:2})
      
      cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
      cy.get('[class*=gh-date-time-picker-date]').clear().type(fecha)
      cy.get('[class*="post-setting-custom-excerpt ember-text-area gh-input ember-view"]').click()
      cy.get('[class*=gh-date-time-picker-error]').should('exist')
    });
  });
  describe('Crear una página con una fecha de publicación con letras (pseudo-aleatorio)', () => {
    before(()=>{
      faker.seed(123)
    }) 
    beforeEach(() => {
      cy.login();
    });
  
    it('Crear una página con una fecha de publicación con letras (pseudo-aleatorio)', () => {
      cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
      cy.wait(2000);
      
      
      cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
      .type(faker.lorem.words(1));
      cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]')
      .type(faker.lorem.lines({min: 1, max:10}));

      const fecha = faker.string.alpha({length:4}) + "-" + faker.string.alpha({length:2}) + "-" +  faker.string.alpha({length:2})
      
      cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
      cy.get('[class*=gh-date-time-picker-date]').clear().type(fecha)
      cy.get('[class*="post-setting-custom-excerpt ember-text-area gh-input ember-view"]').click()
      cy.get('[class*=gh-date-time-picker-error]').should('exist')
    });
  });
  
  describe('Crear una página con una fecha de publicación números erróneos (aleatorio)', () => {

    beforeEach(() => {
      cy.login();
    });
  
    it('Crear una página con una fecha de publicación números erróneos (aleatorio)', () => {
      cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
      cy.wait(2000);
      
      
      cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
      .type(faker.lorem.words(1));
      cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]')
      .type(faker.lorem.lines({min: 1, max:10}));

      const fecha = faker.number.int({min:2100, max:9999}) + "-" + faker.number.int({min:13, max:99}) + "-" +  faker.number.int({min:32, max:99})
      cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
      cy.get('[class*=gh-date-time-picker-date]').clear().type(fecha)
      cy.get('[class*="post-setting-custom-excerpt ember-text-area gh-input ember-view"]').click()
      cy.get('[class*=gh-date-time-picker-error]').should('exist')
    });
  });
  

  import Papa from 'papaparse';

  var fila = 0;

  Cypress.Commands.add('readCsv', (filePath) => {
    return cy.readFile(filePath).then((csvString) => {
      return new Cypress.Promise((resolve) => {
        Papa.parse(csvString, {
          header: true,
          complete: (results) => {
            resolve(results.data);
          }
        });
      });
    });
  });
  

  describe('Crear página con título y contenido válido (apriori)', () => {
    
    beforeEach(() => {
      cy.login();
      fila ++
    });
  
    it('Crear página con título y contenido válido ', () => {
      cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
      cy.wait(2000);

      cy.readCsv('./cypress/dataset.csv').then((registro) => {
        expect(registro[fila]).to.have.property('contenido_valido').that.is.a('string');

        console.log(registro)
        
          cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
            .type(registro[fila].titulo_valido);
          cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]')
              .type(registro[fila].contenido_valido);

              cy.contains('Publish').click();
          cy.wait(5000);
          cy.contains('Continue, final review').click();
          cy.wait(2000);
          cy.contains('Publish page, right now').click();
          
      });

    });

  });
 
  describe('Crear página con título mayor a 255 caracteres y contenido válido (apriori)', () => {
    
    beforeEach(() => {
      cy.login();
      fila ++
    });
  
    it('Crear página con título mayor a 255 caracteres y contenido válido ', () => {
      cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
      cy.wait(2000);

      cy.readCsv('./cypress/dataset.csv').then((registro) => {
        expect(registro[fila]).to.have.property('contenido_valido').that.is.a('string');

        console.log(registro)
        
          cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
           .type(registro[fila].titulo_mayor_255);
          cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]')
              .type(registro[fila].contenido_valido);

          cy.contains('Publish').should('not.exist')
          
      });

    });

  });
  

  describe('Crear página con título vacío y contenido válido (apriori)', () => {
    
    beforeEach(() => {
      cy.login();
      fila ++
    });
  
    it('Crear página con título vacío y contenido válido ', () => {
      cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
      cy.wait(2000);

      cy.readCsv('./cypress/dataset.csv').then((registro) => {
        expect(registro[fila]).to.have.property('contenido_valido').that.is.a('string');

        console.log(registro)
        
          cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]')
              .type(registro[fila].contenido_valido);

              cy.contains('Publish').click();
          cy.wait(5000);
          cy.contains('Continue, final review').click();
          cy.wait(2000);
          cy.contains('Publish page, right now').click();
          
      });

    });

  });
  
  describe('Crear página con caracteres especiales y contenido válido (apriori)', () => {
    
    beforeEach(() => {
      cy.login();
      fila ++
    });
  
    it('Crear página con caracteres especiales y contenido válido ', () => {
      cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
      cy.wait(2000);

      cy.readCsv('./cypress/dataset.csv').then((registro) => {
        expect(registro[fila]).to.have.property('contenido_valido').that.is.a('string');

        console.log(registro)
        
          cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
           .type(registro[fila].titulo_caracteres_especiales);
          cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]')
              .type(registro[fila].contenido_valido);

              cy.contains('Publish').click();
          cy.wait(5000);
          cy.contains('Continue, final review').click();
          cy.wait(2000);
          cy.contains('Publish page, right now').click();
          
      });

    });

  });

  describe('Crear página con título válido y contenido vacio (apriori)', () => {
    
    beforeEach(() => {
      cy.login();
      fila ++
    });
  
    it('Crear página con título válido y contenido vacio ', () => {
      cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
      cy.wait(2000);

      cy.readCsv('./cypress/dataset.csv').then((registro) => {
        expect(registro[fila]).to.have.property('contenido_valido').that.is.a('string');

        console.log(registro)
        
          cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
           .type(registro[fila].titulo_valido);


          cy.contains('Publish').should('not.exist')

          
      });

    });

  });
  
  describe('Crear página con un excerpt menor a 300 caracteres (apriori)', () => {
    
    beforeEach(() => {
      cy.login();
      fila ++
    });
  
    it('Crear página con un excerpt menor a 300 caracteres ', () => {
      cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
      cy.wait(2000);

      cy.readCsv('./cypress/dataset.csv').then((registro) => {
        expect(registro[fila]).to.have.property('contenido_valido').that.is.a('string');

        console.log(registro)
        
          cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
           .type(registro[fila].titulo_valido);
          cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]')
              .type(registro[fila].contenido_valido);
        
          cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
          cy.get('[class*="post-setting-custom-excerpt ember-text-area gh-input ember-view"]').type(registro[fila].excerpt_menor_300);
          cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
        
          cy.contains('Publish').click();
          cy.wait(5000);
          cy.contains('Continue, final review').click();
          cy.wait(2000);
          cy.contains('Publish page, right now').click();
          
      });

    });

  });

describe('Crear una página con un Twitter description mayor a 500 caracteres (apriori)', () => {
    
  beforeEach(() => {
    cy.login();
    fila ++
  });

  it('Crear una página con un Twitter description mayor a 500 caracteres ', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
    cy.wait(2000);

    cy.readCsv('./cypress/dataset.csv').then((registro) => {
      expect(registro[fila]).to.have.property('contenido_valido').that.is.a('string');

        cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
        .type(registro[fila].titulo_valido);
        cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]')
        .type(registro[fila].contenido_valido);
        
        cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
        cy.get('[class*="settings-menu settings-menu-pane settings-menu-pane-main"]').scrollTo('bottom');
        cy.get('button[type="button"][data-ember-action][data-ember-action-108="108"]').click();
        cy.get('[class*="post-setting-twitter-title ember-text-field gh-input ember-view"]').type(registro[fila].titulo_valido)
        cy.get('[class*="post-setting-twitter-description ember-text-area gh-input ember-view"]').type(registro[fila].twitter_mayor_500);
        cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
        cy.wait(500);
        cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
        
        cy.get('[class*="response"]').should('exist');
    });

  });

});
describe('Crear una página con un Twitter description menor a 500 caracteres (apriori)', () => {
    
  beforeEach(() => {
    cy.login();
    fila ++
  });

  it('Crear una página con un Twitter description mayor a 500 caracteres ', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
    cy.wait(2000);

    cy.readCsv('./cypress/dataset.csv').then((registro) => {
      expect(registro[fila]).to.have.property('contenido_valido').that.is.a('string');

        cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
        .type(registro[fila].titulo_valido);
        cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]')
        .type(registro[fila].contenido_valido);
        
        cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
        cy.get('[class*="settings-menu settings-menu-pane settings-menu-pane-main"]').scrollTo('bottom');
        cy.get('button[type="button"][data-ember-action][data-ember-action-108="108"]').click();
        cy.get('[class*="post-setting-twitter-title ember-text-field gh-input ember-view"]').type(registro[fila].titulo_valido)
        cy.get('[class*="post-setting-twitter-description ember-text-area gh-input ember-view"]').type(registro[fila].twitter_menor_500);
        cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
        cy.wait(500);
        cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
        
        cy.get('[class*="response"]').should('exist');
    });

  });

});


describe('Crear una página con una fecha de publicación formato YYYY-MM-DD (apriori)', () => {
    
  beforeEach(() => {
    cy.login();
    fila ++
  });

  it('Crear una página con una fecha de publicación formato YYYY-MM-DD ', () => {
    cy.visit('https://ghost-cj7h.onrender.com/ghost/#/editor/page');
    cy.wait(2000);

    cy.readCsv('./cypress/dataset.csv').then((registro) => {
      expect(registro[fila]).to.have.property('contenido_valido').that.is.a('string');

      console.log(registro)
      
        cy.get('[class*="gh-editor-title ember-text-area gh-input ember-view"]')
         .type(registro[fila].titulo_valido);
        cy.get('[class*="koenig-editor w-100 flex-grow relative center mb0 mt0 ember-view"]')
            .type(registro[fila].contenido_valido);
      
        cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
        cy.get('[class*=gh-date-time-picker-date]').clear().type(registro[fila].yyyymmdd)
        cy.get('[class*="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]').click()
      
        cy.contains('Publish').click();
        cy.wait(5000);
        cy.contains('Continue, final review').click();
        cy.wait(2000);
        cy.contains('Publish page, right now').click();
        
    });

  });

});