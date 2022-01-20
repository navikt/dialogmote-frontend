import { basePath } from "@/common/publicEnv";

export const getAsset = (path: string) => {
  return `${basePath}${path}`;
};
