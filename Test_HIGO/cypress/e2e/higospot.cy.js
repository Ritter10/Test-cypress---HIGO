describe('Halaman HigoSpot - HIGO', () => {
  const url = 'https://higo.id/higospot';

  beforeEach(() => {
    cy.visit(url);
  });

  it('Memastikan halaman dimuat dengan benar', () => {
    cy.url().should('eq', url);
    cy.title().should('not.be.empty');
  });

  it('Menampilkan hero section atau judul utama', () => {
    cy.get('h1, h2').first().should('be.visible');
    cy.contains(/higospot/i).should('exist');
  });

  it('Menampilkan gambar atau ilustrasi utama', () => {
    cy.get('img').first().should('be.visible')
      .and(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });

  it('Menampilkan tombol Call-To-Action (CTA)', () => {
    cy.contains(/hubungi kami|pelajari lebih lanjut|get started/i).should('exist');
  });

  it('Menampilkan konten fitur atau layanan utama', () => {
    cy.contains(/fitur|layanan|keunggulan|benefit/i).should('exist');
  });

  it('Footer tampil dengan baik dan memiliki informasi penting', () => {
    cy.get('footer').should('exist').and('be.visible');
    cy.contains(/privacy|copyright/i);
  });

  it('Tidak ada error JS di console', () => {
    cy.on('window:before:load', (win) => {
      cy.stub(win.console, 'error').as('consoleError');
    });
    cy.get('@consoleError').should('not.be.called');
  });

  it('Halaman dapat discroll ke bawah dan menampilkan konten tambahan', () => {
    cy.scrollTo('bottom');
    cy.get('footer').should('be.visible');
  });

  it('Responsif di ukuran layar mobile (iPhone)', () => {
    cy.viewport('iphone-6');
    cy.get('header').should('be.visible');
    // Jika ada hamburger menu
    cy.get('[aria-label="Menu"], button[id^="radix"]')
      .first()
      .click({ force: true });
  });

  it('Responsif di ukuran layar tablet (iPad)', () => {
    cy.viewport('ipad-2');
    cy.get('header').should('be.visible');
  });

  it('Responsif di ukuran desktop', () => {
    cy.viewport(1280, 800);
    cy.get('h1, h2').first().should('be.visible');
  });

  it('Navigasi ke halaman About Us berjalan dengan benar', () => {
    cy.get('a[href="/about-us"]').should('exist').click();
    cy.url().should('include', '/about-us');
    cy.go('back');
  });

  
});
