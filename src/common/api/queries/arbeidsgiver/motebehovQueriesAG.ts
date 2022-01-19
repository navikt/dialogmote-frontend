import { useQuery } from "react-query";
import { get } from "@/common/api/axios/axios";
import { MotebehovStatus } from "@/common/api/types/motebehovTypes";

const MOTEBEHOVAG = "motebehovarbeidsgiver";

export const useMotebehovAG = (personIdent?: string, orgnummer?: string) => {
  const fetchBrev = () =>
    get<MotebehovStatus>(`/syk/poc/dialogmote/api/arbeidsgiver/motebehov`, {
      personIdent: personIdent,
      orgnummer: orgnummer,
    });
  return useQuery(MOTEBEHOVAG, fetchBrev, {
    enabled: !!personIdent && !!orgnummer,
  });
};
