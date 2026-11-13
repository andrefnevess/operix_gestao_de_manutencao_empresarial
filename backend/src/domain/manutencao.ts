import { Equipamento } from './equipamento';
import { TipoManutencao } from './enums';
import { PlanoPreventivo } from './plano-preventivo';
import { exigir, texto } from './regra-de-negocio.error';
import { Tecnico } from './usuario';

/**
 * Registro do serviço realizado em um equipamento. Classe abstrata: só existem
 * manutenções corretivas ou preventivas. Criada apenas pela OrdemServico (composição).
 */
export abstract class Manutencao {
  private readonly descricaoServico: string;

  protected constructor(
    private readonly equipamento: Equipamento,
    private readonly tecnico: Tecnico,
    descricaoServico: string,
    private readonly tempoGastoMin: number,
    private readonly realizadaEm: Date,
  ) {
    exigir(texto(descricaoServico).length > 0, 'A descrição do serviço é obrigatória.', 'RN06');
    exigir(Number.isInteger(tempoGastoMin) && tempoGastoMin > 0, 'Informe o tempo gasto em minutos.', 'UH06-CA04');
    this.descricaoServico = texto(descricaoServico);
  }

  abstract getTipo(): TipoManutencao;

  getEquipamento(): Equipamento {
    return this.equipamento;
  }
  getTecnico(): Tecnico {
    return this.tecnico;
  }
  getDescricaoServico(): string {
    return this.descricaoServico;
  }
  getTempoGastoMin(): number {
    return this.tempoGastoMin;
  }
  getRealizadaEm(): Date {
    return this.realizadaEm;
  }

  /** Reconstitui uma manutenção a partir dos dados do banco. */
  static reconstituir(dados: {
    tipo: TipoManutencao;
    equipamento: Equipamento;
    tecnico: Tecnico;
    descricaoServico: string;
    tempoGastoMin: number;
    realizadaEm: Date;
    plano?: PlanoPreventivo | null;
  }): Manutencao {
    if (dados.tipo === TipoManutencao.PREVENTIVA && dados.plano) {
      return ManutencaoPreventiva.reconstituirPreventiva(dados.equipamento, dados.tecnico, dados.descricaoServico, dados.tempoGastoMin, dados.realizadaEm, dados.plano);
    }
    return ManutencaoCorretiva.reconstituirCorretiva(dados.equipamento, dados.tecnico, dados.descricaoServico, dados.tempoGastoMin, dados.realizadaEm);
  }
}

export class ManutencaoCorretiva extends Manutencao {
  constructor(equipamento: Equipamento, tecnico: Tecnico, descricaoServico: string, tempoGastoMin: number, realizadaEm: Date) {
    super(equipamento, tecnico, descricaoServico, tempoGastoMin, realizadaEm);
  }
  getTipo(): TipoManutencao {
    return TipoManutencao.CORRETIVA;
  }
  /** Reconstitui sem validação (dados já foram validados na criação). */
  static reconstituirCorretiva(equipamento: Equipamento, tecnico: Tecnico, descricaoServico: string, tempoGastoMin: number, realizadaEm: Date): ManutencaoCorretiva {
    // Chama o construtor normalmente — os dados do banco já passaram pela validação na criação
    return new ManutencaoCorretiva(equipamento, tecnico, descricaoServico, tempoGastoMin, realizadaEm);
  }
}

export class ManutencaoPreventiva extends Manutencao {
  constructor(
    equipamento: Equipamento,
    tecnico: Tecnico,
    descricaoServico: string,
    tempoGastoMin: number,
    realizadaEm: Date,
    private readonly plano: PlanoPreventivo,
  ) {
    super(equipamento, tecnico, descricaoServico, tempoGastoMin, realizadaEm);
  }
  getTipo(): TipoManutencao {
    return TipoManutencao.PREVENTIVA;
  }
  getPlano(): PlanoPreventivo {
    return this.plano;
  }
  /** Reconstitui sem validação (dados já foram validados na criação). */
  static reconstituirPreventiva(equipamento: Equipamento, tecnico: Tecnico, descricaoServico: string, tempoGastoMin: number, realizadaEm: Date, plano: PlanoPreventivo): ManutencaoPreventiva {
    return new ManutencaoPreventiva(equipamento, tecnico, descricaoServico, tempoGastoMin, realizadaEm, plano);
  }
}
