import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";
import { createBreadcrumbsAG } from "@/common/breadcrumbs/index";
import { useDialogmoteDataAG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import { useNarmesteLederId } from "@/common/hooks/useNarmesteLederId";

export const BreadcrumbsAppenderAG = (): ReactElement => {
  const { pathname } = useRouter();
  const narmestelederId = useNarmesteLederId();
  const dialogmoteData = useDialogmoteDataAG();
  const sykmeldtName = dialogmoteData.data?.sykmeldtName;

  useEffect(() => {
    if (narmestelederId && sykmeldtName) {
      setBreadcrumbs(
        createBreadcrumbsAG(pathname, sykmeldtName, narmestelederId)
      );
    }
  }, [sykmeldtName, narmestelederId, pathname]);

  return <></>;
};
