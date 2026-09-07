import type { NextApiRequest, NextApiResponse } from "next";
import { isDialogmoteSurveyEnabled } from "@/server/lumi/config";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): void {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).end();
    return;
  }
  res.status(200).json({ enabled: isDialogmoteSurveyEnabled() });
}
