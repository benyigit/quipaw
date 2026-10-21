import { CommerceProvider } from "@/components/commerce-provider";
import { LanguageProvider } from "@/components/language-provider";
import type { Metadata } from "next";
import { FavoritesProvider } from "@/components/favorites-provider";
import "./globals.css";
import "./refinements.css";
export const metadata: Metadata = {
  title: "Quipaw — Good treats, happy tails",
  description: "Quipaw dog treats: natural chews, happy dogs and bright little moments."
};
export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const language = 'en';
  return <html lang={language}><body className="quipaw-site"><LanguageProvider initialLanguage={language} brand="quipaw"><FavoritesProvider><CommerceProvider brand="quipaw">{children}</CommerceProvider></FavoritesProvider></LanguageProvider></body></html>;
}
