import { clearServiceWorkers, BASE_URL } from './helpers';

beforeEach(clearServiceWorkers);

describe('Berserker', () => {
	beforeEach(() => {
		cy.visit(`${BASE_URL}/berserker`);
		cy.injectAxe();
	});

	it('has no detectable a11y violations on load', () => {
		// Test the page at initial load
		cy.checkA11y();
	});

	it('has a title', () => {
		cy.get('h1').should('contain', 'Berserker');
	});

	it('has server data', () => {
		cy.get('#message').should('contain', 'Fatality');
	});
});
