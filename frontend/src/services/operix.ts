// Consultas à API do Operix. As telas usam estas funções; as alterações ficam em src/app/acoes.ts.
import { cache } from "react";
import { api } from "@/lib/api";
import { plural } from "@/lib/formatar";
import {
  ROTULO_STATUS_ORDEM, type Ativo, type Chamado, type ItemAtencao, type OrdemListada, type OrdemServico,
  type Painel, type Plano, type PlanoListado, type StatusOrdem, type Usuario,
} from "@/lib/tipos";

const DIA = 86_400_000;
const diasAte = (iso: string) => Math.round((new Date(iso).getTime() - Date.now()) / DIA);
const EM_ABERTO: StatusOrdem[] = ["ABERTA", "ATRIBUIDA", "EM_EXECUCAO"];

/** Usuário logado. `cache` evita repetir a chamada dentro da mesma requisição. */
export const obterUsuario = cache(() => api<Usuario>("/auth/me"));

export const listarAtivos = () => api<Ativo[]>("/equipamentos");
export const listarChamados = () => api<Chamado[]>("/chamados");
/** Planos do que vence primeiro para o que vence por último, com os dias que faltam (negativo = atrasado). */
export async function listarPlanos(): Promise<PlanoListado[]> {
  const planos = await api<Plano[]>("/planos");
  return planos.map((p) => ({ ...p, diasAteVencer: diasAte(p.proximaData) })).sort((a, b) => a.proximaData.localeCompare(b.proximaData));
}
export const listarTecnicos = () => api<Usuario[]>("/usuarios/tecnicos");
export const listarUsuarios = () => api<Usuario[]>("/usuarios");

/** Ordens da mais nova para a mais antiga. O técnico recebe da API só as dele. */
export async function listarOrdens(): Promise<OrdemListada[]> {
  const ordens = await api<OrdemServico[]>("/ordens-servico");
  return ordens
    .map((o) => ({ ...o, atrasada: EM_ABERTO.includes(o.status) && !!o.dataPrevista && new Date(o.dataPrevista).getTime() < Date.now() }))
    .sort((a, b) => b.criadaEm.localeCompare(a.criadaEm));
}

export async function obterPainel(): Promise<Painel> {
  const usuario = await obterUsuario();
  // Os planos preventivos são restritos ao gestor na API.
  const [ordens, ativos, planos] = await Promise.all([
    listarOrdens(), listarAtivos(), usuario.perfil === "GESTOR" ? listarPlanos() : Promise.resolve([] as PlanoListado[]),
  ]);

  const porStatus: Record<StatusOrdem, number> = { ABERTA: 0, ATRIBUIDA: 0, EM_EXECUCAO: 0, CONCLUIDA: 0, CANCELADA: 0 };
  ordens.forEach((o) => porStatus[o.status]++);

  const itens: ItemAtencao[] = ordens
    .filter((o) => EM_ABERTO.includes(o.status) && (o.atrasada || o.prioridade === "CRITICA" || o.prioridade === "ALTA"))
    .map((o) => {
      const idade = Math.max(0, -diasAte(o.criadaEm));
      return {
        chave: `os-${o.id}`, titulo: o.descricao, ativo: `${o.equipamentoCodigo} ${o.equipamentoNome}`, prioridade: o.prioridade,
        motivo: o.atrasada ? "Prazo vencido" : idade === 0 ? "Aberta hoje" : `Aberta há ${plural(idade, "dia", "dias")}`,
        detalhe: `${ROTULO_STATUS_ORDEM[o.status]}, ${o.tecnicoNome ? `com ${o.tecnicoNome}` : "sem técnico"}`,
        urgente: o.atrasada, peso: (o.atrasada ? 100 : 0) + (o.prioridade === "CRITICA" ? 90 : 70),
      };
    });

  let atrasadas = 0;
  planos.filter((p) => p.ativo).forEach((p) => {
    const d = p.diasAteVencer;
    if (d > 7) return;
    if (d < 0) atrasadas++;
    itens.push({
      chave: `pl-${p.id}`, titulo: p.descricao, ativo: `${p.equipamentoCodigo} ${p.equipamentoNome}`,
      prioridade: d < 0 ? "ALTA" : "MEDIA",
      motivo: d < 0 ? `Atrasada há ${plural(-d, "dia", "dias")}` : d === 0 ? "Vence hoje" : `Vence em ${plural(d, "dia", "dias")}`,
      detalhe: `Preventiva a cada ${p.periodicidadeDias} dias`,
      urgente: d < 0, peso: d < 0 ? 100 - d : 50 - d,
    });
  });

  return {
    atencao: itens.sort((x, y) => y.peso - x.peso), porStatus, totalOrdens: ordens.length, preventivasAtrasadas: atrasadas,
    ativos: {
      total: ativos.length, emManutencao: ativos.filter((x) => x.status === "EM_MANUTENCAO").length,
      inativos: ativos.filter((x) => x.status === "INATIVO").length,
    },
  };
}
