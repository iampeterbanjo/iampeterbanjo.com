const preResponse = ({ response }, h) => {
	if (!response.isBoom) {
		return h.continue();
	}

	return h.continue;
};

module.exports = {
	preResponse,
};
