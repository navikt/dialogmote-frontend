import { Motebehov } from "@/common/api/types/motebehovTypes";

export const motebehovSvar: Motebehov = {
  aktorId: "123",
  id: "234",
  arbeidstakerFnr: "02020212345",
  opprettetAv: "",
  virksomhetsnummer: "000111222",
  motebehovSvar: {
    harMotebehov: true,
    forklaring:
      "Jeg ønsker at den som sykmelder meg, også skal delta i møtet (valgfri). Vondt i hodet",
  },
  opprettetDato: "2019-11-08T12:35:37.669+01:00",
};

export const svarMotebehovSvar: Motebehov = {
  aktorId: "123",
  id: "234",
  arbeidstakerFnr: "02020212345",
  opprettetAv: "",
  virksomhetsnummer: "000111222",
  motebehovSvar: {
    harMotebehov: true,
    forklaring: "Vondt i magen",
  },
  opprettetDato: "2019-11-08T12:35:37.669+01:00",
};
