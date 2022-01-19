import { Brev } from "@/common/api/types/brevTypes";
import { MotebehovStatus } from "@/common/api/types/motebehovTypes";
import { mockSyfomotebehovAG } from "@/server/data/mock/Motebehov/mockSyfomotebehovAG";
import { Sykmeldt } from "@/common/api/types/sykmeldteTypes";
import { sykmeldtMock } from "@/server/data/mock/sykmeldt/sykmeldte";

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

export default meldBehovIkkeSvartSetup;
