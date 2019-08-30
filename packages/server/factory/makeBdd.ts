/**
 * Create BDD style test handlers e.g.
 * Given(`test description`, () => {
 * 	When(`test result`, () => {})
 * })
 */
function bdd(callback, prefix: string) {
	return function(description: string, handler: () => void | Promise<void>) {
		callback(`${prefix} ${description}`, handler);
		return callback;
	};
}

export default function makeBdd({ describe, it }) {
	return {
		Given: bdd(describe, 'Given'),
		And: bdd(describe, 'And'),
		When: bdd(it, 'When'),
	};
}
