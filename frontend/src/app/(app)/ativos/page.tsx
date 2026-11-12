import type { Metadata } from "next";
import { CabecalhoPagina } from "@/components/ui";
import { listarAtivos, obterUsuario } from "@/services/operix";
import { AtivosView } from "./ativos-view";

export const metadata: Metadata = { title: "Ativos" };

export default async function Ativos() {
  const [ativos, usuario] = await Promise.all([listarAtivos(), obterUsuario()]);
  return (
    <>
      <CabecalhoPagina titulo="Ativos" descricao="Inventário de equipamentos, máquinas e instalações." />
      <AtivosView ativos={ativos} podeGerenciar={usuario.perfil === "GESTOR"} />
    </>
  );
}
