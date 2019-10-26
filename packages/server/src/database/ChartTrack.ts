import * as Mongoose from 'mongoose';

export interface IChartTrack extends Mongoose.Document {
	name: string;
	duration: string;
	playcount: string;
	subscribers: string;
	mbid: string;
	url: string;
	streamable: {
		'#text': string;
		fulltrack: string;
	};
	artist: {
		name: string;
		mbid: string;
		url: string;
	};
	image: [
		{
			'#text': string;
			size: string;
		},
	];
	importedDate: Date;
}

export const ChartTrackSchema = new Mongoose.Schema(
	{
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
		importedDate: {
			type: Date,
			default: new Date(),
		},
	},
	{
		timestamps: true,
	},
);

export const ChartTrackModel = Mongoose.model<IChartTrack>(
	'ChartTrack',
	ChartTrackSchema,
);
