describe('Halaman About Us - higo.id', () => {
  const url = 'https://higo.id/about-us';

  context('Desktop View', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
      cy.visit(url);
    });

    it('Memuat URL dan judul halaman dengan benar', () => {
      cy.url().should('include', '/about-us');
      cy.contains(/Tentang\s+HIGO/i).should('be.visible');
    });

    it('Menampilkan gambar utama jika ada', () => {
      cy.get('img').each(($img) => {
        cy.wrap($img).should('be.visible');
      });
    });

    it('Memuat teks deskripsi atau konten utama', () => {
      cy.get('main').invoke('text').should('match', /HIGO|Loyal Customer|Marketing/i);
    });

    it('Memastikan link internal (jika ada) bekerja', () => {
      cy.get('a[href*="/contact"]').should('exist');
      cy.get('a[href*="/case-study"]').should('exist');
    });
  });

  });
