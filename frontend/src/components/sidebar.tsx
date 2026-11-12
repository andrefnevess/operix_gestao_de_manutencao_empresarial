"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sair } from "@/app/acoes";
import { ROTULO_PERFIL, type Perfil, type Usuario } from "@/lib/tipos";
import { Marca } from "./ui";

// Cada perfil vê só o que a API permite a ele.
const ITENS: { href: string; rotulo: string; perfis: Perfil[] }[] = [
  { href: "/painel", rotulo: "Painel", perfis: ["ADMINISTRADOR", "GESTOR", "TECNICO", "SOLICITANTE"] },
  { href: "/chamados", rotulo: "Chamados", perfis: ["GESTOR", "SOLICITANTE"] },
  { href: "/ordens", rotulo: "Ordens de serviço", perfis: ["GESTOR", "TECNICO"] },
  { href: "/planos", rotulo: "Preventivas", perfis: ["GESTOR"] },
  { href: "/ativos", rotulo: "Ativos", perfis: ["ADMINISTRADOR", "GESTOR", "TECNICO", "SOLICITANTE"] },
  { href: "/usuarios", rotulo: "Usuários", perfis: ["ADMINISTRADOR"] },
];

export function Sidebar({ usuario }: { usuario: Usuario }) {
  const rota = usePathname();
  return (
    <aside className="foco-claro bg-petroleo-fundo text-white md:sticky md:top-0 md:flex md:h-screen md:flex-col md:justify-between md:px-4 md:py-6">
      <div className="flex items-center gap-4 overflow-x-auto px-4 py-3 md:block md:overflow-visible md:p-0">
        <Link href="/painel" className="shrink-0 md:mb-8 md:block md:px-2"><Marca className="h-7 w-auto md:h-11" /></Link>
        <nav aria-label="Principal" className="flex gap-1 md:flex-col">
          {ITENS.filter((i) => i.perfis.includes(usuario.perfil)).map((i) => {
            const ativo = rota.startsWith(i.href);
            return (
              <Link
                key={i.href} href={i.href} aria-current={ativo ? "page" : undefined}
                className={`whitespace-nowrap rounded-md px-3 py-2 text-sm ${ativo ? "bg-white/15 font-medium" : "text-white/75 hover:bg-white/10 hover:text-white"}`}
              >
                {i.rotulo}
              </Link>
            );
          })}
        </nav>
        <form action={sair} className="ml-auto md:hidden">
          <button type="submit" className="whitespace-nowrap rounded-md px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white">Sair</button>
        </form>
      </div>
      <div className="hidden px-2 text-sm md:block">
        <p className="font-medium">{usuario.nome}</p>
        <p className="text-white/65">{ROTULO_PERFIL[usuario.perfil]}</p>
        <p className="break-all text-white/65">{usuario.email}</p>
        <form action={sair}>
          <button type="submit" className="mt-3 text-white/75 underline underline-offset-4 hover:text-white">Sair</button>
        </form>
      </div>
    </aside>
  );
}
