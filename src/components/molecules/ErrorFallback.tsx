"use client";

import { FallbackProps } from "react-error-boundary";
import { useTranslations } from "next-intl";
import { Icon } from "@/src/components/atoms";

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
      <div className="mb-4">
        <Icon.Alert size="xl" color="text-red-500" className="mx-auto" />
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        {t("error_boundary_title")}
      </h2>
      <p className="text-sm text-gray-600 text-center mb-6 max-w-md">
        {t("error_boundary_description")}
      </p>

      {process.env.NODE_ENV === "development" && error && (
        <details className="mb-6 w-full max-w-md">
          <summary className="text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900 mb-2">
            {t("error_boundary_details")}
          </summary>
          <pre className="text-xs bg-gray-100 p-4 rounded-lg overflow-auto max-h-40 text-red-600">
            {error.message}
            {error.stack && `\n\n${error.stack}`}
          </pre>
        </details>
      )}

      <button
        onClick={resetErrorBoundary}
        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors shadow-lg"
      >
        {t("error_boundary_button")}
      </button>
    </div>
  );
};
