import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";

interface IParams extends ParsedUrlQuery {
  narmestelederid: string;
}

export const useNarmesteLederId = (): string | undefined => {
  const router = useRouter();
  const { narmestelederid } = router.query as IParams;
  return narmestelederid;
};
