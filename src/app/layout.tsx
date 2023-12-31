import type { Metadata } from "next";
import "./globals.css";
import "./font.css";

export const metadata: Metadata = {
  title: "Versespot",
  description:
    "A simple way to find Bible verses. Search a verse, word, phrase or anything written in the Bible",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">{children}</body>
    </html>
  );
}
