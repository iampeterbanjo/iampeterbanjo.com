const path = require('path')

module.exports = {
	rootPath: path.join(__dirname, '../blog/public/'),
	options: {
		host: '0.0.0.0',
		port: Number(process.env.PORT || 8080),
		routes: {
			files: {
				relativeTo: __dirname,
			},
		},
	},
}
