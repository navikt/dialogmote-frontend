import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { initAmplitude } from "@/common/amplitude/amplitude";
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
    initAmplitude();
    initFaro();
  }, []);

  return (
    <DMErrorBoundary>
      <NotificationProvider>
        <QueryClientProvider client={queryClient}>
          <main tabIndex={-1} id="maincontent" className="min-h-screen">
            <>
              {isAudienceSykmeldt ? (
                <BreadcrumbsAppenderSM />
              ) : (
                <BreadcrumbsAppenderAG />
              )}
              <>
                <NotificationBar />
                <Component {...pageProps} />
              </>
              <TestScenarioDevTools />
            </>
          </main>
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition="bottom-left"
          />
        </QueryClientProvider>
      </NotificationProvider>
    </DMErrorBoundary>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyApp;
