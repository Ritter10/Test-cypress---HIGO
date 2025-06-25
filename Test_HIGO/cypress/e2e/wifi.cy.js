describe('Halaman Wifi Advertising - HIGO', () => {
  const url = 'https://higo.id/wifi-advertising';

  beforeEach(() => {
    cy.viewport(1280, 800);
    cy.visit(url);
    cy.wait(2000); // Tambahan waktu tunggu jika ada animasi
  });

  it('Judul halaman tampil dengan benar', () => {
    cy.get('h1, h2').filter(':visible').invoke('text').then((text) => {
      expect(text.toLowerCase()).to.match(/wifi advertising|iklan wifi/i);
    });
  });

  it('Konten utama atau penjelasan layanan tampil', () => {
    cy.contains(/wifi advertising|jaringan wifi|iklan berbasis wifi/i, { timeout: 10000 })
      .should('be.visible');
  });

  it('Gambar atau ilustrasi layanan tampil', () => {
    cy.get('img').filter(':visible').should('exist');
  });

  it('Navigasi ke halaman lain (Tentang Kami) dapat diklik', () => {
    cy.get('button svg').first().click({ force: true }); // Klik menu burger jika ada
    cy.contains(/tentang kami|about/i, { matchCase: false }).click({ force: true });
    cy.url().should('include', '/about-us');
  });

  it('Tidak ada error di console', () => {
    cy.on('window:before:load', (win) => {
      cy.stub(win.console, 'error').as('consoleError');
    });
    cy.reload();
    cy.get('@consoleError').should('not.be.called');
  });

  context('Tampilan Mobile - iPhone 6', () => {

    beforeEach(() => {
      cy.viewport('iphone-6');
      cy.visit(url);
      cy.wait(2000);
    });

    it('Menu navigasi dapat dibuka di mobile', () => {
      cy.get('header').should('be.visible');
      cy.get('button svg').first().click({ force: true });
      cy.wait(500);
      cy.contains(/tentang kami|about/i, { matchCase: false }).should('be.visible').click({ force: true });
    });

    it('Konten utama tetap tampil di layar kecil', () => {
      cy.contains(/wifi advertising|iklan wifi/i, { timeout: 10000 }).should('be.visible');
      cy.get('img').filter(':visible').should('exist');
    });
  });

});


  it('Memastikan halaman dimuat dengan benar', () => {
    cy.url().should('eq', url);
    cy.title().should('not.be.empty');
  });

  it('Menampilkan judul utama atau hero section', () => {
    cy.get('h1, h2').first().should('be.visible');
    cy.contains(/wifi advertising/i).should('exist');
  });

  it('Menampilkan gambar atau ilustrasi utama', () => {
    cy.get('img').first().should('be.visible')
      .and(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });

  it('Menampilkan tombol CTA (Call To Action) jika ada', () => {
    cy.contains(/hubungi kami|contact us|pelajari lebih lanjut/i).should('exist');
  });

  it('Memastikan konten utama (fitur/penjelasan layanan) ditampilkan', () => {
    cy.contains(/fitur|layanan|benefit|keunggulan/i).should('exist');
  });

  it('Memastikan tidak ada error di console', () => {
    cy.on('window:before:load', (win) => {
      cy.stub(win.console, 'error').as('consoleError');
    });
    cy.get('@consoleError').should('not.be.called');
  });

  it('Memastikan footer tampil dengan benar', () => {
    cy.get('footer').should('exist').and('be.visible');
    cy.contains(/privacy|copyright/i);
  });

  it('Responsif di ukuran layar mobile', () => {
    cy.viewport('iphone-6');
    cy.get('header').should('be.visible');
    // Jika ada hamburger menu, coba buka
    cy.get('button[id^="radix"], [aria-label="Menu"]').click({ force: true }).should('exist');
  });

  it('Responsif di ukuran layar tablet', () => {
    cy.viewport('ipad-2');
    cy.get('header').should('be.visible');
  });

  it('Responsif di ukuran layar desktop', () => {
    cy.viewport(1280, 800);
    cy.get('h1, h2').first().should('be.visible');
  });

  it('Navigasi ke halaman lain bekerja (About Us)', () => {
    cy.get('a[href="/about-us"]').should('exist').click();
    cy.url().should('include', '/about-us');
    cy.go('back');
  });

