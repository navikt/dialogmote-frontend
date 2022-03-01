export type ExtMotebehovSkjemaType = "MELD_BEHOV" | "SVAR_BEHOV";

export interface ExtMotebehovSvar {
  harMotebehov: boolean;
  forklaring?: string;
}

export interface ExtMotebehov {
  id: string;
  opprettetDato: string;
  aktorId: string;
  opprettetAv: string;
  arbeidstakerFnr: string;
  virksomhetsnummer: string;
  motebehovSvar: ExtMotebehovSvar;
  tildeltEnhet?: string;
  behandletTidspunkt?: string;
  behandletVeilederIdent?: string;
  skjemaType?: ExtMotebehovSkjemaType;
}

export interface ExtMotebehovStatus {
  visMotebehov: boolean;
  skjemaType?: ExtMotebehovSkjemaType | null;
  motebehov?: ExtMotebehov | null;
}
