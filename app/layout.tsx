import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OneSpace — Everything in one space",
  description: "Learn, create, connect and play in one premium digital space."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}