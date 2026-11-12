"use client";

import { useState, type FormEvent } from "react";
import { criarAtivo, mudarStatusAtivo } from "@/app/acoes";
import { BOTAO, BOTAO_SECUNDARIO, CAMPO, MensagemErro, PilulaAtivo, ROTULO, Vazio } from "@/components/ui";
import { useAcao } from "@/components/usar-acao";
import type { Ativo } from "@/lib/tipos";

type Campo = "codigo" | "nome" | "tipo" | "localizacao";
type Erros = Partial<Record<Campo, string>>;

export function AtivosView({ ativos, podeGerenciar }: { ativos: Ativo[]; podeGerenciar: boolean }) {
  const [busca, setBusca] = useState("");
  const [formAberto, setFormAberto] = useState(false);
  const [erros, setErros] = useState<Erros>({});
  const [aviso, setAviso] = useState("");
  const { enviando, erro, rodar, limparErro } = useAcao();
  const termo = busca.trim().toLowerCase();
  const visiveis = ativos.filter((a) => !termo || `${a.codigo} ${a.nome} ${a.tipo} ${a.localizacao}`.toLowerCase().includes(termo));

  function salvar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const codigo = String(f.get("codigo")).trim().toUpperCase();
    const nome = String(f.get("nome")).trim();
    const tipo = String(f.get("tipo")).trim();
    const localizacao = String(f.get("localizacao")).trim();

    const novos: Erros = {};
    if (!codigo) novos.codigo = "Informe o código do equipamento.";
    if (!nome) novos.nome = "Informe o nome do equipamento.";
    if (!tipo) novos.tipo = "Informe o tipo do equipamento.";
    if (!localizacao) novos.localizacao = "Informe onde o equipamento fica.";
    setErros(novos);
    if (Object.keys(novos).length) return;

    // Código duplicado e demais regras são conferidos pela API.
    rodar(() => criarAtivo({ codigo, nome, tipo, localizacao }), () => {
      setAviso(`Ativo ${codigo} cadastrado.`);
      setFormAberto(false);
    });
  }

  const campo = (id: Campo, rotulo: string, dica: string) => (
    <div>
      <label htmlFor={id} className={ROTULO}>{rotulo}</label>
      <input id={id} name={id} placeholder={dica} className={CAMPO} aria-invalid={!!erros[id]} aria-describedby={erros[id] ? `${id}-erro` : undefined} />
      {erros[id] && <p id={`${id}-erro`} className="mt-1 text-sm text-ferrugem">{erros[id]}</p>}
    </div>
  );

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <input type="search" value={busca} onChange={(e) => setBusca(e.target.value)} aria-label="Buscar ativo"
          placeholder="Buscar por código, nome, tipo ou local" className={`${CAMPO} sm:max-w-sm`} />
        {podeGerenciar && !formAberto && (
          <button type="button" className={BOTAO} onClick={() => { setFormAberto(true); setAviso(""); limparErro(); }}>Novo ativo</button>
        )}
      </div>

      {aviso && <p role="status" className="mb-4 rounded-sm bg-[#d6eadd] px-4 py-2 text-sm text-[#255238]">{aviso}</p>}
      {!formAberto && <div className="mb-4"><MensagemErro>{erro}</MensagemErro></div>}

      {formAberto && (
        <form onSubmit={salvar} noValidate className="mb-6 rounded-sm border border-linha bg-papel p-5">
          <h2 className="mb-4 font-condensada text-xl font-semibold">Novo ativo</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {campo("codigo", "Código", "Ex.: CP-021")}
            {campo("nome", "Nome", "Ex.: Compressor de parafuso")}
            {campo("tipo", "Tipo", "Ex.: Compressor")}
            {campo("localizacao", "Localização", "Ex.: Casa de máquinas")}
          </div>
          <div className="mt-4"><MensagemErro>{erro}</MensagemErro></div>
          <div className="mt-5 flex gap-3">
            <button type="submit" disabled={enviando} className={BOTAO}>{enviando ? "Salvando" : "Salvar ativo"}</button>
            <button type="button" onClick={() => { setFormAberto(false); setErros({}); limparErro(); }} className="rounded-md px-4 py-2 text-sm font-medium hover:bg-concreto">Cancelar</button>
          </div>
        </form>
      )}

      {visiveis.length === 0 ? (
        <Vazio titulo="Nenhum ativo encontrado" dica="Confira a grafia do código, nome ou local." />
      ) : (
        <div className="overflow-x-auto rounded-sm bg-papel">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="border-b border-linha text-mudo">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">Código</th>
                <th scope="col" className="px-4 py-3 font-medium">Equipamento</th>
                <th scope="col" className="px-4 py-3 font-medium">Tipo</th>
                <th scope="col" className="px-4 py-3 font-medium">Localização</th>
                <th scope="col" className="px-4 py-3 font-medium">Status</th>
                {podeGerenciar && <th scope="col" className="px-4 py-3 font-medium"><span className="sr-only">Ações</span></th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-linha">
              {visiveis.map((a) => (
                <tr key={a.id}>
                  <th scope="row" className="px-4 py-3 font-condensada text-base font-semibold">{a.codigo}</th>
                  <td className="px-4 py-3 font-medium">{a.nome}</td>
                  <td className="px-4 py-3">{a.tipo}</td>
                  <td className="px-4 py-3">{a.localizacao}</td>
                  <td className="px-4 py-3"><PilulaAtivo status={a.status} /></td>
                  {podeGerenciar && (
                    <td className="px-4 py-3 text-right">
                      {a.status === "ATIVO" && <button type="button" disabled={enviando} className={BOTAO_SECUNDARIO} onClick={() => rodar(() => mudarStatusAtivo(a.id, "inativar"))}>Inativar</button>}
                      {a.status === "INATIVO" && <button type="button" disabled={enviando} className={BOTAO_SECUNDARIO} onClick={() => rodar(() => mudarStatusAtivo(a.id, "reativar"))}>Reativar</button>}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
