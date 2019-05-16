const mongoose = require('mongoose');

const TopTrackSchema = new mongoose.Schema({
	title: String,
	image: String,
	artist: String,
	url: String,
	profileUrl: String,
});

module.exports = mongoose.model('TopTrack', TopTrackSchema);
