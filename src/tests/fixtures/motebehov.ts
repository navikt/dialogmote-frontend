import { MotebehovDTO } from "@/server/service/schema/motebehovSchema";

export const createMotebehov = (
  motebehov?: Partial<MotebehovDTO>
): MotebehovDTO => {
  return {
    visMotebehov: true,
    skjemaType: "MELD_BEHOV",
    motebehov: {
      id: "id",
      opprettetDato: "2022-03-11T10:55:37.290043",
      aktorId: "aktorId",
      arbeidstakerFnr: "12345678901",
      virksomhetsnummer: "virksomhetsnummer",
      tildeltEnhet: null,
      behandletTidspunkt: null,
      behandletVeilederIdent: null,
      opprettetAv: null,
      skjemaType: null,
      motebehovSvar: {
        harMotebehov: true,
        forklaring: null,
      },
    },
    ...motebehov,
  };
};
