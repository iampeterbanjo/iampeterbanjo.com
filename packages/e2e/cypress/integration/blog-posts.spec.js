const BASE_URL = 'http://localhost:8080';
const { clearServiceWorkers } = require('./helpers');

beforeEach(clearServiceWorkers);

describe('Blog posts', () => {
	beforeEach(() => {
		cy.visit(`${BASE_URL}/blog/posts`);
		cy.injectAxe();
	});

	it('has no detectable a11y violations on load', () => {
		// Test the page at initial load
		cy.checkA11y();
	});

	it('has a title', () => {
		cy.get('h1').should('contain', 'Blog');
	});

	it('has links to blog posts', () => {
		cy.get('[href^="/blog/posts"]').then($postLinks => {
			expect($postLinks.length).to.be.greaterThan(0);
		});
	});

	it('has a mini-bio', () => {
		cy.get('article:last-child').should('contain', 'Written by Peter Banjo');
	});

	it('has "Read more" links', () => {
		cy.get('.post-excerpt [href^="/blog/posts"]').then($readMoreLinks => {
			expect($readMoreLinks.length).to.be.greaterThan(0);

			$readMoreLinks.each((index, $link) => {
				expect($link.textContent).to.eq('Read more');
			});
		});
	});

	it('has a title link', () => {
		cy.get('.post-title [href^="/blog/posts"]').then($titleLinks => {
			expect($titleLinks.length).to.be.greaterThan(0);

			$titleLinks.each((index, $link) => {
				expect($link.textContent).not.to.eq('[title]');
			});
		});
	});
});
