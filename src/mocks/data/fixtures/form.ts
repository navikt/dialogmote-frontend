import { FormSnapshotDto } from "@/server/service/schema/formSnapshotSchema";

export const meldMotebehovSMFixture: FormSnapshotDto["fieldSnapshots"] = [
  {
    fieldId: "begrunnelseText",
    fieldLabel: "Hvorfor ønsker du et dialogmøte? (Må fylles ut)",
    fieldType: "TEXT",
    value: "Dette er en begrunnelse",
    description:
      "Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse.",
  },
  {
    fieldType: "CHECKBOX_SINGLE",
    fieldId: "onskerSykmelderDeltarCheckbox",
    fieldLabel:
      "Jeg ønsker at den som har sykmeldt meg (lege/behandler) også deltar i møtet.",
    value: true,
  },
  {
    fieldType: "TEXT",
    fieldId: "onskerSykmelderDeltarBegrunnelseText",
    fieldLabel:
      "Hvorfor ønsker du at lege/behandler deltar i møtet? (Må fylles ut)",
    wasRequired: true,
    value: "Behandler må være med",
  },
  {
    fieldType: "CHECKBOX_SINGLE",
    fieldId: "onskerTolkCheckbox",
    fieldLabel: "Jeg har behov for tolk.",
    value: true,
  },
  {
    fieldType: "TEXT",
    fieldId: "tolkSprakText",
    fieldLabel: "Hva slags tolk har du behov for? (Må fylles ut)",
    wasRequired: true,
    value: "Engelsk tolk",
    description: "Oppgi for eksempel et språk eller tegnspråktolk.",
  },
];

export const svarMotebehovSMFixture: FormSnapshotDto["fieldSnapshots"] = [
  {
    fieldId: "harBehovRadioGroup",
    fieldLabel: "Ønsker du et dialogmøte med NAV og arbeidsgiveren din?",
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
    description:
      "Hva ønsker du å ta opp i møtet? Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse.",
    fieldId: "begrunnelseText",
    fieldLabel: "Begrunnelse (valgfri)",
    fieldType: "TEXT",
    value: "Dette er en begrunnelse",
    wasRequired: false,
  },
  {
    fieldId: "onskerSykmelderDeltarCheckbox",
    fieldLabel:
      "Jeg ønsker at den som har sykmeldt meg (lege/behandler) også deltar i møtet.",
    fieldType: "CHECKBOX_SINGLE",
    value: true,
  },
  {
    fieldId: "onskerSykmelderDeltarBegrunnelseText",
    fieldLabel:
      "Hvorfor ønsker du at lege/behandler deltar i møtet? (Må fylles ut)",
    fieldType: "TEXT",
    value: "Behandler må være med",
    wasRequired: true,
  },
  {
    fieldId: "onskerTolkCheckbox",
    fieldLabel: "Jeg har behov for tolk.",
    fieldType: "CHECKBOX_SINGLE",
    value: true,
  },
  {
    description: "Oppgi for eksempel et språk eller tegnspråktolk.",
    fieldId: "tolkSprakText",
    fieldLabel: "Hva slags tolk har du behov for? (Må fylles ut)",
    fieldType: "TEXT",
    value: "Engelsk tolk",
    wasRequired: true,
  },
];

export const meldMotebehovAGFixture: FormSnapshotDto["fieldSnapshots"] = [
  {
    description:
      "Hva ønsker du å ta opp i møtet? Hva tenker du at NAV kan bistå med? Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse.",
    fieldId: "begrunnelseText",
    fieldLabel: "Hvorfor ønsker du et dialogmøte? (Må fylles ut)",
    fieldType: "TEXT",
    value: "Dette er en begrunnelse",
  },
  {
    fieldId: "onskerSykmelderDeltarCheckbox",
    fieldLabel: "Jeg ønsker at sykmelder (lege/behandler) også deltar i møtet.",
    fieldType: "CHECKBOX_SINGLE",
    value: true,
  },
  {
    fieldId: "onskerSykmelderDeltarBegrunnelseText",
    fieldLabel:
      "Hvorfor ønsker du at lege/behandler deltar i møtet? (Må fylles ut)",
    fieldType: "TEXT",
    value: "Behandler må være med",
    wasRequired: true,
  },
  {
    fieldId: "onskerTolkCheckbox",
    fieldLabel: "Vi har behov for tolk.",
    fieldType: "CHECKBOX_SINGLE",
    value: true,
  },
  {
    description: "Oppgi for eksempel et språk eller tegnspråktolk.",
    fieldId: "tolkSprakText",
    fieldLabel: "Hva slags tolk har dere behov for? (Må fylles ut)",
    fieldType: "TEXT",
    value: "Engelsk tolk",
    wasRequired: true,
  },
];

export const svarMotebehovAGFixture: FormSnapshotDto["fieldSnapshots"] = [
  {
    description:
      "Du svarer på vegne av arbeidsgiver. Den ansatte har fått det samme spørsmålet og svarer på vegne av seg selv.",
    fieldId: "harBehovRadioGroup",
    fieldLabel: "Har dere behov for et dialogmøte med NAV?",
    fieldType: "RADIO_GROUP",
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
    description:
      "Hva ønsker du å ta opp i møtet? Hva tenker du at NAV kan bistå med? Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse.",
    fieldId: "begrunnelseText",
    fieldLabel: "Begrunnelse (må fylles ut)",
    fieldType: "TEXT",
    value: "Dette er en begrunnelse",
    wasRequired: true,
  },
  {
    fieldId: "onskerSykmelderDeltarCheckbox",
    fieldLabel: "Jeg ønsker at sykmelder (lege/behandler) også deltar i møtet.",
    fieldType: "CHECKBOX_SINGLE",
    value: true,
  },
  {
    fieldId: "onskerSykmelderDeltarBegrunnelseText",
    fieldLabel:
      "Hvorfor ønsker du at lege/behandler deltar i møtet? (Må fylles ut)",
    fieldType: "TEXT",
    value: "Behandler må være med",
    wasRequired: true,
  },
  {
    fieldId: "onskerTolkCheckbox",
    fieldLabel: "Vi har behov for tolk.",
    fieldType: "CHECKBOX_SINGLE",
    value: true,
  },
  {
    description: "Oppgi for eksempel et språk eller tegnspråktolk.",
    fieldId: "tolkSprakText",
    fieldLabel: "Hva slags tolk har dere behov for? (Må fylles ut)",
    fieldType: "TEXT",
    value: "Engelsk tolk",
    wasRequired: true,
  },
];
