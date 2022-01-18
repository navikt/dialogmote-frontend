import { useQuery } from "react-query";
import { get } from "@/common/api/axios/axios";
import { MotebehovStatus } from "@/common/api/types/motebehovTypes";

const MOTEBEHOVAG = "motebehovarbeidsgiver";

export const useMotebehovAG = () => {
  const fetchBrev = () =>
    get<MotebehovStatus>("/syk/poc/dialogmote/api/arbeidsgiver/motebehov");
  return useQuery(MOTEBEHOVAG, fetchBrev);
};
