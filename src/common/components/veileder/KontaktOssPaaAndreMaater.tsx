import React from "react";
import { BodyLong, Link } from "@navikt/ds-react";
import VeilederGuidePanel from "@/common/components/veileder/VeilederGuidePanel";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { KONTAKT_INFO_SYK_URL_SM } from "@/common/constants/staticUrls";
import { Events } from "@/common/amplitude/events";

export const KontaktOssPaaAndreMaater = () => {
  const { trackEvent } = useAmplitude();
  return (
    <VeilederGuidePanel>
      <BodyLong spacing>
        Har du spørsmål om sykepenger, arbeidsavklaringspenger eller noe annet
        enn det vi skal snakke om i et dialogmøte, kan du&nbsp;
        <Link
          href={KONTAKT_INFO_SYK_URL_SM}
          onClick={() => trackEvent(Events.KontaktOss)}
        >
          kontakte oss på andre måter.
        </Link>
      </BodyLong>
    </VeilederGuidePanel>
  );
};
