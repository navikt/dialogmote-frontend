import type { DialogmoteData } from "@/types/shared/dialogmote";
import { mapBrevData } from "@/server/data/common/mapBrevData";
import { mapMotebehov } from "@/server/data/common/mapMotebehov";
import type { BrevDTO } from "@/server/service/schema/brevSchema";
import type { MotebehovStatusDTO } from "@/server/service/schema/motebehovSchema";
import type { SykmeldtDTO } from "@/server/service/schema/sykmeldtSchema";

export const mapDialogmoteDataAG = (
  motebehovStatus: MotebehovStatusDTO,
  sykmeldt: SykmeldtDTO,
  brevArray?: BrevDTO[],
): DialogmoteData => {
  const {
    latestBrev,
    isLatestBrevOngoingMoteinnkalling,
    isLatestBrevReferat,
    referater,
  } = mapBrevData(brevArray);
  const motebehov =
    sykmeldt.aktivSykmelding !== false
      ? mapMotebehov(motebehovStatus, isLatestBrevOngoingMoteinnkalling)
      : undefined;

  return {
    motebehov,
    moteinnkalling: !isLatestBrevReferat ? latestBrev : undefined,
    referater,
    sykmeldt,
  };
};
