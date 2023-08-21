import { ServerStyleSheet } from "styled-components";
import {
  DecoratorComponents,
  fetchDecoratorReact,
} from "@navikt/nav-dekoratoren-moduler/ssr";
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import serverEnv from "@/server/utils/serverEnv";
import { createBreadcrumbsAG, createBreadcrumbsSM } from "@/common/breadcrumbs";

interface Props {
  Decorator: DecoratorComponents;
  language: string;
}

export default class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    const isAudienceSykmeldt = ctx.pathname.startsWith("/sykmeldt");

    const Decorator = await fetchDecoratorReact({
      env: serverEnv.DECORATOR_ENV,
      params: {
        context: isAudienceSykmeldt ? "privatperson" : "arbeidsgiver",
        chatbot: true,
        feedback: false,
        redirectToApp: true,
        level: "Level4",
        urlLookupTable: false,
        breadcrumbs: isAudienceSykmeldt
          ? createBreadcrumbsSM(ctx.pathname)
          : createBreadcrumbsAG(
              ctx.pathname,
              "Den sykmeldte",
              ctx.query.narmestelederid as string
            ),
      },
    });

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        Decorator,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const { Decorator } = this.props;

    return (
      <Html lang="nb">
        <Head />
        <Decorator.Styles />
        <Decorator.Scripts />
        <body>
          <Decorator.Header />
          <Main />
          <Decorator.Footer />
          <NextScript />
        </body>
      </Html>
    );
  }
}
