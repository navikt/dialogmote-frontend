import { dialogmoteAvlystScenario } from "@/server/data/mock/testscenarios/dialogmote/dialogmoteAvlystScenario";
import { dialogmoteEndretScenario } from "@/server/data/mock/testscenarios/dialogmote/dialogmoteEndretScenario";
import { dialogmoteEndretV2Scenario } from "@/server/data/mock/testscenarios/dialogmote/dialogmoteEndretV2Scenario";
import { dialogmoteInnkallingScenario } from "@/server/data/mock/testscenarios/dialogmote/dialogmoteInnkallingScenario";
import { meldbehovScenario } from "@/server/data/mock/testscenarios/meldbehov/meldbehovScenario";
import { svarbehovScenario } from "@/server/data/mock/testscenarios/svarbehov/svarbehovScenario";
import type { MockSetup, TestScenario } from "./getMockDb";

const activeMockData: MockSetup = { ...meldbehovScenario };

export const getMockSetupForScenario = (scenario: TestScenario) => {
  switch (scenario) {
    case "MELD_BEHOV":
      return meldbehovScenario;
    case "SVAR_BEHOV":
      return svarbehovScenario;
    case "DIALOGMOTE_INNKALLING":
      return dialogmoteInnkallingScenario;
    case "DIALOGMOTE_ENDRET":
      return dialogmoteEndretScenario;
    case "DIALOGMOTE_ENDRET_V2":
      return dialogmoteEndretV2Scenario;
    case "DIALOGMOTE_AVLYST":
      return dialogmoteAvlystScenario;
  }
};

export default activeMockData;
