"use client";

import { useTranslations } from "next-intl";
import { DAppListSkeleton } from "@/src/components/atoms";

interface DAppListStateProps {
  title: string;
}

export const DAppListLoading = ({ title }: DAppListStateProps) => {
  return (
    <section className="bg-white py-4 px-4">
      <h2 className="text-base font-bold text-gray-900 mb-3">{title}</h2>
      <DAppListSkeleton count={10} />
    </section>
  );
};

interface DAppListErrorProps extends DAppListStateProps {
  error: Error | null;
}

export const DAppListError = ({ title, error }: DAppListErrorProps) => {
  const t = useTranslations();

  return (
    <section className="bg-white py-4 px-4">
      <h2 className="text-base font-bold text-gray-900 mb-3">{title}</h2>
      <div className="text-center py-8">
        <p className="text-red-600 mb-2">{t("error_loading_data")}</p>
        <p className="text-sm text-gray-500">
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    </section>
  );
};

export const DAppListEmpty = ({ title }: DAppListStateProps) => {
  const t = useTranslations();

  return (
    <section className="bg-white py-4 px-4">
      <h2 className="text-base font-bold text-gray-900 mb-3">{title}</h2>
      <div className="text-center py-8">
        <p className="text-gray-500">{t("no_data")}</p>
      </div>
    </section>
  );
};

