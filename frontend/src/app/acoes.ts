"use server";

// Server Actions: tudo o que altera dados passa por aqui e chama a API com o token do cookie.
// As regras de negócio e as permissões são conferidas pela API; aqui só repassamos a resposta.
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api, COOKIE_TOKEN, ErroApi } from "@/lib/api";
import type { Perfil, Prioridade, Resultado } from "@/lib/tipos";

/** Executa a chamada, atualiza as telas afetadas e transforma erro da API em mensagem para o formulário. */
async function executar(chamada: () => Promise<unknown>, ...telas: string[]): Promise<Resultado> {
  try {
    await chamada();
  } catch (erro) {
    if (erro instanceof ErroApi) return { ok: false, erro: erro.message };
    throw erro; // redirect() e erros inesperados seguem adiante
  }
  ["/painel", ...telas].forEach((t) => revalidatePath(t));
  return { ok: true };
}
const diaParaIso = (dia: string) => `${dia}T12:00:00.000Z`;

export async function entrar(email: string, senha: string): Promise<Resultado> {
  let token: string;
  try {
    ({ token } = await api<{ token: string }>("/auth/login", { metodo: "POST", corpo: { email, senha }, publico: true }));
  } catch (erro) {
    if (erro instanceof ErroApi) return { ok: false, erro: erro.message };
    throw erro;
  }
  // Mesmo prazo do token emitido pela API (8 horas).
  (await cookies()).set(COOKIE_TOKEN, token, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 8 * 60 * 60 });
  redirect("/painel");
}

export async function sair(): Promise<void> {
  await api("/auth/logout", { metodo: "POST" }).catch(() => undefined);
  (await cookies()).delete(COOKIE_TOKEN);
  redirect("/login");
}

// Equipamentos (UH03)
export const criarAtivo = async (dados: { codigo: string; nome: string; tipo: string; localizacao: string }) =>
  executar(() => api("/equipamentos", { metodo: "POST", corpo: dados }), "/ativos");
export const mudarStatusAtivo = async (id: string, acao: "inativar" | "reativar") =>
  executar(() => api(`/equipamentos/${id}/${acao}`, { metodo: "PATCH" }), "/ativos");

// Chamados (UH04)
export const abrirChamado = async (dados: { equipamentoId: string; descricao: string; urgencia: Prioridade }) =>
  executar(() => api("/chamados", { metodo: "POST", corpo: dados }), "/chamados");
export const cancelarChamado = async (id: string) =>
  executar(() => api(`/chamados/${id}/cancelar`, { metodo: "PATCH" }), "/chamados");

// Ordens de serviço (UH05 e UH06)
export const gerarOrdem = async (chamadoId: string) =>
  executar(() => api("/ordens-servico", { metodo: "POST", corpo: { chamadoId } }), "/chamados", "/ordens");
export const atribuirOrdem = async (id: string, tecnicoId: string, dia: string) =>
  executar(() => api(`/ordens-servico/${id}/atribuir`, { metodo: "PATCH", corpo: { tecnicoId, dataPrevista: diaParaIso(dia) } }), "/ordens");
export const iniciarOrdem = async (id: string) =>
  executar(() => api(`/ordens-servico/${id}/iniciar`, { metodo: "PATCH" }), "/ordens", "/ativos");
export const concluirOrdem = async (id: string, descricaoServico: string, tempoGastoMin: number) =>
  executar(() => api(`/ordens-servico/${id}/concluir`, { metodo: "PATCH", corpo: { descricaoServico, tempoGastoMin } }), "/ordens", "/ativos", "/chamados", "/planos");
export const cancelarOrdem = async (id: string, motivo: string) =>
  executar(() => api(`/ordens-servico/${id}/cancelar`, { metodo: "PATCH", corpo: { motivo } }), "/ordens");

// Planos preventivos (UH07)
export const criarPlano = async (dados: { equipamentoId: string; descricao: string; periodicidadeDias: number; inicio: string }) =>
  executar(() => api("/planos", { metodo: "POST", corpo: { ...dados, inicio: diaParaIso(dados.inicio) } }), "/planos");
export const gerarOrdemDoPlano = async (id: string) =>
  executar(() => api(`/planos/${id}/gerar-ordem`, { metodo: "POST" }), "/planos", "/ordens");

// Usuários (UH02)
export const criarUsuario = async (dados: { nome: string; email: string; senha: string; perfil: Perfil; especialidades: string[] }) =>
  executar(() => api("/usuarios", { metodo: "POST", corpo: dados }), "/usuarios");
export const mudarStatusUsuario = async (id: string, acao: "inativar" | "reativar") =>
  executar(() => api(`/usuarios/${id}/${acao}`, { metodo: "PATCH" }), "/usuarios");
