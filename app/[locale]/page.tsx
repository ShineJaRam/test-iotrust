import { useTranslations } from "next-intl";
import { Banner } from "@/src/components/Banner";
import { Favorites } from "@/src/components/Favorites";

export default function Home() {
  const t = useTranslations();

  return (
    <main className="flex flex-col min-h-screen">
      <Banner />
      <Favorites />

      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-900">
          {t("dapp_list_title")}
        </h1>
      </div>
    </main>
  );
}
