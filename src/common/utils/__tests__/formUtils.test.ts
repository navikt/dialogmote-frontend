import { getSelectedRadioOption } from "@/common/utils/formUtils";
import { describe, expect, it } from "vitest";

describe("formUtils", () => {
  describe("getSelectedRadioOption", () => {
    const radioOptions = [
      {
        optionId: "option1",
        optionLabel: "Option 1",
      },
      {
        optionId: "option2",
        optionLabel: "Option 2",
      },
    ];
    it("should return selected option and option-field", () => {
      const radioFieldGroupSnapshop = getSelectedRadioOption(
        radioOptions,
        "option1"
      );

      expect(radioFieldGroupSnapshop).toEqual({
        options: [
          {
            optionId: "option1",
            optionLabel: "Option 1",
            wasSelected: true,
          },
          {
            optionId: "option2",
            optionLabel: "Option 2",
            wasSelected: false,
          },
        ],
        selectedOptionId: "option1",
        selectedOptionLabel: "Option 1",
      });
    });

    it("should return null if selected option argument is not found", () => {
      const radioFieldGroupSnapshop = getSelectedRadioOption(
        radioOptions,
        "invalid-option-id"
      );

      expect(radioFieldGroupSnapshop).toEqual(null);
    });
  });
});
