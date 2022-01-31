import { BodyLong, Link } from "@navikt/ds-react";
import styled from "styled-components";
import { PERSONVERN_URL } from "../constants/staticUrls";
import { Events } from "@/common/amplitude/events";
import { useAmplitude } from "@/common/hooks/useAmplitude";

const BottomInfoStyled = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: auto;
  text-align: center;
`;

const texts = {
  bottomText: "Vi bruker opplysningene også til å gjøre selve tjenesten bedre.",
  bottomUrl: "Les mer om hvordan NAV behandler personopplysninger.",
};

const PersonvernInfo = () => {
  const { trackEvent } = useAmplitude();

  return (
    <BottomInfoStyled>
      <BodyLong>{texts.bottomText}</BodyLong>
      <Link
        href={PERSONVERN_URL}
        onClick={() => trackEvent(Events.BehandlePersonopplysninger)}
      >
        {texts.bottomUrl}
      </Link>
    </BottomInfoStyled>
  );
};

export default PersonvernInfo;
