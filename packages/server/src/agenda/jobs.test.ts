import jobs from './jobs';

describe('Given jobs', () => {
	it('When it has definition for import chart top tracks', () => {
		expect(jobs.IMPORT_CHART_TOP_TRACKS).toEqual('import chart top tracks');
	});
});
