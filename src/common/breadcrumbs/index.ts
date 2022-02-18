import {
  landingBreadcrumbAG,
  landingBreadcrumbSM,
  referatBreadcrumbAG,
  referatBreadcrumbSM,
} from "./breadcrumbPaths";

export function createBreadcrumbsAG(
  pathname: string,
  sykmeldtName: string,
  narmestelederid: string
) {
  switch (pathname) {
    case "/arbeidsgiver/[narmestelederid]":
      return landingBreadcrumbAG(sykmeldtName, narmestelederid);
    case "/arbeidsgiver/[narmestelederid]/referat/[brevuuid]":
      return referatBreadcrumbAG(sykmeldtName, narmestelederid);
    default:
      return [];
  }
}

export function createBreadcrumbsSM(pathname: string) {
  switch (pathname) {
    case "/sykmeldt":
      return landingBreadcrumbSM();
    case "/sykmeldt/referat/[brevuuid]":
      return referatBreadcrumbSM();
    default:
      return [];
  }
}
