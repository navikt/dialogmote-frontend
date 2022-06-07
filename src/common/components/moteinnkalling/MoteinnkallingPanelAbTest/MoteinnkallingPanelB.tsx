import React from "react";
import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import { Events } from "@/common/amplitude/events";
import styled from "styled-components";
import { Alert, BodyShort, Button } from "@navikt/ds-react";
import { useRouter } from "next/router";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { Brev } from "types/shared/brev";
import { BrevType } from "types/client/brev";
import DittSvarPaInnkallelse from "../DittSvarPaInnkallelse";

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
          "Dialogmøtet du er innkalt til, har fått nytt tidspunkt eller sted. Svar på om tidspunktet passer for deg eller ikke.",
        description2:
          "Se endringen for informasjon, og send svaret ditt nederst på siden.",
        descriptionNotResponded:
          "Du har ikke svart på om du kommer til dette dialogmøtet. Åpne endringen og svar nederst på siden.",
        buttonText: "Se endringen",
        trackingName: Events.SeEndring,
      };
    default:
      return {
        title: "Du er innkalt til dialogmøte",
        description: "Svar på om tidspunktet passer for deg eller ikke.",
        description2:
          "Se innkallingen for informasjon, og send svaret ditt nederst på siden.",
        descriptionNotResponded: `Du har ikke svart på om du kommer til dette dialogmøtet. Åpne innkallingen og svar nederst på siden.`,
        buttonText: "Se innkallingen",
        trackingName: Events.SeInnkalling,
      };
  }
};

const ContentStyled = styled.section`
  margin: 1rem 0;
`;

const ContentResponedStyled = styled.section`
  margin-top: 1rem;
`;

const DialogmotePanelContet = ({
  moteinnkalling,
}: {
  moteinnkalling: Brev;
}) => {
  const texts = getTexts(moteinnkalling.brevType);

  if (moteinnkalling.brevType === "AVLYST") {
    return <BodyShort spacing>{texts.description}</BodyShort>;
  }

  if (!moteinnkalling.svar && moteinnkalling.lestDato) {
    return (
      <ContentStyled>
        <Alert variant="warning">{texts.descriptionNotResponded}</Alert>
      </ContentStyled>
    );
  }

  if (moteinnkalling.svar) {
    return (
      <ContentResponedStyled>
        <DittSvarPaInnkallelse svarType={moteinnkalling.svar.svarType} />
      </ContentResponedStyled>
    );
  }

  return (
    <ContentStyled>
      <BodyShort spacing>{texts.description}</BodyShort>
      <BodyShort spacing>{texts.description2}</BodyShort>
    </ContentStyled>
  );
};

const MoteinnkallingButton = styled(Button)`
  width: fit-content;
`;

interface Props {
  moteinnkalling?: Brev;
}

const MoteinnkallingPanelB = ({ moteinnkalling }: Props) => {
  const router = useRouter();
  const { trackEvent } = useAmplitude();

  if (moteinnkalling) {
    const texts = getTexts(moteinnkalling.brevType);

    return (
      <DialogmotePanel title={texts.title} titleSize="large">
        <DialogmotePanelContet moteinnkalling={moteinnkalling} />
        <MoteinnkallingButton
          type="button"
          variant="primary"
          size="medium"
          onClick={(e: { preventDefault: () => void }) => {
            e.preventDefault();
            trackEvent(texts.trackingName);
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

export default MoteinnkallingPanelB;
