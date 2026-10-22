'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Aviso, StatusEquipamentoTag } from '@/components/Status';
import { api, Equipamento, permissoes } from '@/services/api';
import { useSessao } from '@/services/sessao';

/** UH03 — Listagem e busca de equipamentos. */
export default function Equipamentos() {
  const { usuario } = useSessao();
  const podeGerenciar = permissoes.gerenciarEquipamentos(usuario);
  const [busca, setBusca] = useState('');
  const [itens, setItens] = useState<Equipamento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const atraso = setTimeout(() => {
      setCarregando(true);
      api
        .listarEquipamentos(busca)
        .then((lista) => {
          setItens(lista);
          setErro('');
        })
        .catch((e: Error) => setErro(e.message))
        .finally(() => setCarregando(false));
    }, 250);
    return () => clearTimeout(atraso);
  }, [busca]);

  async function alterarStatus(item: Equipamento) {
    try {
      const atualizado = await api.alterarStatusEquipamento(item.id, item.status === 'INATIVO' ? 'reativar' : 'inativar');
      setItens((lista) => lista.map((e) => (e.id === atualizado.id ? atualizado : e)));
    } catch (e) {
      setErro((e as Error).message);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Equipamentos</h1>
          <p className="text-sm text-slate-600">Inventário de tudo o que recebe manutenção.</p>
        </div>
        {podeGerenciar && (
          <Link href="/equipamentos/novo" className="botao-primario">
            Novo equipamento
          </Link>
        )}
      </div>

      <div className="max-w-md">
        <label htmlFor="busca" className="rotulo">
          Buscar por código, nome, tipo ou localização
        </label>
        <input id="busca" type="search" className="campo" placeholder="Ex.: galpão, CMP-001" value={busca} onChange={(e) => setBusca(e.target.value)} />
      </div>

      {erro && <Aviso mensagem={erro} />}

      <div className="cartao overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Código</th>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Localização</th>
              <th className="px-4 py-3">Status</th>
              {podeGerenciar && <th className="px-4 py-3 text-right">Ações</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {itens.map((e) => (
              <tr key={e.id}>
                <td className="px-4 py-3 font-mono text-xs">{e.codigo}</td>
                <td className="px-4 py-3 font-medium">{e.nome}</td>
                <td className="px-4 py-3 text-slate-600">{e.tipo}</td>
                <td className="px-4 py-3 text-slate-600">{e.localizacao}</td>
                <td className="px-4 py-3">
                  <StatusEquipamentoTag status={e.status} />
                </td>
                {podeGerenciar && (
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`/equipamentos/${e.id}`} className="botao-secundario px-3 py-1.5">
                        Editar
                      </Link>
                      {e.status !== 'EM_MANUTENCAO' && (
                        <button type="button" onClick={() => alterarStatus(e)} className={e.status === 'INATIVO' ? 'botao-secundario px-3 py-1.5' : 'botao-perigo px-3 py-1.5'}>
                          {e.status === 'INATIVO' ? 'Reativar' : 'Inativar'}
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {!carregando && itens.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                  {busca ? 'Nenhum equipamento encontrado para essa busca.' : 'Nenhum equipamento cadastrado ainda.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
