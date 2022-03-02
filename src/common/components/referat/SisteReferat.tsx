import { Events } from "@/common/amplitude/events";
import {useReferatPath} from "@/common/hooks/routeHooks";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { getLongDateFormat } from "@/common/utils/dateUtils";
import { Referat } from "@/server/data/types/internal/BrevTypes";
import { LinkPanel } from "@navikt/ds-react";
import NextLink from "next/link";
import React from "react";

const texts = {
  text: "Referatet oppsummerer det vi snakket om i dialogmøtet",
};

interface Props {
  referat: Referat;
}

const SisteReferat = ({ referat }: Props) => {
  const { trackEvent } = useAmplitude();

  const referatPath = useReferatPath();
  const href = `${referatPath}/${referat.uuid}`;

  return (
    <NextLink href={href} passHref>
      <LinkPanel
        onClick={() => trackEvent(Events.AktivtReferat)}
      >
        <LinkPanel.Title>
          Referat fra {getLongDateFormat(referat.tid)}
        </LinkPanel.Title>
        <LinkPanel.Description>{texts.text}</LinkPanel.Description>
      </LinkPanel>
    </NextLink>
  );
};

export default SisteReferat;
