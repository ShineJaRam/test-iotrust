import { Banner } from "@/src/components/Banner";
import { Favorites } from "@/src/components/Favorites";
import { VirtualDAppList } from "@/src/components/VirtualDAppList";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Banner />
      <Favorites />
      <VirtualDAppList />
    </main>
  );
}
