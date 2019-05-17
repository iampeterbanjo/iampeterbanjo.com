const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
	summary: {
		type: String,
		required: true,
	},
	image: String,
	title: {
		type: String,
		required: true,
	},
	artist: {
		type: String,
		required: true,
	},
	profileUrl: {
		type: String,
		required: true,
	},
	lastFmUrl: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Profile', ProfileSchema);
