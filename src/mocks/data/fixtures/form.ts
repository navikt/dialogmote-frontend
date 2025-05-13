import {
  FieldSnapshot,
  ResponseFieldSnapshot,
} from "@/server/service/schema/formSnapshotSchema";

export const meldMotebehovSMFixture: FieldSnapshot[] = [
  {
    fieldId: "begrunnelseText",
    fieldType: "TEXT",
    label: "Hvorfor ønsker du et dialogmøte? (Må fylles ut)",
    description:
      "Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse.",
    value: "Dette er en begrunnelse",
  },
  {
    fieldId: "onskerSykmelderDeltarCheckbox",
    fieldType: "CHECKBOX_SINGLE",
    label:
      "Jeg ønsker at den som har sykmeldt meg (lege/behandler) også deltar i møtet.",
    value: true,
  },
  {
    fieldId: "onskerSykmelderDeltarBegrunnelseText",
    fieldType: "TEXT",
    label: "Hvorfor ønsker du at lege/behandler deltar i møtet? (Må fylles ut)",
    wasRequired: true,
    value: "Behandler må være med",
  },
  {
    fieldId: "onskerTolkCheckbox",
    fieldType: "CHECKBOX_SINGLE",
    label: "Jeg har behov for tolk.",
    value: true,
  },
  {
    fieldId: "tolkSprakText",
    fieldType: "TEXT",
    label: "Hva slags tolk har du behov for? (Må fylles ut)",
    description: "Oppgi for eksempel et språk eller tegnspråktolk.",
    wasRequired: true,
    value: "Engelsk tolk",
  },
];

export const meldMotebehovSMResponseFixture: ResponseFieldSnapshot[] =
  meldMotebehovSMFixture.map(convertMockRequestFieldToMockResponseField);

export const svarMotebehovSMFixture: FieldSnapshot[] = [
  {
    fieldId: "harBehovRadioGroup",
    label: "Ønsker du et dialogmøte med Nav og arbeidsgiveren din?",
    fieldType: "RADIO_GROUP",
    options: [
      {
        optionId: "Ja",
        optionLabel: "Ja, jeg ønsker et dialogmøte.",
        wasSelected: true,
      },
      {
        optionId: "Nei",
        optionLabel: "Nei, jeg mener det ikke er behov for et dialogmøte.",
        wasSelected: false,
      },
    ],
    selectedOptionId: "Ja",
    selectedOptionLabel: "Ja, jeg ønsker et dialogmøte.",
  },
  {
    fieldId: "begrunnelseText",
    fieldType: "TEXT",
    label: "Begrunnelse (valgfri)",
    description:
      "Hva ønsker du å ta opp i møtet? Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse.",
    wasRequired: false,
    value: "Dette er en begrunnelse",
  },
  {
    fieldId: "onskerSykmelderDeltarCheckbox",
    fieldType: "CHECKBOX_SINGLE",
    label:
      "Jeg ønsker at den som har sykmeldt meg (lege/behandler) også deltar i møtet.",
    value: true,
  },
  {
    fieldId: "onskerSykmelderDeltarBegrunnelseText",
    fieldType: "TEXT",
    label: "Hvorfor ønsker du at lege/behandler deltar i møtet? (Må fylles ut)",
    wasRequired: true,
    value: "Behandler må være med",
  },
  {
    fieldId: "onskerTolkCheckbox",
    fieldType: "CHECKBOX_SINGLE",
    label: "Jeg har behov for tolk.",
    value: true,
  },
  {
    fieldId: "tolkSprakText",
    fieldType: "TEXT",
    label: "Hva slags tolk har du behov for? (Må fylles ut)",
    description: "Oppgi for eksempel et språk eller tegnspråktolk.",
    wasRequired: true,
    value: "Engelsk tolk",
  },
];

export const svarMotebehovSMResponseFixture: ResponseFieldSnapshot[] =
  svarMotebehovSMFixture.map(convertMockRequestFieldToMockResponseField);

