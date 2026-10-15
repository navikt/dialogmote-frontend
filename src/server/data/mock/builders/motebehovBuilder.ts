import type {
  MotebehovDataDTO,
  MotebehovSkjemaTypeDTO,
  MotebehovStatusDTO,
} from "@/server/service/schema/motebehovSchema";

export class MotebehovBuilder {
  private readonly motebehov: MotebehovStatusDTO;

  constructor() {
    this.motebehov = {
      visMotebehov: false,
      skjemaType: "MELD_BEHOV",
      motebehov: null,
    };
  }

  withSkjematype(skjemaType: MotebehovSkjemaTypeDTO): MotebehovBuilder {
    this.motebehov.skjemaType = skjemaType;
    return this;
  }

  withMotebehov(motebehov: MotebehovDataDTO): MotebehovBuilder {
    this.motebehov.motebehov = motebehov;
    return this;
  }

  withVisMotebehov(vis: boolean): MotebehovBuilder {
    this.motebehov.visMotebehov = vis;
    return this;
  }

  withSubmittedMotebehov(): MotebehovBuilder {
    return this.withMotebehov({
      id: "synthetic-motebehov-id",
      opprettetDato: "2026-10-06T12:00:00.000Z",
      aktorId: "synthetic-aktor-id",
      arbeidstakerFnr: "synthetic-arbeidstaker",
      virksomhetsnummer: "000111222",
      behandletTidspunkt: null,
      behandletVeilederIdent: null,
      tildeltEnhet: null,
      opprettetAv: "synthetic-innmelder",
      skjemaType: this.motebehov.skjemaType,
      innmelderType: "ARBEIDSTAKER",
      formValues: {
        harMotebehov: true,
        formSnapshot: null,
      },
    });
  }

  build(): MotebehovStatusDTO {
    return this.motebehov;
  }
}
