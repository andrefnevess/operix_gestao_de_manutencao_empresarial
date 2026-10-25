"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Marca } from "./ui";

const ITENS = [
  { href: "/painel", rotulo: "Painel" },
  { href: "/ordens", rotulo: "Ordens de serviço" },
  { href: "/ativos", rotulo: "Ativos" },
];

export function Sidebar() {
  const rota = usePathname();
  return (
    <aside className="foco-claro bg-petroleo-fundo text-white md:sticky md:top-0 md:flex md:h-screen md:flex-col md:justify-between md:px-4 md:py-6">
      <div className="flex items-center gap-4 overflow-x-auto px-4 py-3 md:block md:overflow-visible md:p-0">
        <Link href="/painel" className="shrink-0 md:mb-8 md:block md:px-2"><Marca className="h-7 w-auto md:h-11" /></Link>
        <nav aria-label="Principal" className="flex gap-1 md:flex-col">
          {ITENS.map((i) => {
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
      </div>
      <div className="hidden px-2 text-sm md:block">
        <p className="font-medium">Gestor de manutenção</p>
        <p className="text-white/65">gestor@operix.com</p>
        <Link href="/login" className="mt-3 inline-block text-white/75 underline underline-offset-4 hover:text-white">Sair</Link>
      </div>
    </aside>
  );
}