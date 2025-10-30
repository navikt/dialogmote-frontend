import {
  KONTAKT_INFO_URL_AG,
  KONTAKT_INFO_URL_SM,
} from "@/common/constants/staticUrls";
import { Events } from "@/common/analytics/events";
import { Link } from "@navikt/ds-react";
import React from "react";
import { useAnalytics } from "@/common/hooks/useAnalytics";
import { useAudience } from "@/common/hooks/routeHooks";

interface Props {
  linkText: string;
}

export const KontaktOssLink = ({ linkText }: Props) => {
  const { trackEvent } = useAnalytics();
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
