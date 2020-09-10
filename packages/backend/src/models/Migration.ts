import { typedModel, createSchema, Convert, ExtractDoc } from 'ts-mongoose';
import { MigrationDefinition } from '@iampeterbanjo/models';
import { Document } from 'mongoose';
export const MigrationSchema = createSchema(MigrationDefinition, {
	timestamps: true,
});

export type MigrationProps = Convert<typeof MigrationDefinition>;
export const MigrationModel = typedModel('Migration', MigrationSchema);
export type MigrationDoc = ExtractDoc<typeof MigrationSchema>;
export type IMigration = typeof MigrationModel & Document;
