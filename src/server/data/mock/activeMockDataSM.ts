import { Brev } from "@/server/data/types/external/BrevTypes";
import isDialogmoteMockSetup1SM from "@/server/data/mock/brev/isDialogmoteMockSetup1SM";
import { mockSyfomotebehovSM } from "@/server/data/mock/motebehov/mockSyfomotebehovSM";
import { MotebehovStatus } from "@/server/data/types/external/MotebehovTypes";

interface IActiveMockDataSM {
  isSykmeldt: boolean;
  brev: Brev[];
  motebehov: MotebehovStatus;
}

const meldBehovIkkeSvartSetup: IActiveMockDataSM = {
  isSykmeldt: true,
  brev: [],
  motebehov: mockSyfomotebehovSM("MELD_BEHOV", false),
};

const meldBehovHarSvartSetup: IActiveMockDataSM = {
  isSykmeldt: true,
  brev: [],
  motebehov: mockSyfomotebehovSM("MELD_BEHOV", true),
};

const svarBehovIkkeSvartSetup: IActiveMockDataSM = {
  isSykmeldt: true,
  brev: [],
  motebehov: mockSyfomotebehovSM("SVAR_BEHOV", false),
};

const svarBehovHarSvartSetup: IActiveMockDataSM = {
  isSykmeldt: true,
  brev: [],
  motebehov: mockSyfomotebehovSM("SVAR_BEHOV", true),
};

const moteInnkallingSetup: IActiveMockDataSM = {
  isSykmeldt: true,
  brev: isDialogmoteMockSetup1SM,
  motebehov: mockSyfomotebehovSM("MELD_BEHOV", false),
};

export default moteInnkallingSetup;
