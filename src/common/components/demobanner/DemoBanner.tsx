import { BodyLong, GlobalAlert, Select, VStack } from "@navikt/ds-react";
import { useRouter } from "next/router";
import {
  useActiveTestScenario,
  useSetActiveTestScenario,
} from "@/common/api/queries/testScenarioQueries";
import { useAudience, useLandingUrl } from "@/common/hooks/routeHooks";
import type { TestScenario } from "@/server/data/mock/getMockDb";

export const DemoBanner = () => {
  const router = useRouter();
  const { isAudienceSykmeldt } = useAudience();
  const landingUrl = useLandingUrl();
  const activeScenario = useActiveTestScenario();
  const setScenario = useSetActiveTestScenario();

  const hasLandingPage =
    isAudienceSykmeldt || typeof router.query.narmestelederid === "string";

  const changeScenario = (scenario: TestScenario) =>
    setScenario.mutate(scenario, {
      onSuccess: () => {
        if (hasLandingPage && router.asPath !== landingUrl) {
          router.push(landingUrl);
        }
      },
    });

  return (
    <GlobalAlert
      className="mx-auto my-8 w-4/5 max-w-4xl"
      status="warning"
      centered={false}
    >
      <GlobalAlert.Content>
        <VStack gap="space-16">
          <BodyLong>
            Dette er en demoside og inneholder ikke dine personlige data.
          </BodyLong>
          <Select
            className="max-w-xs"
            size="small"
            label="Scenario"
            value={activeScenario.data ?? ""}
            disabled={!activeScenario.data || setScenario.isPending}
            aria-busy={activeScenario.isPending || setScenario.isPending}
            description={
              activeScenario.isError
                ? "Kunne ikke hente scenario. Prøv å laste siden på nytt."
                : undefined
            }
            error={
              setScenario.isError
                ? "Kunne ikke bytte scenario. Prøv igjen."
                : undefined
            }
            onChange={(event) =>
              changeScenario(event.target.value as TestScenario)
            }
          >
            <optgroup label="Møtebehov">
              <option value="MELD_BEHOV">Meld møtebehov</option>
              <option value="SVAR_BEHOV">Svar på møtebehov</option>
              <option value="MOTEBEHOV_MELDT">Møtebehov meldt</option>
              <option value="MOTEBEHOV_SVART_JA">Svart ja på behov</option>
            </optgroup>
            <optgroup label="Dialogmøte">
              <option value="DIALOGMOTE_INNKALLING">
                Innkalling til Dialogmøte
              </option>
              <option value="DIALOGMOTE_ENDRET">Endret Dialogmøte</option>
              <option value="DIALOGMOTE_ENDRET_V2">
                Endret Dialogmøte (ENDRET)
              </option>
              <option value="DIALOGMOTE_AVLYST">Avlyst Dialogmøte</option>
            </optgroup>
          </Select>
        </VStack>
      </GlobalAlert.Content>
    </GlobalAlert>
  );
};
