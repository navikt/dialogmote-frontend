import {
  DecoratorComponents,
  fetchDecoratorReact,
} from "@navikt/nav-dekoratoren-moduler/ssr";
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import serverEnv from "@/server/utils/serverEnv";
import { createBreadcrumbsAG, createBreadcrumbsSM } from "@/common/breadcrumbs";

// The 'head'-field of the document initialProps contains data from <head> (meta-tags etc)
const getDocumentParameter = (
  initialProps: DocumentInitialProps,
  name: string
): string => {
  return initialProps.head?.find((element) => element?.props?.name === name)
    ?.props?.content;
};

interface Props {
  Decorator: DecoratorComponents;
  language: string;
}

export default class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

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

    const language = getDocumentParameter(initialProps, "lang");

    return { ...initialProps, Decorator, language };
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
