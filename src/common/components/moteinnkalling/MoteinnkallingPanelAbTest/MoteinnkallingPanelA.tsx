import React from "react";
import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import { Calender } from "@navikt/ds-icons";
import { Events } from "@/common/amplitude/events";
import styled from "styled-components";
import { BodyShort, Button } from "@navikt/ds-react";
import { useRouter } from "next/router";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { Brev } from "types/shared/brev";
import { BrevType } from "types/client/brev";

const getTexts = (brevType: BrevType) => {
  switch (brevType) {
    case "AVLYST":
      return {
        title: "Dialogmøtet er avlyst",
        description: "Dialogmøtet du er innkalt til, er avlyst.",
        buttonText: "Se avlysningen",
        trackingName: Events.SeAvlysning,
      };
    case "NYTT_TID_STED":
      return {
        title: "Dialogmøtet er flyttet",
        description:
          "Dialogmøtet du er innkalt til, har fått nytt tidspunkt eller sted.",
        buttonText: "Se endringen",
        trackingName: Events.SeEndring,
      };
    default:
      return {
        title: "Du er innkalt til dialogmøte",
        description:
          "Sjekk om tidspunktet passer og hva du bør gjøre før møtet.",
        buttonText: "Se innkallingen",
        trackingName: Events.SeInnkalling,
      };
  }
};

const MoteinnkallingButton = styled(Button)`
  width: fit-content;
`;

interface Props {
  moteinnkalling?: Brev;
}

const MoteinnkallingPanelA = ({ moteinnkalling }: Props) => {
  const router = useRouter();
  const { trackEvent } = useAmplitude();

  if (moteinnkalling) {
    const texts = getTexts(moteinnkalling.brevType);

    return (
      <DialogmotePanel title={texts.title} icon={<Calender />}>
        <BodyShort spacing>{texts.description}</BodyShort>
        <MoteinnkallingButton
          type="button"
          variant="primary"
          size="medium"
          onClick={(e: { preventDefault: () => void }) => {
            e.preventDefault();
            trackEvent(texts.trackingName, {
              variant: "A",
              abtestVer: "v2",
              read: `${!!moteinnkalling.lestDato}`,
              responded: `${!!moteinnkalling.svar}`,
            });
            router.push(`${router.asPath}/moteinnkalling`);
          }}
        >
          {texts.buttonText}
        </MoteinnkallingButton>
      </DialogmotePanel>
    );
  }
  return null;
};

export default MoteinnkallingPanelA;