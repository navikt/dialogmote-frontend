import {
  FormSnapshotInputDto,
  FormSnapshotOutputDto,
} from "@/server/service/schema/formSnapshotSchema";
import { MotebehovSkjemaTypeDTO } from "@/server/service/schema/motebehovSchema";

export type MotebehovSkjemaType = MotebehovSkjemaTypeDTO;

export interface MotebehovSvar {
  opprettetDato: string;
  virksomhetsnummer: string;
  harMotebehov: boolean;
  formSnapshot: FormSnapshotOutputDto | null;
}

export interface Motebehov {
  skjemaType: MotebehovSkjemaType;
  svar: MotebehovSvar | null;
}

export type MotebehovSvarRequest = {
  harMotebehov: boolean;
  formSnapshot: FormSnapshotInputDto;
};

export type MotebehovSvarRequestAG = {
  arbeidstakerFnr: string;
  virksomhetsnummer: string;
  formSubmission: MotebehovSvarRequest;
};
