import { union, object, literal, boolean, string, z, array } from "zod";

const documentComponentType = union([
  literal("HEADER"),
  literal("HEADER_H1"),
  literal("HEADER_H2"),
  literal("PARAGRAPH"),
  literal("LINK"),
]);

const svarType = union([
  literal("KOMMER"),
  literal("NYTT_TID_STED"),
  literal("KOMMER_IKKE"),
]);

const brevType = union([
  literal("INNKALT"),
  literal("AVLYST"),
  literal("NYTT_TID_STED"),
  literal("REFERAT"),
  literal("REFERAT_ENDRET"),
]);

const documentComponentKey = union([
  literal("IKKE_BEHOV"),
  literal("FRISKMELDING_ARBEIDSFORMIDLING"),
  literal("AVKLARING_ARBEIDSEVNE"),
  literal("OPPFOLGINGSTILTAK"),
  literal("ARBEIDSRETTET_REHABILITERING"),
  literal("OPPLAERING_UTDANNING"),
  literal("UNNTAK_ARBEIDSGIVERPERIODE"),
  literal("REISETILSKUDD"),
  literal("HJELPEMIDLER_TILRETTELEGGING"),
  literal("MIDLERTIDIG_LONNSTILSKUDD"),
  literal("OKONOMISK_STOTTE"),
  literal("INGEN_RETTIGHETER"),
]);

const documentComponent = object({
  type: documentComponentType,
  key: documentComponentKey.optional(),
  title: string().optional(),
  texts: array(string()),
});

const svar = object({
  svarTidspunkt: string(),
  svarType: svarType,
  svarTekst: string().optional(),
});

export const brevSchema = object({
  uuid: string(),
  deltakerUuid: string(),
  createdAt: string(),
  brevType: brevType,
  digitalt: boolean(),
  lestDato: string().optional(),
  fritekst: string(),
  sted: string(),
  tid: string(),
  videoLink: string().optional(),
  document: array(documentComponent),
  virksomhetsnummer: string(),
  svar: svar.optional(),
});

export type BrevDTO = z.infer<typeof brevSchema>;
export type BrevTypeDTO = z.infer<typeof brevType>;
export type BrevDocumentComponentDTO = z.infer<typeof documentComponent>;
export type BrevDocumentComponentTypeDTO = z.infer<
  typeof documentComponentType
>;
export type BrevDocumentComponentKeyDTO = z.infer<typeof documentComponentKey>;
