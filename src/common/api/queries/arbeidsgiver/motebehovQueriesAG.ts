import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { post } from "@/common/api/fetch";
import { useApiBasePath, useLandingUrl } from "@/common/hooks/routeHooks";
import { useNarmesteLederId } from "@/common/hooks/useNarmesteLederId";
import { useNotifications } from "@/context/NotificationContext";
import type {
  MotebehovSvarFormRequestAG,
  MotebehovSvarRequestAG,
} from "@/types/shared/motebehov";

export const useSvarPaMotebehovAG = () => {
  const basepath = useApiBasePath();
  const narmesteLederId = useNarmesteLederId();
  const router = useRouter();
  const landingUrl = useLandingUrl();
  const { displaySuccessToast, displayErrorToast, clearNotifications } =
    useNotifications();

  const postSvar = (svar: MotebehovSvarFormRequestAG) => {
    if (!narmesteLederId) {
      throw new Error("Cannot submit motebehov without narmesteLederId");
    }

    const request: MotebehovSvarRequestAG = {
      ...svar,
      narmesteLederId,
    };
    return post(`${basepath}/motebehov`, request);
  };

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
