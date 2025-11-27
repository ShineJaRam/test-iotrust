import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">{t("dapp_list_title")}</h1>
      <p className="text-gray-600">{t("dapp_favorite_title")}</p>
    </main>
  );
}
