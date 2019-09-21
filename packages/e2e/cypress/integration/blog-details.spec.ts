import { clearServiceWorkers, BASE_URL } from './helpers';

beforeEach(clearServiceWorkers);

describe('Blog content', () => {
	beforeEach(() => {
		cy.visit(`${BASE_URL}/blog/posts/i-like-jsonata/`);
		cy.injectAxe();
	});

	it('has no detectable a11y violations on load', () => {
		// Test the page at initial load
		cy.checkA11y();
	});

	it('has a title', () => {
		cy.get('h1').should('contain', 'I like JSONata and so can you');
	});

	describe('mini-bio', () => {
		it('has "Written by"', () => {
			cy.get('#bio-mini').then($bio => {
				expect($bio.text()).to.contain('Written by Peter Banjo');
			});
		});

		it('has correct twitter link', () => {
			cy.get('.social-twitter').then($link => {
				expect($link.prop('href')).to.contain(
					'https://twitter.com/dayosuperstar',
				);
			});
		});

		it('has correct github link', () => {
			cy.get('.social-github').then($link => {
				expect($link.prop('href')).to.contain(
					'https://github.com/iampeterbanjo',
				);
			});
		});
	});
});
