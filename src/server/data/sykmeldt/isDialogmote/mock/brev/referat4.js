const referat = {
  uuid: 'mock-uuid6',
  deltakerUuid: 'mock-deltaker-uuid3',
  createdAt: '2009-11-15T12:35:37.669+01:00',
  brevType: 'REFERAT',
  lestDato: null,
  digitalt: true,
  fritekst: 'Fri tekst',
  sted: 'Videomøte på Teams',
  tid: '2010-12-15T12:35:37.669+01:00',
  videoLink: 'https://teams.microsoft.com/l/osv.osv.osv',
  document: [
    {
      type: 'HEADER',
      texts: ['REFERAT 2010-12-15'],
    },
    {
      type: 'PARAGRAPH',
      texts: [
        'Formålet med dialogmøtet var å oppsummere situasjonen, drøfte mulighetene for å arbeide og legge en plan for tiden framover.',
      ],
    },
    {
      type: 'HEADER',
      texts: ['Dette skjedde i møtet'],
    },
    {
      type: 'PARAGRAPH',
      key: 'AVKLARING_ARBEIDSEVNE',
      title: 'Konklusjon',
      texts: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      ],
    },
    {
      type: 'HEADER',
      texts: ['Dette informerte NAV om i møtet'],
    },
    {
      type: 'PARAGRAPH',
      key: 'IKKE_BEHOV',
      title: 'Ikke behov for bistand fra NAV nå',
      texts: [
        'Slik situasjonen er nå, er det ikke behov for noen spesiell bistand fra NAV. Dere kan likevel be om nytt dialogmøte når dere har behov for det.',
      ],
    },
    {
      type: 'PARAGRAPH',
      texts: ['Med hilsen', 'NAV Staden', 'Kari Saksbehandler', 'kari@nav.no', '99998888'],
    },
  ],
  virksomhetsnummer: '1234',
};

module.exports = referat;
