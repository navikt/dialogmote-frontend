import type { FieldErrors } from "react-hook-form";
import type { ErrorValues } from "@/common/components/motebehov/MotebehovErrorSummary";
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
