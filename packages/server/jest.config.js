module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	collectCoverage: true,
	coverageReporters: ['json-summary'],
	collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/node_modules/**'],
	notify: true,
	notifyMode: 'failure-change',
};
