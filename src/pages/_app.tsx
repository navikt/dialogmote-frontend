import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import styled, { createGlobalStyle } from "styled-components";
import { initAmplitude } from "@/common/amplitude/amplitude";
import { useEffect } from "react";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: var(--navds-global-color-gray-100);
    display: flex;
    justify-content: center;
    padding: 2rem;
    min-height: 100vh;
  }
`;

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 40rem;
  height: 100%;
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
      <WrapperStyled>
        <Component {...pageProps} />
      </WrapperStyled>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
