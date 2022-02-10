import { useQuery } from "react-query";
import { get } from "@/common/api/axios/axios";
import { Sykmeldt } from "@/server/data/types/external/SykmeldteTypes";
import { basePath } from "@/common/publicEnv";

const SYKMELDTDATA_AG = "sykmeldtdata-arbeidsgiver";

export const useSykmeldtDataAG = (narmestelederId?: string) => {
  const fetchSykmeldtData = () =>
    get<Sykmeldt>(`${basePath}/api/arbeidsgiver/sykmeldt/${narmestelederId}`);

  return useQuery(SYKMELDTDATA_AG, fetchSykmeldtData, {
    enabled: !!narmestelederId,
  });
};
