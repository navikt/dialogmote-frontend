import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import styled, { createGlobalStyle } from "styled-components";
import { initAmplitude } from "@/common/amplitude/amplitude";
import React, { Component, useEffect } from "react";
import { useAudience } from "@/common/hooks/routeHooks";
import { BreadcrumbsAppenderSM } from "@/common/breadcrumbs/BreadcrumbsAppenderSM";
import { BreadcrumbsAppenderAG } from "@/common/breadcrumbs/BreadcrumbsAppenderAG";
import { NotificationProvider } from "@/context/NotificationContext";
import { NotificationBar } from "@/common/components/notificationbar/NotificationBar";
import Head from "next/head";

const texts = {
  defaultTitle: "Dialogmøter",
};

const GlobalStyle = createGlobalStyle`
  body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`;

const ContentWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--navds-global-color-gray-100);
`;

const InnerContentWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 40rem;
  flex-grow: 1;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const minutesToMillis = (minutes: number) => {
  return 1000 * 60 * minutes;
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
    <NotificationProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        {isAudienceSykmeldt ? (
          <BreadcrumbsAppenderSM />
        ) : (
          <BreadcrumbsAppenderAG />
        )}
        <ContentWrapperStyled>
          <Head>
            <title>{texts.defaultTitle}</title>
          </Head>
          <NotificationBar />
          <InnerContentWrapperStyled>
            <Component {...pageProps} />
          </InnerContentWrapperStyled>
        </ContentWrapperStyled>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </NotificationProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyApp;
