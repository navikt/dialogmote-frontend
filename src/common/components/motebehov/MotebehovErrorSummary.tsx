import { ErrorSummary } from "@navikt/ds-react";
import React from "react";

const texts = {
  feiloppsummeringTittel: "For å gå videre må du rette opp følgende:",
};

export interface ErrorValues {
  href: string;
  text: string;
}

interface Props {
  errors: ErrorValues[];
}

export const MotebehovErrorSummary = ({ errors }: Props) => {
  if (errors.length > 0) {
    return (
      <ErrorSummary heading={texts.feiloppsummeringTittel}>
        {errors.map((err, index) => {
          return (
            <ErrorSummary.Item key={index} href={err.href}>
              {err.text}
            </ErrorSummary.Item>
          );
        })}
      </ErrorSummary>
    );
  }
  return null;
};
