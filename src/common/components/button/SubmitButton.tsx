import { Button } from "@navikt/ds-react";
import React from "react";

const texts = {
  sendSvar: "Send svar",
};

interface Props {
  onSubmit?: () => void;
  isLoading: boolean;
}

export const SubmitButton = ({ onSubmit, isLoading }: Props) => {
  return (
    <Button
      className="w-32"
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
      {texts.sendSvar}
    </Button>
  );
};
