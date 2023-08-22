import { ErrorBoundary } from "react-error-boundary";
import { ReactNode } from "react";
import PageError from "./PageError";
import { logError } from "@/common/utils/logUtils";

interface Props {
  children: ReactNode;
}

const errorHandler = (error: Error) => {
  logError(error, "ErrorBoundaryException");
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
