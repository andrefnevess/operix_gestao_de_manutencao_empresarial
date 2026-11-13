"use client";

import { useState, type FormEvent } from "react";
import { criarPlano, gerarOrdemDoPlano } from "@/app/acoes";
import { BOTAO, BOTAO_SECUNDARIO, CAMPO, MensagemErro, Pilula, ROTULO, Vazio } from "@/components/ui";
import { useAcao } from "@/components/usar-acao";
import { formatarData, plural } from "@/lib/formatar";
import type { Ativo, PlanoListado } from "@/lib/tipos";

export function PlanosView({ planos, ativos }: { planos: PlanoListado[]; ativos: Ativo[] }) {
  const [formAberto, setFormAberto] = useState(false);
  const [aviso, setAviso] = useState("");
  const { enviando, erro, rodar, limparErro } = useAcao();

  function salvar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const dados = {
      equipamentoId: String(f.get("equipamentoId")), descricao: String(f.get("descricao")).trim(),
      periodicidadeDias: Number(f.get("periodicidadeDias")), inicio: String(f.get("inicio")),
    };
    rodar(() => criarPlano(dados), () => { setAviso("Plano preventivo criado."); setFormAberto(false); });
  }
  const gerar = (p: PlanoListado) => { setAviso(""); rodar(() => gerarOrdemDoPlano(p.id), () => setAviso(`Ordem de serviço preventiva gerada para ${p.equipamentoCodigo}. Atribua um técnico em Ordens de serviço.`)); };

  return (
    <>
      <div className="mb-4 flex justify-end">
        {!formAberto && <button type="button" className={BOTAO} onClick={() => { setFormAberto(true); setAviso(""); limparErro(); }}>Novo plano</button>}
      </div>

      {aviso && <p role="status" className="mb-4 rounded-sm bg-[#d6eadd] px-4 py-2 text-sm text-[#255238]">{aviso}</p>}
      {!formAberto && <div className="mb-4"><MensagemErro>{erro}</MensagemErro></div>}

      {formAberto && (
        <form onSubmit={salvar} className="mb-6 rounded-sm border border-linha bg-papel p-5">
          <h2 className="mb-4 font-condensada text-xl font-semibold">Novo plano preventivo</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label htmlFor="equipamentoId" className={ROTULO}>Equipamento</label>
              <select id="equipamentoId" name="equipamentoId" required defaultValue="" className={CAMPO}>
                <option value="" disabled>Escolha o equipamento</option>
                {ativos.map((a) => <option key={a.id} value={a.id}>{a.codigo} · {a.nome}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="descricao" className={ROTULO}>Atividades</label>
              <input id="descricao" name="descricao" required placeholder="Ex.: Lubrificar rolamentos e conferir correias" className={CAMPO} />
            </div>
            <div>
              <label htmlFor="periodicidadeDias" className={ROTULO}>Repetir a cada (dias)</label>
              <input id="periodicidadeDias" name="periodicidadeDias" type="number" min={1} step={1} required placeholder="Ex.: 30" className={CAMPO} />
            </div>
            <div>
              <label htmlFor="inicio" className={ROTULO}>Contar a partir de</label>
              <input id="inicio" name="inicio" type="date" required className={CAMPO} />
            </div>
          </div>
          <div className="mt-4"><MensagemErro>{erro}</MensagemErro></div>
          <div className="mt-5 flex gap-3">
            <button type="submit" disabled={enviando} className={BOTAO}>{enviando ? "Salvando" : "Salvar plano"}</button>
            <button type="button" onClick={() => { setFormAberto(false); limparErro(); }} className="rounded-md px-4 py-2 text-sm font-medium hover:bg-concreto">Cancelar</button>
          </div>
        </form>
      )}

      {planos.length === 0 ? (
        <Vazio titulo="Nenhum plano preventivo ainda" dica="Crie um plano para ser avisado antes de a manutenção vencer." />
      ) : (
        <div className="overflow-x-auto rounded-sm bg-papel">
          <table className="w-full min-w-[44rem] text-left text-sm">
            <thead className="border-b border-linha text-mudo">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">Plano</th>
                <th scope="col" className="px-4 py-3 font-medium">Periodicidade</th>
                <th scope="col" className="px-4 py-3 font-medium">Próxima</th>
                <th scope="col" className="px-4 py-3 font-medium">Situação</th>
                <th scope="col" className="px-4 py-3 font-medium"><span className="sr-only">Ações</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-linha">
              {planos.map((p) => (
                <tr key={p.id}>
                  <th scope="row" className="px-4 py-3 font-normal">
                    <p className="font-medium">{p.descricao}</p>
                    <p className="text-mudo">{p.equipamentoCodigo} {p.equipamentoNome}</p>
                  </th>
                  <td className="px-4 py-3">A cada {plural(p.periodicidadeDias, "dia", "dias")}</td>
                  <td className="px-4 py-3 tabular-nums">{formatarData(p.proximaData)}</td>
                  <td className="px-4 py-3">
                    {!p.ativo ? <Pilula tom="cinza">Desativado</Pilula>
                      : p.diasAteVencer < 0 ? <Pilula tom="ambar">Atrasada há {plural(-p.diasAteVencer, "dia", "dias")}</Pilula>
                      : p.diasAteVencer <= 7 ? <Pilula tom="azul">{p.diasAteVencer === 0 ? "Vence hoje" : `Vence em ${plural(p.diasAteVencer, "dia", "dias")}`}</Pilula>
                      : <Pilula tom="verde">Em dia</Pilula>}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {p.ativo && <button type="button" disabled={enviando} className={BOTAO_SECUNDARIO} onClick={() => gerar(p)}>Gerar ordem</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
