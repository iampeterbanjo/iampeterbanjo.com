import * as mongoose from 'mongoose';
import { Storage } from 'umzug';
import { IMigration } from 'nomad-checkout-order-models';

export interface MongoDBStorageConstructorOptions {
	model: IMigration;
}

export class MongoDBStorage implements Storage {
	public readonly collection: mongoose.Model<any>;

	constructor(options: MongoDBStorageConstructorOptions) {
		this.collection = options.model;
	}

	async logMigration(migrationName: string): Promise<void> {
		await new this.collection({ migrationName }).save();
	}

	async unlogMigration(migrationName: string): Promise<void> {
		await this.collection.remove({ migrationName });
	}

	async executed(): Promise<string[]> {
		type Record = { migrationName: string };
		const records: Record[] = await this.collection
			.find({})
			.sort({ migrationName: 1 });
		return records.map(r => r.migrationName);
	}
}
