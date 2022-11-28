import { ErrorSummary } from "@navikt/ds-react";
import React, { useEffect, useRef, useState } from "react";

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
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (errors.length > 0) errorRef?.current?.focus();
  }, [errors]);

  if (errors.length > 0) {
    return (
      <ErrorSummary heading={texts.feiloppsummeringTittel} ref={errorRef}>
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
