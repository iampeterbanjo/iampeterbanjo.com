import jsonata from 'jsonata';

/**
 * Evaluate JSON with jsonAta expression
 * @param {object} data JSON
 * @param {string} path jsonAta path
 */
const evaluate = (data, path) => {
	const expression = jsonata(path);
	return expression.evaluate(data);
};

export default {
	evaluate,
};
