import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import type { MotebehovSvarRequestAG } from "types/shared/motebehov";
import { post } from "@/common/api/fetch";
import { useApiBasePath, useLandingUrl } from "@/common/hooks/routeHooks";
import { useNotifications } from "@/context/NotificationContext";

export const useSvarPaMotebehovAG = () => {
  const basepath = useApiBasePath();
  const router = useRouter();
  const landingUrl = useLandingUrl();
  const { displaySuccessToast, displayErrorToast, clearNotifications } =
    useNotifications();

  const postSvar = (svar: MotebehovSvarRequestAG) =>
    post(`${basepath}/motebehov`, svar);

  return useMutation({
    mutationFn: postSvar,
    onMutate: () => {
      clearNotifications();
    },
    onSuccess: async () => {
      await router.push(landingUrl);

      displaySuccessToast(
        "Du har sendt svaret ditt på om du ønsker et dialogmøte",
      );
    },
    onError: () => {
      displayErrorToast(
        "Det skjedde en feil ved innsending av møtebehov. Vennligst prøv igjen senere.",
      );
    },
  });
};
