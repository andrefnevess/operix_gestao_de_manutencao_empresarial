import { redirect } from "next/navigation";

// O layout das telas internas manda para o login quando não há sessão.
export default function Inicio() {
  redirect("/painel");
}
