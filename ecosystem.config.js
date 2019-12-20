module.exports = {
	apps: [
		{
			name: 'iampeterbanjo-website',
			script: './packages/server/build/start.js',
			env: {
				NODE_ENV: 'development',
			},
			env_production: {
				NODE_ENV: 'production',
			},
			watch: ['./packages/server'],
			ignore_watch: ['node_modules'],
			watch_options: {
				followSymlinks: false,
			},
		},
		{
			name: 'iampeterbanjo-data',
			script: './packages/data/build/start.js',
			env: {
				NODE_ENV: 'development',
			},
			env_production: {
				NODE_ENV: 'production',
			},
			watch: ['./packages/data'],
			ignore_watch: ['node_modules'],
			watch_options: {
				followSymlinks: false,
			},
		},
	],
};
