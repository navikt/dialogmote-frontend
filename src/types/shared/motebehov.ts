import { MotebehovSkjemaTypeDTO } from "@/server/service/schema/motebehovSchema";

import { FormSnapshotDto } from "./form";

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

export type MotebehovSvarRequest = {
  harMotebehov: boolean;
  formSnapshot: FormSnapshotDto;
};

export type MotebehovSvarRequestAG = {
  arbeidstakerFnr: string;
  virksomhetsnummer: string;
  formSubmission: MotebehovSvarRequest;
};
