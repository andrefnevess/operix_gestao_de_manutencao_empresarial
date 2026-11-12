"use client";

import { useState, type FormEvent } from "react";
import { atribuirOrdem, cancelarOrdem, concluirOrdem, iniciarOrdem } from "@/app/acoes";
import { BORDA_PRIORIDADE, BOTAO, BOTAO_SECUNDARIO, CAMPO, MensagemErro, PilulaOrdem, ROTULO, TagPrioridade, Vazio } from "@/components/ui";
import { useAcao } from "@/components/usar-acao";
import { codigoCurto, formatarData } from "@/lib/formatar";
import { ROTULO_STATUS_ORDEM, type OrdemListada, type Perfil, type StatusOrdem, type Usuario } from "@/lib/tipos";

type Filtro = "TODAS" | StatusOrdem;
type Formulario = "atribuir" | "concluir" | "cancelar";
const FILTROS: Filtro[] = ["TODAS", "ABERTA", "ATRIBUIDA", "EM_EXECUCAO", "CONCLUIDA", "CANCELADA"];
const GRADE = "md:grid md:grid-cols-[4.5rem_1fr_9rem_7rem_8rem_6rem] md:items-center md:gap-4";

export function OrdensView({ ordens, tecnicos, perfil }: { ordens: OrdemListada[]; tecnicos: Usuario[]; perfil: Perfil }) {
  const [filtro, setFiltro] = useState<Filtro>("TODAS");
  const [busca, setBusca] = useState("");
  const termo = busca.trim().toLowerCase();

  const visiveis = ordens.filter(
    (o) => (filtro === "TODAS" || o.status === filtro) &&
      (!termo || `${o.descricao} ${o.equipamentoNome} ${o.equipamentoCodigo} ${o.tecnicoNome ?? ""}`.toLowerCase().includes(termo)),
  );
  const contar = (f: Filtro) => (f === "TODAS" ? ordens.length : ordens.filter((o) => o.status === f).length);

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input type="search" value={busca} onChange={(e) => setBusca(e.target.value)} aria-label="Buscar ordem"
          placeholder="Buscar por descrição, equipamento ou técnico" className={`${CAMPO} sm:max-w-sm`} />
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por status">
          {FILTROS.map((f) => (
            <button key={f} type="button" onClick={() => setFiltro(f)} aria-pressed={filtro === f}
              className={`rounded-full border px-3 py-1 text-sm ${filtro === f ? "border-petroleo bg-petroleo text-white" : "border-linha bg-papel hover:border-petroleo"}`}>
              {f === "TODAS" ? "Todas" : ROTULO_STATUS_ORDEM[f]} <span className="tabular-nums opacity-75">{contar(f)}</span>
            </button>
          ))}
        </div>
      </div>

      {ordens.length === 0 ? (
        <Vazio titulo="Nenhuma ordem de serviço ainda"
          dica={perfil === "TECNICO" ? "As ordens atribuídas a você aparecem aqui." : "Gere uma ordem a partir de um chamado ou de um plano preventivo."} />
      ) : visiveis.length === 0 ? (
        <div className="rounded-sm bg-papel px-4 py-10 text-center">
          <p className="font-medium">Nenhuma ordem encontrada</p>
          <p className="mt-1 text-sm text-mudo">Limpe a busca ou escolha outro status para ver mais ordens.</p>
          <button type="button" onClick={() => { setBusca(""); setFiltro("TODAS"); }} className="mt-4 text-sm font-medium text-petroleo underline underline-offset-4">Limpar filtros</button>
        </div>
      ) : (
        <>
          <div className={`hidden px-4 pb-2 text-sm text-mudo ${GRADE}`} aria-hidden>
            <span>Nº</span><span>Ordem</span><span>Técnico</span><span>Prioridade</span><span>Status</span><span>Abertura</span>
          </div>
          <ul className="space-y-2">
            {visiveis.map((o) => <LinhaOrdem key={o.id} ordem={o} tecnicos={tecnicos} perfil={perfil} />)}
          </ul>
        </>
      )}
    </>
  );
}

