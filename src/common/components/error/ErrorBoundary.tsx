import { Component, ErrorInfo, PropsWithChildren, ReactNode } from "react";
import * as Sentry from "@sentry/nextjs";
import { ContentContainer } from "@navikt/ds-react";
import { PageError } from "@/common/components/error/PageError";

class ErrorBoundary extends Component<PropsWithChildren<unknown>, State> {
  constructor(props: PropsWithChildren<unknown>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    Sentry.withScope((scope) => {
      scope.setExtra("componentStack", errorInfo.componentStack);
      Sentry.captureException(error);
    });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <ContentContainer>
          <PageError />
        </ContentContainer>
      );
    }

    return this.props.children;
  }
}

interface State {
  hasError: boolean;
}

export default ErrorBoundary;
