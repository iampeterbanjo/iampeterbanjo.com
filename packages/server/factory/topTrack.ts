import casual from 'casual';

export default function getTopTrack() {
	return {
		artist: casual.full_name,
		title: casual.title,
		image: casual.url,
		lastFmUrl: casual.url,
	};
}
