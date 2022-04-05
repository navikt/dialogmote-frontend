import { basePath, dineSykemeldteRoot, dittSykefravarRoot } from "../publicEnv";

// Breadcrumbs for sykmeldt
export function dittSykefravaerBreadcrumbSM() {
  return [
    {
      url: dittSykefravarRoot,
      title: "Ditt sykefravær",
    },
  ];
}

export function landingBreadcrumbSM() {
  return [
    ...dittSykefravaerBreadcrumbSM(),
    {
      url: `${basePath}/sykmeldt`,
      title: "Dialogmøte",
    },
  ];
}

export function referatBreadcrumbSM() {
  return [
    ...landingBreadcrumbSM(),
    {
      url: `${basePath}/sykmeldt`, //url-field is not in use but the api requires a non-empty string
      title: "Referat",
    },
  ];
}

export function moteinnkallingBreadcrumbSM() {
  return [
    ...landingBreadcrumbSM(),
    {
      url: `${basePath}/sykmeldt`, //url-field is not in use but the api requires a non-empty string
      title: "Moteinnkalling",
    },
  ];
}

export function motebehovBreadcrumbSM() {
  return [
    ...landingBreadcrumbSM(),
    {
      url: `${basePath}/sykmeldt`, //url-field is not in use but the api requires a non-empty string
      title: "Meld behov",
    },
  ];
}

// Breadcrumbs for arbeidsgiver
export function dineSykemeldteBreadcrumbAG() {
  return [
    {
      url: dineSykemeldteRoot,
      title: "Dine sykmeldte",
    },
  ];
}

export function landingBreadcrumbAG(narmestelederId: string) {
  return [
    ...dineSykemeldteBreadcrumbAG(),
    {
      url: `${basePath}/arbeidsgiver/${narmestelederId}`,
      title: "Dialogmøte",
    },
  ];
}

export function referatBreadcrumbAG(narmestelederId: string) {
  return [
    ...landingBreadcrumbAG(narmestelederId),
    {
      url: `${basePath}/arbeidsgiver/${narmestelederId}`, //url-field is not in use but the api requires a non-empty string
      title: "Referat",
    },
  ];
}

export function moteinnkallingBreadcrumbAG(narmestelederId: string) {
  return [
    ...landingBreadcrumbAG(narmestelederId),
    {
      url: `${basePath}/arbeidsgiver/${narmestelederId}`, //url-field is not in use but the api requires a non-empty string
      title: "Møteinnkalling",
    },
  ];
}

export function motebehovBreadcrumbAG(narmestelederId: string) {
  return [
    ...landingBreadcrumbAG(narmestelederId),
    {
      url: `${basePath}/arbeidsgiver/${narmestelederId}`, //url-field is not in use but the api requires a non-empty string
      title: "Meld behov",
    },
  ];
}
