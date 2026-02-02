import type { NextApiRequest } from "next";
import { TEST_SESSION_ID } from "@/common/api/fetch";
import type { MotebehovStatusDTO } from "@/server/service/schema/motebehovSchema";
import type { SykmeldtDTO } from "@/server/service/schema/sykmeldtSchema";
import type { Brev } from "@/types/shared/brev";
import { handleQueryParamError } from "../../utils/errors";
import activeMockData, { getMockSetupForScenario } from "./activeMockData";

export type TestScenario =
  | "MELD_BEHOV"
  | "SVAR_BEHOV"
  | "DIALOGMOTE_INNKALLING"
  | "DIALOGMOTE_ENDRET"
  | "DIALOGMOTE_AVLYST"
  | "PILOT_BRUKER";

export interface MockPerson {
  pilotUser: boolean;
}

export interface MockSetup {
  sykmeldt?: SykmeldtDTO; //For arbeidsgiver
  brev: Brev[];
  motebehov: MotebehovStatusDTO;
  activeTestScenario: TestScenario;
  person: MockPerson;
}

declare global {
  var _mockDb: { [key: string]: MockSetup };
}

/**
 * Whenever next.js hot-reloads, a new mock DB instance was created, meaning
 * that mutations were not persisted. Putting the MockDB on the global object
 * fixes this, but that only needs to be done when we are developing locally.
 */
global._mockDb = global._mockDb || { "123": activeMockData };

export function assignNewDbSetup(newSetup: MockSetup, sessionId: string): void {
  global._mockDb[sessionId] = newSetup;
}

const getMockDb = (req: NextApiRequest): MockSetup => {
  const sessionId = req.headers[TEST_SESSION_ID];

  if (typeof sessionId !== "string") {
    return handleQueryParamError(sessionId);
  }

  // global._mockDb = new FakeMockDB();
  let storedSetup = global._mockDb[sessionId];

  if (!storedSetup) {
    assignNewDbSetup(getMockSetupForScenario("MELD_BEHOV"), sessionId);
    storedSetup = global._mockDb[sessionId];
  }

  return storedSetup;
};

export default getMockDb;
