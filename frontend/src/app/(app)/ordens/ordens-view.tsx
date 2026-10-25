"use client";

import { useState } from "react";
import { BORDA_PRIORIDADE, CAMPO, PilulaOrdem, TagPrioridade } from "@/components/ui";
import { formatarData } from "@/lib/formatar";
import { ROTULO_STATUS_ORDEM, type OrdemListada, type StatusOrdem } from "@/lib/tipos";

type Filtro = "TODAS" | StatusOrdem;
const FILTROS: Filtro[] = ["TODAS", "ABERTA", "ATRIBUIDA", "EM_ANDAMENTO", "CONCLUIDA", "CANCELADA"];
const GRADE = "md:grid md:grid-cols-[3rem_1fr_9rem_7rem_8rem_6rem] md:items-center md:gap-4";

export function OrdensView({ ordens }: { ordens: OrdemListada[] }) {
  const [filtro, setFiltro] = useState<Filtro>("TODAS");
  const [busca, setBusca] = useState("");
  const termo = busca.trim().toLowerCase();

  const visiveis = ordens.filter(
    (o) => (filtro === "TODAS" || o.status === filtro) &&
      (!termo || `${o.titulo} ${o.ativoNome} ${o.ativoCodigo} ${o.tecnicoNome ?? ""}`.toLowerCase().includes(termo)),
  );
  const contar = (f: Filtro) => (f === "TODAS" ? ordens.length : ordens.filter((o) => o.status === f).length);

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input type="search" value={busca} onChange={(e) => setBusca(e.target.value)} aria-label="Buscar ordem"
          placeholder="Buscar por título, equipamento ou técnico" className={`${CAMPO} sm:max-w-sm`} />
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por status">
          {FILTROS.map((f) => (
            <button key={f} type="button" onClick={() => setFiltro(f)} aria-pressed={filtro === f}
              className={`rounded-full border px-3 py-1 text-sm ${filtro === f ? "border-petroleo bg-petroleo text-white" : "border-linha bg-papel hover:border-petroleo"}`}>
              {f === "TODAS" ? "Todas" : ROTULO_STATUS_ORDEM[f]} <span className="tabular-nums opacity-75">{contar(f)}</span>
            </button>
          ))}
        </div>
      </div>

      {visiveis.length === 0 ? (
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
            {visiveis.map((o) => (
              <li key={o.id} className={`flex flex-wrap items-center gap-x-4 gap-y-1 rounded-sm border-l-4 bg-papel px-4 py-3 ${GRADE} ${BORDA_PRIORIDADE[o.prioridade]}`}>
                <span className="font-condensada text-lg font-semibold tabular-nums text-mudo">#{o.id}</span>
                <div className="min-w-0 basis-full md:basis-auto">
                  <p className="font-medium">{o.titulo}</p>
                  <p className="text-sm text-mudo">{o.ativoCodigo} {o.ativoNome}</p>
                </div>
                <span className="text-sm">{o.tecnicoNome ?? <span className="text-mudo">Sem técnico</span>}</span>
                <TagPrioridade prioridade={o.prioridade} />
                <span><PilulaOrdem status={o.status} /></span>
                <span className="text-sm tabular-nums text-mudo">{formatarData(o.criadoEm)}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}