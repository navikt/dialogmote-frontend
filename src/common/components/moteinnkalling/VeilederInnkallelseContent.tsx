import React, { ReactElement } from "react";
import { Label, Link } from "@navikt/ds-react";
import { VIDEOMOTE_INFO_URL } from "@/common/constants/staticUrls";
import { useAnalytics } from "@/common/hooks/useAnalytics";
import { Events } from "@/common/analytics/events";

const texts = {
  veilederText1: "Har du blitt kalt inn til et videomøte med Nav? ",
  veilederText2: "Les denne veiledningen, så du er forberedt til møtestart. ",
  veilederLink1: "Slik deltar du i videomøte med Nav.",
};

function VeilederInnkallelseContent(): ReactElement {
  const { trackEvent } = useAnalytics();
  return (
    <React.Fragment>
      <Label>{texts.veilederText1}</Label>
      {texts.veilederText2}
      <Link
        href={VIDEOMOTE_INFO_URL}
        target="_blank"
        onClick={() => trackEvent(Events.LesOmHvordanDeltaVideomote)}
      >
        {texts.veilederLink1}
      </Link>
      <br />
    </React.Fragment>
  );
}

export default VeilederInnkallelseContent;
