import { MotebehovSkjemaTypeDTO } from "@/server/service/schema/motebehovSchema";
import { FormSnapshotDto } from "@/common/utils/formRequestUtils";

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
  forklaring?: string;
};

export type MotebehovFormSubmissionDTO = {
  harMotebehov: boolean;
  formSnapshot: FormSnapshotDto;
};

export type MotebehovSvarRequestAG = {
  arbeidstakerFnr: string;
  virksomhetsnummer: string;
  formSubmission: MotebehovFormSubmissionDTO;
};
