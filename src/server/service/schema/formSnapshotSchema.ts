import { z } from "zod";

export const formSnapshotIdentifierSchema = z.enum([
  "motebehov-arbeidsgiver-svar",
  "motebehov-arbeidsgiver-meld",
  "motebehov-arbeidstaker-svar",
  "motebehov-arbeidstaker-meld",
]);

export const baseFieldSnapshotSchema = z.object({
  fieldId: z.string(),
  fieldLabel: z.string(),
  description: z.string().nullish(),
});

export const textFieldSnapshotSchema = baseFieldSnapshotSchema.extend({
  fieldType: z.literal("TEXT"),
  value: z.string(),
  wasRequired: z.boolean().optional(),
});

export const singleCheckboxFieldSnapshotSchema = baseFieldSnapshotSchema.extend(
  {
    fieldType: z.literal("CHECKBOX_SINGLE"),
    value: z.boolean(),
  }
);

export const formSnapshotFieldOptionSchema = z.object({
  optionId: z.string(),
  optionLabel: z.string(),
  wasSelected: z.boolean(),
});

export const radioGroupFieldSnapshotSchema = baseFieldSnapshotSchema.extend({
  fieldType: z.literal("RADIO_GROUP"),
  selectedOptionId: z.string(),
  selectedOptionLabel: z.string(),
  options: z.array(formSnapshotFieldOptionSchema),
  wasRequired: z.boolean().optional(),
});

export const formSnapshotSchema = z.object({
  formIdentifier: formSnapshotIdentifierSchema,
  formSemanticVersion: z.string(),
  fieldSnapshots: z.array(
    z.union([
      textFieldSnapshotSchema,
      singleCheckboxFieldSnapshotSchema,
      radioGroupFieldSnapshotSchema,
    ])
  ),
});

export type FormSnapshotDto = z.infer<typeof formSnapshotSchema>;
