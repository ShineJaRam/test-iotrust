"use client";

import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";
import { ReactNode, ErrorInfo } from "react";

interface ErrorBoundaryWrapperProps {
  children: ReactNode;
}

export const ErrorBoundaryWrapper = ({
  children,
}: ErrorBoundaryWrapperProps) => {
  const handleReset = () => {
    window.location.reload();
  };

  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={handleReset}
      onError={handleError}
    >
      {children}
    </ErrorBoundary>
  );
};
