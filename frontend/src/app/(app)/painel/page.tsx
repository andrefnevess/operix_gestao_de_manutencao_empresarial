import type { Metadata } from "next";
import { BORDA_PRIORIDADE, CabecalhoPagina, Vazio } from "@/components/ui";
import { formatarDataLonga, plural } from "@/lib/formatar";
import { ROTULO_STATUS_ORDEM, type StatusOrdem } from "@/lib/tipos";
import { obterPainel } from "@/services/operix";

export const metadata: Metadata = { title: "Painel" };
export const dynamic = "force-dynamic";

const COR_STATUS: Record<StatusOrdem, string> = {
  ABERTA: "bg-tinta", ATRIBUIDA: "bg-prio-media", EM_EXECUCAO: "bg-prio-alta", CONCLUIDA: "bg-[#3f7d58]", CANCELADA: "bg-prio-baixa",
};

export default async function Painel() {
  const p = await obterPainel();
  const status = Object.keys(p.porStatus) as StatusOrdem[];

  return (
    <>
      <CabecalhoPagina titulo="Painel" descricao={formatarDataLonga(new Date())} />
      <div className="grid gap-8 lg:grid-cols-[1fr_19rem]">
        <section aria-labelledby="atencao">
          <h2 id="atencao" className="mb-3 font-condensada text-xl font-semibold">
            Precisa de atenção <span className="text-mudo">({p.atencao.length})</span>
          </h2>
          {p.atencao.length === 0 && <Vazio titulo="Nada pendente" dica="Ordens urgentes ou atrasadas e preventivas a vencer aparecem aqui." />}
          <ul className="space-y-2">
            {p.atencao.map((i) => (
              <li key={i.chave} className={`flex items-start justify-between gap-4 rounded-sm border-l-4 bg-papel px-4 py-3 ${BORDA_PRIORIDADE[i.prioridade]}`}>
                <div className="min-w-0">
                  <p className="font-medium">{i.titulo}</p>
                  <p className="text-sm text-mudo">{i.ativo}</p>
                </div>
                <div className="shrink-0 text-right text-sm">
                  <p className={i.urgente ? "font-semibold text-ferrugem" : "font-medium"}>{i.motivo}</p>
                  <p className="text-mudo">{i.detalhe}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <aside className="space-y-8">
          <section aria-labelledby="status">
            <h2 id="status" className="mb-3 font-condensada text-xl font-semibold">Ordens por status</h2>
            <div className="flex h-3 overflow-hidden rounded-full bg-linha" role="img"
              aria-label={status.map((s) => `${ROTULO_STATUS_ORDEM[s]}: ${p.porStatus[s]}`).join(", ")}>
              {p.totalOrdens > 0 && status.map((s) => p.porStatus[s] > 0 && (
                <span key={s} className={COR_STATUS[s]} style={{ width: `${(p.porStatus[s] / p.totalOrdens) * 100}%` }} />
              ))}
            </div>
            <dl className="mt-4 space-y-1.5 text-sm">
              {status.map((s) => (
                <div key={s} className="flex items-center justify-between">
                  <dt className="flex items-center gap-2"><span aria-hidden className={`h-2.5 w-2.5 rounded-[2px] ${COR_STATUS[s]}`} />{ROTULO_STATUS_ORDEM[s]}</dt>
                  <dd className="font-condensada text-lg font-semibold tabular-nums">{p.porStatus[s]}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="equip">
            <h2 id="equip" className="mb-3 font-condensada text-xl font-semibold">Equipamentos</h2>
            <p className="text-sm leading-relaxed">
              {plural(p.ativos.emManutencao, "equipamento está", "equipamentos estão")} em manutenção e {plural(p.ativos.inativos, "está inativo", "estão inativos")}, de {p.ativos.total} cadastrados.
              {p.preventivasAtrasadas > 0 && <> Há {plural(p.preventivasAtrasadas, "preventiva atrasada", "preventivas atrasadas")}.</>}
            </p>
          </section>
        </aside>
      </div>
    </>
  );
}