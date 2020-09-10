import { IDatabase } from '@iampeterbanjo/types';
import { Model } from 'mongoose';
import { IMigration } from './models';

export interface IBackendDatabase extends IDatabase {
	MigrationModel: Model<IMigration>;
}
