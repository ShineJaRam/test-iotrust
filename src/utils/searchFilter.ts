import { DApp } from "@/src/data/dapps";

export const filterDAppsBySearch = (
  dapps: DApp[],
  searchQuery: string
): DApp[] => {
  if (!searchQuery.trim()) {
    return dapps;
  }

  const query = searchQuery.toLowerCase().trim();

  return dapps.filter((dapp) => {
    const nameMatch = dapp.name.toLowerCase().includes(query);

    const descEnMatch =
      dapp.description_en?.toLowerCase().includes(query) || false;

    const descKoMatch =
      dapp.description_ko?.toLowerCase().includes(query) || false;

    const networkMatch =
      dapp.networks?.some((network) => network.toLowerCase().includes(query)) ||
      false;

    return nameMatch || descEnMatch || descKoMatch || networkMatch;
  });
};

export const highlightText = (text: string, query: string): string => {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
};
