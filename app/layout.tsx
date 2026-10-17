import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quipaw — Good treats, happy tails",
  description: "Quipaw dog treats: natural chews, happy dogs and bright little moments.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="quipaw-site">{children}</body></html>;
}
