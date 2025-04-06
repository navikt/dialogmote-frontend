export function getSelectedRadioOption(
  options: Pick<FormSnapshotFieldOption, "optionId" | "optionLabel">[],
  selectedKey: string
): Pick<
  RadioGroupFieldSnapshot,
  "selectedOptionId" | "selectedOptionLabel" | "options"
> | null {
  const fieldOptions = options.map((option) => ({
    ...option,
    wasSelected: option.optionId === selectedKey,
  }));
  const selectedOption = fieldOptions.find(({ wasSelected }) => wasSelected);

  if (selectedOption === undefined) return null;

  return {
    selectedOptionId: selectedOption.optionId,
    selectedOptionLabel: selectedOption.optionLabel,
    options: fieldOptions,
  };
}

export type FormSnapshotDto = {
  formIdentifier: string;
  formSemanticVersion: string;
  fieldSnapshots: (
    | TextFieldSnapshotDto
    | SingleCheckboxFieldSnapshotDto
    | RadioGroupFieldSnapshot
  )[];
};

const FORM_SNAPSHOS_FIELD_TYPES = [
  "TEXT",
  "CHECKBOX_SINGLE",
  "RADIO_GROUP",
] as const;
type FormSnapshotFieldTypes = typeof FORM_SNAPSHOS_FIELD_TYPES[number];

interface FieldSnapshotBaseDto {
  fieldId: string;
  fieldLabel: string;
  fieldType: FormSnapshotFieldTypes;
  description?: string;
}

interface TextFieldSnapshotDto extends FieldSnapshotBaseDto {
  fieldType: "TEXT";
  textValue: string;
  wasOptional?: boolean;
}

interface SingleCheckboxFieldSnapshotDto extends FieldSnapshotBaseDto {
  fieldType: "CHECKBOX_SINGLE";
  wasChecked: boolean;
}

interface RadioGroupFieldSnapshot extends FieldSnapshotBaseDto {
  fieldType: "RADIO_GROUP";
  selectedOptionId: string;
  selectedOptionLabel: string;
  options: FormSnapshotFieldOption[];
  wasOptional?: boolean;
}

export type FormSnapshotFieldOption = {
  optionId: string;
  optionLabel: string;
  wasSelected: boolean;
};
