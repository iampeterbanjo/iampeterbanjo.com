import { IMigration } from '@iampeterbanjo/models';
import { IDatabase } from '@iampeterbanjo/types';
import mongoose from 'mongoose';

export interface IBackendDatabase extends IDatabase {
	MigrationModel: mongoose.Model<IMigration>;
}
