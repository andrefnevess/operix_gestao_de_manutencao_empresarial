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
}

export class ManutencaoCorretiva extends Manutencao {
  constructor(equipamento: Equipamento, tecnico: Tecnico, descricaoServico: string, tempoGastoMin: number, realizadaEm: Date) {
    super(equipamento, tecnico, descricaoServico, tempoGastoMin, realizadaEm);
  }
  getTipo(): TipoManutencao {
    return TipoManutencao.CORRETIVA;
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
}
