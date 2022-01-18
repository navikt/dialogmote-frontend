import { useQuery } from "react-query";
import { get } from "@/common/api/axios/axios";
import { Brev } from "@/common/api/types/brevTypes";

const BREVSM = "brevsykmeldt";

export const useBrevSM = () => {
  const fetchBrev = () => get<Brev[]>("/syk/poc/dialogmote/api/sykmeldt/brev");
  return useQuery(BREVSM, fetchBrev);
};
