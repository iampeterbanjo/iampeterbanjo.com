const BASE_URL = 'http://localhost:8080';
const { clearServiceWorkers } = require('./helpers');

beforeEach(clearServiceWorkers);

describe('Korin tracks', () => {
	beforeEach(() => {
		cy.visit(`${BASE_URL}/projects/korin/tracks`);
		cy.injectAxe();
	});

	it('has no detectable a11y violations on load', () => {
		// Test the page at initial load
		cy.checkA11y();
	});

	it('has 50 tracks', () => {
		cy.get('.tracks li').then($list => {
			expect($list.length).to.equal(50);
		});
	});

	it('has track link', () => {
		cy.get('.tracks li a').should('have.attr', 'href');
	});
});
