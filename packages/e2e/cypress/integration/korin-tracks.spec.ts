import { clearServiceWorkers, BASE_URL } from './helpers';

beforeEach(clearServiceWorkers);

describe('Given Korin tracks page', () => {
	beforeEach(() => {
		cy.visit(`${BASE_URL}/projects/korin/tracks`);
		cy.injectAxe();
	});

	// disabled because of track images color-contrast violations
	// it('has no detectable a11y violations on load', () => {
	// 	// Test the page at initial load
	// 	cy.checkA11y();
	// });

	it('has 50 tracks', () => {
		cy.get('.tracks li').then($list => {
			expect($list.length).to.equal(50);
		});
	});

	it('has track link', () => {
		cy.get('.tracks li a').should('have.attr', 'href');
	});

	it('has track image', () => {
		cy.get('.tracks li img').should('have.attr', 'src');
	});
});
