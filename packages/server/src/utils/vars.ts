export const baseUrl = 'http://0.0.0.0:8080';
export const lyricsIdPath = 'response.hits[0].result.id';
export const songInfoPath = `response.hits[0].result.{
	"id": id,
	"thumbnail": song_art_image_thumbnail_url
}`;
export const topTracksPath = `tracks.track.{
	"title": name,
		"image": image[3]."#text",
		"artist": artist.name,
		"url": artist.url
}`;
export const convertTopTracksPath = `
	$.{
		"title": name,
		"lastFmUrl": url,
		"artist": artist.name
	}`;
