import { Schema, model, Document, Model } from 'mongoose';

declare interface IRawTopTrack extends Document {
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

export interface RawTopTrackModel extends Model<IRawTopTrack> {}

export class RawTopTrack {
	private _model: Model<IRawTopTrack>;

	constructor() {
		const schema = new Schema({
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
		});

		this._model = model<IRawTopTrack>('RawTopTrack', schema);
	}

	public get model(): Model<IRawTopTrack> {
		return this._model;
	}
}

export default new RawTopTrack().model;
