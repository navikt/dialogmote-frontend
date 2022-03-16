import { useMutation } from "react-query";
import { useApiBasePath, useLandingUrl } from "@/common/hooks/routeHooks";
import { post } from "@/common/api/axios/axios";
import { useRouter } from "next/router";
import { MotebehovSvar } from "@/server/data/types/internal/MotebehovTypes";
import { useNotifications } from "@/context/NotificationContext";
import { SubmitMotebehovSuccess } from "@/context/Notifications";

export const useSvarPaMotebehovSM = () => {
  const basepath = useApiBasePath();
  const router = useRouter();
  const landingUrl = useLandingUrl();
  const { displayToast } = useNotifications();

  const postSvar = (svar: MotebehovSvar) => post(`${basepath}/motebehov`, svar);

  return useMutation(postSvar, {
    onSuccess: () => {
      router.push(landingUrl);
      displayToast(SubmitMotebehovSuccess);
    },
  });
};
