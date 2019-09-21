// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable {
		injectAxe(): void;
		checkA11y(): void;
	}
}
