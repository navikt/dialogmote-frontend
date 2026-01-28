import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";
import { useRouter } from "next/router";
import { type ReactElement, useEffect } from "react";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import { createBreadcrumbsAG } from "@/common/breadcrumbs/index";
import { useNarmesteLederId } from "@/common/hooks/useNarmesteLederId";

export const BreadcrumbsAppenderAG = (): ReactElement => {
  const { pathname } = useRouter();
  const narmestelederId = useNarmesteLederId();
  const dialogmoteData = useDialogmoteDataAG();
  const sykmeldtName = dialogmoteData.data?.sykmeldt?.navn;

  useEffect(() => {
    if (narmestelederId && sykmeldtName) {
      setBreadcrumbs(
        createBreadcrumbsAG(pathname, sykmeldtName, narmestelederId),
      );
    }
  }, [sykmeldtName, narmestelederId, pathname]);

  return null;
};
