// import { expect } from '@hapi/code';
// import Lab from '@hapi/lab';
// import sinon from 'sinon';

// import * as helpers from '../../rollbar/helpers';
// const { preResponse, rollbarErrorHandler, errorLogger } = helpers;
// export const lab = Lab.script();
// const { test, suite } = lab;

// interface MockParamsType {
// 	request: {
// 		response: {
// 			isBoom: boolean | null;
// 		};
// 	};
// 	h: {
// 		continue: any;
// 	};
// }

// const MockParams = (): MockParamsType => {
// 	return {
// 		request: {
// 			response: {
// 				isBoom: null,
// 			},
// 		},
// 		h: {
// 			continue: sinon.spy(),
// 		},
// 	};
// };

// const MockRollbar = () => {
// 	return {
// 		log: sinon.spy(),
// 		error: sinon.spy(),
// 	};
// };

// Given('rollbar helpers', () => {
// 	Given('Given errorLogger', () => {
// 		And(' error message and rollbar instance', () => {
// 			When('rollbar.error is called with error message', () => {
// 				const rollbar = MockRollbar();
// 				const error = 'Ooops';
// 				const callback = sinon.stub();
// 				const request = sinon.stub();

// 				errorLogger({ error, rollbar, request, callback });
// 				const [first, second, third] = rollbar.error.args[0];

// 				expect(first).to.contain(`Error: ${error}`);
// 				expect(second).toEqual(request);
// 				expect(third).toEqual(callback);
// 			});
// 		});

// 		And(' Error and rollbar instance', () => {
// 			When('rollbar.error is called with Error', () => {
// 				const rollbar = MockRollbar();
// 				const error = new Error('Oops');
// 				const callback = sinon.stub();
// 				const request = sinon.stub();

// 				errorLogger({ error, rollbar, callback, request });
// 				const [first, second, third] = rollbar.error.args[0];

// 				expect(first).toEqual(error);
// 				expect(second).toEqual(request);
// 				expect(third).toEqual(callback);
// 			});
// 		});
// 	});

// 	Given('Given rollbarErrorHandler', () => {
// 		And(' NO `rollbarError`', () => {
// 			When('rollbar.log is NOT called', () => {
// 				const rollbar = MockRollbar();
// 				const error = null;
// 				rollbarErrorHandler(error, rollbar);

// 				expect(rollbar.log.called).not.to.be.true();
// 			});
// 		});

// 		And(' `rollbarError`', () => {
// 			When('rollbar.log is called', () => {
// 				const rollbar = MockRollbar();
// 				const error = 'Oops';
// 				rollbarErrorHandler(error, rollbar);

// 				expect(rollbar.log.called).to.be.true();
// 			});

// 			When('rollbar.log called correctly', () => {
// 				const rollbar = MockRollbar();
// 				const error = 'Oops';
// 				rollbarErrorHandler(error, rollbar);

// 				const [result] = rollbar.log.args[0];

// 				expect(result).to.contain(
// 					`Error reporting to rollbar, ignoring: ${error}`,
// 				);
// 			});
// 		});
// 	});

// 	Given('Given preResponse and rollbar', () => {
// 		And(' `response.request.isBoom` is false', () => {
// 			When('rollbar.error is NOT called', () => {
// 				const rollbar = MockRollbar();
// 				const { request, h } = MockParams();

// 				preResponse({ request, h, rollbar });

// 				expect(rollbar.error.called).not.to.be.true();
// 			});
// 		});

// 		And(' `response.request.isBoom` is true', () => {
// 			When('rollbar.error is called', () => {
// 				const rollbar = MockRollbar();
// 				const { request, h } = MockParams();
// 				request.response.isBoom = true;

// 				preResponse({ request, h, rollbar });

// 				expect(rollbar.error.called).to.be.true();
// 			});
// 		});
// 	});
// });
