import styled from "styled-components";
import { Button } from "@navikt/ds-react";
import React from "react";

const texts = {
  sendSvar: "Send svar",
};

const StyledButton = styled(Button)`
  width: 8rem;
`;

interface Props {
  onSubmit(): void;
}

export const SubmitButton = ({ onSubmit }: Props) => {
  return (
    <StyledButton
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        onSubmit();
      }}
      variant="primary"
      size="medium"
      type="submit"
    >
      {texts.sendSvar}
    </StyledButton>
  );
};
