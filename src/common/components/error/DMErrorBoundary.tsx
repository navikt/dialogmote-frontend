import type { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { logError } from "@/common/utils/logUtils";
import PageError from "./PageError";

interface Props {
  children: ReactNode;
}

const errorHandler = (error: unknown) => {
  const err = error instanceof Error ? error : new Error("Unknown error");
  logError(err, "ErrorBoundary");
};

export const DMErrorBoundary = ({ children }: Props) => {
  return (
    <ErrorBoundary
      FallbackComponent={() => <PageError />}
      onError={errorHandler}
    >
      {children}
    </ErrorBoundary>
  );
};
