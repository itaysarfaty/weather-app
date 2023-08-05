import "./globals.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";

const inter = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather",
  description: "A dev challenge completed by Itay Sarfaty",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
