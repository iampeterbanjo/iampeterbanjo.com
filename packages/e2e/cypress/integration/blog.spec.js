const BASE_URL = 'http://localhost:8080';
// const slugs = require('../../../blog/pages/slugs');
const { clearServiceWorkers } = require('./helpers');

beforeEach(clearServiceWorkers);

describe('Blog', () => {
	beforeEach(() => {
		cy.visit(`${BASE_URL}/blog/posts`);
	});

	it('should have a title', () => {
		cy.get('h1').should('contain', 'Blog');
	});

	it('should have links to blog posts', () => {
		cy.get('a[href^="/blog/posts"]').then($postLinks => {
			expect($postLinks.length).to.be.greaterThan(0);
		});
	});

	it('should have a mini-bio', () => {
		cy.get('article:last-child').should('contain', 'Written by Peter Banjo');
	});

	it('should have "Read more" links', () => {
		cy.get('.post-excerpt a[href]').then($readMoreLinks => {
			expect($readMoreLinks.length).to.be.greaterThan(0);
			$readMoreLinks.each((index, $link) => {
				expect($link.textContent).to.eq('Read more');
			});
		});
	});
});
