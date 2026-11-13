"use client";

import { useState, type FormEvent } from "react";
import { abrirChamado, cancelarChamado, gerarOrdem } from "@/app/acoes";
import { BORDA_PRIORIDADE, BOTAO, BOTAO_SECUNDARIO, CAMPO, MensagemErro, PilulaChamado, ROTULO, TagPrioridade, Vazio } from "@/components/ui";
import { useAcao } from "@/components/usar-acao";
import { codigoCurto, formatarData } from "@/lib/formatar";
import { PRIORIDADES, ROTULO_PRIORIDADE, type Ativo, type Chamado, type Prioridade, type Usuario } from "@/lib/tipos";

const GRADE = "md:grid md:grid-cols-[4.5rem_1fr_10rem_7rem_8rem_6rem] md:items-center md:gap-4";

export function ChamadosView({ chamados, ativos, usuario }: { chamados: Chamado[]; ativos: Ativo[]; usuario: Usuario }) {
  const [formAberto, setFormAberto] = useState(false);
  const [aviso, setAviso] = useState("");
  const { enviando, erro, rodar, limparErro } = useAcao();

  function salvar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const dados = { equipamentoId: String(f.get("equipamentoId")), descricao: String(f.get("descricao")).trim(), urgencia: String(f.get("urgencia")) as Prioridade };
    rodar(() => abrirChamado(dados), () => { setAviso("Chamado aberto. O gestor vai gerar a ordem de serviço."); setFormAberto(false); });
  }

  return (
    <>
      <div className="mb-4 flex justify-end">
        {!formAberto && <button type="button" className={BOTAO} onClick={() => { setFormAberto(true); setAviso(""); limparErro(); }}>Novo chamado</button>}
      </div>

      {aviso && <p role="status" className="mb-4 rounded-sm bg-[#d6eadd] px-4 py-2 text-sm text-[#255238]">{aviso}</p>}

      {formAberto && (
        <form onSubmit={salvar} className="mb-6 rounded-sm border border-linha bg-papel p-5">
          <h2 className="mb-4 font-condensada text-xl font-semibold">Novo chamado</h2>
          <div className="grid gap-4 md:grid-cols-[1fr_12rem]">
            <div>
              <label htmlFor="equipamentoId" className={ROTULO}>Equipamento</label>
              <select id="equipamentoId" name="equipamentoId" required defaultValue="" className={CAMPO}>
                <option value="" disabled>Escolha o equipamento com problema</option>
                {ativos.map((a) => <option key={a.id} value={a.id}>{a.codigo} · {a.nome} ({a.localizacao})</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="urgencia" className={ROTULO}>Urgência</label>
              <select id="urgencia" name="urgencia" required defaultValue="MEDIA" className={CAMPO}>
                {PRIORIDADES.map((p) => <option key={p} value={p}>{ROTULO_PRIORIDADE[p]}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="descricao" className={ROTULO}>O que está acontecendo</label>
              <textarea id="descricao" name="descricao" required rows={3} placeholder="Ex.: A esteira parou de girar depois de um estalo" className={CAMPO} />
            </div>
          </div>
          <div className="mt-4"><MensagemErro>{erro}</MensagemErro></div>
          <div className="mt-5 flex gap-3">
            <button type="submit" disabled={enviando} className={BOTAO}>{enviando ? "Abrindo" : "Abrir chamado"}</button>
            <button type="button" onClick={() => { setFormAberto(false); limparErro(); }} className="rounded-md px-4 py-2 text-sm font-medium hover:bg-concreto">Cancelar</button>
          </div>
        </form>
      )}

      {chamados.length === 0 ? (
        <Vazio titulo="Nenhum chamado ainda" dica="Abra um chamado quando um equipamento apresentar problema." />
      ) : (
        <>
          <div className={`hidden px-4 pb-2 text-sm text-mudo ${GRADE}`} aria-hidden>
            <span>Nº</span><span>Chamado</span><span>Solicitante</span><span>Urgência</span><span>Status</span><span>Abertura</span>
          </div>
          <ul className="space-y-2">
            {chamados.map((c) => <LinhaChamado key={c.id} chamado={c} usuario={usuario} />)}
          </ul>
        </>
      )}
    </>
  );
}

function LinhaChamado({ chamado: c, usuario }: { chamado: Chamado; usuario: Usuario }) {
  const { enviando, erro, rodar } = useAcao();
  const gestor = usuario.perfil === "GESTOR";
  const podeCancelar = c.status === "ABERTO" && (gestor || c.solicitanteId === usuario.id);

  return (
    <li className={`rounded-sm border-l-4 bg-papel px-4 py-3 ${BORDA_PRIORIDADE[c.urgencia]}`}>
      <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 ${GRADE}`}>
        <span className="font-condensada text-lg font-semibold tabular-nums text-mudo">#{codigoCurto(c.id)}</span>
        <div className="min-w-0 basis-full md:basis-auto">
          <p className="font-medium">{c.descricao}</p>
          <p className="text-sm text-mudo">{c.equipamentoCodigo} {c.equipamentoNome}</p>
        </div>
        <span className="text-sm">{c.solicitanteNome}</span>
        <TagPrioridade prioridade={c.urgencia} />
        <span><PilulaChamado status={c.status} /></span>
        <span className="text-sm tabular-nums text-mudo">{formatarData(c.abertoEm)}</span>
      </div>
      {c.status === "ABERTO" && (gestor || podeCancelar) && (
        <div className="mt-2 flex flex-wrap justify-end gap-2">
          {gestor && <button type="button" disabled={enviando} className={BOTAO} onClick={() => rodar(() => gerarOrdem(c.id))}>Gerar ordem de serviço</button>}
          {podeCancelar && <button type="button" disabled={enviando} className={BOTAO_SECUNDARIO} onClick={() => rodar(() => cancelarChamado(c.id))}>Cancelar chamado</button>}
        </div>
      )}
      {erro && <div className="mt-2"><MensagemErro>{erro}</MensagemErro></div>}
    </li>
  );
}
