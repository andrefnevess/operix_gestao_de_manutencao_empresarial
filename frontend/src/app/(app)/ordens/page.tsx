import type { Metadata } from "next";
import { CabecalhoPagina } from "@/components/ui";
import { listarOrdens, listarTecnicos, obterUsuario } from "@/services/operix";
import { OrdensView } from "./ordens-view";

export const metadata: Metadata = { title: "Ordens de serviço" };

export default async function Ordens() {
  const usuario = await obterUsuario();
  // Só o gestor atribui ordens, então só ele precisa da lista de técnicos.
  const [ordens, tecnicos] = await Promise.all([listarOrdens(), usuario.perfil === "GESTOR" ? listarTecnicos() : []]);
  return (
    <>
      <CabecalhoPagina titulo="Ordens de serviço" descricao="Acompanhe o que está aberto, com quem está e o que já foi resolvido." />
      <OrdensView ordens={ordens} tecnicos={tecnicos} perfil={usuario.perfil} />
    </>
  );
}
