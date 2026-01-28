import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "@/common/api/fetch/fetch";
import { DIALOGMOTEDATA_SM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";
import { useApiBasePath, useAudience } from "@/common/hooks/routeHooks";
import { DIALOGMOTEDATA_AG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import { SvarRespons } from "types/shared/brev";

type SvarResponsRequest = Omit<SvarRespons, "svarTidspunkt">;

const queryToInvalidate = (isAudienceSykmeldt: boolean) =>
  isAudienceSykmeldt ? DIALOGMOTEDATA_SM : DIALOGMOTEDATA_AG;

export const useMutateBrevLest = () => {
  const basepath = useApiBasePath();

  const postLestBrev = (uuid: string) =>
    post(`${basepath}/brev/${uuid}/lest`);

  return useMutation({ mutationFn: postLestBrev });
};

export const useSvarPaInnkallelse = (uuid: string) => {
  const queryClient = useQueryClient();
  const { isAudienceSykmeldt } = useAudience();
  const basepath = useApiBasePath();

  const postSvar = (svar: SvarResponsRequest) =>
    post(`${basepath}/brev/${uuid}/svar`, svar);

  return useMutation({
    mutationFn: postSvar,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [queryToInvalidate(isAudienceSykmeldt)],
      });
    },
  });
};
