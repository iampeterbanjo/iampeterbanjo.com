const BASE_URL = '/projects/schedule';

export const get_jobs = () => {
	return {
		method: 'GET',
		url: `${BASE_URL}/jobs`,
	};
};
