import { union, object, literal, boolean, string, z } from "zod";
import { formSnapshotSchema } from "./formSnapshotSchema";

const skjemaType = union([literal("MELD_BEHOV"), literal("SVAR_BEHOV")]);

const innmelderType = union([literal("ARBEIDSTAKER"), literal("ARBEIDSGIVER")]);

const motebehovFormValues = object({
  harMotebehov: boolean(),
  formSnapshot: formSnapshotSchema.nullable(),
  // begrunnelse: string().nullable(),
  // onskerSykmelderDeltar: boolean().nullable(),
  // onskerSykmelderDeltarBegrunnelse: string().nullable(),
  // onskerTolk: boolean().nullable(),
  // tolkSprak: string().nullable(),
});

const motebehovWithFormValues = object({
  id: string(),
  opprettetDato: string(),
  aktorId: string(),
  opprettetAv: string(),
  arbeidstakerFnr: string(),
  virksomhetsnummer: string(),
  tildeltEnhet: string().nullable(),
  behandletTidspunkt: string().nullable(),
  behandletVeilederIdent: string().nullable(),
  skjemaType: skjemaType,
  innmelderType: innmelderType,
  formValues: motebehovFormValues,
});

export const motebehovSchema = object({
  visMotebehov: boolean(),
  skjemaType: skjemaType,
  motebehovWithFormValues: motebehovWithFormValues.nullable(),
});

export type MotebehovDTO = z.infer<typeof motebehovSchema>;
export type MotebehovDataDTO = z.infer<typeof motebehovWithFormValues>;
export type MotebehovSkjemaTypeDTO = z.infer<typeof skjemaType>;
