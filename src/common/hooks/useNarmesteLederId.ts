import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import { isValidNarmestelederId } from "@/common/utils/validateNarmestelederId";

interface IParams extends ParsedUrlQuery {
  narmestelederid: string;
}

export const useNarmesteLederId = (): string | undefined => {
  const router = useRouter();
  const { narmestelederid } = router.query as IParams;
  return isValidNarmestelederId(narmestelederid)
    ? narmestelederid
    : undefined;
};
