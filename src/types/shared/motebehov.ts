import { MotebehovSkjemaTypeDTO } from "@/server/service/schema/motebehovSchema";

export type MotebehovSkjemaType = MotebehovSkjemaTypeDTO;

export interface MotebehovSvar {
  opprettetDato: string;
  virksomhetsnummer: string;
  // TODO
  harMotebehov: boolean;
  forklaring: string | null;
}

export interface Motebehov {
  skjemaType: MotebehovSkjemaType;
  svar: MotebehovSvar | null;
}

export type MotebehovSvarRequest = {
  harMotebehov: boolean;
  // Men det er vel ikke sånn jeg vil gjøre det
  begrunnelse?: string;
  onskerAtBehandlerDeltar: boolean;
  onskerAtBehandlerDeltarBegrunnelse?: string;
  harBehovForTolk: boolean;
  hvaSlagsTolk?: string;
};

export type MotebehovSvarRequestAG = {
  arbeidstakerFnr: string;
  virksomhetsnummer: string;
  motebehovSvar: MotebehovSvarRequest;
};
