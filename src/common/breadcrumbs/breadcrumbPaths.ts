import { Sykmeldt } from "@/server/data/types/external/SykmeldteTypes";
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

export function dialogmoteBreadcrumbSM() {
  return [
    ...dittSykefravaerBreadcrumbSM(),
    {
      url: `${basePath}/sykmeldt`,
      title: "Dialogmøte",
    },
  ];
}

// Breadcrumbs for arbeidsgiver
export function dineSykemeldteBreadcrumbAG(sykmeldt?: Sykmeldt) {
  const dineSykemeldteBreadcrumb = {
    url: dineSykemeldteRoot,
    title: "Dine sykmeldt",
  };

  if (!sykmeldt) {
    return [dineSykemeldteBreadcrumb];
  }

  return [
    dineSykemeldteBreadcrumb,
    {
      url: `${dineSykemeldteRoot}/${sykmeldt.narmestelederId}`,
      title: `${sykmeldt.navn}`,
    },
  ];
}

export function dialogmoteBreadcrumbAG(sykmeldt?: Sykmeldt) {
  return [
    ...dineSykemeldteBreadcrumbAG(sykmeldt),
    {
      url: `${basePath}/arbeidsgiver`,
      title: "Dialogmøte",
    },
  ];
}
