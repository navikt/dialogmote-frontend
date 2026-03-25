import type { DialogmoteData } from "@/types/shared/dialogmote";
import { mapBrevData } from "@/server/data/common/mapBrevData";
import { mapMotebehov } from "@/server/data/common/mapMotebehov";
import type { BrevDTO } from "@/server/service/schema/brevSchema";
import type { MotebehovStatusDTO } from "@/server/service/schema/motebehovSchema";

export const mapDialogmoteDataSM = (
  motebehovStatus: MotebehovStatusDTO,
  brevArray?: BrevDTO[],
): DialogmoteData => {
  const {
    latestBrev,
    isLatestBrevOngoingMoteinnkalling,
    isLatestBrevReferat,
    referater,
  } = mapBrevData(brevArray);

  return {
    motebehov: mapMotebehov(
      motebehovStatus,
      isLatestBrevOngoingMoteinnkalling,
    ),
    moteinnkalling: !isLatestBrevReferat ? latestBrev : undefined,
    referater,
  };
};
