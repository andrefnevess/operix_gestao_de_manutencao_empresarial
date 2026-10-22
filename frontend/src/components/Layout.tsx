'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { NOME_PERFIL, permissoes } from '../services/api';
import { useSessao } from '../services/sessao';

export function Layout({ children }: { children: ReactNode }) {
  const { usuario, sair } = useSessao();
  const router = useRouter();
  const caminho = usePathname();

  const link = (destino: string) =>
    `rounded-md px-3 py-2 text-sm font-medium ${caminho.startsWith(destino) ? 'bg-marinho-claro text-white' : 'text-slate-300 hover:text-white'}`;

  async function aoSair() {
    await sair();
    router.push('/login');
  }

  return (
    <div className="min-h-screen">
      <header className="bg-marinho">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-3">
          <span className="text-lg font-semibold tracking-tight text-white">
            Operix<span className="text-laranja-claro">.</span>
          </span>
          <nav className="flex flex-1 flex-wrap gap-1" aria-label="Principal">
            <Link href="/equipamentos" className={link('/equipamentos')}>
              Equipamentos
            </Link>
            {permissoes.gerenciarUsuarios(usuario) && (
              <Link href="/usuarios" className={link('/usuarios')}>
                Usuários
              </Link>
            )}
          </nav>
          {usuario && (
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <span>
                {usuario.nome} · <span className="text-laranja-claro">{NOME_PERFIL[usuario.perfil]}</span>
              </span>
              <button type="button" onClick={aoSair} className="rounded-md border border-slate-500 px-3 py-1.5 text-white hover:bg-marinho-claro">
                Sair
              </button>
            </div>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
