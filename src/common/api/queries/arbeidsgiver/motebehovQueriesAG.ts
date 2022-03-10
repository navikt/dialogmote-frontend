import { useMutation } from "react-query";
import { useApiBasePath, useLandingUrl } from "@/common/hooks/routeHooks";
import { post } from "@/common/api/axios/axios";
import { useRouter } from "next/router";
import { useNotifications } from "@/context/NotificationContext";
import { ExtMotebehovSvarArbeidsgiver } from "@/server/data/types/external/ExternalMotebehovTypes";

export const useSvarPaMotebehovAG = () => {
  const basepath = useApiBasePath();
  const router = useRouter();
  const landingUrl = useLandingUrl();
  const { displaySuccessToast, displayErrorToast } = useNotifications();

  const postSvar = (svar: ExtMotebehovSvarArbeidsgiver) =>
    post(`${basepath}/motebehov`, svar);

  return useMutation(postSvar, {
    onSuccess: () => {
      displaySuccessToast(
        "Du har sendt svaret ditt på om du ønsker et dialogmøte"
      );
      router.push(landingUrl);
    },
    onError: () => {
      displayErrorToast(
        "Det skjedde en feil ved innsending av møtebehov. Vennligst prøv igjen senere."
      );
    },
  });
};
