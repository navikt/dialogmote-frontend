import { useMutation } from "@tanstack/react-query";
import { useApiBasePath, useLandingUrl } from "@/common/hooks/routeHooks";
import { post } from "@/common/api/axios/axios";
import { useRouter } from "next/router";
import { useNotifications } from "@/context/NotificationContext";
import { MotebehovSvarRequestAG } from "types/shared/motebehov";
import {
  MotebehovType,
  triggerMotebehovSubmitHotjar,
} from "@/common/components/hotjar";

export const useSvarPaMotebehovAG = (type: MotebehovType) => {
  const basepath = useApiBasePath();
  const router = useRouter();
  const landingUrl = useLandingUrl();
  const { displaySuccessToast, displayErrorToast, clearNotifications } =
    useNotifications();

  const postSvar = (svar: MotebehovSvarRequestAG) =>
    post(`${basepath}/motebehov`, svar);

  return useMutation(postSvar, {
    onMutate: () => {
      clearNotifications();
    },
    onSuccess: async () => {
      await router.push(`${landingUrl}?${type}`);

      triggerMotebehovSubmitHotjar();

      displaySuccessToast(
        "Du har sendt svaret ditt på om du ønsker et dialogmøte"
      );
    },
    onError: () => {
      displayErrorToast(
        "Det skjedde en feil ved innsending av møtebehov. Vennligst prøv igjen senere."
      );
    },
  });
};
