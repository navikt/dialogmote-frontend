import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import { validateIdportenToken } from "@/server/auth/idporten/idportenToken";
import { logger } from "@navikt/next-logger";
import { isMockBackend } from "@/server/utils/serverEnv";

export type PageHandler = (
  context: GetServerSidePropsContext
) => Promise<GetServerSidePropsResult<Record<string, unknown>>>;

const beskyttetSide = (handler: PageHandler) => {
  return async function withBearerTokenHandler(
    context: GetServerSidePropsContext
  ): Promise<ReturnType<NonNullable<typeof handler>>> {
    if (isMockBackend) {
      return handler(context);
    }

    const request = context.req;

    if (request == null) {
      throw new Error("Context is missing request. This should not happen");
    }

    const wonderwallRedirect = {
      redirect: {
        destination: `/oauth2/login?redirect=/syk/dialogmoter/${context.resolvedUrl}`,
        permanent: false,
      },
    };

    const validation = await validateIdportenToken(request);

    if (!validation.success) {
      logger.error("Kunne ikke validere idportentoken i beskyttetSide");
      return wonderwallRedirect;
    }

    return handler(context);
  };
};

export const beskyttetSideUtenProps = beskyttetSide(
  async (): Promise<GetServerSidePropsResult<Record<string, unknown>>> => {
    return {
      props: {},
    };
  }
);
