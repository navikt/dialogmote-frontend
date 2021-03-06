import React from "react";
import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import { DialogReport } from "@navikt/ds-icons";
import { InfoOmDialogmote } from "@/common/components/motebehov/InfoOmDialogmote";
import { MotebehovSubmitButton } from "@/common/components/motebehov/MotebehovSubmitButton";
import { Motebehov } from "types/shared/motebehov";

const texts = {
  titleTrengerMote: "Trenger dere et dialogmøte med NAV?",
};

interface Props {
  motebehov?: Motebehov;
}

const MotebehovHarIkkeSvartPanel = ({ motebehov }: Props) => {
  if (motebehov && !motebehov.svar) {
    return (
      <DialogmotePanel title={texts.titleTrengerMote} icon={<DialogReport />}>
        <InfoOmDialogmote />
        <MotebehovSubmitButton skjemaType={motebehov.skjemaType} />
      </DialogmotePanel>
    );
  }
  return null;
};

export default MotebehovHarIkkeSvartPanel;
