import { Events } from "@/common/amplitude/events";
import { Brev } from "@/server/data/types/external/BrevTypes";
import { useRouteBasePath } from "@/common/hooks/routeHooks";
import { useAmplitude } from "@/common/hooks/useAmplitude";
import { getLongDateFormat } from "@/common/utils/dateUtils";
import { LinkPanel } from "@navikt/ds-react";
import React from "react";

const texts = {
  text: "Referatet oppsummerer det vi snakket om i dialogmøtet",
};

interface Props {
  referat: Brev;
}

const SisteReferat = ({ referat }: Props) => {
  const { trackEvent } = useAmplitude();

  const routeBasePath = useRouteBasePath();
  const referatPath = `${routeBasePath}/referat/${referat.uuid}`;

  return (
    <LinkPanel
      href={referatPath}
      onClick={() => trackEvent(Events.AktivtReferat)}
    >
      <LinkPanel.Title>
        Referat fra {getLongDateFormat(referat.tid)}
      </LinkPanel.Title>
      <LinkPanel.Description>{texts.text}</LinkPanel.Description>
    </LinkPanel>
  );
};

export default SisteReferat;
