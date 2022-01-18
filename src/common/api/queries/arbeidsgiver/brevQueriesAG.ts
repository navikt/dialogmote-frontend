import { useQuery } from "react-query";
import { get } from "@/common/api/axios/axios";
import { Brev } from "@/common/api/types/brevTypes";

const BREVAG = "brevarbeidsgiver";

export const useBrevAG = () => {
  const fetchBrev = () =>
    get<Brev[]>("/syk/poc/dialogmote/api/arbeidsgiver/brev");
  return useQuery(BREVAG, fetchBrev);
};
