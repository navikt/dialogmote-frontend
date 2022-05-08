import { union, object, literal, boolean, string, z } from "zod";

const skjemaType = union([literal("MELD_BEHOV"), literal("SVAR_BEHOV")]);

const motebehovSvar = object({
  harMotebehov: boolean(),
  forklaring: string().optional(),
});

const motebehov = object({
  id: string(),
  opprettetDato: string(),
  aktorId: string(),
  opprettetAv: string(),
  arbeidstakerFnr: string(),
  virksomhetsnummer: string(),
  motebehovSvar: motebehovSvar,
  tildeltEnhet: string().optional(),
  behandletTidspunkt: string().optional(),
  behandletVeilederIdent: string().optional(),
  skjemaType: skjemaType.optional(),
});

export const motebehovSchema = object({
  visMotebehov: boolean(),
  skjemaType: skjemaType.nullish(),
  motebehov: motebehov.nullish(),
});

export type MotebehovDTO = z.infer<typeof motebehovSchema>;
export type MotebehovDataDTO = z.infer<typeof motebehov>;
export type MotebehovSkjemaTypeDTO = z.infer<typeof skjemaType>;
