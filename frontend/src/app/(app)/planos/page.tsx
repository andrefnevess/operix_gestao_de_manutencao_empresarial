import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CabecalhoPagina } from "@/components/ui";
import { listarAtivos, listarPlanos, obterUsuario } from "@/services/operix";
import { PlanosView } from "./planos-view";

export const metadata: Metadata = { title: "Preventivas" };

export default async function Planos() {
  if ((await obterUsuario()).perfil !== "GESTOR") redirect("/painel");
  const [planos, ativos] = await Promise.all([listarPlanos(), listarAtivos()]);
  return (
    <>
      <CabecalhoPagina titulo="Preventivas" descricao="Planos de manutenção periódica e alertas de vencimento." />
      <PlanosView planos={planos} ativos={ativos.filter((a) => a.status !== "INATIVO")} />
    </>
  );
}
