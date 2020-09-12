import { getMissingFields } from './utils';

describe('Given getMissingFields', () => {
	test(`When field is present
  Then missing fields is empty`, () => {
		const order = {
			status: 'PENDING',
		};

		const missingFields = getMissingFields(order, ['status']);

		expect(missingFields).toHaveProperty('length', 0);
	});

	test(`When field is missing
  Then missingFields has correct length empty`, () => {
		const order = {
			status: 'PENDING',
			amount: 0,
			required: true,
		};

		const missingFields = getMissingFields(order, [
			'status',
			'updatedDate',
			'tax',
		]);

		expect(missingFields).toHaveProperty('length', 2);
	});
});
