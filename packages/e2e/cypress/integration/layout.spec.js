const BASE_URL = 'http://localhost:8080';
const { clearServiceWorkers } = require('./helpers');

beforeEach(clearServiceWorkers);

describe('layout', () => {
	beforeEach(() => {
		cy.visit(`${BASE_URL}/`);
		cy.injectAxe();
	});

	it('has no detectable a11y violations on load', () => {
		// Test the page at initial load
		cy.checkA11y();
	});

	describe('content', () => {
		it('has correct heading', () => {
			cy.get('h1').should('contain', 'Building on and for the web.');
		});

		it('has visible photo', () => {
			cy.get('[alt="Peter Banjo"]').should('be.visible');
		});
	});

	describe('footer', () => {
		it('has github link', () => {
			cy.get('[title="Peter Banjo on GitHub"]').then($link => {
				const href = $link.attr('href');

				expect(href).to.equal('https://github.com/iampeterbanjo');
			});
		});

		it('has Twitter link', () => {
			cy.get('[title="Peter Banjo on Twitter"]').then($link => {
				const href = $link.attr('href');

				expect(href).to.equal('https://twitter.com/dayosuperstar');
			});
		});

		it('has navigation to home', () => {
			cy.get(`footer nav a[href="/"`).should('be.visible');
		});

		it('has navigation to blog', () => {
			cy.get(`footer nav a[href="/blog/posts"]`).should('be.visible');
		});

		it('has navigation to projects', () => {
			cy.get(`footer nav a[href="/projects/korin/tracks"]`).should(
				'be.visible'
			);
		});
	});

	describe('header', () => {
		it('has a link to home page', () => {
			cy.get('a[title="home"]').then($link => {
				const href = $link.attr('href');

				expect(href).to.equal('/');
			});
		});

		it('has navigation to home', () => {
			cy.get(`header nav a[href="/"]`).should('be.visible');
		});

		it('has navigation to blog', () => {
			cy.get(`header nav a[href="/blog/posts"]`).should('be.visible');
		});

		it('has navigation to projects', () => {
			cy.get(`header nav a[href="/projects/korin/tracks"]`).should(
				'be.visible'
			);
		});
	});
});
