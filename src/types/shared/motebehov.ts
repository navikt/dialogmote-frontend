import { MotebehovSkjemaTypeDTO } from "@/server/service/schema/motebehovSchema";

export type MotebehovSkjemaType = MotebehovSkjemaTypeDTO;

export interface MotebehovSvar {
  opprettetDato?: string;
  virksomhetsnummer?: string;
  harMotebehov?: boolean;
  forklaring?: string;
}

export interface Motebehov {
  skjemaType: MotebehovSkjemaType;
  svar?: MotebehovSvar;
}
