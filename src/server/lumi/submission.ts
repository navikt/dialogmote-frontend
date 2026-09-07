import { z } from "zod";
import {
  dialogmoteSurvey,
  dialogmoteSurveyId,
  dialogmoteSurveyRevision,
} from "@/common/components/lumi/dialogmoteSurvey";

const fieldType = z.enum([
  "RATING",
  "TEXT",
  "SINGLE_CHOICE",
  "MULTI_CHOICE",
  "DATE",
]);
const field = z.object({ fieldId: z.string().min(1), fieldType }).passthrough();
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
  definition: z.object({
    surveyType: z.literal(dialogmoteSurvey.type ?? "custom"),
    fields: z.array(field).min(1).max(50),
  }),
  flow: z
    .object({
      schemaVersion: z.literal(1),
      evaluatorVersion: z.literal("visible-if-v1"),
      fields: z
        .array(z.object({ fieldId: z.string().min(1) }).passthrough())
        .max(50),
    })
    .optional(),
  answers: z
    .array(
      field.extend({
        question: z.object({ label: z.string() }).passthrough(),
        value: z
          .object({
            type: z.enum([
              "rating",
              "text",
              "singleChoice",
              "multiChoice",
              "date",
            ]),
          })
          .passthrough(),
      }),
    )
    .min(1)
    .max(50),
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
