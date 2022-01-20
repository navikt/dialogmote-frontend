import {
  dialogmoteAGBreadcrumb,
  dialogmoteSMBreadcrumb,
} from "./breadbrumbPaths";

export function getUserTypeContext(pathname: string) {
  return pathname.includes("arbeidsgiver") ? "arbeidsgiver" : "privatperson";
}

export function createBreadcrumbs(pathname: string) {
  switch (pathname) {
    case "/sykmeldt":
      return dialogmoteSMBreadcrumb();
    case "/arbeidsgiver":
      return dialogmoteAGBreadcrumb();
    default:
      return [];
  }
}
