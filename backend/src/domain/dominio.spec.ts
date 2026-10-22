import {
  Administrador,
  Chamado,
  DadosUsuario,
  Equipamento,
  Gestor,
  ManutencaoCorretiva,
  ManutencaoPreventiva,
  OrdemServico,
  Perfil,
  PlanoPreventivo,
  Prioridade,
  RegraDeNegocioError,
  Solicitante,
  StatusChamado,
  StatusEquipamento,
  StatusOS,
  Tecnico,
  TipoManutencao,
  Usuario,
  VerificadorDeSenha,
} from './index';

const verificador: VerificadorDeSenha = { comparar: (senha, hash) => hash === `hash:${senha}` };
const agora = new Date('2026-10-20T12:00:00Z');
const DIA = 24 * 60 * 60 * 1000;

function dados(id: string, extra: Partial<DadosUsuario> = {}): DadosUsuario {
  return { id, nome: `Usuário ${id}`, email: `${id}@operix.local`, senhaHash: 'hash:segredo', ativo: true, tentativasFalhas: 0, bloqueadoAte: null, ...extra };
}

function equipamento(): Equipamento {
  return Equipamento.novo('e1', { codigo: 'cmp-001', nome: 'Compressor', tipo: 'Compressor de ar', localizacao: 'Galpão A' });
}

describe('Usuario (UH01 e UH02)', () => {
  it('cria a subclasse correta a partir do perfil (polimorfismo)', () => {
    expect(Usuario.criar(Perfil.ADMINISTRADOR, dados('a'))).toBeInstanceOf(Administrador);
    expect(Usuario.criar(Perfil.GESTOR, dados('g'))).toBeInstanceOf(Gestor);
    expect(Usuario.criar(Perfil.TECNICO, dados('t'))).toBeInstanceOf(Tecnico);
    expect(Usuario.criar(Perfil.SOLICITANTE, dados('s')).getPerfil()).toBe(Perfil.SOLICITANTE);
  });

  it('cada perfil responde às permissões do seu jeito', () => {
    const admin = new Administrador(dados('a'));
    const gestor = new Gestor(dados('g'));
    expect(admin.podeGerenciarUsuarios()).toBe(true);
    expect(admin.podeGerenciarEquipamentos()).toBe(false);
    expect(gestor.podeGerenciarEquipamentos()).toBe(true);
    expect(gestor.podeGerenciarUsuarios()).toBe(false);
    expect(new Tecnico(dados('t')).podeExecutarOrdens()).toBe(true);
    expect(new Solicitante(dados('s')).podeAbrirChamado()).toBe(true);
  });

  it('autentica com a senha correta e zera as tentativas (UH01-CA01)', () => {
    const u = new Gestor(dados('g', { tentativasFalhas: 3 }));
    expect(u.autenticar('segredo', verificador, agora)).toBe(true);
    expect(u.getTentativasFalhas()).toBe(0);
  });

  it('recusa usuário inativo mesmo com a senha correta (RN02 / UH01-CA04)', () => {
    const u = new Gestor(dados('g', { ativo: false }));
    expect(u.autenticar('segredo', verificador, agora)).toBe(false);
  });

  it('bloqueia por 15 minutos após 5 tentativas sem sucesso (UH01-CA05)', () => {
    const u = new Gestor(dados('g'));
    for (let i = 0; i < 5; i++) expect(u.autenticar('errada', verificador, agora)).toBe(false);
    expect(u.estaBloqueado(agora)).toBe(true);
    expect(u.autenticar('segredo', verificador, agora)).toBe(false);
    const depois = new Date(agora.getTime() + 16 * 60_000);
    expect(u.autenticar('segredo', verificador, depois)).toBe(true);
  });

  it('valida nome e e-mail', () => {
    expect(() => new Gestor(dados('g', { email: 'invalido' }))).toThrow(RegraDeNegocioError);
    expect(() => new Gestor(dados('g', { nome: ' ' }))).toThrow(RegraDeNegocioError);
  });

  it('inativa em vez de excluir (UH02-CA05)', () => {
    const u = new Solicitante(dados('s'));
    u.inativar();
    expect(u.estaAtivo()).toBe(false);
    u.reativar();
    expect(u.estaAtivo()).toBe(true);
  });
});

describe('Equipamento (UH03)', () => {
  it('nasce ativo e com o código normalizado', () => {
    const e = equipamento();
    expect(e.getStatus()).toBe(StatusEquipamento.ATIVO);
    expect(e.getCodigo()).toBe('CMP-001');
  });

  it('exige código, nome, tipo e localização (UH03-CA01)', () => {
    expect(() => Equipamento.novo('e', { codigo: '', nome: 'X', tipo: 'Y', localizacao: 'Z' })).toThrow('O código é obrigatório.');
    expect(() => Equipamento.novo('e', { codigo: 'A', nome: 'X', tipo: 'Y', localizacao: ' ' })).toThrow('A localização é obrigatória.');
  });

  it('não inativa equipamento em manutenção', () => {
    const e = equipamento();
    e.colocarEmManutencao();
    expect(() => e.inativar()).toThrow(RegraDeNegocioError);
    e.liberar();
    e.inativar();
    expect(e.getStatus()).toBe(StatusEquipamento.INATIVO);
  });

  it('busca por código, nome, tipo ou localização (UH03-CA06)', () => {
    const e = equipamento();
    expect(e.corresponde('galpão')).toBe(true);
    expect(e.corresponde('cmp')).toBe(true);
    expect(e.corresponde('bomba')).toBe(false);
  });
});

