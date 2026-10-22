// Comunicação com a API do Operix. Os formatos seguem a documentação Swagger (/api/docs).

export type Perfil = 'ADMINISTRADOR' | 'GESTOR' | 'TECNICO' | 'SOLICITANTE';
export type StatusEquipamento = 'ATIVO' | 'EM_MANUTENCAO' | 'INATIVO';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  perfil: Perfil;
  ativo: boolean;
  especialidades: string[];
}

export interface Equipamento {
  id: string;
  codigo: string;
  nome: string;
  tipo: string;
  localizacao: string;
  fabricante: string | null;
  modelo: string | null;
  dataAquisicao: string | null;
  status: StatusEquipamento;
}

export interface DadosEquipamento {
  codigo: string;
  nome: string;
  tipo: string;
  localizacao: string;
  fabricante?: string;
  modelo?: string;
  dataAquisicao?: string;
}

export interface DadosUsuario {
  nome: string;
  email: string;
  perfil: Perfil;
  senha?: string;
  especialidades?: string[];
}

export class ErroApi extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

const BASE = process.env.NEXT_PUBLIC_API_URL ?? '/api';
const CHAVE_TOKEN = 'operix.token';

export const token = {
  ler: (): string | null => sessionStorage.getItem(CHAVE_TOKEN),
  salvar: (valor: string) => sessionStorage.setItem(CHAVE_TOKEN, valor),
  limpar: () => sessionStorage.removeItem(CHAVE_TOKEN),
};

async function chamar<T>(caminho: string, opcoes: RequestInit = {}): Promise<T> {
  const cabecalhos: Record<string, string> = { 'Content-Type': 'application/json' };
  const atual = token.ler();
  if (atual) cabecalhos.Authorization = `Bearer ${atual}`;

  let resposta: Response;
  try {
    resposta = await fetch(`${BASE}${caminho}`, { ...opcoes, headers: cabecalhos });
  } catch {
    throw new ErroApi('Não foi possível conectar à API. Verifique se o back-end está rodando.', 0);
  }

  if (resposta.status === 204) return undefined as T;
  const corpo = await resposta.json().catch(() => ({}));
  if (!resposta.ok) {
    const mensagem = Array.isArray(corpo.message) ? corpo.message.join(' ') : corpo.message;
    throw new ErroApi(mensagem ?? 'Erro inesperado.', resposta.status);
  }
  return corpo as T;
}

export const api = {
  login: (email: string, senha: string) =>
    chamar<{ token: string; usuario: Usuario }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, senha }) }),
  eu: () => chamar<Usuario>('/auth/me'),
  logout: () => chamar<void>('/auth/logout', { method: 'POST' }),

  listarEquipamentos: (busca = '') => chamar<Equipamento[]>(`/equipamentos?busca=${encodeURIComponent(busca)}`),
  buscarEquipamento: (id: string) => chamar<Equipamento>(`/equipamentos/${id}`),
  criarEquipamento: (dados: DadosEquipamento) => chamar<Equipamento>('/equipamentos', { method: 'POST', body: JSON.stringify(dados) }),
  atualizarEquipamento: (id: string, dados: DadosEquipamento) =>
    chamar<Equipamento>(`/equipamentos/${id}`, { method: 'PUT', body: JSON.stringify(dados) }),
  alterarStatusEquipamento: (id: string, acao: 'inativar' | 'reativar') => chamar<Equipamento>(`/equipamentos/${id}/${acao}`, { method: 'PATCH' }),

  listarUsuarios: () => chamar<Usuario[]>('/usuarios'),
  buscarUsuario: (id: string) => chamar<Usuario>(`/usuarios/${id}`),
  criarUsuario: (dados: DadosUsuario) => chamar<Usuario>('/usuarios', { method: 'POST', body: JSON.stringify(dados) }),
  atualizarUsuario: (id: string, dados: DadosUsuario) => chamar<Usuario>(`/usuarios/${id}`, { method: 'PUT', body: JSON.stringify(dados) }),
  alterarStatusUsuario: (id: string, acao: 'inativar' | 'reativar') => chamar<Usuario>(`/usuarios/${id}/${acao}`, { method: 'PATCH' }),
};

export const NOME_PERFIL: Record<Perfil, string> = {
  ADMINISTRADOR: 'Administrador',
  GESTOR: 'Gestor',
  TECNICO: 'Técnico',
  SOLICITANTE: 'Solicitante',
};

/** Mesmas regras de permissão do back-end (o back-end sempre confere de novo). */
export const permissoes = {
  gerenciarUsuarios: (u: Usuario | null) => u?.perfil === 'ADMINISTRADOR',
  gerenciarEquipamentos: (u: Usuario | null) => u?.perfil === 'GESTOR',
};
