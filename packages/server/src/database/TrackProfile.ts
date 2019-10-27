import * as mongoose from 'mongoose';

import utils from '../utils';

const { slugger } = utils;

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

TrackProfileSchema.pre('save', function save(next) {
	// @ts-ignore
	this.profileUrl = slugger.slugify(`${this.artist} ${this.title}`);
	next();
});

export const TrackProfileModel = mongoose.model<ITrackProfile>(
	'TrackProfile',
	TrackProfileSchema,
);
