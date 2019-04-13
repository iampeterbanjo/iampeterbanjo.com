const BASE_URL = 'http://localhost:8080';
const slugs = require('../../../blog/pages/slugs');

describe('Korin tracks', () => {
	beforeEach(() => {
		cy.visit(`${BASE_URL}${slugs['korin.tracks']}`);
	});

	it('should have 50 tracks', () => {
		cy.get('.tracks li').then($list => {
			expect($list.length).to.equal(50);
		});
	});

	it('should have track link', () => {
		cy.get('.tracks li a').should('have.attr', 'href');
	});
});
