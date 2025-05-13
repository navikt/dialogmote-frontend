import {
  FormSnapshotRequestDto,
  FormSnapshotResponseDto,
} from "@/server/service/schema/formSnapshotSchema";
import { MotebehovSkjemaTypeDTO } from "@/server/service/schema/motebehovSchema";

export type MotebehovSkjemaType = MotebehovSkjemaTypeDTO;

export interface MotebehovSvar {
  opprettetDato: string;
  virksomhetsnummer: string;
  harMotebehov: boolean;
  formSnapshot: FormSnapshotResponseDto | null;
}

export interface Motebehov {
  skjemaType: MotebehovSkjemaType;
  svar: MotebehovSvar | null;
}

export type MotebehovSvarRequest = {
  harMotebehov: boolean;
  formSnapshot: FormSnapshotRequestDto;
};

export type MotebehovSvarRequestAG = {
  arbeidstakerFnr: string;
  virksomhetsnummer: string;
  formSubmission: MotebehovSvarRequest;
};
