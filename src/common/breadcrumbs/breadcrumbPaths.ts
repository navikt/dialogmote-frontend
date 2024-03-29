import {
  basePath,
  dineSykemeldteRoot,
  dittSykefravarRoot,
  minSideRoot,
} from "../publicEnv";

// Breadcrumbs for sykmeldt
export function baseBreadcrumbSM() {
  return [
    {
      url: minSideRoot,
      title: "Min side",
    },
    {
      url: dittSykefravarRoot,
      title: "Ditt sykefravær",
    },
  ];
}

export function landingBreadcrumbSM() {
  return [
    ...baseBreadcrumbSM(),
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
export function dineSykemeldteBreadcrumbAG(
  sykmeldtName: string,
  narmestelederId: string
) {
  const dineSykemeldteBreadcrumb = {
    url: dineSykemeldteRoot,
    title: "Dine sykmeldte",
  };

  return [
    dineSykemeldteBreadcrumb,
    {
      url: `${dineSykemeldteRoot}/${narmestelederId}`,
      title: sykmeldtName,
    },
  ];
}

export function landingBreadcrumbAG(
  sykmeldtName: string,
  narmestelederId: string
) {
  return [
    ...dineSykemeldteBreadcrumbAG(sykmeldtName, narmestelederId),
    {
      url: `${basePath}/arbeidsgiver/${narmestelederId}`,
      title: "Dialogmøte",
    },
  ];
}

export function referatBreadcrumbAG(
  sykmeldtName: string,
  narmestelederId: string
) {
  return [
    ...landingBreadcrumbAG(sykmeldtName, narmestelederId),
    {
      url: `${basePath}/arbeidsgiver/${narmestelederId}`, //url-field is not in use but the api requires a non-empty string
      title: "Referat",
    },
  ];
}

export function moteinnkallingBreadcrumbAG(
  sykmeldtName: string,
  narmestelederId: string
) {
  return [
    ...landingBreadcrumbAG(sykmeldtName, narmestelederId),
    {
      url: `${basePath}/arbeidsgiver/${narmestelederId}`, //url-field is not in use but the api requires a non-empty string
      title: "Møteinnkalling",
    },
  ];
}

export function motebehovBreadcrumbAG(
  sykmeldtName: string,
  narmestelederId: string
) {
  return [
    ...landingBreadcrumbAG(sykmeldtName, narmestelederId),
    {
      url: `${basePath}/arbeidsgiver/${narmestelederId}`, //url-field is not in use but the api requires a non-empty string
      title: "Meld behov",
    },
  ];
}
