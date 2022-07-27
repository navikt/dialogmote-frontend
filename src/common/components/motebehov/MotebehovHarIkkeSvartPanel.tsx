import { BodyLong } from "@navikt/ds-react";
import React from "react";
import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import { DialogReport } from "@navikt/ds-icons";
import { MotebehovSubmitButton } from "@/common/components/motebehov/MotebehovSubmitButton";
import { Motebehov } from "types/shared/motebehov";

const texts = {
  titleTrengerMote: "Trenger dere et dialogmøte med NAV?",
  infoOmDialogmote: `I et dialogmøte oppsummerer vi hva som har skjedd mens du har vært sykmeldt, og vi planlegger veien videre. De som deltar, er du, lederen din og en veileder fra NAV-kontoret, eventuelt også den som sykmelder deg.`,
};

interface Props {
  motebehov?: Motebehov;
}

const MotebehovHarIkkeSvartPanel = ({ motebehov }: Props) => {
  if (motebehov && !motebehov.svar) {
    return (
      <DialogmotePanel title={texts.titleTrengerMote} icon={<DialogReport />}>
        <BodyLong>{texts.infoOmDialogmote}</BodyLong>
        <MotebehovSubmitButton skjemaType={motebehov.skjemaType} />
      </DialogmotePanel>
    );
  }
  return null;
};

export default MotebehovHarIkkeSvartPanel;
