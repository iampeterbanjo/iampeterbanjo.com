const BASE_URL = 'http://localhost:8080';
const { clearServiceWorkers } = require('./helpers');

beforeEach(clearServiceWorkers);

describe('Given Korin tracks profile', () => {
	beforeEach(() => {
		cy.visit(`${BASE_URL}/projects/korin/tracks`);
		cy.get('.tracks li:first-child a').click();
		cy.injectAxe();
	});

	it('When loaded it has no detectable a11y violations on load', () => {
		// Test the page at initial load
		cy.checkA11y();
	});

	it('When loaded it has a profile summary', () => {
		cy.get('h2 ~ p').should($p => {
			expect($p[0].innerText.length).to.be.greaterThan(200);
		});
	});

	it('When loaded it has go-back link', () => {
		cy.get('a.go-back').should('have.attr', 'href', '/projects/korin/tracks');
	});
});