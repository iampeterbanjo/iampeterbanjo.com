import {
	Convert,
	createSchema,
	ExtractDoc,
	Type,
	typedModel,
} from 'ts-mongoose';

export const MigrationDefinition = {
	migrationName: Type.string({ required: true }),
};

export const MigrationSchema = createSchema(MigrationDefinition, {
	timestamps: true,
});

export type MigrationProps = Convert<typeof MigrationDefinition>;
export const MigrationModel = typedModel('Migration', MigrationSchema);
export type MigrationDoc = ExtractDoc<typeof MigrationSchema>;
export type IMigration = typeof MigrationModel;
