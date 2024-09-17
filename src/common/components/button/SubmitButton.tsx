import { Button } from "@navikt/ds-react";
import React from "react";

interface Props {
  isLoading: boolean;
  onSubmit?: () => void;
  label: string;
}

export const SubmitButton = ({ onSubmit, isLoading, label }: Props) => {
  return (
    <Button
      onClick={(e: React.MouseEvent) => {
        if (onSubmit) {
          e.preventDefault();
          onSubmit();
        }
      }}
      variant="primary"
      size="medium"
      type="submit"
      loading={isLoading}
    >
      {label}
    </Button>
  );
};
