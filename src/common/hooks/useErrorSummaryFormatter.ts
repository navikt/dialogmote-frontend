import { ErrorValues } from "@/common/components/motebehov/MotebehovErrorSummary";
import { FieldErrors } from "react-hook-form";
import { rightNotNullish } from "@/common/utils/tsUtils";

export function useErrorSummaryFormatter(errors: FieldErrors): ErrorValues[] {
  const errorList = Object.entries(errors)
    .filter(rightNotNullish)
    .map(([key, value]) => {
      return {
        href: `#${key}`,
        text: String(value.message),
      };
    });

  return errorList;
}
