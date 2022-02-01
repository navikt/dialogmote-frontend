import {
  Brev,
  DocumentComponent,
} from "@/server/data/types/external/BrevTypes";

export const mockReferat = (
  uuid: string,
  referatDato: Date,
  withKeys: string[]
): Brev => {
  const createdDate: Date = new Date(referatDato);
  createdDate.setMonth(referatDato.getMonth() - 1);

  const keyParagraphs: DocumentComponent[] = withKeys.map((key) => {
    return {
      type: "PARAGRAPH",
      key: key,
      texts: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      ],
    };
  });

  return {
    uuid: uuid,
    deltakerUuid: "mock-deltaker-uuid",
    createdAt: createdDate.toISOString(),
    brevType: "REFERAT",
    lestDato: undefined,
    digitalt: true,
    fritekst: "Fri tekst",
    sted: "Videomøte på Teams",
    tid: referatDato.toISOString(),
    videoLink: "https://teams.microsoft.com/l/osv.osv.osv",
    document: [
      {
        type: "HEADER",
        texts: [`REFERAT ${referatDato.toLocaleString()}`],
      },
      {
        type: "HEADER",
        texts: ["Dette skjedde i møtet"],
      },
      ...keyParagraphs,
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
    ],
    virksomhetsnummer: "1234",
  };
};
