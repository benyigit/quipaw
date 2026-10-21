import type { Metadata } from "next";
import ShopPageView from "./page-view";
export const metadata: Metadata = {
  title: "Shop the Chews — Quipaw",
  description: "Explore natural Quipaw chews for curious noses and happy dogs."
};
export default async function ShopPage({
  searchParams
}: {
  searchParams: Promise<{
    q?: string | string[];
    favorites?: string | string[];
  }>;
}) {
  const params = await searchParams;
  return <ShopPageView initialSearch={typeof params.q === "string" ? params.q : ""} initialFavoritesOnly={params.favorites === "1"} />;
}
