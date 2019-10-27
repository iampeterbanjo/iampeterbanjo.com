export default async function transformChartTracks({
	source,
	transformation,
	model,
}) {
	const rawTracks = await source.find();
	const profiles = await transformation(rawTracks);

	await model.deleteMany();
	return model.insertMany(profiles);
}
