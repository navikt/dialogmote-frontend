import { z } from "zod";
import {
  dialogmoteSurvey,
  dialogmoteSurveyId,
  dialogmoteSurveyRevision,
} from "@/common/components/lumi/dialogmoteSurvey";

const transportObject = z.record(z.string(), z.unknown());
const viewport = z.object({
  width: z.number().nonnegative(),
  height: z.number().nonnegative(),
});

// Validate the transport envelope here; Lumi owns full answer/definition semantics.
// Unknown context keys are deliberately stripped before forwarding.
export const surveySubmissionSchema = z.object({
  schemaVersion: z.literal(2),
  surveyId: z.literal(dialogmoteSurveyId),
  surveyType: z.literal(dialogmoteSurvey.type ?? "custom"),
  submittedAt: z.iso.datetime(),
  startedAt: z.iso.datetime().nullish(),
  timeToCompleteMs: z.number().nonnegative().nullish(),
  deduplicationKey: z.string().min(1).max(200),
  definition: transportObject,
  flow: transportObject.optional(),
  answers: z.array(transportObject).min(1),
  context: z
    .object({
      deviceType: z.enum(["mobile", "tablet", "desktop"]).nullish(),
      viewport: viewport.nullish(),
      screenResolution: viewport.nullish(),
    })
    .nullish(),
});

export function withSurveyContext(
  submission: z.infer<typeof surveySubmissionSchema>,
) {
  return {
    ...submission,
    context: {
      ...submission.context,
      tags: {
        role: "employer",
        page: "dialogmoter",
        revision: String(dialogmoteSurveyRevision),
      },
    },
  };
}
