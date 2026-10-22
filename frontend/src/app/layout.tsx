import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { ProvedorSessao } from "@/services/sessao";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "Operix — Gestão de Manutenção",
  description: "Gestão de manutenção empresarial: equipamentos, chamados, ordens de serviço e preventivas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body>
        <ProvedorSessao>{children}</ProvedorSessao>
      </body>
    </html>
  );
}
