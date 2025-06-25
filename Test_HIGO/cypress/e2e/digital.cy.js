describe('Halaman Digital Reports - Higo', () => {
  const url = 'https://higo.id/digital-reports';

  beforeEach(() => {
    cy.visit(url, { timeout: 30000 });
    cy.get('body').should('be.visible');
    cy.get('[class*="container"], section', { timeout: 10000 }).should('exist');
  });

  it('Memastikan halaman dimuat dengan benar', () => {
    cy.url().should('include', '/digital-reports');
    cy.title().should('not.be.empty');
  });

  it('Menampilkan header utama atau judul halaman', () => {
    cy.get('h1, h2, h3').first().should('be.visible')
      .invoke('text')
      .then((text) => {
        expect(text.toLowerCase()).to.match(/digital report|laporan digital/i);
      });
  });

  it('Menampilkan daftar laporan digital atau card konten', () => {
    cy.get('[class*="report"], [class*="card"], section, [class*="content"]', { timeout: 10000 })
      .should('exist')
      .and('have.length.greaterThan', 0);
  });




  it('Terdapat tombol CTA seperti download atau detail', () => {
    cy.get('body').then(($body) => {
      const ctaText = $body.text();
      expect(ctaText.toLowerCase()).to.match(/download|detail|selengkapnya|lihat|unduh/i);
    });
  });

  it('Klik pada laporan mengarahkan ke detail (jika ada link)', () => {
    cy.get('a[href]:visible').first().then(($link) => {
      const href = $link.attr('href');
      if (href && !href.startsWith('#')) {
        cy.url().then((initialUrl) => {
          cy.wrap($link).click();
          cy.url().should('not.eq', initialUrl);
          cy.go('back');
        });
      } else {
        cy.log('No valid links found in report sections');
      }
    });
  });

  it('Footer tersedia dan terlihat', () => {
    cy.get('footer').should('exist').and('be.visible');
    cy.get('footer').within(() => {
      cy.contains(/higo|privacy|contact/i, { matchCase: false }).should('exist');
    });
  });

  it('Tidak ada error di console', () => {
    cy.window().then((win) => {
      cy.spy(win.console, 'error').as('consoleError');
    });
    cy.get('@consoleError').should('not.be.called');
  });

  it('Halaman responsif di mobile', () => {
    cy.viewport('iphone-6');
    cy.get('h1, h2, h3').first().should('be.visible');
  });

  it('Halaman responsif di tablet', () => {
    cy.viewport('ipad-2');
    cy.get('h1, h2, h3').first().should('be.visible');
  });

  it('Halaman responsif di desktop', () => {
    cy.viewport(1280, 800);
    cy.get('h1, h2, h3').first().should('be.visible');
  });
});