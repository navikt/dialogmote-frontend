import type { NextApiRequest, NextApiResponse } from "next";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TEST_SESSION_ID } from "@/common/api/fetch";
import {
  meldMotebehovAGOutputFixture,
  meldMotebehovSMResponseFixture,
  svarMotebehovAGOutputFixture,
  svarMotebehovSMResponseFixture,
} from "@/mocks/data/fixtures/form";
import submitAG from "@/pages/api/arbeidsgiver/motebehov/index.api";
import submitSM from "@/pages/api/sykmeldt/motebehov/index.api";
import { fetchConcurrentDataAG } from "@/server/data/arbeidsgiver/fetchConcurrentDataAG";
import { fetchConcurrentDataSM } from "@/server/data/sykmeldt/fetchConcurrentDataSM";
import { getMockSetupForScenario } from "./activeMockData";
import getMockDb, { assignNewDbSetup } from "./getMockDb";

vi.mock("@/server/utils/serverEnv", () => ({
  default: {},
  isMockBackend: true,
}));

const sessionId = "mock-motebehov-test";
const otherSessionId = "mock-motebehov-other-test";

afterEach(() => {
  delete global._mockDb[sessionId];
  delete global._mockDb[otherSessionId];
});

describe.each(["MELD_BEHOV", "SVAR_BEHOV"] as const)(
  "mock submission for %s",
  (scenario) => {
    it.each(["SM", "AG"] as const)(
      "writes only %s data and reads the correct audience",
      async (audience) => {
        assignNewDbSetup(getMockSetupForScenario(scenario), sessionId);
        assignNewDbSetup(getMockSetupForScenario(scenario), otherSessionId);
        const formSubmission = {
          harMotebehov: true,
          formSnapshot: {
            formIdentifier: `motebehov-${audience === "SM" ? "arbeidstaker" : "arbeidsgiver"}-${scenario === "SVAR_BEHOV" ? "svar" : "meld"}`,
            formSemanticVersion: "1.0.0",
            fieldSnapshots: [],
          },
        };
        const req = {
          method: "POST",
          headers: { [TEST_SESSION_ID]: sessionId },
          body:
            audience === "SM"
              ? formSubmission
              : { narmesteLederId: "synthetic-leder-id", formSubmission },
        } as unknown as NextApiRequest;
        const res = { status: vi.fn(), end: vi.fn() };
        res.status.mockReturnValue(res);

        await (audience === "SM" ? submitSM : submitAG)(
          req,
          res as unknown as NextApiResponse,
        );

        expect(res.status).toHaveBeenCalledWith(200);
        const smData = await fetchConcurrentDataSM(req);
        const agData = await fetchConcurrentDataAG(
          req,
          "synthetic-arbeidstaker",
          "synthetic-leder-id",
        );
        const db = getMockDb(req);
        expect(smData?.motebehov).toBe(db.motebehovSM);
        expect(agData?.motebehov).toBe(db.motebehovAG);

        const submitted = audience === "SM" ? smData : agData;
        const untouched = audience === "SM" ? agData : smData;
        const isSvar = scenario === "SVAR_BEHOV";
        expect(submitted?.motebehov.motebehov?.formValues).toEqual({
          harMotebehov: true,
          formSnapshot: {
            formIdentifier: `motebehov-${audience === "SM" ? "arbeidstaker" : "arbeidsgiver"}-${isSvar ? "svar" : "meld"}`,
            formSemanticVersion: "1.0.0",
            fieldSnapshots:
              audience === "SM"
                ? isSvar
                  ? svarMotebehovSMResponseFixture
                  : meldMotebehovSMResponseFixture
                : isSvar
                  ? svarMotebehovAGOutputFixture
                  : meldMotebehovAGOutputFixture,
          },
        });
        expect(untouched?.motebehov.motebehov).toBeNull();
        expect(global._mockDb[otherSessionId].motebehovSM.motebehov).toBeNull();
        expect(global._mockDb[otherSessionId].motebehovAG.motebehov).toBeNull();
        expect(
          getMockSetupForScenario(scenario).motebehovSM.motebehov,
        ).toBeNull();
        expect(
          getMockSetupForScenario(scenario).motebehovAG.motebehov,
        ).toBeNull();
      },
    );
  },
);
