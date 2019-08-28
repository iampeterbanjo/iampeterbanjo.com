/**
 * Create BDD style test handlers e.g.
 * Given(`test description`, () => {
 * 	When(`test result`, () => {})
 * })
 */
export default function(callback, prefix: string) {
	return function(description: string, handler: () => void | Promise<void>) {
		callback(`${prefix} ${description}`, handler);
	};
}
