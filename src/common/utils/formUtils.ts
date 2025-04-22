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
