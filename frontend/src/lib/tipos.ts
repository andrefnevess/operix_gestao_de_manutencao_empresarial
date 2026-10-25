// Espelha os enums e models de backend/prisma/schema.prisma
export type StatusOrdem = "ABERTA" | "ATRIBUIDA" | "EM_ANDAMENTO" | "CONCLUIDA" | "CANCELADA";
export type Prioridade = "BAIXA" | "MEDIA" | "ALTA" | "CRITICA";
export type StatusAtivo = "DISPONIVEL" | "EM_MANUTENCAO" | "INATIVO";

export interface Ativo { id: number; codigo: string; nome: string; localizacao: string; status: StatusAtivo; criadoEm: string }
export interface Tecnico { id: number; nome: string; matricula: string }
export interface OrdemServico {
  id: number; titulo: string; descricao: string; status: StatusOrdem; prioridade: Prioridade;
  ativoId: number; tecnicoId: number | null; criadoEm: string;
}
export interface PlanoManutencao { id: number; nome: string; ativoId: number; periodicidadeDias: number; proximaExecucao: string }

export const ROTULO_STATUS_ORDEM: Record<StatusOrdem, string> = {
  ABERTA: "Aberta", ATRIBUIDA: "Atribuída", EM_ANDAMENTO: "Em andamento", CONCLUIDA: "Concluída", CANCELADA: "Cancelada",
};
export const ROTULO_PRIORIDADE: Record<Prioridade, string> = { BAIXA: "Baixa", MEDIA: "Média", ALTA: "Alta", CRITICA: "Crítica" };
export const ROTULO_STATUS_ATIVO: Record<StatusAtivo, string> = {
  DISPONIVEL: "Disponível", EM_MANUTENCAO: "Em manutenção", INATIVO: "Inativo",
};

// Visões já com nomes resolvidos, como a API deve devolver
export interface OrdemListada extends OrdemServico { ativoCodigo: string; ativoNome: string; tecnicoNome: string | null; idadeDias: number }
export interface ItemAtencao {
  chave: string; titulo: string; ativo: string; prioridade: Prioridade;
  motivo: string; detalhe: string; urgente: boolean; peso: number;
}
export interface Painel {
  atencao: ItemAtencao[]; porStatus: Record<StatusOrdem, number>; totalOrdens: number;
  ativos: { total: number; emManutencao: number; inativos: number }; preventivasAtrasadas: number;
}