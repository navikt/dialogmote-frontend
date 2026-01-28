import "@navikt/dinesykmeldte-sidemeny/dist/dinesykmeldte-sidemeny.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box, Theme } from "@navikt/ds-react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAudience } from "@/common/hooks/routeHooks";
import { BreadcrumbsAppenderSM } from "@/common/breadcrumbs/BreadcrumbsAppenderSM";
import { BreadcrumbsAppenderAG } from "@/common/breadcrumbs/BreadcrumbsAppenderAG";
import { NotificationProvider } from "@/context/NotificationContext";
import { NotificationBar } from "@/common/components/notificationbar/NotificationBar";
import { isDemoOrLocal } from "@/common/publicEnv";
import { TestScenarioSelector } from "@/common/components/testscenarioselector/TestScenarioSelector";
import { configureLogger } from "@navikt/next-logger";
import { DMErrorBoundary } from "@/common/components/error/DMErrorBoundary";
import { initFaro } from "../faro/initFaro";

configureLogger({
  basePath: "/syk/dialogmoter",
});

const minutesToMillis = (minutes: number) => {
  return 1000 * 60 * minutes;
};

const TestScenarioDevTools = () => {
  if (isDemoOrLocal) {
    return <TestScenarioSelector />;
  }
  return null;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      gcTime: minutesToMillis(60),
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const { isAudienceSykmeldt } = useAudience();

  useEffect(() => {
    initFaro();
  }, []);

  return (
    <DMErrorBoundary>
      <NotificationProvider>
        <QueryClientProvider client={queryClient}>
          <Theme theme="light" asChild>
            <Box asChild background="neutral-soft">
              <main tabIndex={-1} id="maincontent" className="min-h-screen">
                {isAudienceSykmeldt ? (
                  <BreadcrumbsAppenderSM />
                ) : (
                  <BreadcrumbsAppenderAG />
                )}
                <NotificationBar />
                <Component {...pageProps} />
                <TestScenarioDevTools />
              </main>
            </Box>
          </Theme>
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition="bottom-left"
          />
        </QueryClientProvider>
      </NotificationProvider>
    </DMErrorBoundary>
  );
}

export default MyApp;
