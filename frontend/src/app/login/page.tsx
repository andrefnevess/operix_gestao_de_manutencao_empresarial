"use client";

import type { FormEvent } from "react";
import { entrar } from "@/app/acoes";
import { BOTAO, CAMPO, Marca } from "@/components/ui";
import { useAcao } from "@/components/usar-acao";

export default function Login() {
  const { enviando, erro, rodar } = useAcao();

  // Em caso de sucesso, a própria ação grava o cookie da sessão e leva ao painel.
  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    rodar(() => entrar(String(f.get("email")), String(f.get("senha"))));
  }

  return (
    <div className="grid min-h-screen md:grid-cols-[1fr_28rem]">
      <section className="hidden flex-col justify-between bg-petroleo-fundo p-12 text-white md:flex">
        <Marca comSlogan className="h-28 w-auto self-start" />
        <p className="max-w-md font-condensada text-4xl font-semibold leading-tight">
          Cada equipamento com histórico. Cada manutenção no prazo.
        </p>
        <p className="text-sm text-white/65">Projeto de POO · UNDB</p>
      </section>

      <main className="flex items-center px-6 py-12 md:px-12">
        <form onSubmit={enviar} className="w-full">
          <div className="mb-8 rounded-md bg-petroleo-fundo p-4 md:hidden">
            <Marca className="h-9 w-auto" />
          </div>
          <h1 className="font-condensada text-3xl font-semibold">Entrar no Operix</h1>
          <p className="mb-7 mt-1 text-mudo">Use o e-mail e a senha do seu cadastro.</p>

          <label htmlFor="email" className="mb-1 block text-sm font-medium">E-mail</label>
          <input id="email" name="email" type="email" required autoComplete="username" className={`${CAMPO} mb-4`} />
          <label htmlFor="senha" className="mb-1 block text-sm font-medium">Senha</label>
          <input id="senha" name="senha" type="password" required autoComplete="current-password" className={`${CAMPO} mb-4`} />

          {erro && <p role="alert" className="mb-4 text-sm font-medium text-ferrugem">{erro}</p>}
          <button type="submit" disabled={enviando} className={`${BOTAO} w-full py-2.5`}>
            {enviando ? "Entrando" : "Entrar"}
          </button>

          <p className="mt-6 rounded-sm bg-papel px-3 py-2 text-sm text-mudo">
            Contas de exemplo: admin, gestor, tecnico e solicitante, todas @operix.local. A senha é a definida em SENHA_EXEMPLO na API.
          </p>
        </form>
      </main>
    </div>
  );
}