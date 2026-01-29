import "@navikt/dinesykmeldte-sidemeny/dist/dinesykmeldte-sidemeny.css";
import "../styles/globals.css";
import { Box, Theme } from "@navikt/ds-react";
import { configureLogger } from "@navikt/next-logger";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { BreadcrumbsAppenderAG } from "@/common/breadcrumbs/BreadcrumbsAppenderAG";
import { BreadcrumbsAppenderSM } from "@/common/breadcrumbs/BreadcrumbsAppenderSM";
import { DMErrorBoundary } from "@/common/components/error/DMErrorBoundary";
import { NotificationBar } from "@/common/components/notificationbar/NotificationBar";
import { TestScenarioSelector } from "@/common/components/testscenarioselector/TestScenarioSelector";
import { useAudience } from "@/common/hooks/routeHooks";
import { isDemoOrLocal } from "@/common/publicEnv";
import { NotificationProvider } from "@/context/NotificationContext";
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
