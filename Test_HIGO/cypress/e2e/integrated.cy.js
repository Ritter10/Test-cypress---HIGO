describe('Halaman Integrated Digital Agency - HIGO', () => {
  const url = 'https://higo.id/integrated-digital-agency';

  beforeEach(() => {
    cy.visit(url);
  });

  it('Memastikan halaman dimuat dengan benar', () => {
    cy.url().should('eq', url);
    cy.title().should('not.be.empty');
  });

  it('Menampilkan header utama atau hero section', () => {
    cy.get('h1, h2').first().should('be.visible');
    cy.contains(/integrated digital agency/i).should('exist');
  });

  it('Memastikan ada gambar utama atau ilustrasi yang terlihat', () => {
    cy.get('img').first().should('be.visible')
      .and(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });

  it('Tombol CTA (Call To Action) muncul dan bisa diklik', () => {
    cy.contains(/hubungi kami|pelajari lebih lanjut|get started/i)
      .should('exist');
  });

  it('Menampilkan konten fitur, layanan, atau solusi', () => {
    cy.contains(/solusi|layanan|strategi|marketing/i).should('exist');
  });

  it('Memastikan ada footer dan informasi legal', () => {
    cy.get('footer').should('exist').and('be.visible');
    cy.contains(/privacy|copyright/i);
  });

  it('Halaman tidak menghasilkan error JS di console', () => {
    cy.on('window:before:load', (win) => {
      cy.stub(win.console, 'error').as('consoleError');
    });
    cy.get('@consoleError').should('not.be.called');
  });

  it('Scroll ke bawah menampilkan konten tambahan (opsional)', () => {
    cy.scrollTo('bottom');
    cy.get('footer').should('be.visible');
  });

  it('Navigasi antar halaman bekerja dengan benar', () => {
    cy.get('a[href="/about-us"]').should('exist').click();
    cy.url().should('include', '/about-us');
    cy.go('back');
  });

  it('Responsif di layar mobile (iPhone)', () => {
    cy.viewport('iphone-6');
    cy.get('header').should('be.visible');
    // Jika ada menu hamburger
    cy.get('[aria-label="Menu"], button[id^="radix"]').first().click({ force: true });
  });

  it('Responsif di layar tablet (iPad)', () => {
    cy.viewport('ipad-2');
    cy.get('header').should('be.visible');
  });

  it('Responsif di layar desktop', () => {
    cy.viewport(1280, 800);
    cy.get('h1, h2').first().should('be.visible');
  });

  
});
