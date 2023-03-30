import { useFeaturePath } from "@/common/hooks/routeHooks";
import { ActiveFeatures } from "@/server/data/types/features/types";
import { useQuery } from "@tanstack/react-query";
import { get } from "../axios/axios";
import { ApiErrorException } from "../axios/errors";

export const useFeatureToggles = () => {
  const featuresPath = useFeaturePath();

  return useQuery<ActiveFeatures, ApiErrorException>(["feature-toggles"], () =>
    get<ActiveFeatures>(featuresPath)
  );
};

export enum FeatureToggle {
  DialogmoteSvarABTest = "dialogmote.svar.ab.test",
}
