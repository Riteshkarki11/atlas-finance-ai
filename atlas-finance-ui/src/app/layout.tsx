import type { Metadata } from "next";
import "./globals.css";

import Providers from "../providers/Providers";

export const metadata: Metadata = {
  title: "Atlas Finance AI",
  description: "AI-Powered Investment Research Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}