import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CabecalhoPagina } from "@/components/ui";
import { listarUsuarios, obterUsuario } from "@/services/operix";
import { UsuariosView } from "./usuarios-view";

export const metadata: Metadata = { title: "Usuários" };

export default async function Usuarios() {
  const usuario = await obterUsuario();
  if (usuario.perfil !== "ADMINISTRADOR") redirect("/painel");
  return (
    <>
      <CabecalhoPagina titulo="Usuários" descricao="Quem acessa o Operix e com qual perfil." />
      <UsuariosView usuarios={await listarUsuarios()} idAtual={usuario.id} />
    </>
  );
}
