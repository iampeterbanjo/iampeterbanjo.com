describe('Home page', () => {
	beforeEach(() => {
		cy.visit('http://localhost:8080/');
	});

	it('has correct heading', () => {
		cy.get('h1').should('contain', 'Building on and for the web.');
	});
});

describe('Footer', () => {
	it('has github link', () => {
		cy.get('[title="Peter Banjo on GitHub"]').then($link => {
			const href = $link.attr('href');

			expect(href).to.equal('https://github.com/iampeterbanjo');
		});
	});
});
