import { MigrationDefinition } from '@iampeterbanjo/models';
import { Document } from 'mongoose';
import { Convert, createSchema, ExtractDoc, typedModel } from 'ts-mongoose';

// create schema here to keep mongoose happy
export const MigrationSchema = createSchema(MigrationDefinition, {
	timestamps: true,
});

export type MigrationProps = Convert<typeof MigrationDefinition>;
export const MigrationModel = typedModel('Migration', MigrationSchema);
export type MigrationDoc = ExtractDoc<typeof MigrationSchema>;
export type IMigration = typeof MigrationModel & Document;
