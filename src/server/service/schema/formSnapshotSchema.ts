import { z } from "zod";

const formSnapshotIdentifierSchema = z.enum([
  "motebehov-arbeidsgiver-svar",
  "motebehov-arbeidsgiver-meld",
  "motebehov-arbeidstaker-svar",
  "motebehov-arbeidstaker-meld",
]);

export type MotebehovFormIdentifier = z.infer<
  typeof formSnapshotIdentifierSchema
>;

// The use of "request" and "response" in schema names refers to wether the type is sent or retrieved
// from syfomotebehov. There are slight differences in the FormSnapshot type that can be POSTed to
// syfomotebehov, and the FormSnapshot type that will be retrieved (from GET endpoints). The difference
// is that some fields are optional (can be undefined) in the request types, but not on the response types,
// as they get default values or get set to null on the backend when not provided.

const baseFieldSnapshotSchema = z.object({
  fieldId: z.string(),
  label: z.string(),
});

const textFieldSnapshotSchema = baseFieldSnapshotSchema.extend({
  fieldType: z.literal("TEXT"),
  description: z.string().optional(),
  value: z.string(),
});

const textFieldSnapshotRequestSchema = textFieldSnapshotSchema.extend({
  description: z.string().optional(),
  wasRequired: z.boolean().optional(),
});

const textFieldSnapshotResponseSchema = textFieldSnapshotSchema.extend({
  description: z.string().nullable(),
  wasRequired: z.boolean(),
});

const singleCheckboxFieldSnapshotSchema = baseFieldSnapshotSchema.extend({
  fieldType: z.literal("CHECKBOX_SINGLE"),
  value: z.boolean(),
});

const singleCheckboxFieldSnapshotRequestSchema =
  singleCheckboxFieldSnapshotSchema.extend({
    description: z.string().optional(),
  });
const singleCheckboxFieldSnapshotResponseSchema =
  singleCheckboxFieldSnapshotSchema.extend({
    description: z.string().nullable(),
  });

const formSnapshotFieldOptionSchema = z.object({
  optionId: z.string(),
  optionLabel: z.string(),
  wasSelected: z.boolean(),
});

export type FieldSnapshotFieldOption = z.infer<
  typeof formSnapshotFieldOptionSchema
>;

const radioGroupFieldSnapshotSchema = baseFieldSnapshotSchema.extend({
  fieldType: z.literal("RADIO_GROUP"),
  selectedOptionId: z.string(),
  selectedOptionLabel: z.string(),
  options: z.array(formSnapshotFieldOptionSchema),
});

const radioGroupFieldSnapshotRequestSchema =
  radioGroupFieldSnapshotSchema.extend({
    description: z.string().optional(),
    wasRequired: z.boolean().optional(),
  });

export type RadioGroupFieldSnapshotRequest = z.infer<
  typeof radioGroupFieldSnapshotRequestSchema
>;

const radioGroupFieldSnapshotResponseSchema =
  radioGroupFieldSnapshotSchema.extend({
    description: z.string().nullable(),
    wasRequired: z.boolean(),
  });

const fieldSnapshotSchema = z.union([
  textFieldSnapshotRequestSchema,
  singleCheckboxFieldSnapshotRequestSchema,
  radioGroupFieldSnapshotRequestSchema,
]);

export type FieldSnapshot = z.infer<typeof fieldSnapshotSchema>;

export const formSnapshotRequestSchema = z.object({
  formIdentifier: formSnapshotIdentifierSchema,
  formSemanticVersion: z.string(),
  fieldSnapshots: z.array(fieldSnapshotSchema),
});

export const formSnapshotResponseSchema = z.object({
  formIdentifier: formSnapshotIdentifierSchema,
  formSemanticVersion: z.string(),
  fieldSnapshots: z.array(
    z.union([
      textFieldSnapshotResponseSchema,
      singleCheckboxFieldSnapshotResponseSchema,
      radioGroupFieldSnapshotResponseSchema,
    ])
  ),
});

export type FormSnapshotRequestDto = z.infer<typeof formSnapshotRequestSchema>;
export type FormSnapshotResponseDto = z.infer<
  typeof formSnapshotResponseSchema
>;
