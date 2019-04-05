const BASE_URL = 'http://localhost:8080';
const slugs = require('../../../blog/pages/slugs');

describe('Blog', () => {
	beforeEach(() => {
		cy.visit(`${BASE_URL}${slugs['blog.posts']}`);
	});

	it('should have a title', () => {
		cy.get('h1').should('contain', 'Blog');
	});

	it('should have a mini-bio', () => {
		cy.get('article:last-child').should('contain', 'Written by Peter Banjo');
	});
});
