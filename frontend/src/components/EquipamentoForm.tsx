'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Aviso } from './Status';
import { api, DadosEquipamento } from '../services/api';

const VAZIO: DadosEquipamento = { codigo: '', nome: '', tipo: '', localizacao: '', fabricante: '', modelo: '', dataAquisicao: '' };

/** UH03 — Cadastro e edição de equipamento (gestor). */
export function EquipamentoForm({ id }: { id?: string }) {
  const editando = Boolean(id);
  const router = useRouter();
  const [dados, setDados] = useState<DadosEquipamento>(VAZIO);
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (!id) return;
    api
      .buscarEquipamento(id)
      .then((e) =>
        setDados({
          codigo: e.codigo,
          nome: e.nome,
          tipo: e.tipo,
          localizacao: e.localizacao,
          fabricante: e.fabricante ?? '',
          modelo: e.modelo ?? '',
          dataAquisicao: e.dataAquisicao ?? '',
        }),
      )
      .catch((e: Error) => setErro(e.message));
  }, [id]);

  function campo(nome: keyof DadosEquipamento) {
    return {
      id: nome,
      name: nome,
      value: dados[nome] ?? '',
      onChange: (e: { target: { value: string } }) => setDados((d) => ({ ...d, [nome]: e.target.value })),
      className: 'campo',
    };
  }

  async function aoSalvar(evento: FormEvent) {
    evento.preventDefault();
    setErro('');
    setSalvando(true);
    const corpo: DadosEquipamento = {
      codigo: dados.codigo,
      nome: dados.nome,
      tipo: dados.tipo,
      localizacao: dados.localizacao,
      ...(dados.fabricante ? { fabricante: dados.fabricante } : {}),
      ...(dados.modelo ? { modelo: dados.modelo } : {}),
      ...(dados.dataAquisicao ? { dataAquisicao: dados.dataAquisicao } : {}),
    };
    try {
      if (id) await api.atualizarEquipamento(id, corpo);
      else await api.criarEquipamento(corpo);
      router.push('/equipamentos');
    } catch (e) {
      setErro((e as Error).message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <form onSubmit={aoSalvar} className="max-w-2xl space-y-6" noValidate>
      <div>
        <Link href="/equipamentos" className="text-sm text-laranja hover:underline">
          ← Equipamentos
        </Link>
        <h1 className="mt-2 text-2xl font-semibold">{editando ? 'Editar equipamento' : 'Novo equipamento'}</h1>
        <p className="text-sm text-slate-600">Campos com * são obrigatórios. O código não pode se repetir.</p>
      </div>

      {erro && <Aviso mensagem={erro} />}

      <div className="cartao grid gap-4 p-6 sm:grid-cols-2">
        <div>
          <label htmlFor="codigo" className="rotulo">
            Código *
          </label>
          <input {...campo('codigo')} required placeholder="CMP-001" />
        </div>
        <div>
          <label htmlFor="nome" className="rotulo">
            Nome *
          </label>
          <input {...campo('nome')} required placeholder="Compressor de ar" />
        </div>
        <div>
          <label htmlFor="tipo" className="rotulo">
            Tipo *
          </label>
          <input {...campo('tipo')} required placeholder="Compressor" />
        </div>
        <div>
          <label htmlFor="localizacao" className="rotulo">
            Localização *
          </label>
          <input {...campo('localizacao')} required placeholder="Galpão A" />
        </div>
        <div>
          <label htmlFor="fabricante" className="rotulo">
            Fabricante
          </label>
          <input {...campo('fabricante')} />
        </div>
        <div>
          <label htmlFor="modelo" className="rotulo">
            Modelo
          </label>
          <input {...campo('modelo')} />
        </div>
        <div>
          <label htmlFor="dataAquisicao" className="rotulo">
            Data de aquisição
          </label>
          <input {...campo('dataAquisicao')} type="date" />
        </div>
      </div>

      <div className="flex gap-3">
        <button type="submit" className="botao-primario" disabled={salvando}>
          {salvando ? 'Salvando…' : 'Salvar equipamento'}
        </button>
        <Link href="/equipamentos" className="botao-secundario">
          Cancelar
        </Link>
      </div>
    </form>
  );
}
