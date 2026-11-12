import { Equipamento } from './equipamento';
import { exigir, texto } from './regra-de-negocio.error';

const DIA_MS = 24 * 60 * 60 * 1000;

/** Programação de manutenção periódica de um equipamento (UH07). */
export class PlanoPreventivo {
  private ativo = true;

  private constructor(
    private readonly id: string,
    private readonly equipamento: Equipamento,
    private readonly descricao: string,
    private readonly periodicidadeDias: number,
    private ultimaExecucao: Date,
  ) {}

  static criar(
    id: string,
    equipamento: Equipamento,
    descricao: string,
    periodicidadeDias: number,
    inicio: Date,
  ): PlanoPreventivo {
    exigir(equipamento.estaAtivo(), 'O plano deve estar vinculado a um equipamento ativo.', 'UH07-CA01');
    exigir(texto(descricao).length > 0, 'A descrição das atividades é obrigatória.', 'UH07-CA02');
    exigir(Number.isInteger(periodicidadeDias) && periodicidadeDias > 0, 'A periodicidade deve ser um número de dias maior que zero.', 'UH07-CA02');
    return new PlanoPreventivo(id, equipamento, texto(descricao), periodicidadeDias, inicio);
  }

  /** Reconstitui um plano a partir dos dados do banco, sem aplicar regras. */
  static reconstituir(dados: {
    id: string;
    equipamento: Equipamento;
    descricao: string;
    periodicidadeDias: number;
    ultimaExecucao: Date;
    ativo: boolean;
  }): PlanoPreventivo {
    const p = new PlanoPreventivo(dados.id, dados.equipamento, dados.descricao, dados.periodicidadeDias, dados.ultimaExecucao);
    p.ativo = dados.ativo;
    return p;
  }

  /** Próxima data = última execução + periodicidade (RN07 / UH07-CA03). */
  proximaData(): Date {
    return new Date(this.ultimaExecucao.getTime() + this.periodicidadeDias * DIA_MS);
  }

  /** Alerta de vencimento nos próximos `dias` (UH07-CA04). */
  venceEmAte(dias: number, hoje: Date): boolean {
    const limite = hoje.getTime() + dias * DIA_MS;
    const proxima = this.proximaData().getTime();
    return this.ativo && proxima >= hoje.getTime() && proxima <= limite;
  }

  /** Preventiva não realizada até a data prevista (UH07-CA05). */
  estaAtrasado(hoje: Date): boolean {
    return this.ativo && this.proximaData().getTime() < hoje.getTime();
  }

  registrarExecucao(data: Date): void {
    this.ultimaExecucao = data;
  }

  desativar(): void {
    this.ativo = false;
  }

  estaAtivo(): boolean {
    return this.ativo;
  }
  getId(): string {
    return this.id;
  }
  getEquipamento(): Equipamento {
    return this.equipamento;
  }
  getDescricao(): string {
    return this.descricao;
  }
  getPeriodicidadeDias(): number {
    return this.periodicidadeDias;
  }
  getUltimaExecucao(): Date {
    return this.ultimaExecucao;
  }
}
