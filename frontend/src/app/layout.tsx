import type { Metadata } from "next";
// Fontes locais (IBM Plex, licença OFL em ../fonts/OFL.txt): o build não depende do Google Fonts,
// que falhava de vez em quando no CI e no Docker.
import localFont from "next/font/local";
import "./globals.css";

const plex = localFont({
  variable: "--font-plex",
  src: [
    { path: "../fonts/ibm-plex-sans-latin-400-normal.woff2", weight: "400" },
    { path: "../fonts/ibm-plex-sans-latin-500-normal.woff2", weight: "500" },
    { path: "../fonts/ibm-plex-sans-latin-600-normal.woff2", weight: "600" },
  ],
});
const plexCondensada = localFont({
  variable: "--font-plex-cond",
  src: [
    { path: "../fonts/ibm-plex-sans-condensed-latin-500-normal.woff2", weight: "500" },
    { path: "../fonts/ibm-plex-sans-condensed-latin-600-normal.woff2", weight: "600" },
    { path: "../fonts/ibm-plex-sans-condensed-latin-700-normal.woff2", weight: "700" },
  ],
});

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
