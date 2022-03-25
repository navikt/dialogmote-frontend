import {
  KONTAKT_INFO_URL_AG,
  KONTAKT_INFO_URL_SM,
} from "@/common/constants/staticUrls";
import { Events } from "@/common/amplitude/events";
import { Link } from "@navikt/ds-react";
import React from "react";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { useAudience } from "@/common/hooks/routeHooks";

interface Props {
  linkText: string;
}

export const KontaktOssLink = ({ linkText }: Props) => {
  const { trackEvent } = useAmplitude();
  const { isAudienceSykmeldt } = useAudience();

  return (
    <Link
      href={isAudienceSykmeldt ? KONTAKT_INFO_URL_SM : KONTAKT_INFO_URL_AG}
      onClick={() => trackEvent(Events.KontaktOss)}
    >
      {linkText}
    </Link>
  );
};
