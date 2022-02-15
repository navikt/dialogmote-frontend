import { Sykmeldt } from "@/server/data/types/external/SykmeldteTypes";
import {
  dialogmoteBreadcrumbAG,
  dialogmoteBreadcrumbSM,
} from "./breadcrumbPaths";

export function createBreadcrumbsAG(pathname: string, sykmeldt?: Sykmeldt) {
  switch (pathname) {
    case "/arbeidsgiver/[narmestelederid]":
      return dialogmoteBreadcrumbAG(sykmeldt);
    default:
      return [];
  }
}

export function createBreadcrumbsSM(pathname: string) {
  switch (pathname) {
    case "/sykmeldt":
      return dialogmoteBreadcrumbSM();
    default:
      return [];
  }
}
