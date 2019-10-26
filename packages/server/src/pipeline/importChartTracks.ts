export default async function ImportChartTracks({
	chartTrackModel,
	lastFmApi,
	parser,
}) {
	const chartTopTracks = await lastFmApi.chart.getTopTracks();
	const tracks = parser(chartTopTracks);

	await chartTrackModel.deleteMany();
	return chartTrackModel.insertMany(tracks);
}
