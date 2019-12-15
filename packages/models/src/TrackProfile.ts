import mongoose from 'mongoose';

export interface ITrackProfile extends mongoose.Document {
	title: string;
	spotify: {
		image: string;
		href: string;
	};
	artist: string;
	lastFmUrl: string;
	profileUrl: string;
	profile: object;
	summary: string;
	lyrics: string;
}

export const TrackProfileSchema = new mongoose.Schema({
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

export const TrackProfileModel = mongoose.model<ITrackProfile>(
	'TrackProfile',
	TrackProfileSchema,
);
