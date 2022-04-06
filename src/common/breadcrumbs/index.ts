import {
  landingBreadcrumbAG,
  landingBreadcrumbSM,
  motebehovBreadcrumbAG,
  motebehovBreadcrumbSM,
  moteinnkallingBreadcrumbAG,
  moteinnkallingBreadcrumbSM,
  referatBreadcrumbAG,
  referatBreadcrumbSM,
} from "./breadcrumbPaths";

export function createBreadcrumbsAG(pathname: string, narmestelederid: string) {
  switch (pathname) {
    case "/arbeidsgiver/[narmestelederid]":
      return landingBreadcrumbAG(narmestelederid);
    case "/arbeidsgiver/[narmestelederid]/referat/[brevuuid]":
      return referatBreadcrumbAG(narmestelederid);
    case "/arbeidsgiver/[narmestelederid]/moteinnkalling":
      return moteinnkallingBreadcrumbAG(narmestelederid);
    case "/arbeidsgiver/[narmestelederid]/motebehov/meld":
    case "/arbeidsgiver/[narmestelederid]/motebehov/svar":
      return motebehovBreadcrumbAG(narmestelederid);
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
    case "/sykmeldt/moteinnkalling":
      return moteinnkallingBreadcrumbSM();
    case "/sykmeldt/motebehov/meld":
    case "/sykmeldt/motebehov/svar":
      return motebehovBreadcrumbSM();
    default:
      return [];
  }
}
