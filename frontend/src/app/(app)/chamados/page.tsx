import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CabecalhoPagina } from "@/components/ui";
import { listarAtivos, listarChamados, obterUsuario } from "@/services/operix";
import { ChamadosView } from "./chamados-view";

export const metadata: Metadata = { title: "Chamados" };

export default async function Chamados() {
  const usuario = await obterUsuario();
  if (usuario.perfil !== "GESTOR" && usuario.perfil !== "SOLICITANTE") redirect("/painel");
  const [chamados, ativos] = await Promise.all([listarChamados(), listarAtivos()]);
  // O solicitante acompanha os próprios chamados; o gestor vê todos.
  const visiveis = usuario.perfil === "GESTOR" ? chamados : chamados.filter((c) => c.solicitanteId === usuario.id);
  return (
    <>
      <CabecalhoPagina titulo="Chamados" descricao="Pedidos de manutenção abertos por quem usa os equipamentos." />
      <ChamadosView
        chamados={visiveis.sort((a, b) => b.abertoEm.localeCompare(a.abertoEm))}
        ativos={ativos.filter((a) => a.status !== "INATIVO")} usuario={usuario}
      />
    </>
  );
}
