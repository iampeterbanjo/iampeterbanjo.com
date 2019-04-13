const BASE_URL = 'http://localhost:8080';
const slugs = require('../../../blog/pages/slugs');
const { clearServiceWorkers } = require('./helpers');

beforeEach(clearServiceWorkers);

describe('layout', () => {
	beforeEach(() => {
		cy.visit(`${BASE_URL}/`);
	});

	describe('content', () => {
		it('has correct heading', () => {
			cy.get('h1').should('contain', 'Building on and for the web.');
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
			cy.get(`footer nav a[href="${slugs['home']}"]`).should('be.visible');
		});

		it('has navigation to blog', () => {
			cy.get(`footer nav a[href="${slugs['blog.posts']}"]`).should(
				'be.visible'
			);
		});

		it('has navigation to projects', () => {
			cy.get(`footer nav a[href="${slugs['korin.tracks']}"]`).should(
				'be.visible'
			);
		});
	});

	describe('header', () => {
		it('has a link to home page', () => {
			cy.get('a[title="Home"]').then($link => {
				const href = $link.attr('href');

				expect(href).to.equal(slugs.home);
			});
		});

		it('has navigation to home', () => {
			cy.get(`header nav a[href="${slugs['home']}"]`).should('be.visible');
		});

		it('has navigation to blog', () => {
			cy.get(`header nav a[href="${slugs['blog.posts']}"]`).should(
				'be.visible'
			);
		});

		it('has navigation to projects', () => {
			cy.get(`header nav a[href="${slugs['korin.tracks']}"]`).should(
				'be.visible'
			);
		});
	});
});
