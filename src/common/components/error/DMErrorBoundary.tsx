import type { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import PageError from "./PageError";

interface Props {
  children: ReactNode;
}

export const DMErrorBoundary = ({ children }: Props) => {
  // React 19 reports caught render errors to console; @nais/apm captures that
  // signal. An onError reporter here would emit the same exception twice.
  return (
    <ErrorBoundary FallbackComponent={() => <PageError />}>
      {children}
    </ErrorBoundary>
  );
};
