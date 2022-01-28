export interface Organisasjonsinformasjon {
  orgnummer: string;
  orgNavn: string;
}

export interface Sykmeldingsperiode {
  fom: string;
  tom: string;
}

export interface Sykmelding {
  id: string;
  sykmeldingsperioder: Sykmeldingsperiode[];
  organisasjonsinformasjon: Organisasjonsinformasjon;
}
