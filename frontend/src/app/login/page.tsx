'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { Aviso } from '@/components/Status';
import { useSessao } from '@/services/sessao';

/** UH01 — Autenticação. */
export default function Login() {
  const { usuario, entrar } = useSessao();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (usuario) router.replace('/equipamentos');
  }, [usuario, router]);

  async function aoEnviar(evento: FormEvent) {
    evento.preventDefault();
    setErro('');
    setEnviando(true);
    try {
      await entrar(email, senha);
      router.push('/equipamentos');
    } catch (e) {
      setErro((e as Error).message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <section className="hidden flex-col justify-between bg-marinho p-12 text-white md:flex">
        <span className="text-2xl font-semibold">
          Operix<span className="text-laranja-claro">.</span>
        </span>
        <div className="max-w-md space-y-4">
          <h1 className="text-4xl font-semibold leading-tight">Toda a manutenção da empresa em um só lugar.</h1>
          <p className="text-slate-300">Equipamentos, chamados, ordens de serviço e preventivas com histórico completo.</p>
        </div>
        <p className="text-sm text-slate-400">Projeto de Programação Orientada a Objetos · UNDB</p>
      </section>

      <section className="flex items-center justify-center px-4 py-12">
        <form onSubmit={aoEnviar} className="w-full max-w-sm space-y-5" noValidate>
          <div>
            <h2 className="text-2xl font-semibold">Entrar</h2>
            <p className="mt-1 text-sm text-slate-600">Use o e-mail e a senha cadastrados.</p>
          </div>
          {erro && <Aviso mensagem={erro} />}
          <div>
            <label htmlFor="email" className="rotulo">
              E-mail
            </label>
            <input id="email" type="email" autoComplete="username" required className="campo" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="senha" className="rotulo">
              Senha
            </label>
            <input id="senha" type="password" autoComplete="current-password" required className="campo" value={senha} onChange={(e) => setSenha(e.target.value)} />
          </div>
          <button type="submit" className="botao-primario w-full" disabled={enviando}>
            {enviando ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </section>
    </div>
  );
}
