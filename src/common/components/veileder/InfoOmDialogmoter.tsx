import React, { ReactNode } from "react";
import { Events } from "@/common/amplitude/events";
import { SYKMELDT_DIALOGMOTE_MED_NAV_INFO_URL } from "@/common/constants/staticUrls";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { BodyLong, Link } from "@navikt/ds-react";

const texts = {
  text1: "Du kan også ",
  text2: "lese mer om dialogmøter her.",
};

interface Props {
  children: ReactNode;
}

const InfoOmDialogmote = ({ children }: Props) => {
  const { trackEvent } = useAmplitude();
  return (
    <section>
      {children}

      <BodyLong>
        {texts.text1}
        <Link
          href={SYKMELDT_DIALOGMOTE_MED_NAV_INFO_URL}
          target="_blank"
          onClick={() => trackEvent(Events.LesMerOmDialogmoter)}
        >
          {texts.text2}
        </Link>
      </BodyLong>
    </section>
  );
};

export default InfoOmDialogmote;
