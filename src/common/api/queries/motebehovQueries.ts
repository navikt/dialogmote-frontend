import { useMutation, useQueryClient } from "react-query";
import {
  useApiBasePath,
  useAudience,
  useLandingUrl,
} from "@/common/hooks/routeHooks";
import { post } from "@/common/api/axios/axios";
import { DIALOGMOTEDATA_AG } from "@/common/api/queries/arbeidsgiver/dialogmoteDataQueryAG";
import { DIALOGMOTEDATA_SM } from "@/common/api/queries/sykmeldt/dialogmoteDataQuerySM";
import { useRouter } from "next/router";
import { MotebehovSvar } from "@/server/data/types/internal/MotebehovTypes";
import { useNotifications } from "@/context/NotificationContext";
import { SubmitMotebehovSuccess } from "@/context/Notifications";

const queryToInvalidate = (isAudienceSykmeldt: boolean) =>
  isAudienceSykmeldt ? DIALOGMOTEDATA_SM : DIALOGMOTEDATA_AG;

export const useSvarPaMotebehov = () => {
  const queryClient = useQueryClient();
  const { isAudienceSykmeldt } = useAudience();
  const basepath = useApiBasePath();
  const router = useRouter();
  const landingUrl = useLandingUrl();
  const { displayToast } = useNotifications();

  const postSvar = (svar: MotebehovSvar) => post(`${basepath}/motebehov`, svar);

  return useMutation(postSvar, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryToInvalidate(isAudienceSykmeldt));
      router.push(landingUrl);
      displayToast(SubmitMotebehovSuccess);
    },
  });
};
