module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	collectCoverage: true,
	collectCoverageFrom: ['./src/**/*.{ts,tsx}', '!**/*.d.ts', '!**/fixtures/**'],
	setupFilesAfterEnv: ['<rootDir>/setupFilesAfterEnv.js'],
};
