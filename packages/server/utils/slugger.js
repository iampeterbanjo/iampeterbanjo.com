module.exports = {
	parse: text => encodeURI(text),
	unparse: text => decodeURI(text),
};
