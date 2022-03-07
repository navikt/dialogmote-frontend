import { Back } from "@navikt/ds-icons";
import React, { ReactElement } from "react";
import { useLandingUrl } from "@/common/hooks/routeHooks";
import { Events } from "@/common/amplitude/events";
import RouterLenke from "@/common/components/navigation/RouterLenke";
import styled from "styled-components";

interface Props {
  marginTop?: string;
  marginBottom?: string;
}

const StyledTilbakeknapp = styled.div<Props>`
  margin-top: ${(p) => p.marginTop};
  margin-bottom: ${(p) => p.marginBottom};
`;

export const Tilbakeknapp = ({ marginTop, marginBottom }: Props): ReactElement => {
  const landingUrl = useLandingUrl();
  return (
    <StyledTilbakeknapp marginTop={marginTop} marginBottom={marginBottom}>
      <RouterLenke href={landingUrl} trackingName={Events.Tilbakeknapp}>
        <Back /> Tilbake
      </RouterLenke>
    </StyledTilbakeknapp>
  );
};
