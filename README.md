# Dialogmøter for sykmeldte og arbeidsgivere

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-149ECA?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm&logoColor=white)

Frontend for dialogmøter på `nav.no`. Appen viser innhold for både sykmeldte og arbeidsgivere under `/syk/dialogmoter`, og henter data via Next.js API-ruter som snakker med backend-tjenester.

## Miljøer

- [🚀 Produksjon](https://www.nav.no/syk/dialogmoter)
- [🛠️ Utvikling](https://www.ekstern.dev.nav.no/syk/dialogmoter)
- [🎬 Demo - arbeidstaker](https://demo.ekstern.dev.nav.no/syk/dialogmoter/sykmeldt)
- [🎬 Demo - arbeidsgiver](https://demo.ekstern.dev.nav.no/syk/dialogmoter/arbeidsgiver/1)

## Formålet med appen

Appen håndterer dialogmøter mellom sykmeldte, arbeidsgivere og NAV som del av sykefraværsoppfølgingen. Den har to brukerflater:

### Sykmeldt (`/syk/dialogmoter`)

- **Møtebehov** — melde behov for dialogmøte og svare på forespørsler fra arbeidsgiver
- **Møteinnkalling** — se innkalling til dialogmøte fra NAV
- **Referat** — lese referater fra gjennomførte dialogmøter

### Arbeidsgiver (`/syk/dialogmoter/arbeidsgiver/[narmestelederid]`)

- **Møtebehov** — melde behov for dialogmøte på vegne av virksomheten og svare på forespørsler
- **Brev** — se innkallinger og referater knyttet til den sykmeldte

## Backend-API

Frontend-appen kommuniserer med flere backend-tjenester via Next.js API-ruter (`src/pages/api`). Alle kall bruker TokenX on-behalf-of-utveksling.

### [isdialogmote](https://github.com/navikt/isdialogmote)

Brev, innkallinger og referater.

- **GET** `/api/v2/arbeidstaker/brev`
- **GET** `/api/v2/narmesteleder/brev`

### [syfomotebehov](https://github.com/navikt/syfomotebehov)

Møtebehov for sykmeldt og arbeidsgiver.

- **GET** `/syfomotebehov/api/v4/arbeidstaker/motebehov`
- **GET** `/syfomotebehov/api/v4/motebehov?fnr={fnr}&virksomhetsnummer={orgnummer}`
- **POST** `/syfomotebehov/api/v4/arbeidstaker/motebehov`
- **POST** `/syfomotebehov/api/v4/arbeidstaker/motebehov/ferdigstill`

### [dinesykmeldte-backend](https://github.com/navikt/dinesykmeldte-backend)

Oppslag av sykmeldt i arbeidsgiverflyten.

- **GET** `/api/v2/dinesykmeldte/{narmestelederid}`

## Utvikling (kjøre lokalt)

For å komme i gang med bygging og kjøring av appen, sjekk ut mise tasks.

## For Nav-ansatte

Interne henvendelser kan sendes via Slack i kanalen [#esyfo](https://nav-it.slack.com/archives/C012X796B4L).
