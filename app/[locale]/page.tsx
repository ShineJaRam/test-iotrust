import { Banner } from "@/src/components/Banner";
import { Favorites } from "@/src/components/Favorites";
import { DAppList } from "@/src/components/DAppList";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Banner />
      <Favorites />
      <DAppList />
    </main>
  );
}
