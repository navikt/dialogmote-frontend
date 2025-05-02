import { z } from "zod";

const formSnapshotIdentifierSchema = z.enum([
  "motebehov-arbeidsgiver-svar",
  "motebehov-arbeidsgiver-meld",
  "motebehov-arbeidstaker-svar",
  "motebehov-arbeidstaker-meld",
]);

// The use of "input" and "output" in schema names refers to wether the type is sent or retrieved
// from syfomotebehov. There are slight differences in the FormSnapshot type that can be POSTed to
// syfomotebehov, and the FormSnapshot type that will be retrieved (from GET endpoints). The difference
// is that some fields are optional (can be undefined) in the input types, but not on the output types,
// as they get default values or get set to null on the backend when not provided.

const baseFieldSnapshotSchema = z.object({
  fieldId: z.string(),
  fieldLabel: z.string(),
});

const textFieldSnapshotSchema = baseFieldSnapshotSchema.extend({
  fieldType: z.literal("TEXT"),
  description: z.string().optional(),
  value: z.string(),
});

const textFieldSnapshotInputSchema = textFieldSnapshotSchema.extend({
  description: z.string().optional(),
  wasRequired: z.boolean().optional(),
});

const textFieldSnapshotOuputSchema = textFieldSnapshotSchema.extend({
  description: z.string().nullable(),
  wasRequired: z.boolean(),
});

const singleCheckboxFieldSnapshotSchema = baseFieldSnapshotSchema.extend({
  fieldType: z.literal("CHECKBOX_SINGLE"),
  value: z.boolean(),
});

const singleCheckboxFieldSnapshotInputSchema =
  singleCheckboxFieldSnapshotSchema.extend({
    description: z.string().optional(),
  });
const singleCheckboxFieldSnapshotOutputSchema =
  singleCheckboxFieldSnapshotSchema.extend({
    description: z.string().nullable(),
  });

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
});

const radioGroupFieldSnapshotInputSchema = radioGroupFieldSnapshotSchema.extend(
  {
    description: z.string().optional(),
    wasRequired: z.boolean().optional(),
  }
);
const radioGroupFieldSnapshotOutputSchema =
  radioGroupFieldSnapshotSchema.extend({
    description: z.string().nullable(),
    wasRequired: z.boolean(),
  });

export const formSnapshotInputSchema = z.object({
  formIdentifier: formSnapshotIdentifierSchema,
  formSemanticVersion: z.string(),
  fieldSnapshots: z.array(
    z.union([
      textFieldSnapshotInputSchema,
      singleCheckboxFieldSnapshotInputSchema,
      radioGroupFieldSnapshotInputSchema,
    ])
  ),
});

export const formSnapshotOutputSchema = formSnapshotInputSchema.extend({
  fieldSnapshots: z.array(
    z.union([
      textFieldSnapshotOuputSchema,
      singleCheckboxFieldSnapshotOutputSchema,
      radioGroupFieldSnapshotOutputSchema,
    ])
  ),
});

export type FormSnapshotInputDto = z.infer<typeof formSnapshotInputSchema>;
export type FormSnapshotOutputDto = z.infer<typeof formSnapshotOutputSchema>;