export const meldMotebehovAGFixture: FieldSnapshot[] = [
  {
    fieldId: "begrunnelseText",
    fieldType: "TEXT",
    label: "Hvorfor ønsker du et dialogmøte? (Må fylles ut)",
    description:
      "Hva ønsker du å ta opp i møtet? Hva tenker du at Nav kan bistå med? Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse.",
    value: "Dette er en begrunnelse",
  },
  {
    fieldId: "onskerSykmelderDeltarCheckbox",
    fieldType: "CHECKBOX_SINGLE",
    label: "Jeg ønsker at sykmelder (lege/behandler) også deltar i møtet.",
    value: true,
  },
  {
    fieldId: "onskerSykmelderDeltarBegrunnelseText",
    fieldType: "TEXT",
    label: "Hvorfor ønsker du at lege/behandler deltar i møtet? (Må fylles ut)",
    wasRequired: true,
    value: "Behandler må være med",
  },
  {
    fieldId: "onskerTolkCheckbox",
    fieldType: "CHECKBOX_SINGLE",
    label: "Vi har behov for tolk.",
    value: true,
  },
  {
    fieldId: "tolkSprakText",
    fieldType: "TEXT",
    description: "Oppgi for eksempel et språk eller tegnspråktolk.",
    label: "Hva slags tolk har dere behov for? (Må fylles ut)",
    wasRequired: true,
    value: "Engelsk tolk",
  },
];

export const meldMotebehovAGOutputFixture: ResponseFieldSnapshot[] =
  meldMotebehovAGFixture.map(convertMockRequestFieldToMockResponseField);

export const svarMotebehovAGFixture: FieldSnapshot[] = [
  {
    fieldId: "harBehovRadioGroup",
    fieldType: "RADIO_GROUP",
    label: "Har dere behov for et dialogmøte med Nav?",
    description:
      "Du svarer på vegne av arbeidsgiver. Den ansatte har fått det samme spørsmålet og svarer på vegne av seg selv.",
    options: [
      {
        optionId: "Ja",
        optionLabel: "Ja, vi har behov for et dialogmøte.",
        wasSelected: true,
      },
      {
        optionId: "Nei",
        optionLabel: "Nei, vi har ikke behov for et dialogmøte nå.",
        wasSelected: false,
      },
    ],
    selectedOptionId: "Ja",
    selectedOptionLabel: "Ja, vi har behov for et dialogmøte.",
  },
  {
    fieldId: "begrunnelseText",
    fieldType: "TEXT",
    label: "Begrunnelse (må fylles ut)",
    description:
      "Hva ønsker du å ta opp i møtet? Hva tenker du at Nav kan bistå med? Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse.",
    wasRequired: true,
    value: "Dette er en begrunnelse",
  },
  {
    fieldId: "onskerSykmelderDeltarCheckbox",
    fieldType: "CHECKBOX_SINGLE",
    label: "Jeg ønsker at sykmelder (lege/behandler) også deltar i møtet.",
    value: true,
  },
  {
    fieldId: "onskerSykmelderDeltarBegrunnelseText",
    fieldType: "TEXT",
    label: "Hvorfor ønsker du at lege/behandler deltar i møtet? (Må fylles ut)",
    wasRequired: true,
    value: "Behandler må være med",
  },
  {
    fieldId: "onskerTolkCheckbox",
    fieldType: "CHECKBOX_SINGLE",
    label: "Vi har behov for tolk.",
    value: true,
  },
  {
    fieldId: "tolkSprakText",
    fieldType: "TEXT",
    label: "Hva slags tolk har dere behov for? (Må fylles ut)",
    description: "Oppgi for eksempel et språk eller tegnspråktolk.",
    wasRequired: true,
    value: "Engelsk tolk",
  },
];

export const svarMotebehovAGOutputFixture: ResponseFieldSnapshot[] =
  svarMotebehovAGFixture.map(convertMockRequestFieldToMockResponseField);

function convertMockRequestFieldToMockResponseField(
  fieldSnapshot: FieldSnapshot
): ResponseFieldSnapshot {
  return fieldSnapshot.fieldType === "RADIO_GROUP" ||
    fieldSnapshot.fieldType === "TEXT"
    ? {
        ...fieldSnapshot,
        wasRequired: fieldSnapshot.wasRequired ?? true,
        description: fieldSnapshot.description ?? null,
      }
    : fieldSnapshot.fieldType === "CHECKBOX_SINGLE"
    ? {
        ...fieldSnapshot,
        description: fieldSnapshot.description ?? null,
      }
    : fieldSnapshot;
}
