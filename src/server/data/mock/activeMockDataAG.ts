import { sykmeldtMock } from "@/server/data/mock/sykmeldt/sykmeldte";
import isDialogmoteMockSetup1AG from "@/server/data/mock/brev/isDialogmoteMockSetup1AG";
import { Brev } from "@/server/data/types/external/BrevTypes";
import { MotebehovStatus } from "@/server/data/types/external/MotebehovTypes";
import { Sykmeldt } from "@/server/data/types/external/SykmeldteTypes";
import { mockSyfomotebehovAG } from "@/server/data/mock/motebehov/mockSyfomotebehovAG";

interface IActiveMockDataAG {
  brev: Brev[];
  motebehov: MotebehovStatus;
  sykmeldt: Sykmeldt;
}

const meldBehovIkkeSvartSetup: IActiveMockDataAG = {
  brev: [],
  motebehov: mockSyfomotebehovAG("MELD_BEHOV", false),
  sykmeldt: sykmeldtMock,
};

const meldBehovHarSvartSetup: IActiveMockDataAG = {
  brev: [],
  motebehov: mockSyfomotebehovAG("MELD_BEHOV", true),
  sykmeldt: sykmeldtMock,
};

const svarBehovIkkeSvartSetup: IActiveMockDataAG = {
  brev: [],
  motebehov: mockSyfomotebehovAG("SVAR_BEHOV", false),
  sykmeldt: sykmeldtMock,
};

const svarBehovHarSvartSetup: IActiveMockDataAG = {
  brev: [],
  motebehov: mockSyfomotebehovAG("SVAR_BEHOV", true),
  sykmeldt: sykmeldtMock,
};

const moteInnkallingSetup: IActiveMockDataAG = {
  brev: isDialogmoteMockSetup1AG,
  motebehov: mockSyfomotebehovAG("MELD_BEHOV", false),
  sykmeldt: sykmeldtMock,
};

export default moteInnkallingSetup;
