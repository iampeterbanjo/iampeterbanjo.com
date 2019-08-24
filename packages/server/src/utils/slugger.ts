const slugify = require('slugify').default;

export default  {
	parse: text => encodeURI(text),
	unparse: text => decodeURI(text),
	slugify,
};
