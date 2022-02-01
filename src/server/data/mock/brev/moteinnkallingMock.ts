import {
  Brev,
  BrevType,
  DocumentComponent,
} from "@/server/data/types/external/BrevTypes";

const innkallingDocument: DocumentComponent[] = [
  {
    type: "PARAGRAPH",
    title: "Møtetidspunkt",
    texts: ["20. mai 2025, Storgata 4"],
  },
  {
    type: "PARAGRAPH",
    title: "Møtested",
    texts: ["Videomøte på Teams"],
  },
  {
    type: "LINK",
    title: "Lenke til videomøte",
    texts: ["https://teams.microsoft.com/l/osv.osv.osv"],
  },
  {
    type: "PARAGRAPH",
    texts: [
      "Velkommen til dialogmøte mellom deg, arbeidsgiveren din og en veileder fra NAV. I møtet skal vi snakke om situasjonen din og bli enige om en plan som kan hjelpe deg videre.",
    ],
  },
  {
    type: "PARAGRAPH",
    texts: [
      "Hvis vårt forslag til møtetidspunkt, møtested eller møteform ikke passer, ber vi om at du tar kontakt for å diskutere alternativer. I så fall kan du sende epost eller ringe undertegnede på telefon. Vi minner om at det ikke må sendes sensitive personopplysninger over e-post eller SMS.",
    ],
  },
  {
    type: "PARAGRAPH",
    texts: [
      "Etter reglene kan NAV be sykmelder eller annet helsepersonell om å delta i møtet. Til dette møtet har vi ikke sett behov for det.",
    ],
  },
  {
    type: "PARAGRAPH",
    title: "Før møtet",
    texts: [
      "Det er viktig at dere fyller ut oppfølgingsplanen sammen og deler den med NAV. Det gir oss et godt utgangspunkt for å snakke om hva som fungerer, hva som har blitt forsøkt, og hvilke muligheter som finnes framover.",
    ],
  },
  {
    type: "PARAGRAPH",
    texts: [
      "Med hilsen",
      "NAV Staden",
      "Kari Saksbehandler",
      "kari@nav.no",
      "99998888",
    ],
  },
];

const avlysningDocument: DocumentComponent[] = [
  {
    type: "PARAGRAPH",
    texts: ["Hei Artig Trane"],
  },
  {
    type: "PARAGRAPH",
    texts: [
      "NAV har tidligere innkalt til dialogmøte som skulle vært avholdt 22.10.2021 klokka 12. Dette møtet er avlyst.",
    ],
  },
  {
    type: "PARAGRAPH",
    texts: ["Her kommer en fritekst skrevet av veilederen."],
  },
  {
    type: "PARAGRAPH",
    texts: ["Med hilsen", "NAV Staden", "Kari Saksbehandler"],
  },
];

export const mockMoteinnkalling = (
  brevType: BrevType,
  uuid: string,
  moteTidspunkt: Date
): Brev => {
  const createdDate: Date = new Date(moteTidspunkt);
  createdDate.setMonth(moteTidspunkt.getMonth() - 1);

  return {
    uuid: uuid,
    deltakerUuid: "mock-deltaker-uuid2",
    createdAt: createdDate.toISOString(),
    brevType: brevType,
    digitalt: true,
    lestDato: undefined,
    fritekst: "Fri tekst",
    sted: "Videomøte på Teams",
    tid: moteTidspunkt.toISOString(),
    videoLink: "https://teams.microsoft.com/l/osv.osv.osv",
    document: brevType === "AVLYST" ? avlysningDocument : innkallingDocument,
    virksomhetsnummer: "1234",
  };
};
