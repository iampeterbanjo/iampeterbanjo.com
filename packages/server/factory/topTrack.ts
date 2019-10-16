import casual from 'casual';

export default function getTopTrack() {
	return {
		artist: casual.full_name,
		title: casual.title,
		spotify: { image: casual.url, href: casual.url },
		lastFmUrl: casual.url,
		profileUrl: casual.url,
	};
}
