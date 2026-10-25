// Camada de serviço com dados de exemplo. Quando a API NestJS existir,
// troque o corpo das funções por fetch(`${process.env.NEXT_PUBLIC_API_URL}/...`)
// mantendo as mesmas assinaturas — as telas não precisam mudar.
import {plural} from "@/lib/formatar";
import {
    ROTULO_STATUS_ORDEM, type Ativo, type ItemAtencao, type OrdemListada, type OrdemServico,
  type Painel, type PlanoManutencao, type StatusOrdem, type Tecnico,
} from "@/lib/tipos";
const DIA = 86_400_000;
const meioDia = () => { const d = new Date(); d.setUTCHours(12, 0, 0, 0); return d.getTime(); };
const dia = (n: number) => new Date(meioDia() + n * DIA).toISOString();
const diasAte = (iso: string) => Math.round((new Date(iso).getTime() - meioDia()) / DIA);

const ativos = (): Ativo[] => [
  { id: 1, codigo: "CP-014", nome: "Compressor de ar 30 HP", localizacao: "Casa de máquinas", status: "DISPONIVEL", criadoEm: dia(-400) },
  { id: 2, codigo: "EM-203", nome: "Esteira transportadora 2", localizacao: "Linha de envase", status: "EM_MANUTENCAO", criadoEm: dia(-380) },
  { id: 3, codigo: "GR-001", nome: "Gerador diesel 150 kVA", localizacao: "Subestação", status: "DISPONIVEL", criadoEm: dia(-700) },
  { id: 4, codigo: "AC-117", nome: "Ar-condicionado central", localizacao: "Bloco administrativo", status: "DISPONIVEL", criadoEm: dia(-300) },
  { id: 5, codigo: "EL-009", nome: "Elevador de carga", localizacao: "Almoxarifado", status: "EM_MANUTENCAO", criadoEm: dia(-520) },
  { id: 6, codigo: "BH-022", nome: "Bomba hidráulica 3", localizacao: "Estação de tratamento", status: "DISPONIVEL", criadoEm: dia(-250) },
  { id: 7, codigo: "PR-310", nome: "Prensa hidráulica 80 t", localizacao: "Oficina mecânica", status: "INATIVO", criadoEm: dia(-900) },
  { id: 8, codigo: "EX-005", nome: "Exaustor industrial", localizacao: "Cozinha industrial", status: "DISPONIVEL", criadoEm: dia(-200) },
];
const tecnicos = (): Tecnico[] => [
  { id: 1, nome: "Carlos Menezes", matricula: "T-101" },
  { id: 2, nome: "Renata Souza", matricula: "T-102" },
  { id: 3, nome: "Paulo Ribeiro", matricula: "T-103" },
];
const ordens = (): OrdemServico[] => {
  const o = (id: number, titulo: string, status: StatusOrdem, prioridade: OrdemServico["prioridade"], ativoId: number, tecnicoId: number | null, idade: number): OrdemServico =>
    ({ id, titulo, descricao: titulo, status, prioridade, ativoId, tecnicoId, criadoEm: dia(-idade) });
  return [
    o(1, "Vazamento de óleo no compressor", "ABERTA", "CRITICA", 1, null, 1),
    o(2, "Esteira travando na partida", "EM_ANDAMENTO", "ALTA", 2, 1, 3),
    o(3, "Elevador parando entre andares", "EM_ANDAMENTO", "CRITICA", 5, 2, 2),
    o(4, "Ruído anormal na bomba", "ATRIBUIDA", "MEDIA", 6, 3, 4),
    o(5, "Filtro do ar-condicionado saturado", "ABERTA", "BAIXA", 4, null, 1),
    o(6, "Troca de correia do exaustor", "CONCLUIDA", "MEDIA", 8, 1, 9),
    o(7, "Teste mensal do gerador", "CONCLUIDA", "ALTA", 3, 2, 12),
    o(8, "Disjuntor desarmando", "ATRIBUIDA", "ALTA", 3, 1, 2),
    o(9, "Sensor de temperatura sem leitura", "CANCELADA", "BAIXA", 1, null, 15),
    o(10, "Lubrificação da esteira", "ABERTA", "MEDIA", 2, null, 6),
  ];
};
const planos = (): PlanoManutencao[] => [
  { id: 1, nome: "Troca de óleo e filtros do compressor", ativoId: 1, periodicidadeDias: 90, proximaExecucao: dia(-4) },
  { id: 2, nome: "Inspeção geral do elevador", ativoId: 5, periodicidadeDias: 30, proximaExecucao: dia(3) },
  { id: 3, nome: "Teste de carga do gerador", ativoId: 3, periodicidadeDias: 30, proximaExecucao: dia(6) },
  { id: 4, nome: "Limpeza de dutos e filtros", ativoId: 4, periodicidadeDias: 60, proximaExecucao: dia(21) },
  { id: 5, nome: "Lubrificação da bomba", ativoId: 6, periodicidadeDias: 45, proximaExecucao: dia(-1) },
];

