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
    const breadcrumbs = createBreadcrumbs(pathname);

    const decoratorParams: Props = {
      env: "dev",
      context: userTypeContext,
      chatbot: true,
      enforceLogin: true,
      level: "Level4",
      redirectToApp: true,
      breadcrumbs: breadcrumbs,
      urlLookupTable: false,
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