describe('Chamado (UH04)', () => {
  it('não abre chamado para equipamento inativo (RN03)', () => {
    const e = equipamento();
    e.inativar();
    expect(() => Chamado.abrir('c1', new Solicitante(dados('s')), e, 'Vazamento', Prioridade.ALTA, agora)).toThrow(
      'Não é possível abrir chamado para equipamento inativo.',
    );
  });

  it('técnico não abre chamado', () => {
    expect(() => Chamado.abrir('c1', new Tecnico(dados('t')), equipamento(), 'Ruído', Prioridade.BAIXA, agora)).toThrow(RegraDeNegocioError);
  });

  it('abre com status ABERTO', () => {
    const c = Chamado.abrir('c1', new Solicitante(dados('s')), equipamento(), 'Ruído estranho', Prioridade.MEDIA, agora);
    expect(c.getStatus()).toBe(StatusChamado.ABERTO);
  });
});

describe('OrdemServico (UH05 e UH06)', () => {
  const gestor = new Gestor(dados('g'));
  const tecnico = new Tecnico(dados('t'));

  function osDeChamado() {
    const e = equipamento();
    const c = Chamado.abrir('c1', new Solicitante(dados('s')), e, 'Vazamento de ar', Prioridade.ALTA, agora);
    return { e, c, os: OrdemServico.aPartirDeChamado('os1', c) };
  }

  it('herda equipamento e urgência e põe o chamado em atendimento (UH05-CA02 e CA05)', () => {
    const { e, c, os } = osDeChamado();
    expect(os.getEquipamento()).toBe(e);
    expect(os.getPrioridade()).toBe(Prioridade.ALTA);
    expect(c.getStatus()).toBe(StatusChamado.EM_ATENDIMENTO);
  });

  it('não executa sem estar atribuída (RN04)', () => {
    const { os } = osDeChamado();
    expect(() => os.iniciar(tecnico)).toThrow(RegraDeNegocioError);
  });

  it('só o técnico atribuído inicia (RN10)', () => {
    const { os } = osDeChamado();
    os.atribuir(gestor, tecnico, new Date(agora.getTime() + DIA));
    expect(() => os.iniciar(new Tecnico(dados('outro')))).toThrow('Somente o técnico atribuído pode iniciar a ordem de serviço.');
  });

  it('percorre o ciclo completo e registra manutenção corretiva', () => {
    const { e, c, os } = osDeChamado();
    os.atribuir(gestor, tecnico, new Date(agora.getTime() + DIA));
    expect(os.getStatus()).toBe(StatusOS.ATRIBUIDA);
    os.iniciar(tecnico);
    expect(e.getStatus()).toBe(StatusEquipamento.EM_MANUTENCAO);
    const m = os.concluir(tecnico, 'Troca da vedação', 45, agora);
    expect(m).toBeInstanceOf(ManutencaoCorretiva);
    expect(m.getTipo()).toBe(TipoManutencao.CORRETIVA);
    expect(os.getStatus()).toBe(StatusOS.CONCLUIDA);
    expect(e.getStatus()).toBe(StatusEquipamento.ATIVO);
    expect(c.getStatus()).toBe(StatusChamado.ENCERRADO);
  });

  it('exige a descrição do serviço para concluir (RN06)', () => {
    const { os } = osDeChamado();
    os.atribuir(gestor, tecnico, agora);
    os.iniciar(tecnico);
    expect(() => os.concluir(tecnico, '  ', 30, agora)).toThrow('A descrição do serviço é obrigatória.');
  });

  it('OS concluída não muda mais (RN05)', () => {
    const { os } = osDeChamado();
    os.atribuir(gestor, tecnico, agora);
    os.iniciar(tecnico);
    os.concluir(tecnico, 'Ajuste', 10, agora);
    expect(() => os.cancelar(gestor, 'erro')).toThrow(RegraDeNegocioError);
    expect(() => os.atribuir(gestor, tecnico, agora)).toThrow(RegraDeNegocioError);
  });

  it('identifica OS atrasada', () => {
    const { os } = osDeChamado();
    os.atribuir(gestor, tecnico, new Date(agora.getTime() - DIA));
    expect(os.estaAtrasada(agora)).toBe(true);
  });
});

describe('PlanoPreventivo e manutenção preventiva (UH07)', () => {
  it('calcula a próxima data e os alertas', () => {
    const plano = PlanoPreventivo.criar('p1', equipamento(), 'Lubrificação', 30, new Date('2026-10-01T12:00:00Z'));
    expect(plano.proximaData().toISOString()).toBe('2026-10-31T12:00:00.000Z');
    expect(plano.venceEmAte(7, new Date('2026-10-25T12:00:00Z'))).toBe(true);
    expect(plano.venceEmAte(7, new Date('2026-10-20T12:00:00Z'))).toBe(false);
    expect(plano.estaAtrasado(new Date('2026-11-02T12:00:00Z'))).toBe(true);
  });

  it('OS de plano gera manutenção preventiva e atualiza a última execução', () => {
    const tecnico = new Tecnico(dados('t'));
    const plano = PlanoPreventivo.criar('p1', equipamento(), 'Lubrificação', 30, new Date('2026-09-01T12:00:00Z'));
    const os = OrdemServico.aPartirDePlano('os2', plano);
    os.atribuir(new Gestor(dados('g')), tecnico, agora);
    os.iniciar(tecnico);
    const m = os.concluir(tecnico, 'Lubrificação dos rolamentos', 20, agora);
    expect(m).toBeInstanceOf(ManutencaoPreventiva);
    expect(plano.getUltimaExecucao()).toBe(agora);
  });
});
