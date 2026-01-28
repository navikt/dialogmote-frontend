import {
  type DecoratorComponentsReact,
  fetchDecoratorReact,
} from "@navikt/nav-dekoratoren-moduler/ssr";
import Document, {
  type DocumentContext,
  type DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { createBreadcrumbsAG, createBreadcrumbsSM } from "@/common/breadcrumbs";

// The 'head'-field of the document initialProps contains data from <head> (meta-tags etc)
const getDocumentParameter = (
  initialProps: DocumentInitialProps,
  name: string,
): string => {
  return initialProps.head?.find((element) => element?.props?.name === name)
    ?.props?.content;
};

interface Props {
  Decorator: DecoratorComponentsReact;
  language: string;
}

const getDecoratorEnv = (): "prod" | "dev" => {
  switch (process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT) {
    case "local":
    case "test":
    case "dev":
      return "dev";
    default:
      return "prod";
  }
};

export default class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    const isAudienceSykmeldt = ctx.pathname.startsWith("/sykmeldt");

    const Decorator = await fetchDecoratorReact({
      env: getDecoratorEnv(),
      params: {
        context: isAudienceSykmeldt ? "privatperson" : "arbeidsgiver",
        chatbot: true,
        logoutWarning: true,
        feedback: false,
        redirectToApp: true,
        breadcrumbs: isAudienceSykmeldt
          ? createBreadcrumbsSM(ctx.pathname)
          : createBreadcrumbsAG(
              ctx.pathname,
              "Den sykmeldte",
              ctx.query.narmestelederid as string,
            ),
      },
    });

    const language = getDocumentParameter(initialProps, "lang");

    return { ...initialProps, Decorator, language };
  }

  render() {
    const { Decorator } = this.props;

    return (
      <Html lang="nb">
        <Head>
          <link
            rel="preload"
            href="https://cdn.nav.no/aksel/fonts/SourceSans3-normal.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <Decorator.HeadAssets />
        </Head>
        <body>
          <Decorator.Header />
          <Main />
          <Decorator.Footer />
          <Decorator.Scripts />
          <NextScript />
        </body>
      </Html>
    );
  }
}
