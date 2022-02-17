import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDialogmoteDataAG } from "../api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import { createBreadcrumbsAG, createBreadcrumbsSM } from "../breadcrumbs";
import { useNarmesteLederId } from "./useNarmesteLederId";

export const useBreadcrumbsAG = () => {
  const { pathname } = useRouter();
  const narmestelederId = useNarmesteLederId();
  const { data } = useDialogmoteDataAG(narmestelederId);

  useEffect(() => {
    if (data?.sykmeldtName && narmestelederId) {
      setBreadcrumbs(
        createBreadcrumbsAG(pathname, data.sykmeldtName, narmestelederId)
      );
    }
  }, [pathname, data, narmestelederId]);
};

export const useBreadcrumbsSM = () => {
  const { pathname } = useRouter();

  useEffect(() => {
    setBreadcrumbs(createBreadcrumbsSM(pathname));
  }, [pathname]);
};
