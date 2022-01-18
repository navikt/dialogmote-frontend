import {
  Components,
  fetchDecoratorReact,
  Props,
} from "@navikt/nav-dekoratoren-moduler/ssr";
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { createBreadcrumbs, getUserTypeContext } from "./utils";

export default class MyDocument extends Document<{ Decorator: Components }> {
  static async getInitialProps(ctx: DocumentContext) {
    const { pathname } = ctx;
    const userTypeContext = getUserTypeContext(pathname);
    const breadcrumbs = createBreadcrumbs("k");

    const decoratorParams: Props = {
      env: "dev",
      context: userTypeContext,
      chatbot: true,
      urlLookupTable: false,
      breadcrumbs: [
        { url: "/tull", title: "Ditt NAV" },
        { url: "https://www.nav.no/person/kontakt-oss", title: "Kontakt oss" },
      ],
    };
    const Decorator = await fetchDecoratorReact(decoratorParams);

    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, Decorator };
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
