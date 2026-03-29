import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Premium Custom Headwear Manufacturer | NanCrown",
    template: "%s | NanCrown",
  },
  description:
    "Professional headwear manufacturer specializing in custom baseball caps, bucket hats, snapbacks, and more. Quality craftsmanship with competitive factory-direct pricing.",
  keywords: [
    "custom hats",
    "hat manufacturer",
    "baseball caps",
    "bucket hats",
    "snapbacks",
    "custom headwear",
    "hat factory",
    "OEM hats",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
