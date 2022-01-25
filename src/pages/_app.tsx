import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { createGlobalStyle } from "styled-components";
import {initAmplitude} from "@/common/amplitude/amplitude";
import {useEffect} from "react";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #efefef;
    color: #3e3832;
    font-family: Arial, sans-serif;
    line-height: 1.42857143;
    margin: 0; //får ta en grundig vurdering på hva vi egentlig trenger av globale styles
  }
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
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
