import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import { withSentry } from "@sentry/nextjs";
import { fetchFeatureFlags } from "@/server/data/features/fetchFeatureToggles";
import { FeatureTogglesNextApiResponse } from "@/server/data/types/features/types";

const handler = nc<NextApiRequest, NextApiResponse>(ncOptions)
  .use(fetchFeatureFlags)
  .get(async (req: NextApiRequest, res: FeatureTogglesNextApiResponse) => {
    res.status(200).end(res.features);
  });

export default withSentry(handler);
