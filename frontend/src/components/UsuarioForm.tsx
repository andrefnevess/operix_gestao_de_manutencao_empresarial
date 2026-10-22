'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Aviso } from './Status';
import { api, NOME_PERFIL, Perfil } from '../services/api';

/** UH02 — Cadastro e edição de usuário (administrador). */
export function UsuarioForm({ id }: { id?: string }) {
  const editando = Boolean(id);
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [perfil, setPerfil] = useState<Perfil>('SOLICITANTE');
  const [especialidades, setEspecialidades] = useState('');
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (!id) return;
    api
      .buscarUsuario(id)
      .then((u) => {
        setNome(u.nome);
        setEmail(u.email);
        setPerfil(u.perfil);
        setEspecialidades(u.especialidades.join(', '));
      })
      .catch((e: Error) => setErro(e.message));
  }, [id]);

  async function aoSalvar(evento: FormEvent) {
    evento.preventDefault();
    setErro('');
    setSalvando(true);
    const lista = especialidades
      .split(',')
      .map((e) => e.trim())
      .filter(Boolean);
    try {
      if (id) {
        await api.atualizarUsuario(id, { nome, email, perfil, ...(perfil === 'TECNICO' ? { especialidades: lista } : {}) });
      } else {
        await api.criarUsuario({ nome, email, senha, perfil, ...(perfil === 'TECNICO' ? { especialidades: lista } : {}) });
      }
      router.push('/usuarios');
    } catch (e) {
      setErro((e as Error).message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <form onSubmit={aoSalvar} className="max-w-2xl space-y-6" noValidate>
      <div>
        <Link href="/usuarios" className="text-sm text-laranja hover:underline">
          ← Usuários
        </Link>
        <h1 className="mt-2 text-2xl font-semibold">{editando ? 'Editar usuário' : 'Novo usuário'}</h1>
        <p className="text-sm text-slate-600">O e-mail não pode se repetir. A senha é guardada de forma protegida e nunca é exibida.</p>
      </div>

      {erro && <Aviso mensagem={erro} />}

      <div className="cartao grid gap-4 p-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="nome" className="rotulo">
            Nome *
          </label>
          <input id="nome" className="campo" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="email" className="rotulo">
            E-mail *
          </label>
          <input id="email" type="email" className="campo" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="perfil" className="rotulo">
            Perfil *
          </label>
          <select id="perfil" className="campo" value={perfil} onChange={(e) => setPerfil(e.target.value as Perfil)}>
            {(Object.keys(NOME_PERFIL) as Perfil[]).map((p) => (
              <option key={p} value={p}>
                {NOME_PERFIL[p]}
              </option>
            ))}
          </select>
        </div>
        {!editando && (
          <div>
            <label htmlFor="senha" className="rotulo">
              Senha inicial * <span className="font-normal text-slate-500">(mínimo 8 caracteres)</span>
            </label>
            <input id="senha" type="password" autoComplete="new-password" className="campo" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          </div>
        )}
        {perfil === 'TECNICO' && (
          <div className="sm:col-span-2">
            <label htmlFor="especialidades" className="rotulo">
              Especialidades <span className="font-normal text-slate-500">(separadas por vírgula)</span>
            </label>
            <input id="especialidades" className="campo" placeholder="Elétrica, Refrigeração" value={especialidades} onChange={(e) => setEspecialidades(e.target.value)} />
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button type="submit" className="botao-primario" disabled={salvando}>
          {salvando ? 'Salvando…' : 'Salvar usuário'}
        </button>
        <Link href="/usuarios" className="botao-secundario">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
