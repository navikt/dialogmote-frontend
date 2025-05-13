import { Motebehov } from "../../../../types/shared/motebehov";
import { MotebehovHarSvartPanel } from "@/common/components/motebehov/MotebehovHarSvartPanel";
import { BodyLong, Heading } from "@navikt/ds-react";
import { MotebehovSubmitButton } from "@/common/components/motebehov/MotebehovSubmitButton";
import DialogmotePanel from "@/common/components/panel/DialogmotePanel";
import React from "react";

const HvaErEtDialogmoteSM = () => {
  return (
    <>
      <Heading size={"medium"} level={"2"}>
        Hva er et dialogmøte?
      </Heading>

      <BodyLong>
        I dialogmøtet skal du, arbeidsgiveren og veilederen din i NAV sammen
        finne muligheter som kan bidra til at du får en best mulig
        arbeidshverdag ut fra din helsesituasjon. Målet er å lage en plan for å
        komme tilbake i jobb. Hvis det er behov, kan behandleren din også delta.
      </BodyLong>
    </>
  );
};

interface PanelProps {
  motebehov?: Motebehov;
}

export const MotebehovPanelSM = ({ motebehov }: PanelProps) => {
  if (!motebehov) return null;

  if (motebehov.svar) {
    return (
      <MotebehovHarSvartPanel
        motebehovSvar={motebehov.svar}
        skjemaType={motebehov.skjemaType}
      />
    );
  }

  if (motebehov.skjemaType === "MELD_BEHOV") {
    return (
      <DialogmotePanel>
        <HvaErEtDialogmoteSM />

        <Heading size={"medium"} level={"2"}>
          Når har man et dialogmøte?
        </Heading>

        <BodyLong>
          Innen du har vært sykmeldt i 6 måneder, kan du forvente at NAV
          vurderer om det skal gjennomføres et dialogmøte. Hvis du trenger et
          slikt møte før eller senere, kan du be om det nedenfor.
        </BodyLong>

        <MotebehovSubmitButton skjemaType={motebehov.skjemaType}>
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
          Når du har vært sykmeldt i 4 måneder ber vi deg og lederen din om å
          svare på om dere trenger et dialogmøte med NAV. Veilederen bruker
          svarene til å vurdere om møtet skal avholdes eller ikke.
        </BodyLong>

        <MotebehovSubmitButton skjemaType={motebehov.skjemaType}>
          Gå til tjenesten for å svare
        </MotebehovSubmitButton>

        <HvaErEtDialogmoteSM />
      </DialogmotePanel>
    );
  }
};
