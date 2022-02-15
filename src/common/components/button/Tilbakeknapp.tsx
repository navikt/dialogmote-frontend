import { Back } from "@navikt/ds-icons";
import React, { ReactElement } from "react";
import { useLandingUrl } from "@/common/hooks/routeHooks";
import { Events } from "@/common/amplitude/events";
import RouterLenke from "@/common/components/navigation/RouterLenke";
import styled from "styled-components";

interface Props {
  marginTop?: string;
}

const StyledTilbakeknapp = styled.div<Props>`
  margin-top: ${(p) => p.marginTop};
`;

export const Tilbakeknapp = ({ marginTop }: Props): ReactElement => {
  const landingUrl = useLandingUrl();
  return (
    <StyledTilbakeknapp marginTop={marginTop}>
      <RouterLenke href={landingUrl} trackingName={Events.Tilbakeknapp}>
        <Back /> Tilbake
      </RouterLenke>
    </StyledTilbakeknapp>
  );
};
