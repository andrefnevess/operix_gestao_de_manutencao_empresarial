import type { Metadata } from "next";
import { CabecalhoPagina } from "@/components/ui";
import { listarOrdens } from "@/services/operix";
import { OrdensView } from "./ordens-view";

export const metadata: Metadata = { title: "Ordens de serviço" };
export const dynamic = "force-dynamic";

export default async function Ordens() {
  const ordens = await listarOrdens();
  return (
    <>
      <CabecalhoPagina titulo="Ordens de serviço" descricao="Acompanhe o que está aberto, com quem está e o que já foi resolvido." />
      <OrdensView ordens={ordens} />
    </>
  );
}