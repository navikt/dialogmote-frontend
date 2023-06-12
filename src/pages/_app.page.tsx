import "../styles/globals.css";
import "@navikt/dinesykmeldte-sidemeny/dist/style.css";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import styled, { createGlobalStyle } from "styled-components";
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
import { initFaro, pinoLevelToFaroLevel } from "../faro/initFaro";

// eslint-disable-next-line
declare const window: any;

configureLogger({
  basePath: "/syk/dialogmoter",
  onLog: (log) => {
    if (typeof window !== "undefined" && window.faro !== "undefined") {
      window.faro.api.pushLog(log.messages, {
        level: pinoLevelToFaroLevel(log.level.label),
      });
    }
  },
});

const GlobalStyle = createGlobalStyle`
  body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`;

const ContentWrapperStyled = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const minutesToMillis = (minutes: number) => {
  return 1000 * 60 * minutes;
};

const TestScenarioDevTools = () => {
  if (isDemoOrLocal) {
    return <TestScenarioSelector />;
  }
  return null;
};

function MyApp({ Component, pageProps }: AppProps) {
  const { isAudienceSykmeldt } = useAudience();

  useEffect(() => {
    initAmplitude();
    initFaro();
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        cacheTime: minutesToMillis(60),
      },
    },
  });

  return (
    <DMErrorBoundary>
      <NotificationProvider>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          {isAudienceSykmeldt ? (
            <BreadcrumbsAppenderSM />
          ) : (
            <BreadcrumbsAppenderAG />
          )}
          <ContentWrapperStyled tabIndex={-1} id="maincontent">
            <NotificationBar />
            <Component {...pageProps} />
          </ContentWrapperStyled>
          <TestScenarioDevTools />
          <ReactQueryDevtools initialIsOpen={false} />
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
