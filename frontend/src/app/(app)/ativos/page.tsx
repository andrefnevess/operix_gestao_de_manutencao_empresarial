import type { Metadata } from "next";
import { CabecalhoPagina } from "@/components/ui";
import { listarAtivos } from "@/services/operix";
import { AtivosView } from "./ativos-view";

export const metadata: Metadata = { title: "Ativos" };

export default async function Ativos() {
  const ativos = await listarAtivos();
  return (
    <>
      <CabecalhoPagina titulo="Ativos" descricao="Inventário de equipamentos, máquinas e instalações." />
      <AtivosView inicial={ativos} />
    </>
  );
}