import { BodyLong, GuidePanel, Heading, Link } from "@navikt/ds-react";
import React from "react";
import { useAudience } from "@/common/hooks/routeHooks";
import { oppfolgingsplanUrlAG, oppfolgingsplanUrlSM } from "@/common/publicEnv";
import styled from "styled-components";
import { useNarmesteLederId } from "@/common/hooks/useNarmesteLederId";

export const texts = {
  title: "Husk å lage en ny oppfølgingsplan før møtet.",
  oppfolgingsplanReminder: "Har dere ikke laget oppfølgingsplan ennå? ",
  oppfolgingsplanLink: "Opprett en plan.",
  shareOppfolgingsplan: "Husk å dele den med NAV før dialogmøtet.",
  old: {
    forDuSvarer: {
      tittel: "Før du svarer",
      lagetPlan:
        "Har dere laget en oppfølgingsplan? Husk å dele den med NAV nå.",
      ikkeLagetPlan: "Er oppfølgingsplanen ikke laget?",
      imageAltText: "Illustrasjon avmerkingsbokser",
    },
    tekstInformasjonInnhold: {
      lenke: "Opprett en ny plan.",
    },
  },
};

const StyledGuidePanel = styled(GuidePanel)`
  margin-bottom: 2rem;
`;

export const HuskOppfolgingsplanGuidePanel = () => {
  const { isAudienceSykmeldt } = useAudience();
  const narmestelederid = useNarmesteLederId();

  return (
    <StyledGuidePanel poster>
      <Heading spacing level="2" size="medium">
        {texts.old.forDuSvarer.tittel}
      </Heading>
      <ul>
        <li>
          <BodyLong>{texts.old.forDuSvarer.lagetPlan}</BodyLong>
        </li>
        <li>
          <BodyLong>
            {texts.old.forDuSvarer.ikkeLagetPlan}{" "}
            <Link
              href={
                isAudienceSykmeldt
                  ? oppfolgingsplanUrlSM
                  : `${oppfolgingsplanUrlAG}/${narmestelederid}`
              }
            >
              {texts.old.tekstInformasjonInnhold.lenke}
            </Link>
          </BodyLong>
        </li>
      </ul>
    </StyledGuidePanel>
  );
};
