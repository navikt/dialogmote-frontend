import {
  MotebehovSkjemaType,
  MotebehovStatus,
} from "@/common/api/types/motebehovTypes";

export const mockSyfomotebehovSM = (
  type: MotebehovSkjemaType,
  harSvart: boolean
): MotebehovStatus => {
  switch (type) {
    case "MELD_BEHOV": {
      if (harSvart) {
        return {
          visMotebehov: true,
          skjemaType: "MELD_BEHOV",
          motebehov: {
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
          },
        };
      }
      return {
        visMotebehov: true,
        skjemaType: "MELD_BEHOV",
        motebehov: null,
      };
    }
    case "SVAR_BEHOV": {
      if (harSvart) {
        return {
          visMotebehov: true,
          skjemaType: "SVAR_BEHOV",
          motebehov: {
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
          },
        };
      }
      return {
        visMotebehov: true,
        skjemaType: "SVAR_BEHOV",
        motebehov: null,
      };
    }
    default: {
      return {
        visMotebehov: false,
        skjemaType: null,
        motebehov: null,
      };
    }
  }
};
