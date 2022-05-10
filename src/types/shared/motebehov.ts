import { MotebehovSkjemaTypeDTO } from "@/server/service/schema/motebehovSchema";

export type MotebehovSkjemaType = MotebehovSkjemaTypeDTO;

export interface MotebehovSvar {
  opprettetDato: string;
  virksomhetsnummer: string;
  harMotebehov: boolean;
  forklaring: string | null;
}

export interface Motebehov {
  skjemaType: MotebehovSkjemaType;
  svar: MotebehovSvar | null;
}
