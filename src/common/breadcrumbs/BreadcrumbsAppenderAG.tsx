import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";
import { createBreadcrumbsAG } from "@/common/breadcrumbs/index";
import { useNarmesteLederId } from "@/common/hooks/useNarmesteLederId";

export const BreadcrumbsAppenderAG = (): ReactElement => {
  const { pathname } = useRouter();
  const narmestelederId = useNarmesteLederId();

  useEffect(() => {
    if (narmestelederId) {
      setBreadcrumbs(createBreadcrumbsAG(pathname, narmestelederId));
    }
  }, [narmestelederId, pathname]);

  return <></>;
};
