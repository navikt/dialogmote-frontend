import { Events } from "@/common/amplitude/events";
import {KONTAKT_INFO_URL, TIDSLINJE_URL} from "@/common/constants/staticUrls";
import {useSykefravaerBasePath} from "@/common/hooks/routeHooks";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { Link } from "@navikt/ds-react";

const texts = {
  infoText: "Lurer du på hva som skjer underveis i sykefraværet?",
  tidslinjeText: "Ta gjerne en titt på denne ",
  tidslinjeLink: "tidslinjen.",
  kontaktOssText: "Du kan også ",
  kontaktOssLink: "kontakte oss.",
};

const VeilederReferatContent = () => {
  const { trackEvent } = useAmplitude();
  const sykefravaerPath = useSykefravaerBasePath();
  const tidslinjeURL = sykefravaerPath + TIDSLINJE_URL;

  return (
    <>
      <p>
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
      </p>
      <p>
        {texts.kontaktOssText}
        <Link
          href={KONTAKT_INFO_URL}
          target="_blank"
          onClick={() => trackEvent(Events.KontaktOss)}
        >
          {texts.kontaktOssLink}
        </Link>
      </p>
    </>
  );
};

export default VeilederReferatContent;
