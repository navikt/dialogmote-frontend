const FORM_SNAPSHOS_FIELD_TYPES = [
  "TEXT",
  "CHECKBOX_SINGLE",
  "RADIO_GROUP",
] as const;
type FormSnapshotFieldTypes = typeof FORM_SNAPSHOS_FIELD_TYPES[number];

const MOTEBEHOV_FORM_IDENTIFIER = [
  "motebehov-arbeidsgiver-svar",
  "motebehov-arbeidsgiver-meld",
  "motebehov-arbeidstaker-svar",
  "motebehov-arbeidstaker-meld",
] as const;
export type MotebehovFormIdentifier = typeof MOTEBEHOV_FORM_IDENTIFIER[number];

export type FieldSnapshotComponent =
  | TextFieldSnapshot
  | SingleCheckboxFieldSnapshot
  | RadioGroupFieldSnapshot;

// export type FormSnapshotDto = {
//   formIdentifier: MotebehovFormIdentifier;
//   formSemanticVersion: string;
//   fieldSnapshots: FieldSnapshotComponent[];
// };

interface FieldSnapshotBase {
  fieldId: string;
  fieldLabel: string;
  fieldType: FormSnapshotFieldTypes;
  description?: string | null;
}

interface TextFieldSnapshot extends FieldSnapshotBase {
  fieldType: "TEXT";
  value: string;
  wasRequired?: boolean;
}

interface SingleCheckboxFieldSnapshot extends FieldSnapshotBase {
  fieldType: "CHECKBOX_SINGLE";
  value: boolean;
}

export interface RadioGroupFieldSnapshot extends FieldSnapshotBase {
  fieldType: "RADIO_GROUP";
  selectedOptionId: string;
  selectedOptionLabel: string;
  options: FormSnapshotFieldOption[];
  wasRequired?: boolean;
}

export type FormSnapshotFieldOption = {
  optionId: string;
  optionLabel: string;
  wasSelected: boolean;
};
