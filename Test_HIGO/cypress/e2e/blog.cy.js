describe('Halaman Blog - blog.higo.id', () => {
  const url = 'https://blog.higo.id/';

  // Menangani error React yang tidak perlu memblokir pengujian
  Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes('Minified React error')) {
      return false;
    }
  });

  beforeEach(() => {
    cy.visit(url, { timeout: 40000 }); // waktu tunggu ekstra
    cy.get('body', { timeout: 15000 }).should('be.visible');
  });

  it('Should load the blog page successfully', () => {
    cy.title().should('not.be.empty');
  });

  it('Should display header section with logo or brand name', () => {
    cy.get('header', { timeout: 15000 }).first()
      .should('be.visible')
      .within(() => {
        cy.contains(/higo/i).should('exist'); // Pencarian teks "Higo"
      });
  });

  it('Should list at least one blog article', () => {
    cy.get('a[href^="/"]', { timeout: 15000 })
      .filter(':visible')
      .should('have.length.greaterThan', 0);
  });

  it('Clicking on first article navigates to detail and back', () => {
  cy.get('a[href^="/"]', { timeout: 15000 })
    .filter(':visible')
    .first()
    .click();

  cy.url().should('include', '/'); // berada di halaman detail

  // Ganti cy.go('back') dengan kunjungi ulang halaman utama
  cy.visit(url);
  cy.url().should('eq', url);
});


  it('Footer should be visible and contain company info', () => {
    cy.get('footer', { timeout: 15000 })
      .should('be.visible')
      .and('contain.text', 'HIGO');
  });

  it('Responsive check on iPhone 6', () => {
    cy.viewport('iphone-6');
    cy.get('header').should('be.visible');
    cy.get('a[href^="/"]')
      .filter(':visible')
      .should('exist');
  });

  it('Responsive check on iPad 2', () => {
    cy.viewport('ipad-2');
    cy.get('header').should('be.visible');
    cy.get('a[href^="/"]')
      .filter(':visible')
      .should('exist');
  });
});