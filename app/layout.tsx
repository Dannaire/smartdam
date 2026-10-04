// app/layout.tsx — Root layout dengan font Inter, provider, AppShell (PRD §10)
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { QueryProvider } from "@/components/providers/QueryProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Smart Dam — Monitoring Bendungan Sumbawa",
    template: "%s | Smart Dam",
  },
  description:
    "Sistem monitoring bendungan Sumbawa secara real-time. Pantau tinggi muka air, curah hujan, peringatan dini, dan data instrumen bendungan.",
  keywords: ["bendungan", "monitoring", "smart dam", "sumbawa", "peringatan dini"],
  authors: [{ name: "BBWS Nusa Tenggara" }],
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#12408A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="font-sans">
        <QueryProvider>
          <AppShell>{children}</AppShell>
        </QueryProvider>
      </body>
    </html>
  );
}
