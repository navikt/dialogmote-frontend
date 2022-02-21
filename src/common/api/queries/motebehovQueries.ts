import { useMutation, useQueryClient } from "react-query";
import {
  useApiBasePath,
  useAudience,
  useLandingUrl,
} from "@/common/hooks/routeHooks";
import { MotebehovSvar } from "@/server/data/types/external/MotebehovTypes";
import { post } from "@/common/api/axios/axios";
import { DIALOGMOTEDATA_AG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import { DIALOGMOTEDATA_SM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const queryToInvalidate = (isAudienceSykmeldt: boolean) =>
  isAudienceSykmeldt ? DIALOGMOTEDATA_SM : DIALOGMOTEDATA_AG;

const texts = {
  toastSuccessMessage: "Møtebehovet ditt ble sendt inn.",
};

export const useSvarPaMotebehov = () => {
  const queryClient = useQueryClient();
  const { isAudienceSykmeldt } = useAudience();
  const basepath = useApiBasePath();
  const router = useRouter();
  const landingUrl = useLandingUrl();

  const postSvar = (svar: MotebehovSvar) => post(`${basepath}/motebehov`, svar);

  return useMutation(postSvar, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryToInvalidate(isAudienceSykmeldt));
      router.push(landingUrl);
      toast.success(texts.toastSuccessMessage, {
        duration: 5000,
      });
    },
  });
};
