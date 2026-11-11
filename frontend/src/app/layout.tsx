import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Sans_Condensed } from "next/font/google";
import "./globals.css";

const plex = IBM_Plex_Sans({ variable: "--font-plex", subsets: ["latin"], weight: ["400", "500", "600"] });
const plexCondensada = IBM_Plex_Sans_Condensed({ variable: "--font-plex-cond", subsets: ["latin"], weight: ["500", "600", "700"] });

export const metadata: Metadata = {
  title: { default: "Operix", template: "%s · Operix" },
  description: "Gestão de manutenção empresarial: ativos, ordens de serviço e planos preventivos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${plex.variable} ${plexCondensada.variable} font-sans antialiased`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}