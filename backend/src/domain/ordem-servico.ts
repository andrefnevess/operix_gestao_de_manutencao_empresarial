import { Chamado } from './chamado';
import { Equipamento } from './equipamento';
import { Prioridade, StatusOS } from './enums';
import { Manutencao, ManutencaoCorretiva, ManutencaoPreventiva } from './manutencao';
import { PlanoPreventivo } from './plano-preventivo';
import { exigir, RegraDeNegocioError, texto } from './regra-de-negocio.error';
import { Gestor, Tecnico } from './usuario';

/**
 * Trabalho planejado de manutenção (UH05 e UH06).
 * O estado só muda pelos métodos desta classe; qualquer outra transição é recusada.
 */
export class OrdemServico {
  private status: StatusOS = StatusOS.ABERTA;
  private tecnico: Tecnico | null = null;
  private dataPrevista: Date | null = null;
  private manutencao: Manutencao | null = null;
  private motivoCancelamento: string | null = null;
  private criadaEm: Date = new Date();

  // Construtor privado: toda OS tem exatamente uma origem, um chamado ou um plano (RN11).
  private constructor(
    private readonly id: string,
    private readonly equipamento: Equipamento,
    private readonly prioridade: Prioridade,
    private readonly chamado: Chamado | null,
    private readonly plano: PlanoPreventivo | null,
  ) {}

  /** A OS herda equipamento, descrição e urgência do chamado (UH05-CA02). */
  static aPartirDeChamado(id: string, chamado: Chamado): OrdemServico {
    chamado.iniciarAtendimento();
    return new OrdemServico(id, chamado.getEquipamento(), chamado.getUrgencia(), chamado, null);
  }

  static aPartirDePlano(id: string, plano: PlanoPreventivo, prioridade: Prioridade = Prioridade.MEDIA): OrdemServico {
    exigir(plano.estaAtivo(), 'O plano preventivo está desativado.');
    return new OrdemServico(id, plano.getEquipamento(), prioridade, null, plano);
  }

  /** Reconstitui uma OS a partir dos dados do banco, sem aplicar regras. */
  static reconstituir(dados: {
    id: string;
    equipamento: Equipamento;
    prioridade: Prioridade;
    chamado: Chamado | null;
    plano: PlanoPreventivo | null;
    status: StatusOS;
    tecnico: Tecnico | null;
    dataPrevista: Date | null;
    manutencao: Manutencao | null;
    motivoCancelamento: string | null;
    criadaEm: Date;
  }): OrdemServico {
    const os = new OrdemServico(dados.id, dados.equipamento, dados.prioridade, dados.chamado, dados.plano);
    os.status = dados.status;
    os.tecnico = dados.tecnico;
    os.dataPrevista = dados.dataPrevista;
    os.manutencao = dados.manutencao;
    os.motivoCancelamento = dados.motivoCancelamento;
    os.criadaEm = dados.criadaEm;
    return os;
  }

  /** Só um gestor atribui (RN08), e somente a um técnico ativo (UH05-CA03). */
  atribuir(gestor: Gestor, tecnico: Tecnico, dataPrevista: Date): void {
    this.exigirStatus(StatusOS.ABERTA, StatusOS.ATRIBUIDA);
    exigir(gestor instanceof Gestor && gestor.estaAtivo(), 'Apenas um gestor ativo pode atribuir ordens de serviço.', 'RN08');
    exigir(tecnico instanceof Tecnico && tecnico.estaAtivo(), 'A ordem deve ser atribuída a um técnico ativo.', 'UH05-CA03');
    this.tecnico = tecnico;
    this.dataPrevista = dataPrevista;
    this.status = StatusOS.ATRIBUIDA;
  }

  /** Só o técnico atribuído inicia (RN04, RN10, UH06-CA01). */
  iniciar(tecnico: Tecnico): void {
    this.exigirStatus(StatusOS.ATRIBUIDA);
    exigir(this.tecnico !== null && tecnico.getId() === this.tecnico.getId(), 'Somente o técnico atribuído pode iniciar a ordem de serviço.', 'RN10');
    this.equipamento.colocarEmManutencao();
    this.status = StatusOS.EM_EXECUCAO;
  }

  /**
   * Conclui a OS e registra a manutenção (UH06-CA03 a CA05). Polimorfismo: a manutenção
   * criada é corretiva ou preventiva conforme a origem da OS.
   */
  concluir(tecnico: Tecnico, descricaoServico: string, tempoGastoMin: number, agora: Date): Manutencao {
    this.exigirStatus(StatusOS.EM_EXECUCAO);
    const atribuido = this.tecnico as Tecnico;
    exigir(tecnico.getId() === atribuido.getId(), 'Somente o técnico atribuído pode concluir a ordem de serviço.', 'RN10');
    const manutencao = this.plano
      ? new ManutencaoPreventiva(this.equipamento, atribuido, descricaoServico, tempoGastoMin, agora, this.plano)
      : new ManutencaoCorretiva(this.equipamento, atribuido, descricaoServico, tempoGastoMin, agora);
    this.manutencao = manutencao;
    this.status = StatusOS.CONCLUIDA;
    this.equipamento.liberar();
    this.chamado?.encerrar();
    this.plano?.registrarExecucao(agora);
    return manutencao;
  }

  /** Cancelamento só pelo gestor e antes da execução (RN08). */
  cancelar(gestor: Gestor, motivo: string): void {
    this.exigirStatus(StatusOS.ABERTA, StatusOS.ATRIBUIDA);
    exigir(gestor instanceof Gestor && gestor.estaAtivo(), 'Apenas um gestor ativo pode cancelar ordens de serviço.', 'RN08');
    exigir(texto(motivo).length > 0, 'Informe o motivo do cancelamento.');
    this.motivoCancelamento = texto(motivo);
    this.status = StatusOS.CANCELADA;
  }

  estaAtrasada(hoje: Date): boolean {
    const emAberto = this.status === StatusOS.ABERTA || this.status === StatusOS.ATRIBUIDA || this.status === StatusOS.EM_EXECUCAO;
    return emAberto && this.dataPrevista !== null && this.dataPrevista.getTime() < hoje.getTime();
  }

  getId(): string {
    return this.id;
  }
  getStatus(): StatusOS {
    return this.status;
  }
  getEquipamento(): Equipamento {
    return this.equipamento;
  }
  getPrioridade(): Prioridade {
    return this.prioridade;
  }
  getTecnico(): Tecnico | null {
    return this.tecnico;
  }
  getDataPrevista(): Date | null {
    return this.dataPrevista;
  }
  getChamado(): Chamado | null {
    return this.chamado;
  }
  getPlano(): PlanoPreventivo | null {
    return this.plano;
  }
  getManutencao(): Manutencao | null {
    return this.manutencao;
  }
  getMotivoCancelamento(): string | null {
    return this.motivoCancelamento;
  }
  getCriadaEm(): Date {
    return this.criadaEm;
  }

  // Concluída ou cancelada não muda mais (RN05).
  private exigirStatus(...permitidos: StatusOS[]): void {
    if (!permitidos.includes(this.status)) {
      throw new RegraDeNegocioError(`Operação não permitida com a ordem de serviço em ${this.status}.`, 'RN05');
    }
  }
}
