export default async function ImportChartTracks({ model, request, parser }) {
	const chartTopTracks = await request();
	const tracks = parser(chartTopTracks);

	await model.deleteMany();
	return model.insertMany(tracks);
}
