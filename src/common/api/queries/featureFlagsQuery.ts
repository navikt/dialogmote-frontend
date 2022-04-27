import { useFeaturePath } from "@/common/hooks/routeHooks";
import { useNotifications } from "@/context/NotificationContext";
import { ActiveFeatures } from "@/server/data/types/features/types";
import { useQuery } from "react-query";
import { get } from "../axios/axios";
import { ApiErrorException } from "../axios/errors";

export const useFeatureToggles = () => {
  const { displayNotification } = useNotifications();
  const featuresPath = useFeaturePath();

  return useQuery<ActiveFeatures, ApiErrorException>(
    "feature-toggles",
    () => get<ActiveFeatures>(featuresPath),
    {
      onError: (err) => {
        displayNotification({
          variant: "error",
          message: err.error.defaultErrorMsg,
        });
      },
    }
  );
};

export enum FeatureToggle {
  DialogmoteSvarABTest = "dialogmote.svar.ab.test",
}
