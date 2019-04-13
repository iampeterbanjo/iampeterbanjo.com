const BASE_URL = 'http://localhost:8080';

describe('Blog', () => {
	beforeEach(() => {
		cy.visit(`${BASE_URL}/i-like-jsonata/`);
	});

	it('should have a title', () => {
		cy.get('h1').should('contain', 'I like JSONata and so can you');
	});

	describe('mini-bio', () => {
		it('should have "Written by"', () => {
			cy.get('#bio-mini').then($bio => {
				expect($bio.text()).to.contain('Written by Peter Banjo');
			});
		});

		it('should have correct twitter link', () => {
			cy.get('.social-twitter').then($link => {
				expect($link.prop('href')).to.contain(
					'https://twitter.com/dayosuperstar'
				);
			});
		});

		it('should have correct github link', () => {
			cy.get('.social-github').then($link => {
				expect($link.prop('href')).to.contain(
					'https://github.com/iampeterbanjo'
				);
			});
		});
	});
});