function LinhaOrdem({ ordem: o, tecnicos, perfil }: { ordem: OrdemListada; tecnicos: Usuario[]; perfil: Perfil }) {
  const [form, setForm] = useState<Formulario | null>(null);
  const { enviando, erro, rodar, limparErro } = useAcao();
  const gestor = perfil === "GESTOR";
  const tecnico = perfil === "TECNICO";
  const antesDaExecucao = o.status === "ABERTA" || o.status === "ATRIBUIDA";
  const abrir = (f: Formulario | null) => { setForm(f); limparErro(); };

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const fechar = () => setForm(null);
    if (form === "atribuir") rodar(() => atribuirOrdem(o.id, String(f.get("tecnicoId")), String(f.get("dataPrevista"))), fechar);
    if (form === "concluir") rodar(() => concluirOrdem(o.id, String(f.get("descricaoServico")), Number(f.get("tempoGastoMin"))), fechar);
    if (form === "cancelar") rodar(() => cancelarOrdem(o.id, String(f.get("motivo"))), fechar);
  }

  return (
    <li className={`rounded-sm border-l-4 bg-papel px-4 py-3 ${BORDA_PRIORIDADE[o.prioridade]}`}>
      <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 ${GRADE}`}>
        <span className="font-condensada text-lg font-semibold tabular-nums text-mudo">#{codigoCurto(o.id)}</span>
        <div className="min-w-0 basis-full md:basis-auto">
          <p className="font-medium">{o.descricao}</p>
          <p className="text-sm text-mudo">{o.equipamentoCodigo} {o.equipamentoNome} · {o.tipo === "PREVENTIVA" ? "Preventiva" : "Corretiva"}</p>
        </div>
        <span className="text-sm">{o.tecnicoNome ?? <span className="text-mudo">Sem técnico</span>}</span>
        <TagPrioridade prioridade={o.prioridade} />
        <span><PilulaOrdem status={o.status} /></span>
        <span className="text-sm tabular-nums text-mudo">{formatarData(o.criadaEm)}</span>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        {o.dataPrevista && o.status !== "CONCLUIDA" && o.status !== "CANCELADA" && (
          <span className={o.atrasada ? "font-semibold text-ferrugem" : "text-mudo"}>
            {o.atrasada ? "Atrasada, prevista para" : "Prevista para"} {formatarData(o.dataPrevista)}
          </span>
        )}
        {o.manutencao && <span className="text-mudo">Serviço realizado em {formatarData(o.manutencao.realizadaEm)}: {o.manutencao.descricaoServico} ({o.manutencao.tempoGastoMin} min)</span>}
        {o.motivoCancelamento && <span className="text-mudo">Cancelada: {o.motivoCancelamento}</span>}

        {!form && (
          <span className="ml-auto flex flex-wrap gap-2">
            {gestor && antesDaExecucao && <button type="button" className={BOTAO_SECUNDARIO} onClick={() => abrir("atribuir")}>{o.tecnicoId ? "Trocar técnico" : "Atribuir técnico"}</button>}
            {gestor && antesDaExecucao && <button type="button" className={BOTAO_SECUNDARIO} onClick={() => abrir("cancelar")}>Cancelar ordem</button>}
            {tecnico && o.status === "ATRIBUIDA" && <button type="button" disabled={enviando} className={BOTAO} onClick={() => rodar(() => iniciarOrdem(o.id))}>{enviando ? "Iniciando" : "Iniciar execução"}</button>}
            {tecnico && o.status === "EM_EXECUCAO" && <button type="button" className={BOTAO} onClick={() => abrir("concluir")}>Concluir ordem</button>}
          </span>
        )}
      </div>
      {!form && erro && <div className="mt-2"><MensagemErro>{erro}</MensagemErro></div>}

      {form && (
        <form onSubmit={enviar} className="mt-3 border-t border-linha pt-3">
          {form === "atribuir" && (
            tecnicos.length === 0 ? <p className="text-sm text-mudo">Não há técnicos ativos cadastrados. Peça ao administrador para cadastrar um.</p> : (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor={`tec-${o.id}`} className={ROTULO}>Técnico</label>
                  <select id={`tec-${o.id}`} name="tecnicoId" required defaultValue={o.tecnicoId ?? ""} className={CAMPO}>
                    <option value="" disabled>Escolha um técnico</option>
                    {tecnicos.map((t) => <option key={t.id} value={t.id}>{t.nome}{t.especialidades.length ? ` (${t.especialidades.join(", ")})` : ""}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor={`data-${o.id}`} className={ROTULO}>Data prevista</label>
                  <input id={`data-${o.id}`} name="dataPrevista" type="date" required defaultValue={o.dataPrevista?.slice(0, 10)} className={CAMPO} />
                </div>
              </div>
            )
          )}
          {form === "concluir" && (
            <div className="grid gap-4 sm:grid-cols-[1fr_10rem]">
              <div>
                <label htmlFor={`serv-${o.id}`} className={ROTULO}>Serviço realizado</label>
                <input id={`serv-${o.id}`} name="descricaoServico" required placeholder="Ex.: Troca da correia e lubrificação" className={CAMPO} />
              </div>
              <div>
                <label htmlFor={`tempo-${o.id}`} className={ROTULO}>Tempo gasto (min)</label>
                <input id={`tempo-${o.id}`} name="tempoGastoMin" type="number" min={1} step={1} required className={CAMPO} />
              </div>
            </div>
          )}
          {form === "cancelar" && (
            <div>
              <label htmlFor={`motivo-${o.id}`} className={ROTULO}>Motivo do cancelamento</label>
              <input id={`motivo-${o.id}`} name="motivo" required placeholder="Ex.: Equipamento substituído" className={CAMPO} />
            </div>
          )}
          <div className="mt-3"><MensagemErro>{erro}</MensagemErro></div>
          <div className="mt-3 flex gap-3">
            {!(form === "atribuir" && tecnicos.length === 0) && (
              <button type="submit" disabled={enviando} className={BOTAO}>
                {enviando ? "Salvando" : form === "atribuir" ? "Atribuir" : form === "concluir" ? "Concluir e registrar manutenção" : "Cancelar ordem"}
              </button>
            )}
            <button type="button" onClick={() => abrir(null)} className="rounded-md px-4 py-2 text-sm font-medium hover:bg-concreto">Voltar</button>
          </div>
        </form>
      )}
    </li>
  );
}
