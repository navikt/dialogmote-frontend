import type { ParsedUrlQuery } from "node:querystring";
import { useRouter } from "next/router";

interface IParams extends ParsedUrlQuery {
  brevuuid: string;
}

export const useBrevUuid = (): string | undefined => {
  const router = useRouter();
  const { brevuuid } = router.query as IParams;
  return brevuuid;
};
