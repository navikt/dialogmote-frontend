export interface DialogMotebehovSvar {
  opprettetDato?: string;
  virksomhetsnummer?: string;
  harMotebehov?: boolean;
  forklaring?: string;
}

export interface DialogMotebehov {
  skjemaType?: "MELD_BEHOV" | "SVAR_BEHOV" | null;
  svar?: DialogMotebehovSvar;
}
