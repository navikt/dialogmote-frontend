import {
  FieldSnapshotFieldOption,
  RadioGroupFieldSnapshotRequest,
} from "@/server/service/schema/formSnapshotSchema";

export function getSelectedRadioOption(
  options: Pick<FieldSnapshotFieldOption, "optionId" | "optionLabel">[],
  selectedKey: string
): Pick<
  RadioGroupFieldSnapshotRequest,
  "selectedOptionId" | "selectedOptionLabel" | "options"
> | null {
  const selectedOption = options.find(
    ({ optionId }) => optionId === selectedKey
  );

  if (!selectedOption) return null;

  const fieldOptions = options.map((option) => ({
    ...option,
    wasSelected: option.optionId === selectedKey,
  }));

  return {
    selectedOptionId: selectedOption.optionId,
    selectedOptionLabel: selectedOption.optionLabel,
    options: fieldOptions,
  };
}
