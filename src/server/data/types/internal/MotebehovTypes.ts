export type MotebehovSkjemaType = "MELD_BEHOV" | "SVAR_BEHOV";

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
