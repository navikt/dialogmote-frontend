import { MockSetup, TestScenario } from "./getMockDb";
import { meldbehovScenario } from "@/server/data/mock/testscenarios/meldbehov/meldbehovScenario";
import { svarbehovScenario } from "@/server/data/mock/testscenarios/svarbehov/svarbehovScenario";
import { dialogmoteInnkallingScenario } from "@/server/data/mock/testscenarios/dialogmote/dialogmoteInnkallingScenario";
import { dialogmoteEndretScenario } from "@/server/data/mock/testscenarios/dialogmote/dialogmoteEndretScenario";
import { dialogmoteAvlystScenario } from "@/server/data/mock/testscenarios/dialogmote/dialogmoteAvlystScenario";

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
    case "DIALOGMOTE_AVLYST":
      return dialogmoteAvlystScenario;
  }
};

export default activeMockData;
