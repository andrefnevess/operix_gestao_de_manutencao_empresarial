"use client";

import { useState, type FormEvent } from "react";
import { BOTAO, CAMPO, PilulaAtivo } from "@/components/ui";
import { formatarData } from "@/lib/formatar";
import type { Ativo } from "@/lib/tipos";
import { criarAtivo } from "@/services/operix";

type Erros = Partial<Record<"codigo" | "nome" | "localizacao", string>>;

export function AtivosView({ inicial }: { inicial: Ativo[] }) {
  const [ativos, setAtivos] = useState(inicial);
  const [busca, setBusca] = useState("");
  const [formAberto, setFormAberto] = useState(false);
  const [erros, setErros] = useState<Erros>({});
  const [aviso, setAviso] = useState("");
  const termo = busca.trim().toLowerCase();
  const visiveis = ativos.filter((a) => !termo || `${a.codigo} ${a.nome} ${a.localizacao}`.toLowerCase().includes(termo));

  async function salvar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const codigo = String(f.get("codigo")).trim().toUpperCase();
    const nome = String(f.get("nome")).trim();
    const localizacao = String(f.get("localizacao")).trim();

    const novos: Erros = {};
    if (!codigo) novos.codigo = "Informe o código do equipamento.";
    else if (ativos.some((a) => a.codigo === codigo)) novos.codigo = `Já existe um ativo com o código ${codigo}.`;
    if (!nome) novos.nome = "Informe o nome do equipamento.";
    if (!localizacao) novos.localizacao = "Informe onde o equipamento fica.";
    setErros(novos);
    if (Object.keys(novos).length) return;

    const criado = await criarAtivo({ codigo, nome, localizacao });
    setAtivos([criado, ...ativos]);
    setAviso(`Ativo ${codigo} cadastrado.`);
    setFormAberto(false);
  }

  const campo = (id: "codigo" | "nome" | "localizacao", rotulo: string, dica: string) => (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">{rotulo}</label>
      <input id={id} name={id} placeholder={dica} className={CAMPO} aria-invalid={!!erros[id]} aria-describedby={erros[id] ? `${id}-erro` : undefined} />
      {erros[id] && <p id={`${id}-erro`} className="mt-1 text-sm text-ferrugem">{erros[id]}</p>}
    </div>
  );

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <input type="search" value={busca} onChange={(e) => setBusca(e.target.value)} aria-label="Buscar ativo"
          placeholder="Buscar por código, nome ou local" className={`${CAMPO} sm:max-w-sm`} />
        {!formAberto && <button type="button" className={BOTAO} onClick={() => { setFormAberto(true); setAviso(""); }}>Novo ativo</button>}
      </div>

      {aviso && <p role="status" className="mb-4 rounded-sm bg-[#d6eadd] px-4 py-2 text-sm text-[#255238]">{aviso}</p>}

      {formAberto && (
        <form onSubmit={salvar} noValidate className="mb-6 rounded-sm border border-linha bg-papel p-5">
          <h2 className="mb-4 font-condensada text-xl font-semibold">Novo ativo</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {campo("codigo", "Código", "Ex.: CP-021")}
            {campo("nome", "Nome", "Ex.: Compressor de parafuso")}
            {campo("localizacao", "Localização", "Ex.: Casa de máquinas")}
          </div>
          <div className="mt-5 flex gap-3">
            <button type="submit" className={BOTAO}>Salvar ativo</button>
            <button type="button" onClick={() => { setFormAberto(false); setErros({}); }} className="rounded-md px-4 py-2 text-sm font-medium hover:bg-concreto">Cancelar</button>
          </div>
        </form>
      )}

      {visiveis.length === 0 ? (
        <div className="rounded-sm bg-papel px-4 py-10 text-center">
          <p className="font-medium">Nenhum ativo encontrado</p>
          <p className="mt-1 text-sm text-mudo">Confira a grafia do código, nome ou local, ou cadastre um novo ativo.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-sm bg-papel">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="border-b border-linha text-mudo">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">Código</th>
                <th scope="col" className="px-4 py-3 font-medium">Equipamento</th>
                <th scope="col" className="px-4 py-3 font-medium">Localização</th>
                <th scope="col" className="px-4 py-3 font-medium">Status</th>
                <th scope="col" className="px-4 py-3 font-medium">Cadastro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-linha">
              {visiveis.map((a) => (
                <tr key={a.id}>
                  <th scope="row" className="px-4 py-3 font-condensada text-base font-semibold">{a.codigo}</th>
                  <td className="px-4 py-3 font-medium">{a.nome}</td>
                  <td className="px-4 py-3">{a.localizacao}</td>
                  <td className="px-4 py-3"><PilulaAtivo status={a.status} /></td>
                  <td className="px-4 py-3 tabular-nums text-mudo">{formatarData(a.criadoEm)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}