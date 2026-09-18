import type { NextApiRequest, NextApiResponse } from "next";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MAX_LENGTH_MOTEBEHOV_SVAR_JSON } from "@/pages/api/constants";
import { TokenXTargetApi } from "@/server/auth/tokenXExchange";
import { RuntimeOperation } from "@/server/observability/runtimeErrorContract";
import handler from "./index.api";

const mocks = vi.hoisted(() => ({
  post: vi.fn(),
  warn: vi.fn(),
}));

vi.mock("@navikt/next-logger", () => ({
  logger: {
    error: vi.fn(),
    warn: mocks.warn,
  },
}));
vi.mock("@/server/tokenXFetch/tokenXFetchPost", () => ({
  tokenXFetchPost: mocks.post,
}));
vi.mock("@/server/utils/serverEnv", () => ({
  default: {
    SYFOMOTEBEHOV_HOST: "https://syfomotebehov.invalid",
  },
  isMockBackend: false,
}));

const response = () => {
  const res = {
    status: vi.fn(),
    end: vi.fn(),
  };
  res.status.mockReturnValue(res);
  return res;
};

const requestBody = {
  narmesteLederId: "synthetic-leder-id",
  formSubmission: {
    harMotebehov: true,
    formSnapshot: {
      formIdentifier: "motebehov-arbeidsgiver-meld",
      formSemanticVersion: "1.0.0",
      fieldSnapshots: [
        {
          fieldId: "begrunnelse",
          fieldType: "TEXT",
          label: "Begrunnelse for mote",
          value: "Legitim begrunnelse",
        },
      ],
    },
  },
};

describe("arbeidsgiver motebehov API", () => {
  beforeEach(() => {
    mocks.post.mockReset().mockResolvedValue(undefined);
    mocks.warn.mockReset();
  });

  it("discards unknown fields before forwarding to syfomotebehov", async () => {
    const req = {
      body: {
        ...requestBody,
        formSubmission: {
          ...requestBody.formSubmission,
          formSnapshot: {
            ...requestBody.formSubmission.formSnapshot,
            fieldSnapshots: [
              {
                ...requestBody.formSubmission.formSnapshot.fieldSnapshots[0],
                piiCanary: "must-not-be-forwarded",
              },
            ],
          },
          piiCanary: "must-not-be-forwarded",
        },
      },
    } as NextApiRequest;
    const res = response();

    await handler(req, res as unknown as NextApiResponse);

    expect(mocks.post).toHaveBeenCalledWith({
      req,
      targetApi: TokenXTargetApi.SYFOMOTEBEHOV,
      operation: RuntimeOperation.MOTEBEHOV_SUBMIT,
      endpoint:
        "https://syfomotebehov.invalid/syfomotebehov/api/v5/arbeidsgiver/motebehov",
      data: {
        narmesteLederId: requestBody.narmesteLederId,
        formSubmission: requestBody.formSubmission,
      },
    });
    expect(mocks.post.mock.calls[0]?.[0].data).not.toHaveProperty(
      "formSubmission.piiCanary",
    );
    expect(mocks.post.mock.calls[0]?.[0].data).not.toHaveProperty(
      "formSubmission.formSnapshot.fieldSnapshots[0].piiCanary",
    );
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("rejects an invalid form submission before forwarding", async () => {
    const req = {
      body: {
        ...requestBody,
        formSubmission: { harMotebehov: "true" },
      },
    } as NextApiRequest;
    const res = response();

    await handler(req, res as unknown as NextApiResponse);

    expect(mocks.post).not.toHaveBeenCalled();
    expect(mocks.warn).toHaveBeenCalledWith(
      "Received invalid arbeidsgiver motebehov request",
    );
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("rejects an invalid narmesteLederId before forwarding", async () => {
    const req = {
      body: { ...requestBody, narmesteLederId: "invalid/id" },
    } as NextApiRequest;
    const res = response();

    await handler(req, res as unknown as NextApiResponse);

    expect(mocks.post).not.toHaveBeenCalled();
    expect(mocks.warn).toHaveBeenCalledWith(
      "Received invalid arbeidsgiver motebehov request",
    );
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("rejects an oversized raw request before forwarding", async () => {
    const req = {
      body: {
        ...requestBody,
        unrelated: "x".repeat(MAX_LENGTH_MOTEBEHOV_SVAR_JSON),
      },
    } as NextApiRequest;
    const res = response();

    await handler(req, res as unknown as NextApiResponse);

    expect(mocks.post).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(413);
  });
});
