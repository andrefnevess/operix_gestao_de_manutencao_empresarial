// Espelha as respostas da API (backend/src/**/dto) e os enums de backend/prisma/schema.prisma.
export type Perfil = "ADMINISTRADOR" | "GESTOR" | "TECNICO" | "SOLICITANTE";
export type StatusOrdem = "ABERTA" | "ATRIBUIDA" | "EM_EXECUCAO" | "CONCLUIDA" | "CANCELADA";
export type StatusChamado = "ABERTO" | "EM_ATENDIMENTO" | "ENCERRADO" | "CANCELADO";
export type StatusAtivo = "ATIVO" | "EM_MANUTENCAO" | "INATIVO";
export type Prioridade = "BAIXA" | "MEDIA" | "ALTA" | "CRITICA";
export type TipoManutencao = "CORRETIVA" | "PREVENTIVA";

export interface Usuario { id: string; nome: string; email: string; perfil: Perfil; ativo: boolean; especialidades: string[] }
// "Ativo" na tela é o Equipamento da API.
export interface Ativo {
  id: string; codigo: string; nome: string; tipo: string; localizacao: string;
  fabricante: string | null; modelo: string | null; dataAquisicao: string | null; status: StatusAtivo;
}
export interface Chamado {
  id: string; descricao: string; urgencia: Prioridade; status: StatusChamado; abertoEm: string;
  equipamentoId: string; equipamentoCodigo: string; equipamentoNome: string; solicitanteId: string; solicitanteNome: string;
}
export interface OrdemServico {
  id: string; status: StatusOrdem; tipo: TipoManutencao; descricao: string; prioridade: Prioridade;
  equipamentoId: string; equipamentoCodigo: string; equipamentoNome: string;
  tecnicoId: string | null; tecnicoNome: string | null; dataPrevista: string | null; criadaEm: string;
  chamadoId: string | null; planoId: string | null; motivoCancelamento: string | null;
  manutencao: { tipo: TipoManutencao; descricaoServico: string; tempoGastoMin: number; realizadaEm: string } | null;
}
export interface Plano {
  id: string; descricao: string; periodicidadeDias: number; ultimaExecucao: string; proximaData: string; ativo: boolean;
  equipamentoId: string; equipamentoCodigo: string; equipamentoNome: string;
}

export const ROTULO_PERFIL: Record<Perfil, string> = {
  ADMINISTRADOR: "Administrador", GESTOR: "Gestor de manutenção", TECNICO: "Técnico", SOLICITANTE: "Solicitante",
};
export const ROTULO_STATUS_ORDEM: Record<StatusOrdem, string> = {
  ABERTA: "Aberta", ATRIBUIDA: "Atribuída", EM_EXECUCAO: "Em execução", CONCLUIDA: "Concluída", CANCELADA: "Cancelada",
};
export const ROTULO_STATUS_CHAMADO: Record<StatusChamado, string> = {
  ABERTO: "Aberto", EM_ATENDIMENTO: "Em atendimento", ENCERRADO: "Encerrado", CANCELADO: "Cancelado",
};
export const ROTULO_PRIORIDADE: Record<Prioridade, string> = { BAIXA: "Baixa", MEDIA: "Média", ALTA: "Alta", CRITICA: "Crítica" };
export const ROTULO_STATUS_ATIVO: Record<StatusAtivo, string> = { ATIVO: "Disponível", EM_MANUTENCAO: "Em manutenção", INATIVO: "Inativo" };
export const PRIORIDADES: Prioridade[] = ["BAIXA", "MEDIA", "ALTA", "CRITICA"];

// Visões calculadas pelo front-end a partir das respostas da API
export interface OrdemListada extends OrdemServico { atrasada: boolean }
export interface PlanoListado extends Plano { diasAteVencer: number }
export interface ItemAtencao {
  chave: string; titulo: string; ativo: string; prioridade: Prioridade;
  motivo: string; detalhe: string; urgente: boolean; peso: number;
}
export interface Painel {
  atencao: ItemAtencao[]; porStatus: Record<StatusOrdem, number>; totalOrdens: number;
  ativos: { total: number; emManutencao: number; inativos: number }; preventivasAtrasadas: number;
}

/** Resultado das ações (formulários e botões): a mensagem de erro vem da API. */
export type Resultado = { ok: true } | { ok: false; erro: string };
