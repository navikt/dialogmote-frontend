import { useMutation } from "@tanstack/react-query";
import { useApiBasePath, useLandingUrl } from "@/common/hooks/routeHooks";
import { post } from "@/common/api/axios/axios";
import { useRouter } from "next/router";
import { useNotifications } from "@/context/NotificationContext";
import { MotebehovSvarRequest } from "@/types/shared/motebehov";

export const useSvarPaMotebehovSM = () => {
  const basepath = useApiBasePath();
  const router = useRouter();
  const landingUrl = useLandingUrl();
  const { displaySuccessToast, displayErrorToast, clearNotifications } =
    useNotifications();

  const postSvar = (svar: MotebehovSvarRequest) =>
    post(`${basepath}/motebehov`, "svarPaaMotebehovSMException", svar);

  return useMutation({
    mutationFn: postSvar,
    onMutate: () => {
      clearNotifications();
    },
    onSuccess: async () => {
      await router.push(landingUrl);

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

export const useFerdigstillMotebehovSM = () => {
  const basepath = useApiBasePath();

  const postFerdigstillMotebehov = () =>
    post(
      `${basepath}/motebehov/ferdigstill`,
      "ferdigstillMotebehovSMException"
    );

  return useMutation({
    mutationFn: postFerdigstillMotebehov,
  });
};
