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
 
describe('Crear página con título y contenido válido (aleatorio)', () => {
    beforeEach(() => {
      cy.login();
    });
  
    it('Crea una nueva pagina con el nombre "test"', () => {
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
    
  
    it('Crea una nueva pagina con el nombre "test"', () => {
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
         /*  cy.contains('Publish').should('not.exist') */

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
  
      /* cy.contains('Publish').should('not.exist') */

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
  
      cy.wait(5000);
  
  
      cy.contains('Continue, final review').click();
      cy.wait(2000);
      cy.contains('Publish page, right now').click();
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
  
      cy.wait(5000);  
      cy.contains('Continue, final review').click();
      cy.wait(2000);
      cy.contains('Publish page, right now').click();
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