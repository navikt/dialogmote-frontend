import type { NextApiRequest, NextApiResponse } from "next";
import { HttpError } from "@/common/utils/errors/HttpError";
import { TokenXTargetApi } from "@/server/auth/tokenXExchange";
import {
  surveySubmissionSchema,
  withSurveyContext,
} from "@/server/lumi/submission";
import { RuntimeOperation } from "@/server/observability/runtimeErrorContract";
import { tokenXFetchPost } from "@/server/tokenXFetch/tokenXFetchPost";
import serverEnv, { isMockBackend } from "@/server/utils/serverEnv";

export const config = { api: { bodyParser: { sizeLimit: "64kb" } } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end();
    return;
  }
  const parsed = surveySubmissionSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Ugyldig tilbakemelding." });
    return;
  }
  // Local and demo sessions never exchange tokens or create real feedback.
  if (isMockBackend) {
    res.status(204).end();
    return;
  }
  if (!serverEnv.LUMI_API_HOST || !serverEnv.LUMI_API_CLIENT_ID) {
    res
      .status(503)
      .json({ message: "Tilbakemeldinger er ikke tilgjengelige akkurat nå." });
    return;
  }
  try {
    await tokenXFetchPost({
      req,
      targetApi: TokenXTargetApi.LUMI_API,
      operation: RuntimeOperation.LUMI_FEEDBACK_SUBMIT,
      endpoint: `${serverEnv.LUMI_API_HOST}/api/tokenx/v1/feedback`,
      data: withSurveyContext(parsed.data),
    });
    res.status(204).end();
  } catch (error) {
    const status =
      error instanceof HttpError && error.code >= 400 && error.code < 500
        ? error.code
        : 502;
    res
      .status(status)
      .json({ message: "Tilbakemeldingen kunne ikke sendes. Prøv igjen." });
  }
}
