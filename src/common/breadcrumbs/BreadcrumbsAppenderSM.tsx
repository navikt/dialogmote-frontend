import { setBreadcrumbs } from "@navikt/nav-dekoratoren-moduler";
import { useRouter } from "next/router";
import { type ReactElement, useEffect } from "react";
import { createBreadcrumbsSM } from "@/common/breadcrumbs/index";

export const BreadcrumbsAppenderSM = (): ReactElement => {
  const { pathname } = useRouter();

  useEffect(() => {
    setBreadcrumbs(createBreadcrumbsSM(pathname));
  }, [pathname]);

  return null;
};
