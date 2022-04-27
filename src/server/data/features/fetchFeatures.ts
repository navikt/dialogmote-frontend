import { IAuthenticatedRequest } from "@/server/api/IAuthenticatedRequest";
import { get } from "@/common/api/axios/axios";
import serverEnv from "@/server/utils/serverEnv";
import { isMockBackend } from "@/common/publicEnv";
import unleashFeaturesMock from "../mock/unleashFeaturesMock";
import {
  ActiveFeatures,
  FeaturesNextApiResponse,
  UnleashFeature,
  UnleashFeatures,
} from "../types/features/types";

const reduceFeatures = (features: UnleashFeature[]): ActiveFeatures =>
  features.reduce((features: ActiveFeatures, feature) => {
    if (feature.enabled) {
      features[feature.name] = true;
    }
    return features;
  }, {});

export const fetchFeatures = async (
  req: IAuthenticatedRequest,
  res: FeaturesNextApiResponse,
  next: () => void
) => {
  const response = await get<UnleashFeatures>(serverEnv.FEATURE_TOGGLE_URL);

  const getReducedFeatures = () =>
    isMockBackend
      ? reduceFeatures(unleashFeaturesMock)
      : reduceFeatures(response.features);

  res.features = JSON.stringify(getReducedFeatures());

  next();
};
