const slugify = require('slugify').default;

module.exports = {
	parse: text => encodeURI(text),
	unparse: text => decodeURI(text),
	slugify,
};
