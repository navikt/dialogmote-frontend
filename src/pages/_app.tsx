import "../styles/globals.css";
import type { AppProps, AppContext } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import styled, { createGlobalStyle } from "styled-components";
import { initAmplitude } from "@/common/amplitude/amplitude";
import { useEffect } from "react";
import App from "next/app";

const GlobalStyle = createGlobalStyle`
  body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  #__next {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    padding: 2rem;
    background-color: var(--navds-global-color-gray-100);
  }
`;

const ContentWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 40rem;
`;

const minutesToMillis = (minutes: number) => {
  return 1000 * 60 * minutes;
};

function MyApp({ Component, pageProps }: AppProps) {
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
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <ContentWrapperStyled>
        <Component {...pageProps} />
      </ContentWrapperStyled>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyApp;
