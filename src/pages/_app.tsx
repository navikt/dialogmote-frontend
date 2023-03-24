import "../styles/globals.css";
import "@navikt/dinesykmeldte-sidemeny/dist/style.css";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import styled, { createGlobalStyle } from "styled-components";
import { initAmplitude } from "@/common/amplitude/amplitude";
import { useAudience } from "@/common/hooks/routeHooks";
import { BreadcrumbsAppenderSM } from "@/common/breadcrumbs/BreadcrumbsAppenderSM";
import { BreadcrumbsAppenderAG } from "@/common/breadcrumbs/BreadcrumbsAppenderAG";
import { NotificationProvider } from "@/context/NotificationContext";
import { NotificationBar } from "@/common/components/notificationbar/NotificationBar";
import ErrorBoundary from "@/common/components/error/ErrorBoundary";
import { displayTestScenarioSelector } from "@/common/publicEnv";
import { TestScenarioSelector } from "@/common/components/testscenarioselector/TestScenarioSelector";

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
  if (displayTestScenarioSelector) {
    return <TestScenarioSelector />;
  }
  return null;
};

function MyApp({ Component, pageProps }: AppProps) {
  const { isAudienceSykmeldt } = useAudience();

  useEffect(() => {
    initAmplitude();
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        cacheTime: minutesToMillis(60),
        staleTime: minutesToMillis(30),
      },
    },
  });

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyApp;
