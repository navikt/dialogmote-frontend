import {
  type Context,
  type ContextManager,
  context,
  ROOT_CONTEXT,
  TraceFlags,
  trace,
} from "@opentelemetry/api";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { HttpError } from "@/common/utils/errors/HttpError";
import { TokenXTargetApi } from "@/server/auth/tokenXExchange";
import {
  logUpstreamRequestFailure,
  RuntimeOperation,
} from "./runtimeErrorContract";

const serializedLogLines = vi.hoisted((): string[] => []);

vi.mock("@navikt/next-logger", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@navikt/next-logger")>();

  return {
    ...actual,
    logger: actual.backendLogger(
      {},
      {
        write(line: string) {
          serializedLogLines.push(line);
        },
      },
    ),
  };
});

let activeContext: Context = ROOT_CONTEXT;

const synchronousContextManager: ContextManager = {
  active: () => activeContext,
  bind: (_context, target) => target,
  disable() {
    activeContext = ROOT_CONTEXT;
    return this;
  },
  enable() {
    return this;
  },
  with(contextToActivate, fn, thisArg, ...args) {
    const previousContext = activeContext;
    activeContext = contextToActivate;
    try {
      return fn.call(thisArg, ...args);
    } finally {
      activeContext = previousContext;
    }
  },
};

const withActiveTrace = <T>(traceId: string, fn: () => T): T => {
  const previousContext = activeContext;
  const span = trace.wrapSpanContext({
    traceId,
    spanId: "1234567890abcdef",
    traceFlags: TraceFlags.SAMPLED,
    isRemote: false,
  });
  activeContext = trace.setSpan(ROOT_CONTEXT, span);

  try {
    return fn();
  } finally {
    activeContext = previousContext;
  }
};

describe("serialized runtime error contract", () => {
  beforeAll(() => {
    context.disable();
    context.setGlobalContextManager(synchronousContextManager.enable());
  });

  beforeEach(() => {
    activeContext = ROOT_CONTEXT;
    serializedLogLines.length = 0;
  });

  afterAll(() => {
    context.disable();
  });

  it("emits one Pino line with canonical status, active trace and no raw details", () => {
    const traceId = "4bf92f3577b34da6a3ce929d0e0e4736";

    withActiveTrace(traceId, () => {
      logUpstreamRequestFailure({
        operation: RuntimeOperation.BREV_PDF_FETCH,
        targetApi: TokenXTargetApi.ISDIALOGMOTE,
        method: "GET",
        error: new HttpError(503, "secret upstream body 01017012345"),
      });
    });

    expect(serializedLogLines).toHaveLength(1);
    const parsed = JSON.parse(serializedLogLines[0]) as Record<string, unknown>;
    expect(parsed).toMatchObject({
      level: "error",
      event_type: "dialogmote_brev_pdf_fetch_failed",
      operation: "brev_pdf_fetch",
      error_code: "UPSTREAM_HTTP_ERROR",
      upstream: "isdialogmote",
      method: "GET",
      upstream_status: 503,
      trace_id: traceId,
      message: "Upstream request failed",
    });
    expect(parsed).not.toHaveProperty("status");
    expect(parsed).not.toHaveProperty("err");
    expect(parsed).not.toHaveProperty("stack");
    expect(parsed).not.toHaveProperty("endpoint");
    expect(serializedLogLines[0]).not.toMatch(
      /01017012345|secret upstream body/,
    );
  });
});
