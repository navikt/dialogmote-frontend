import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";

interface IParams extends ParsedUrlQuery {
  narmestelederid: string;
}

const isValidNarmestelederId = (
  value: string | string[] | undefined
): value is string => {
  if (typeof value !== "string") {
    return false;
  }
  return /^[a-zA-Z0-9_-]{1,100}$/.test(value);
};

export const useNarmesteLederId = (): string | undefined => {
  const router = useRouter();
  const { narmestelederid } = router.query as IParams;
  return isValidNarmestelederId(narmestelederid)
    ? narmestelederid
    : undefined;
};
