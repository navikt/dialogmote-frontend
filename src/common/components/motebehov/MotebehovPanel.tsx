import React from "react";
import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import { DialogReport } from "@navikt/ds-icons";
import { BodyLong } from "@navikt/ds-react";
import { Motebehov } from "@/server/data/types/internal/MotebehovTypes";
import { InfoOmDialogmote } from "@/common/components/motebehov/InfoOmDialogmote";
import { MotebehovSubmitButton } from "@/common/components/motebehov/MotebehovSubmitButton";
import { DelOppfolgingsplanInfoBoks } from "@/common/components/motebehov/DelOppfolgingsplanInfoBoks";
import { MotebehovSvarAccordion } from "@/common/components/motebehov/MotebehovSvarAccordion";

const texts = {
  titleTrengerMote: "Trenger dere et dialogmøte med NAV?",
  titleKvittering: "Du har svart på om du ønsker et møte",
  textSvart:
    "Vi vil bruke svaret ditt når vi vurderer om det er nødvendig med dialogmøte.",
};

interface Props {
  motebehov?: Motebehov;
}

const MotebehovPanel = ({ motebehov }: Props) => {
  if (motebehov) {
    if (motebehov.svar) {
      return (
        <DialogmotePanel title={texts.titleKvittering} icon={<DialogReport />}>
          <BodyLong>{texts.textSvart}</BodyLong>

          <MotebehovSvarAccordion motebehov={motebehov} />

          <DelOppfolgingsplanInfoBoks />
        </DialogmotePanel>
      );
    }

    return (
      <DialogmotePanel title={texts.titleTrengerMote} icon={<DialogReport />}>
        <InfoOmDialogmote />
        <MotebehovSubmitButton skjemaType={motebehov.skjemaType} />
      </DialogmotePanel>
    );
  }
  return null;
};

export default MotebehovPanel;
