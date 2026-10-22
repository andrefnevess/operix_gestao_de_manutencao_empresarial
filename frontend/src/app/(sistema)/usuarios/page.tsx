'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Protegida } from '@/components/Protegida';
import { Aviso, AtivoTag } from '@/components/Status';
import { api, NOME_PERFIL, permissoes, Usuario } from '@/services/api';
import { useSessao } from '@/services/sessao';

/** UH02 — Gestão de usuários e perfis (administrador). */
function ListaUsuarios() {
  const { usuario: logado } = useSessao();
  const [itens, setItens] = useState<Usuario[]>([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    api
      .listarUsuarios()
      .then(setItens)
      .catch((e: Error) => setErro(e.message));
  }, []);

  async function alterarStatus(u: Usuario) {
    try {
      const atualizado = await api.alterarStatusUsuario(u.id, u.ativo ? 'inativar' : 'reativar');
      setItens((lista) => lista.map((x) => (x.id === atualizado.id ? atualizado : x)));
    } catch (e) {
      setErro((e as Error).message);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Usuários</h1>
          <p className="text-sm text-slate-600">Quem acessa o sistema e o que cada perfil pode fazer.</p>
        </div>
        <Link href="/usuarios/novo" className="botao-primario">
          Novo usuário
        </Link>
      </div>

      {erro && <Aviso mensagem={erro} />}

      <div className="cartao overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">E-mail</th>
              <th className="px-4 py-3">Perfil</th>
              <th className="px-4 py-3">Situação</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {itens.map((u) => (
              <tr key={u.id}>
                <td className="px-4 py-3 font-medium">
                  {u.nome}
                  {u.especialidades.length > 0 && <span className="block text-xs font-normal text-slate-500">{u.especialidades.join(', ')}</span>}
                </td>
                <td className="px-4 py-3 text-slate-600">{u.email}</td>
                <td className="px-4 py-3">{NOME_PERFIL[u.perfil]}</td>
                <td className="px-4 py-3">
                  <AtivoTag ativo={u.ativo} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link href={`/usuarios/${u.id}`} className="botao-secundario px-3 py-1.5">
                      Editar
                    </Link>
                    {u.id !== logado?.id && (
                      <button type="button" onClick={() => alterarStatus(u)} className={u.ativo ? 'botao-perigo px-3 py-1.5' : 'botao-secundario px-3 py-1.5'}>
                        {u.ativo ? 'Inativar' : 'Reativar'}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Usuarios() {
  return (
    <Protegida regra={permissoes.gerenciarUsuarios}>
      <ListaUsuarios />
    </Protegida>
  );
}
