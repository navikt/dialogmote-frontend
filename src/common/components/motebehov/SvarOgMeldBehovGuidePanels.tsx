import React from "react";
import { GuidePanel, Heading, Link, List } from "@navikt/ds-react";
import { ExternalLinkIcon } from "@navikt/aksel-icons";

import { ARBEIDSGIVER_OPPFOLGING_INFO_URL } from "@/common/constants/staticUrls";

export const texts = {
  headingSvarBehov: "Før du svarer",
  headingMeldBehov: "Før du melder behov",
  gjorDetteForSvarBehovInfo:
    "Før et dialogmøte med NAV skal arbeidsgiver og den ansatte ha avholdt et «dialogmøte 1», og dere skal sammen ha laget en oppfølgingsplan.",
  gjorDetteForMeldBehovInfo:
    "Før du melder behov for et dialogmøte med NAV bør arbeidsgiver og den ansatte ha avholdt et «dialogmøte 1», og dere skal sammen ha laget en oppfølgingsplan.",
  lesMerOmDinePlikterLink: "Les mer om dine plikter som arbeidsgiver",
  oppfolgingsPlanDelOgOpprettInfo:
    "Oppfølgingsplanen skal deles med NAV i forkant av møtet. Er oppfølgingsplan ikke laget? Du kan starte å utarbeide en oppfølgingsplan fra menypunktet «Oppfølgingsplaner» til venstre.",
  svarBehovOkASvareNeiInfo:
    "Om du mener at det ikke er behov for et dialogmøte med NAV, er det helt i orden at du svarer nei, og gir oss en begrunnelse.",
};

export const ArbeidsgiverSvarPaaBehovGuidePanel = () => (
  <GuidePanel className="mb-12" poster>
    <Heading spacing level="2" size="medium">
      {texts.headingSvarBehov}
    </Heading>

    <List>
      <List.Item>
        {texts.gjorDetteForSvarBehovInfo}{" "}
        <Link href={ARBEIDSGIVER_OPPFOLGING_INFO_URL} target="_blank">
          {texts.lesMerOmDinePlikterLink}
          <ExternalLinkIcon title="åpner i ny fane-ikon" />
        </Link>{" "}
        (åpner i ny fane).
      </List.Item>

      <List.Item>{texts.oppfolgingsPlanDelOgOpprettInfo}</List.Item>

      <List.Item>{texts.svarBehovOkASvareNeiInfo}</List.Item>
    </List>
  </GuidePanel>
);

export const ArbeidsgiverMeldBehovGuidePanel = () => (
  <GuidePanel className="mb-12" poster>
    <Heading spacing level="2" size="medium">
      {texts.headingMeldBehov}
    </Heading>

    <List>
      <List.Item>
        {texts.gjorDetteForMeldBehovInfo}{" "}
        <Link href={ARBEIDSGIVER_OPPFOLGING_INFO_URL} target="_blank">
          {texts.lesMerOmDinePlikterLink}
          <ExternalLinkIcon title="åpner i ny fane-ikon" />
        </Link>{" "}
        (åpner i ny fane).
      </List.Item>

      <List.Item>{texts.oppfolgingsPlanDelOgOpprettInfo}</List.Item>
    </List>
  </GuidePanel>
);
