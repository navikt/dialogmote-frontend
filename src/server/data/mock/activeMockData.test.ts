import { describe, expect, it } from "vitest";
import {
  meldMotebehovAGOutputFixture,
  meldMotebehovSMResponseFixture,
  svarMotebehovAGOutputFixture,
  svarMotebehovSMResponseFixture,
} from "@/mocks/data/fixtures/form";
import { motebehovStatusSchema } from "@/server/service/schema/motebehovSchema";
import { getMockSetupForScenario } from "./activeMockData";
import { MotebehovBuilder } from "./builders/motebehovBuilder";
import { TestScenarioBuilder } from "./builders/testScenarioBuilder";
import type { TestScenario } from "./getMockDb";

describe("mock scenarios", () => {
  it.each<TestScenario>([
    "MELD_BEHOV",
    "SVAR_BEHOV",
    "MOTEBEHOV_MELDT",
    "MOTEBEHOV_SVART_JA",
    "DIALOGMOTE_INNKALLING",
    "DIALOGMOTE_ENDRET",
    "DIALOGMOTE_ENDRET_V2",
    "DIALOGMOTE_AVLYST",
  ])("resolves %s with independent audience data", (scenario) => {
    const setup = getMockSetupForScenario(scenario);

    expect(setup.activeTestScenario).toBe(scenario);
    expect(setup.motebehovSM).not.toBe(setup.motebehovAG);
    expect(motebehovStatusSchema.safeParse(setup.motebehovSM).success).toBe(
      true,
    );
    expect(motebehovStatusSchema.safeParse(setup.motebehovAG).success).toBe(
      true,
    );
  });

  it.each([
    {
      scenario: "MOTEBEHOV_MELDT" as const,
      skjemaType: "MELD_BEHOV",
      suffix: "meld",
      smFixture: meldMotebehovSMResponseFixture,
      agFixture: meldMotebehovAGOutputFixture,
    },
    {
      scenario: "MOTEBEHOV_SVART_JA" as const,
      skjemaType: "SVAR_BEHOV",
      suffix: "svar",
      smFixture: svarMotebehovSMResponseFixture,
      agFixture: svarMotebehovAGOutputFixture,
    },
  ])("$scenario has audience-specific submitted receipts", (testCase) => {
    const setup = getMockSetupForScenario(testCase.scenario);

    expect(setup.brev).toEqual([]);
    expect(setup.sykmeldt?.aktivSykmelding).toBe(true);
    for (const [status, audience, innmelderType, fixture] of [
      [setup.motebehovSM, "arbeidstaker", "ARBEIDSTAKER", testCase.smFixture],
      [setup.motebehovAG, "arbeidsgiver", "ARBEIDSGIVER", testCase.agFixture],
    ] as const) {
      expect(status).toMatchObject({
        visMotebehov: true,
        skjemaType: testCase.skjemaType,
        motebehov: {
          skjemaType: testCase.skjemaType,
          innmelderType,
          formValues: {
            harMotebehov: true,
            formSnapshot: {
              formIdentifier: `motebehov-${audience}-${testCase.suffix}`,
              formSemanticVersion: "1.0.0",
              fieldSnapshots: fixture,
            },
          },
        },
      });
      expect(
        status.motebehov?.formValues.formSnapshot?.fieldSnapshots,
      ).not.toBe(fixture);
    }
  });

  it("clones nested submissions without mutating the input or other audience", () => {
    const input = new MotebehovBuilder().withSubmittedMotebehov().build();
    const setup = new TestScenarioBuilder().withMotebehov(input).build();
    const smSubmission = setup.motebehovSM.motebehov;
    const agSubmission = setup.motebehovAG.motebehov;
    if (!smSubmission || !agSubmission) throw new Error("Missing submission");

    smSubmission.formValues.harMotebehov = false;
    const smFields = smSubmission.formValues.formSnapshot?.fieldSnapshots;
    smFields?.splice(0, 1);

    expect(agSubmission.formValues.harMotebehov).toBe(true);
    expect(agSubmission.formValues.formSnapshot?.fieldSnapshots).toEqual(
      meldMotebehovAGOutputFixture,
    );
    expect(input.motebehov?.formValues).toEqual({
      harMotebehov: true,
      formSnapshot: null,
    });
    expect(meldMotebehovSMResponseFixture).toHaveLength(5);
  });
});
