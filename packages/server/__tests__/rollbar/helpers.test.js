const { expect } = require('@hapi/code');
const Lab = require('@hapi/lab');
const sinon = require('sinon');

const { preResponse } = require('../../rollbar/helpers');

const lab = Lab.script();
const { test, suite } = lab;

exports.lab = lab;

const mockParms = () => {
	return {
		request: {
			response: {
				isBoom: null,
			},
		},
		h: {
			continue: sinon.spy(),
		},
	};
};

suite('rollbar helpers', () => {
	suite('Given preResponse', () => {
		suite('And `response.request.isBoom` is false', () => {
			test('h.continue is called', () => {
				const { request, h } = mockParms();
				preResponse(request, h);

				expect(h.continue.called).to.be.true();
			});
		});

		suite('And `response.request.isBoom` is true', () => {
			test('h.contiune is returned', () => {
				const { request, h } = mockParms();
				request.response.isBoom = true;
				const result = preResponse(request, h);

				expect(result).to.exist();
			});
		});
	});
});
