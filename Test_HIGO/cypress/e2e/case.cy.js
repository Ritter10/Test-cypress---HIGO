describe('Halaman Case Study - HIGO', () => {
  const baseUrl = 'https://higo.id';
  const caseStudyUrl = `${baseUrl}/case-study`;

  beforeEach(() => {
    cy.visit(caseStudyUrl, {
      onBeforeLoad(win) {
        cy.stub(win.console, 'error').as('consoleError');
      }
    });
  });

  it('Memastikan URL dan title halaman sesuai', () => {
    cy.url().should('eq', caseStudyUrl);
    cy.title().should('not.be.empty');
  });

  it('Menampilkan heading utama halaman', () => {
    cy.get('h1, h2, h3')
      .should('exist')
      .invoke('text')
      .then((text) => {
        const found = [
          'studi kasus',
          'case study',
          'hasil kerja',
          'berbagi cerita',
          'digital report',
        ].some((keyword) => text.toLowerCase().includes(keyword));
        expect(found, `Heading ditemukan: "${text}"`).to.be.true;
      });
  });

  it('Menampilkan daftar proyek atau studi kasus', () => {
    const keywords = [
      'devon',
      'kintaro',
      'walking drums',
      'twenty-one',
      'berbagi cerita',
      'kampanye',
      'klien',
    ];
    cy.get('body')
      .invoke('text')
      .then((bodyText) => {
        const match = keywords.some((k) =>
          bodyText.toLowerCase().includes(k)
        );
        expect(match, `Konten body: "${bodyText.slice(0, 200)}..."`).to.be.true;
      });
  });

  it('Menampilkan gambar/thumbnail studi kasus', () => {
    cy.get('img').first().should('be.visible')
      .and(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });

  it('Link menuju detail studi kasus dapat diklik', () => {
    cy.get('a:visible[href*="/case-study"]').first()
      .click({ force: true });
    cy.url().should('include', '/case-study');
    cy.go('back');
  });

  it('Navigasi menu utama muncul dan berfungsi', () => {
    cy.get('header').should('exist');
    cy.get('header a[href="/about-us"]').first().click({ force: true });
    cy.url().should('include', '/about-us');
    cy.go('back');
  });

  it('Footer menampilkan informasi penting', () => {
    cy.get('footer')
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        const lower = text.toLowerCase();
        const found =
          lower.includes('kebijakan privasi') ||
          lower.includes('privacy') ||
          lower.includes('©️') ||
          lower.includes('copyright');
        expect(found).to.be.true;
      });
  });

  it('Scroll ke bawah memunculkan konten tambahan', () => {
    cy.scrollTo('bottom');
    cy.contains(/digital report|client|campaign/i).should('exist');
  });

  it('Tidak ada error JavaScript di console', () => {
    cy.get('@consoleError').should('not.be.called');
  });

  context('Pengujian responsif', () => {
    const viewports = {
      mobile: 'iphone-6',
      tablet: 'ipad-2',
      desktop: [1280, 800],
    };

    Object.entries(viewports).forEach(([device, size]) => {
      it(`Responsif di perangkat ${device}`, () => {
        cy.viewport(...(Array.isArray(size) ? size : [size]));
        cy.get('header').should('be.visible');
        if (device === 'mobile') {
          cy.get('[aria-label*="menu"], .menu-icon, button')
            .filter(':visible')
            .first()
            .click({ force: true });
        }
      });
    });
  });
});