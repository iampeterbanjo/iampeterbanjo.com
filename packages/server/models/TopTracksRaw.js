const mongoose = require('mongoose');

const TopTracksRawSchema = new mongoose.Schema({
	name: String,
	duration: String,
	playcount: String,
	subscribers: String,
	mbid: String,
	url: String,
	streamable: {
		'#text': String,
		fulltrack: String,
	},
	artist: {
		name: String,
		mbid: String,
		url: String,
	},
	image: [
		{
			'#text': String,
			size: String,
		},
	],
});

module.exports = mongoose.model('TopTracksRaw', TopTracksRawSchema);
