import { cdnPublicPath } from "@/common/publicEnv";

export const getPublicAsset = (path: string) => {
  return `${cdnPublicPath}${path}`;
};
