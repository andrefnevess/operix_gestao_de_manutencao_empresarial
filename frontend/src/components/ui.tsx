import Image from "next/image";

import type { Prioridade, StatusAtivo, StatusChamado, StatusOrdem } from "@/lib/tipos";
import { ROTULO_PRIORIDADE, ROTULO_STATUS_ATIVO, ROTULO_STATUS_CHAMADO, ROTULO_STATUS_ORDEM } from "@/lib/tipos";

// Classes escritas por extenso para o Tailwind enxergá-las
export const BORDA_PRIORIDADE: Record<Prioridade, string> = {
  BAIXA: "border-prio-baixa", MEDIA: "border-prio-media", ALTA: "border-prio-alta", CRITICA: "border-prio-critica",
};
const FUNDO_PRIORIDADE: Record<Prioridade, string> = {
  BAIXA: "bg-prio-baixa", MEDIA: "bg-prio-media", ALTA: "bg-prio-alta", CRITICA: "bg-prio-critica",
};

export function TagPrioridade({ prioridade }: { prioridade: Prioridade }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm">
      <span aria-hidden className={`h-2.5 w-2.5 rounded-[2px] ${FUNDO_PRIORIDADE[prioridade]}`} />
      {ROTULO_PRIORIDADE[prioridade]}
    </span>
  );
}

const TONS = {
  neutro: "border border-tinta/25 text-tinta",
  azul: "bg-[#d8e8ee] text-[#12404f]",
  ambar: "bg-[#f6e3b8] text-[#5e3f00]",
  verde: "bg-[#d6eadd] text-[#255238]",
  cinza: "bg-[#e3e5e2] text-mudo",
} as const;

export function Pilula({ tom, children }: { tom: keyof typeof TONS; children: React.ReactNode }) {
  return <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${TONS[tom]}`}>{children}</span>;
}

const TOM_ORDEM: Record<StatusOrdem, keyof typeof TONS> = {
  ABERTA: "neutro", ATRIBUIDA: "azul", EM_EXECUCAO: "ambar", CONCLUIDA: "verde", CANCELADA: "cinza",
};
const TOM_CHAMADO: Record<StatusChamado, keyof typeof TONS> = { ABERTO: "neutro", EM_ATENDIMENTO: "ambar", ENCERRADO: "verde", CANCELADO: "cinza" };
const TOM_ATIVO: Record<StatusAtivo, keyof typeof TONS> = { ATIVO: "verde", EM_MANUTENCAO: "ambar", INATIVO: "cinza" };

export const PilulaOrdem = ({ status }: { status: StatusOrdem }) => <Pilula tom={TOM_ORDEM[status]}>{ROTULO_STATUS_ORDEM[status]}</Pilula>;
export const PilulaChamado = ({ status }: { status: StatusChamado }) => <Pilula tom={TOM_CHAMADO[status]}>{ROTULO_STATUS_CHAMADO[status]}</Pilula>;
export const PilulaAtivo = ({ status }: { status: StatusAtivo }) => <Pilula tom={TOM_ATIVO[status]}>{ROTULO_STATUS_ATIVO[status]}</Pilula>;

export function Marca({ comSlogan = false, className = "h-7 w-auto" }: { comSlogan?: boolean; className?: string }) {
  return (
    <Image
      src={comSlogan ? "/logo-operix-slogan.png" : "/logo-operix.png"}
      alt="Operix"
      width={1357}
      height={comSlogan ? 370 : 316}
      className={className}
      priority
    />
  );
}

export function CabecalhoPagina({ titulo, descricao, children }: { titulo: string; descricao?: string; children?: React.ReactNode }) {
  return (
    <header className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-condensada text-3xl font-semibold tracking-tight">{titulo}</h1>
        {descricao && <p className="mt-1 text-mudo">{descricao}</p>}
      </div>
      {children}
    </header>
  );
}

export const CAMPO = "w-full rounded-md border border-linha bg-papel px-3 py-2 text-sm placeholder:text-mudo/80";
export const BOTAO = "rounded-md bg-petroleo px-4 py-2 text-sm font-medium text-white hover:bg-petroleo-fundo disabled:opacity-60";
export const BOTAO_SECUNDARIO = "rounded-md border border-linha bg-papel px-3 py-1.5 text-sm font-medium hover:border-petroleo disabled:opacity-60";
export const ROTULO = "mb-1 block text-sm font-medium";

export function MensagemErro({ children }: { children: React.ReactNode }) {
  return children ? <p role="alert" className="text-sm font-medium text-ferrugem">{children}</p> : null;
}

export function Vazio({ titulo, dica }: { titulo: string; dica: string }) {
  return (
    <div className="rounded-sm bg-papel px-4 py-10 text-center">
      <p className="font-medium">{titulo}</p>
      <p className="mt-1 text-sm text-mudo">{dica}</p>
    </div>
  );
}
