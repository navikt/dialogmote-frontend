export interface ExtMotebehovSvar {
  harMotebehov: boolean;
  forklaring?: string;
}

export interface ExtMotebehovSvarArbeidsgiver {
  arbeidstakerFnr: string;
  virksomhetsnummer: string;
  motebehovSvar: ExtMotebehovSvar;
}
