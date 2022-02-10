import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSykmeldtDataAG } from "../api/queries/arbeidsgiver/sykmeldtQueryAG";
import { createBreadcrumbsAG, createBreadcrumbsSM } from "../breadcrumbs";
import { useNarmesteLederId } from "./useNarmesteLederId";

export const useBreadcrumbsAG = () => {
  const { pathname } = useRouter();
  const narmesteLederId = useNarmesteLederId();
  const { data } = useSykmeldtDataAG(narmesteLederId);

  useEffect(() => {
    setBreadcrumbs(createBreadcrumbsAG(pathname, data));
  }, [pathname, data]);
};

export const useBreadcrumbsSM = () => {
  const { pathname } = useRouter();

  useEffect(() => {
    setBreadcrumbs(createBreadcrumbsSM(pathname));
  }, [pathname]);
};
