import { Events } from "@/common/amplitude/events";
import { DIALOGMOTE_INFO_URL } from "@/common/constants/staticUrls";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { BodyLong, Link } from "@navikt/ds-react";
import React from "react";

const texts = {
  lesMerOmDialogmoter: "Les mer om dialogmøter",
};

interface Props {
  children: string;
}

const InfoOmDialogmote = ({ children }: Props) => {
  const { trackEvent } = useAmplitude();
  return (
    <BodyLong>
      {children}
      <br />
      <Link
        href={DIALOGMOTE_INFO_URL}
        target="_blank"
        onClick={() => trackEvent(Events.LesMerOmDialogmoter)}
      >
        {texts.lesMerOmDialogmoter}
      </Link>
    </BodyLong>
  );
};

export default InfoOmDialogmote;
