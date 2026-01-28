import { ErrorBoundary } from "react-error-boundary";
import { ReactNode } from "react";
import PageError from "./PageError";
import { logError } from "@/common/utils/logUtils";

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
