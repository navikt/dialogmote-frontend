import { Events } from "@/common/amplitude/events";
import React from "react";
import styled from "styled-components";
import { Button } from "@navikt/ds-react";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { useRouter } from "next/router";
import { MotebehovSkjemaType } from "types/shared/motebehov";

const texts = {
  button: "Meld behov for møte",
};

const HovedKnapp = styled(Button)`
  width: fit-content;
`;

interface Props {
  skjemaType: MotebehovSkjemaType;
}

export const MotebehovSubmitButton = ({ skjemaType }: Props) => {
  const router = useRouter();
  const { trackEvent } = useAmplitude();

  return (
    <HovedKnapp
      type="button"
      variant="primary"
      size="medium"
      onClick={() => {
        trackEvent(
          skjemaType === "MELD_BEHOV" ? Events.MeldBehov : Events.SvarBehov
        );
        router.push(
          skjemaType === "MELD_BEHOV"
            ? `${router.asPath}/motebehov/meld`
            : `${router.asPath}/motebehov/svar`
        );
      }}
    >
      {texts.button}
    </HovedKnapp>
  );
};
