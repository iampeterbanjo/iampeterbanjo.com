module.exports = {
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/node_modules/**'],
	coverageReporters: ['json-summary', 'text-summary'],
	notify: true,
	notifyMode: 'failure-change',
	preset: 'ts-jest',
	testMatch: ['**/?(*.)+(spec).[jt]s?(x)'],
	setupFilesAfterEnv: ['<rootDir>/setupFilesAfterEnv.js'],
	testEnvironment: 'node',
};
