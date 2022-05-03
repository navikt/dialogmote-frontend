import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { ncOptions } from "@/server/utils/ncOptions";
import { withSentry } from "@sentry/nextjs";
import { fetchFeatures } from "@/server/data/features/fetchFeatures";
import { FeaturesNextApiResponse } from "@/server/data/types/features/types";

const handler = nc<NextApiRequest, NextApiResponse>(ncOptions)
  .use(fetchFeatures)
  .get(async (req: NextApiRequest, res: FeaturesNextApiResponse) => {
    res.status(200).json(res.features);
  });

export default withSentry(handler);
