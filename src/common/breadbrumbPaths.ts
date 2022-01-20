// SM
export function dittSykefravaerBreadcrumb() {
  return [
    {
      url: process.env["DITT_SYKEFRAVAER_ROOT"] as string,
      title: "Ditt sykefravær",
    },
  ];
}

export function dialogmoteSMBreadcrumb() {
  return [
    ...dittSykefravaerBreadcrumb(),
    {
      url: "/syk/poc/dialogmote/sykmeldt",
      title: "Dialogmøte",
    },
  ];
}

// AG
export function dineSykemeldteBreadcrumb() {
  return [
    {
      url: process.env["DINE_SYKMELDTE_ROOT"] as string,
      title: "Dine sykmeldt",
    },
  ];
}

export function dialogmoteAGBreadcrumb() {
  return [
    ...dineSykemeldteBreadcrumb(),
    {
      url: "/syk/poc/dialogmote/arbeidsgiver",
      title: "Dialogmøte",
    },
  ];
}
