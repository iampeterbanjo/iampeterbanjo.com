import slugify from 'slugify';

export default {
	parse: text => encodeURI(text),
	unparse: text => decodeURI(text),
	slugify,
};
