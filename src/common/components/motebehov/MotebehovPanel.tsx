import React, { useState } from "react";
import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import { DialogReport } from "@navikt/ds-icons";
import { Events } from "@/common/amplitude/events";
import styled from "styled-components";
import { Accordion, Alert, BodyLong, Button, Link } from "@navikt/ds-react";
import { useRouter } from "next/router";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { DialogMotebehov } from "@/server/data/types/internal/DialogMotebehovTypes";
import { KONTAKT_INFO_URL } from "@/common/constants/staticUrls";
import MotebehovKvittering from "@/common/components/motebehov/MotebehovKvittering";
import { useAudience } from "@/common/hooks/routeHooks";
import { oppfolgingsplanUrlAG, oppfolgingsplanUrlSM } from "@/common/publicEnv";

const texts = {
  title: "Trenger dere et dialogmøte med NAV?",
  titleSvart: "Du har svart på om du ønsker et møte",
  seSvaretDitt: "Se svaret ditt",
  button: "Meld behov for møte",
  text1: `Målet med et dialogmøtet er å oppsummere hva som har skjedd til nå, og snakke om hva som kan hjelpe arbeidstakeren å komme tilbake til arbeid.`,
  text2: `Ønsker du å snakke med NAV om sykepenger eller noe annet, kan du `,
  textSvart:
    "Vi vil bruke svaret ditt når vi vurderer om det er nødvendig med dialogmøte.",
  link: "gå hit for å kontakte oss på andre måter.",
  alertstripe: "Husk å dele oppfølgingsplanen med NAV før møtet.",
  oppfolgingsplanlink: "Gå til oppfølgingsplanen.",
};

const HovedKnapp = styled(Button)`
  width: fit-content;
`;

interface Props {
  motebehov?: DialogMotebehov;
}

const MotebehovPanel = ({ motebehov }: Props) => {
  const router = useRouter();
  const { trackEvent } = useAmplitude();
  const [openAccordion, setOpenAccordion] = useState<boolean>(false);
  const { isAudienceSykmeldt } = useAudience();

  const trackingName = () => {
    if (motebehov?.skjemaType === "MELD_BEHOV") {
      return motebehov.svar ? Events.MeldBehovKvittering : Events.MeldBehov;
    } else {
      return motebehov?.svar ? Events.SvarBehovKvittering : Events.SvarBehov;
    }
  };

  if (motebehov) {
    if (motebehov.svar) {
      return (
        <DialogmotePanel title={texts.titleSvart} icon={<DialogReport />}>
          <BodyLong>{texts.textSvart}</BodyLong>

          <Accordion>
            <Accordion.Item open={openAccordion}>
              <Accordion.Header
                onClick={() => setOpenAccordion(!openAccordion)}
              >
                {texts.seSvaretDitt}
              </Accordion.Header>
              <Accordion.Content>
                <MotebehovKvittering motebehov={motebehov} />
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>

          <Alert variant="info">
            <BodyLong>{texts.alertstripe}</BodyLong>
            <Link
              href={
                isAudienceSykmeldt ? oppfolgingsplanUrlSM : oppfolgingsplanUrlAG
              }
              onClick={() => trackEvent(Events.Oppfolgingsplan)}
            >
              {texts.oppfolgingsplanlink}
            </Link>
          </Alert>
        </DialogmotePanel>
      );
    }

    return (
      <DialogmotePanel title={texts.title} icon={<DialogReport />}>
        <BodyLong>{texts.text1}</BodyLong>
        <BodyLong spacing>
          {texts.text2}
          <Link
            href={KONTAKT_INFO_URL}
            target="_blank"
            onClick={() => trackEvent(Events.KontaktAndreMoter)}
          >
            {texts.link}
          </Link>
        </BodyLong>

        <HovedKnapp
          type="button"
          variant="primary"
          size="medium"
          onClick={() => {
            trackEvent(trackingName());
            router.push(
              motebehov.skjemaType === "MELD_BEHOV"
                ? `${router.asPath}/motebehov/meld`
                : `${router.asPath}/motebehov/svar`
            );
          }}
        >
          {texts.button}
        </HovedKnapp>
      </DialogmotePanel>
    );
  }
  return null;
};

export default MotebehovPanel;
