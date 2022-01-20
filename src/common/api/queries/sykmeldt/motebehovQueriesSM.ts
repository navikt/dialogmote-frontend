import { useQuery } from "react-query";
import { get } from "@/common/api/axios/axios";
import { MotebehovStatus } from "@/common/api/types/motebehovTypes";

const MOTEBEHOVSM = "motebehovsykmeldt";

export const useMotebehovSM = () => {
  const fetchBrev = () => get<MotebehovStatus>("/api/sykmeldt/motebehov");
  return useQuery(MOTEBEHOVSM, fetchBrev);
};
