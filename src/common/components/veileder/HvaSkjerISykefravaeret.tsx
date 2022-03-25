import { Events } from "@/common/amplitude/events";
import { TIDSLINJE_URL } from "@/common/constants/staticUrls";
import { useSykefravaerBasePath } from "@/common/hooks/routeHooks";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { BodyLong, Link } from "@navikt/ds-react";
import { KontaktOssLink } from "@/common/components/kontaktoss/KontaktOssLink";
import React from "react";

const texts = {
  infoText: "Lurer du på hva som skjer underveis i sykefraværet?",
  tidslinjeText: "Ta gjerne en titt på denne ",
  tidslinjeLink: "tidslinjen.",
  kontaktOssText: "Du kan også ",
  kontaktOssLink: "kontakte oss.",
};

const HvaSkjerISykefravaeret = () => {
  const { trackEvent } = useAmplitude();
  const sykefravaerPath = useSykefravaerBasePath();
  const tidslinjeURL = sykefravaerPath + TIDSLINJE_URL;

  return (
    <>
      <BodyLong spacing>
        {texts.infoText}
        <br />
        {texts.tidslinjeText}
        <Link
          href={tidslinjeURL}
          target="_blank"
          onClick={() => trackEvent(Events.Tidslinjen)}
        >
          {texts.tidslinjeLink}
        </Link>
      </BodyLong>
      <BodyLong>
        {texts.kontaktOssText}
        <KontaktOssLink linkText={texts.kontaktOssLink} />
      </BodyLong>
    </>
  );
};

export default HvaSkjerISykefravaeret;
