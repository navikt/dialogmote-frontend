import { Brev } from "@/common/api/types/brevTypes";
import { MotebehovStatus } from "@/common/api/types/motebehovTypes";
import { mockSyfomotebehovAG } from "@/server/data/mock/Motebehov/mockSyfomotebehovAG";

interface IActiveMockDataAG {
  brev: Brev[];
  motebehov: MotebehovStatus;
}

const meldBehovIkkeSvartSetup: IActiveMockDataAG = {
  brev: [],
  motebehov: mockSyfomotebehovAG("MELD_BEHOV", false),
};

const meldBehovHarSvartSetup: IActiveMockDataAG = {
  brev: [],
  motebehov: mockSyfomotebehovAG("MELD_BEHOV", true),
};

const svarBehovIkkeSvartSetup: IActiveMockDataAG = {
  brev: [],
  motebehov: mockSyfomotebehovAG("SVAR_BEHOV", false),
};

const svarBehovHarSvartSetup: IActiveMockDataAG = {
  brev: [],
  motebehov: mockSyfomotebehovAG("SVAR_BEHOV", true),
};

export default meldBehovIkkeSvartSetup;
