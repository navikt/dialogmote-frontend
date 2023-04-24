import React from "react";
import { BodyLong } from "@navikt/ds-react";
import { KontaktOssLink } from "@/common/components/kontaktoss/KontaktOssLink";
import VeilederGuidePanel from "@/common/components/veileder/VeilederGuidePanel";

export const KontaktOssPaaAndreMaater = () => {
  return (
    <VeilederGuidePanel>
      <BodyLong spacing>
        Har du spørsmål om sykepenger, arbeidsavklaringspenger eller noe annet
        enn det vi skal snakke om i et dialogmøte, kan du&nbsp;
        <KontaktOssLink linkText={" kontakte oss på andre måter."} />
      </BodyLong>
    </VeilederGuidePanel>
  );
};
