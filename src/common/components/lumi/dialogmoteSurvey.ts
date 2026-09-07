import type { SurveyDocumentV1 } from "@navikt/lumi-survey";

export const survey = {
  authoringSchemaVersion: 1,
  intro: {
    body: "Vi vil gjerne høre om erfaringene dine. Undersøkelsen tar omtrent to minutter. Ikke skriv navn, diagnose eller andre personopplysninger.",
    title: "Hjelp oss å gjøre dialogmøte 1 enklere og mer nyttig",
  },
  pages: [
    {
      id: "opplevelse",
      questions: [
        {
          description:
            "Dialogmøte 1 er en samtale mellom arbeidsgiveren og den sykmeldte om arbeid og tilrettelegging",
          id: "rating",
          options: [
            {
              label: "Jeg har gjennomført dialogmøte 1 det siste året",
              value: "alternativ-1",
            },
            {
              label:
                "Jeg har fulgt opp en ellere flere sykmeldte, men ikke gjennomført dialogmøte 1",
              value: "alternativ-2",
            },
            {
              label:
                "Jeg har ikke hatt ansvar for sykefraværsoppfølging det siste året",
              value: "alternativ-3",
            },
            {
              label: "Jeg er usikker på hva dialogmøte 1 er",
              value: "alternativ-4",
            },
          ],
          prompt:
            "Vi vil gjerne høre om erfaringene dine med dialogmøte 1. Hvilket alternativ passer best for deg?",
          required: true,
          type: "singleChoice",
        },
      ],
    },
    {
      id: "side-baf08e9d-931a-4462-b362-e219e62dede3",
      questions: [
        {
          id: "singleChoice-98faaf8d",
          options: [
            {
              label: "Ikke i det hele tatt",
              value: "alternativ-1",
            },
            {
              label: "I liten grad",
              value: "alternativ-2",
            },
            {
              label: "I noen grad",
              value: "alternativ-3",
            },
            {
              label: "I stor grad",
              value: "alternativ-4",
            },
            {
              label: "I svært stor grad",
              value: "alternativ-5",
            },
            {
              label: "Vet ikke ",
              value: "alternativ-6",
            },
          ],
          prompt:
            "I hvilken grad bidro dialogmøtet til en tydelig plan for den videre oppfølgingen?",
          required: false,
          type: "singleChoice",
          visibleIf: {
            operator: "EQ",
            questionId: "rating",
            value: "alternativ-1",
          },
        },
      ],
    },
    {
      id: "side-b4ecfabb-5771-4484-b44f-ef536362bf35",
      questions: [
        {
          id: "singleChoice-00b6e908",
          options: [
            {
              label:
                "Den ansatte var tilbake eller forventet å komme raskt tilbake",
              value: "alternativ-1",
            },
            {
              label: "Den ansattes situasjon gjorde at et møte ikke passet",
              value: "alternativ-2",
            },
            {
              label: "Vi fulgte opp den ansatte gjennom andre samtaler",
              value: "alternativ-3",
            },
            {
              label:
                "Jeg var usikker på om eller når møtet skulle gjennomføres",
              value: "alternativ-4",
            },
            {
              label: "Praktiske forhold gjorde det vanskelig",
              value: "alternativ-5",
            },
            {
              label: "Annet",
              value: "alternativ-6",
            },
          ],
          prompt:
            "Hva var den viktigste grunnen til at dialogmøtet ikke ble gjennomført?",
          type: "multiChoice",
          visibleIf: {
            operator: "EQ",
            questionId: "rating",
            value: "alternativ-2",
          },
        },
      ],
    },
    {
      id: "side-0920e8b7-a2b1-428b-b833-0c34d5e53bc3",
      questions: [
        {
          description: "Ikke skriv navn eller andre personopplysninger",
          id: "text-24e51a2d",
          maxLength: 1000,
          minRows: 4,
          prompt: "Beskriv årsaken til at dialogmøte 1 ikke ble gjennomført ",
          type: "text",
          visibleIf: {
            operator: "CONTAINS",
            questionId: "singleChoice-00b6e908",
            value: "alternativ-6",
          },
        },
      ],
    },
    {
      id: "side-366ac955-8d3d-45a6-8701-04816f9e3e4b",
      questions: [
        {
          id: "singleChoice-524e7a4b",
          maxSelections: 2,
          options: [
            {
              label: "En tydelig forklaring på når møtet skal gjennomføres",
              value: "alternativ-1",
            },
            {
              label: "En oversikt over arbeidsgiverens og den ansattes ansvar",
              value: "alternativ-2",
            },
            {
              label: "En sjekkliste til forberedelsene",
              value: "alternativ-3",
            },
            {
              label: "Forslag til spørsmål jeg kan bruke i samtalen",
              value: "alternativ-4",
            },
            {
              label: "Veiledning om arbeidsevne uten å spørre om diagnose",
              value: "alternativ-5",
            },
            {
              label: "Eksempler på muligheter for tilrettelegging",
              value: "alternativ-6",
            },
            {
              label: "En enkel måte å samle avtaler og neste steg på",
              value: "alternativ-7",
            },
            {
              label: "Jeg trenger ikke mer støtte",
              value: "alternativ-8",
            },
            {
              label: "Annet",
              value: "alternativ-9",
            },
          ],
          prompt:
            "Hva kunne gjort det enklere for deg å vurdere eller gjennomføre dialogmøte 1? ",
          type: "multiChoice",
          visibleIf: {
            operator: "EXISTS",
            questionId: "singleChoice-00b6e908",
          },
        },
      ],
    },
    {
      id: "side-9df54f3a-99a1-4a51-900f-b6751ab8c30a",
      questions: [
        {
          description: "Ikke skriv navn eller andre personopplysninger",
          id: "text-c49493a9",
          maxLength: 1000,
          minRows: 4,
          prompt: "Hva kunne hjulpet deg?  ",
          type: "text",
          visibleIf: {
            operator: "CONTAINS",
            questionId: "singleChoice-524e7a4b",
            value: "alternativ-9",
          },
        },
      ],
    },
  ],
  success: {
    body: "Svarene hjelper Nav med å forstå hvordan arbeidsgivere kan få bedre støtte før og under dialogmøte 1.",
    title: "Takk for at du svarte",
  },
  type: "rating",
} satisfies SurveyDocumentV1;

export const dialogmoteSurveyId = "dialogmote-1";
export const dialogmoteSurveyRevision = 3;
export { survey as dialogmoteSurvey };
