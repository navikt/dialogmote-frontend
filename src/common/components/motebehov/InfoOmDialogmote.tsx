import { BodyLong, Link } from "@navikt/ds-react";
import { KONTAKT_INFO_URL } from "@/common/constants/staticUrls";
import { Events } from "@/common/amplitude/events";
import React from "react";
import { useAmplitude } from "@/common/hooks/useAmplitude";

const texts = {
  text1: `Målet med et dialogmøtet er å oppsummere hva som har skjedd til nå, og snakke om hva som kan hjelpe arbeidstakeren å komme tilbake til arbeid.`,
  text2: `Ønsker du å snakke med NAV om sykepenger eller noe annet, kan du `,
  link: "gå hit for å kontakte oss på andre måter.",
};

export const InfoOmDialogmote = () => {
  const { trackEvent } = useAmplitude();

  return (
    <>
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
    </>
  );
};
