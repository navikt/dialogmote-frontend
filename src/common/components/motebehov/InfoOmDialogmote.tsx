import { BodyLong } from "@navikt/ds-react";
import React from "react";
import { KontaktOssLink } from "@/common/components/kontaktoss/KontaktOssLink";

const texts = {
  text1: `Målet med et dialogmøtet er å oppsummere hva som har skjedd til nå, og snakke om hva som kan hjelpe arbeidstakeren å komme tilbake til arbeid.`,
  text2: `Ønsker du å snakke med NAV om sykepenger eller noe annet, kan du `,
  link: "gå hit for å kontakte oss på andre måter.",
};

export const InfoOmDialogmote = () => {
  return (
    <>
      <BodyLong>{texts.text1}</BodyLong>
      <BodyLong spacing>
        {texts.text2}
        <KontaktOssLink linkText={texts.link} />
      </BodyLong>
    </>
  );
};
