import { Banner, Favorites, VirtualDAppList } from "@/src/components/organisms";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Banner />
      <Favorites />
      <VirtualDAppList />
    </main>
  );
}
