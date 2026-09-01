import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// The standalone bundle loads Poppins (weights 400/500/600/700/800) from
// Google Fonts. Here we load the same family via next/font/google.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Snaarp 360 — 20+ business apps. One subscription.",
  description:
    "Everything your business needs in one simple platform — mail, meetings, documents, CRM, accounting, HR and more, under a single flat subscription.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
