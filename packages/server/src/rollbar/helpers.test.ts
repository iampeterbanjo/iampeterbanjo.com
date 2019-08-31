import * as helpers from './helpers';

const { preResponse, rollbarErrorHandler, errorLogger } = helpers;

interface MockParamsType {
	request: {
		response: {
			isBoom: boolean | null;
		};
	};
	h: {
		continue: any;
	};
}

const MockParams = (): MockParamsType => {
	return {
		request: {
			response: {
				isBoom: null,
			},
		},
		h: {
			continue: jest.fn(),
		},
	};
};

const MockRollbar = () => {
	return {
		log: jest.fn(),
		error: jest.fn(),
	};
};

describe('Givenrollbar helpers', () => {
	describe('And errorLogger', () => {
		it('When an error is thrown rollbar.error is called with error message', () => {
			const rollbar = MockRollbar();
			const error = 'Ooops';
			const callback = jest.fn()();
			const request = jest.fn()();

			errorLogger({ error, rollbar, request, callback });
			const [first, second, third] = rollbar.error.mock.calls[0];

			expect(first).toEqual(expect.stringContaining(`Error: ${error}`));
			expect(second).toEqual(request);
			expect(third).toEqual(callback);
		});

		describe('And Error and rollbar instance', () => {
			it('When an error is thrown rollbar.error is called with Error', () => {
				const rollbar = MockRollbar();
				const error = new Error('Oops');
				const callback = jest.fn()();
				const request = jest.fn()();

				errorLogger({ error, rollbar, callback, request });
				const [first, second, third] = rollbar.error.mock.calls[0];

				expect(first).toEqual(error);
				expect(second).toEqual(request);
				expect(third).toEqual(callback);
			});
		});
	});

	describe('GivenrollbarErrorHandler', () => {
		it('When there is NO error rollbar.log is NOT called', () => {
			const rollbar = MockRollbar();
			const error = null;
			rollbarErrorHandler(error, rollbar);

			expect(rollbar.log).not.toHaveBeenCalled();
		});

		it('When there is an error rollbar.log is called', () => {
			const rollbar = MockRollbar();
			const error = 'Oops';
			rollbarErrorHandler(error, rollbar);

			expect(rollbar.log).toHaveBeenCalled();
		});

		it('When there is an error rollbar.log called correctly', () => {
			const rollbar = MockRollbar();
			const error = 'Oops';
			rollbarErrorHandler(error, rollbar);

			const [result] = rollbar.log.mock.calls[0];

			expect(result).toEqual(
				expect.stringContaining(
					`Error reporting to rollbar, ignoring: ${error}`,
				),
			);
		});
	});

	describe('GivenpreResponse and rollbar', () => {
		it('When `response.request.isBoom` is false rollbar.error is NOT called', () => {
			const rollbar = MockRollbar();
			const { request, h } = MockParams();

			preResponse({ request, h, rollbar });

			expect(rollbar.error).not.toHaveBeenCalled();
		});

		it('When `response.request.isBoom` is true rollbar.error is called', () => {
			const rollbar = MockRollbar();
			const { request, h } = MockParams();
			request.response.isBoom = true;

			preResponse({ request, h, rollbar });

			expect(rollbar.error).toHaveBeenCalled();
		});
	});
});
