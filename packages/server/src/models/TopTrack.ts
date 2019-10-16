import mongoose from 'mongoose';
import utils from '../utils';

const { slugger } = utils;
const TopTrackSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	spotify: Object,
	artist: {
		type: String,
		required: true,
	},
	lastFmUrl: {
		type: String,
		required: true,
	},
	profileUrl: { type: String },
	profile: { type: Object },
	summary: { type: String },
	lyrics: { type: String },
});

TopTrackSchema.pre('save', function save(next) {
	// @ts-ignore
	this.profileUrl = slugger.slugify(`${this.artist} ${this.title}`);
	next();
});

export default mongoose.model('TopTrack', TopTrackSchema);
