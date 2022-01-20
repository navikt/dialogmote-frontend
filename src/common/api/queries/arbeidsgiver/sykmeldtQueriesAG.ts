import { useQuery } from "react-query";
import { get } from "@/common/api/axios/axios";
import { Sykmeldt } from "@/common/api/types/sykmeldteTypes";

const SYKMELDTEAG = "sykmeldtearbeidsgiver";

export const useSykmeldtAG = (narmestelederId?: string) => {
  const fetchSykmeldte = () =>
    get<Sykmeldt>(
      `/syk/poc/dialogmote/api/arbeidsgiver/sykmeldt/${narmestelederId}`
    );
  return useQuery(SYKMELDTEAG, fetchSykmeldte, {
    enabled: !!narmestelederId,
  });
};
