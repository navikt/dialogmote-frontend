import {
  FormSnapshotFieldOption,
  RadioGroupFieldSnapshot,
} from "../../types/shared/form";

export function getSelectedRadioOption(
  options: Pick<FormSnapshotFieldOption, "optionId" | "optionLabel">[],
  selectedKey: string
): Pick<
  RadioGroupFieldSnapshot,
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
