const mongoose = require('mongoose');

const TopTrackSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	image: String,
	artist: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	profileUrl: String,
});

module.exports = mongoose.model('TopTrack', TopTrackSchema);
