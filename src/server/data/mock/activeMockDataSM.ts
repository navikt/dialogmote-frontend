import { Brev } from "@/common/api/types/brevTypes";
import { MotebehovStatus } from "@/common/api/types/motebehovTypes";
import { mockSyfomotebehovSM } from "@/server/data/mock/Motebehov/mockSyfomotebehovSM";

interface IActiveMockDataSM {
  brev: Brev[];
  motebehov: MotebehovStatus;
}

const meldBehovIkkeSvartSetup: IActiveMockDataSM = {
  brev: [],
  motebehov: mockSyfomotebehovSM("MELD_BEHOV", false),
};

const meldBehovHarSvartSetup: IActiveMockDataSM = {
  brev: [],
  motebehov: mockSyfomotebehovSM("MELD_BEHOV", true),
};

const svarBehovIkkeSvartSetup: IActiveMockDataSM = {
  brev: [],
  motebehov: mockSyfomotebehovSM("SVAR_BEHOV", false),
};

const svarBehovHarSvartSetup: IActiveMockDataSM = {
  brev: [],
  motebehov: mockSyfomotebehovSM("SVAR_BEHOV", true),
};

export default svarBehovIkkeSvartSetup;
