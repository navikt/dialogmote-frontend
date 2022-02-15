import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDialogmoteDataAG } from "../api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import { createBreadcrumbsAG, createBreadcrumbsSM } from "../breadcrumbs";
import { useNarmesteLederId } from "./useNarmesteLederId";

export const useBreadcrumbsAG = () => {
  const { pathname } = useRouter();
  const narmestelederid = useNarmesteLederId();
  const { data, isSuccess } = useDialogmoteDataAG(narmestelederid);

  useEffect(() => {
    if (isSuccess) {
      setBreadcrumbs(createBreadcrumbsAG(pathname, data?.sykmeldt));
    }
  }, [pathname, isSuccess, data]);
};

export const useBreadcrumbsSM = () => {
  const { pathname } = useRouter();

  useEffect(() => {
    setBreadcrumbs(createBreadcrumbsSM(pathname));
  }, [pathname]);
};