export async function autenticar(email: string, senha: string): Promise<boolean> {
  return email.trim().toLowerCase() === "gestor@operix.com" && senha === "operix123";
}

export async function listarAtivos(): Promise<Ativo[]> {
  return ativos();
}

export async function criarAtivo(dados: Pick<Ativo, "codigo" | "nome" | "localizacao">): Promise<Ativo> {
  return { ...dados, id: Date.now(), status: "DISPONIVEL", criadoEm: new Date().toISOString() };
}

export async function listarOrdens(): Promise<OrdemListada[]> {
  const a = ativos(), t = tecnicos();
  return ordens().map((o) => {
    const ativo = a.find((x) => x.id === o.ativoId);
    return {
      ...o, ativoCodigo: ativo?.codigo ?? "", ativoNome: ativo?.nome ?? "",
      tecnicoNome: t.find((x) => x.id === o.tecnicoId)?.nome ?? null, idadeDias: -diasAte(o.criadoEm),
    };
  });
}

export async function obterPainel(): Promise<Painel> {
  const lista = await listarOrdens();
  const a = ativos();
  const porStatus: Record<StatusOrdem, number> = { ABERTA: 0, ATRIBUIDA: 0, EM_ANDAMENTO: 0, CONCLUIDA: 0, CANCELADA: 0 };
  lista.forEach((o) => porStatus[o.status]++);

  const itens: ItemAtencao[] = lista
    .filter((o) => !["CONCLUIDA", "CANCELADA"].includes(o.status) && (o.prioridade === "CRITICA" || o.prioridade === "ALTA"))
    .map((o) => ({
      chave: `os-${o.id}`, titulo: o.titulo, ativo: o.ativoNome, prioridade: o.prioridade,
      motivo: o.idadeDias === 0 ? "Aberta hoje" : `Aberta há ${plural(o.idadeDias, "dia", "dias")}`,
      detalhe: `${ROTULO_STATUS_ORDEM[o.status]}, ${o.tecnicoNome ? `com ${o.tecnicoNome}` : "sem técnico"}`,
      urgente: false, peso: o.prioridade === "CRITICA" ? 90 : 70,
    }));

  let atrasadas = 0;
  planos().forEach((p) => {
    const d = diasAte(p.proximaExecucao);
    if (d > 7) return;
    if (d < 0) atrasadas++;
    itens.push({
      chave: `pl-${p.id}`, titulo: p.nome, ativo: a.find((x) => x.id === p.ativoId)?.nome ?? "",
      prioridade: d < 0 ? "ALTA" : "MEDIA",
      motivo: d < 0 ? `Atrasada há ${plural(-d, "dia", "dias")}` : d === 0 ? "Vence hoje" : `Vence em ${plural(d, "dia", "dias")}`,
      detalhe: `Preventiva a cada ${p.periodicidadeDias} dias`,
      urgente: d < 0, peso: d < 0 ? 100 - d : 50 - d,
    });
  });

  return {
    atencao: itens.sort((x, y) => y.peso - x.peso), porStatus, totalOrdens: lista.length, preventivasAtrasadas: atrasadas,
    ativos: { total: a.length, emManutencao: a.filter((x) => x.status === "EM_MANUTENCAO").length, inativos: a.filter((x) => x.status === "INATIVO").length },
  };
}

