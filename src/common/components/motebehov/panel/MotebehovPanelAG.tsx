import { Motebehov } from "../../../../types/shared/motebehov";
import { MotebehovHarSvartPanel } from "@/common/components/motebehov/MotebehovHarSvartPanel";
import { DelOppfolgingsplanInfoBoks } from "@/common/components/motebehov/DelOppfolgingsplanInfoBoks";
import React from "react";
import { BodyLong, Heading } from "@navikt/ds-react";
import { MotebehovSubmitButton } from "@/common/components/motebehov/MotebehovSubmitButton";
import DialogmotePanel from "@/common/components/panel/DialogmotePanel";

const HvaErEtDialogmoteAG = () => {
  return (
    <>
      <Heading size={"medium"} level={"2"}>
        Hva er et dialogmøte?
      </Heading>

      <BodyLong>
        I dialogmøtet skal du, arbeidstakeren din og en veileder fra NAV sammen
        finne muligheter som kan bidra til at arbeidstakeren får en best mulig
        arbeidshverdag ut fra sin helsesituasjon. Målet er å lage en plan for å
        komme tilbake i jobb.
      </BodyLong>
    </>
  );
};

interface PanelProps {
  motebehov?: Motebehov;
}

export const MotebehovPanelAG = ({ motebehov }: PanelProps) => {
  if (!motebehov) return null;

  if (motebehov.svar) {
    return (
      <MotebehovHarSvartPanel motebehov={motebehov}>
        <DelOppfolgingsplanInfoBoks />
      </MotebehovHarSvartPanel>
    );
  }

  if (motebehov.skjemaType === "MELD_BEHOV") {
    return (
      <DialogmotePanel>
        <HvaErEtDialogmoteAG />

        <Heading size={"medium"} level={"2"}>
          Når har man et dialogmøte?
        </Heading>

        <BodyLong>
          Innen arbeidstakeren har vært sykmeldt i 6 måneder, kan du forvente at
          NAV vurderer om det skal gjennomføres et dialogmøte. Hvis du trenger
          et slikt møte før eller senere, kan du be om det nedenfor.
        </BodyLong>

        <MotebehovSubmitButton skjemaType={"MELD_BEHOV"}>
          Gå til tjenesten for å be om dialogmøte
        </MotebehovSubmitButton>
      </DialogmotePanel>
    );
  } else {
    return (
      <DialogmotePanel>
        <Heading size={"medium"} level={"2"}>
          Har du fått beskjed om å svare på behov for dialogmøte?
        </Heading>

        <BodyLong>
          Når arbeidstakeren din har vært sykmeldt i 4 måneder ber vi dere om å
          svare på om dere trenger et dialogmøte med NAV. Veilederen bruker
          svarene til å vurdere om møtet skal avholdes eller ikke.
        </BodyLong>

        <MotebehovSubmitButton skjemaType={"SVAR_BEHOV"}>
          Gå til tjenesten for å svare
        </MotebehovSubmitButton>

        <HvaErEtDialogmoteAG />
      </DialogmotePanel>
    );
  }
};
