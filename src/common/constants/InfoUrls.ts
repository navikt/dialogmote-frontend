import { DocumentComponentKey } from "types/client/brev";
import { InfoUrl } from "types/client/infoUrl";

export const infoUrls: Record<DocumentComponentKey, InfoUrl | undefined> = {
  FRISKMELDING_ARBEIDSFORMIDLING: {
    key: "FRISKMELDING_ARBEIDSFORMIDLING",
    text: "Les mer om friskmelding til arbeidsformidling",
    url: "www.nav.no/no/person/arbeid/sykmeldt-arbeidsavklaringspenger-og-yrkesskade/nynorsk/friskmelding-til-arbeidsformidling-nynorsk",
  },
  AVKLARING_ARBEIDSEVNE: {
    key: "AVKLARING_ARBEIDSEVNE",
    text: "Les mer om avklaring av arbeidsevnen",
    url: "https://www.nav.no/no/person/arbeid/oppfolging-og-tiltak-for-a-komme-i-jobb/tiltak-for-a-komme-i-jobb/avklaring",
  },
  OPPFOLGINGSTILTAK: {
    key: "OPPFOLGINGSTILTAK",
    text: "Les mer om oppfølging",
    url: "https://www.nav.no/no/person/arbeid/oppfolging-og-tiltak-for-a-komme-i-jobb/tiltak-for-a-komme-i-jobb/oppfolging",
  },
  OPPLAERING_UTDANNING: {
    key: "OPPLAERING_UTDANNING",
    text: "Les mer om opplæring og utdanning",
    url: "https://www.nav.no/no/person/arbeid/oppfolging-og-tiltak-for-a-komme-i-jobb/tiltak-for-a-komme-i-jobb/opplaering",
  },
  UNNTAK_ARBEIDSGIVERPERIODE: {
    key: "UNNTAK_ARBEIDSGIVERPERIODE",
    text: "Les mer om sykepenger for kronisk syke",
    url: "https://www.nav.no/no/Bedrift/Oppfolging/Sykmeldt+arbeidstaker/Sykepenger/kronisk-syk-arbeidstaker",
  },
  REISETILSKUDD: {
    key: "REISETILSKUDD",
    text: "Les mer om reisetilskudd",
    url: "https://www.nav.no/no/person/arbeid/sykmeldt-arbeidsavklaringspenger-og-yrkesskade/sykmelding-ulike-former/reisetilskudd",
  },
  HJELPEMIDLER_TILRETTELEGGING: {
    key: "HJELPEMIDLER_TILRETTELEGGING",
    text: "Les mer om hjelpemidler og tilrettelegging",
    url: "https://www.nav.no/no/person/hjelpemidler/hjelpemidler-og-tilrettelegging/tilrettelegging/arbeid-og-utdanning",
  },
  MIDLERTIDIG_LONNSTILSKUDD: {
    key: "MIDLERTIDIG_LONNSTILSKUDD",
    text: "Les mer om midlertidig lønnstilskudd",
    url: "https://www.nav.no/no/person/arbeid/oppfolging-og-tiltak-for-a-komme-i-jobb/tiltak-for-a-komme-i-jobb/tilskudd-til-lonnsutgifter/tidsbegrenset-lonnstilskudd",
  },
  INGEN_RETTIGHETER: {
    key: "INGEN_RETTIGHETER",
    text: "Se etter stillinger på arbeidsplassen.nav.no",
    url: "https://arbeidsplassen.nav.no/",
  },
  ARBEIDSRETTET_REHABILITERING: {
    key: "ARBEIDSRETTET_REHABILITERING",
    text: "Les mer om arbeidsrettet rehabilitering",
    url: "https://www.nav.no/no/person/arbeid/oppfolging-og-tiltak-for-a-komme-i-jobb/tiltak-for-a-komme-i-jobb/arbeidsrettet-rehabilitering",
  },
  IKKE_BEHOV: undefined,
  OKONOMISK_STOTTE: undefined,
};
