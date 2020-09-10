import lodash from 'lodash/fp';

export const getMissingFields = (check: object, fields: string[]): string[] => {
	const missingFields: string[] = [];
	fields.forEach(path => {
		if (!lodash.get(path, check)) {
			missingFields.push(path);
		}
	});

	return missingFields;
};
