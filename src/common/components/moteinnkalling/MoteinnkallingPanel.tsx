import { BodyShort, Button, LocalAlert } from "@navikt/ds-react";
import NextLink from "next/link";
import type { BrevType } from "types/client/brev";
import type { Brev } from "types/shared/brev";
import { Events } from "@/common/analytics/events";
import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import { useLandingUrl } from "@/common/hooks/routeHooks";
import { useAnalytics } from "@/common/hooks/useAnalytics";
import DittSvarPaInnkallelse from "./DittSvarPaInnkallelse";

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
      <LocalAlert status="warning">
        <LocalAlert.Content>{texts.descriptionNotResponded}</LocalAlert.Content>
      </LocalAlert>
    );
  }

  if (moteinnkalling.svar) {
    return <DittSvarPaInnkallelse svarType={moteinnkalling.svar.svarType} />;
  }

  return (
    <>
      <BodyShort spacing>{texts.description}</BodyShort>
      <BodyShort spacing>{texts.description2}</BodyShort>
    </>
  );
};
interface Props {
  moteinnkalling?: Brev;
}

const MoteinnkallingPanel = ({ moteinnkalling }: Props) => {
  const { trackEvent } = useAnalytics();
  const landingUrl = useLandingUrl();

  if (moteinnkalling) {
    const texts = getTexts(moteinnkalling.brevType);

    return (
      <DialogmotePanel title={texts.title}>
        <DialogmotePanelContet moteinnkalling={moteinnkalling} />
        <div className="w-fit">
          <NextLink href={`${landingUrl}/moteinnkalling`} passHref>
            <Button
              onClick={() => {
                trackEvent(texts.trackingName, {
                  read: `${!!moteinnkalling.lestDato}`,
                  responded: `${!!moteinnkalling.svar}`,
                });
              }}
            >
              {texts.buttonText}
            </Button>
          </NextLink>
        </div>
      </DialogmotePanel>
    );
  }
  return null;
};

export default MoteinnkallingPanel;
