import { ApiProperty } from '@nestjs/swagger';
import { Manutencao } from '../../domain';

export class ManutencaoResposta {
  @ApiProperty() ordemId!: string;
  @ApiProperty() data!: Date;
  @ApiProperty({ enum: ['CORRETIVA', 'PREVENTIVA'] }) tipo!: string;
  @ApiProperty() tecnico!: string;
  @ApiProperty() servico!: string;
  @ApiProperty() tempoGastoMin!: number;

  static de(ordemId: string, m: Manutencao): ManutencaoResposta {
    return {
      ordemId,
      data: m.getRealizadaEm(),
      tipo: m.getTipo(),
      tecnico: m.getTecnico().getNome(),
      servico: m.getDescricaoServico(),
      tempoGastoMin: m.getTempoGastoMin(),
    };
  }
}

export class IndicadoresResposta {
  @ApiProperty({ description: 'Quantidade de ordens por status' })
  ordensPorStatus!: Record<string, number>;

  @ApiProperty({ description: 'Ordens em aberto com a data prevista vencida' })
  ordensAtrasadas!: number;

  @ApiProperty({ description: 'Planos preventivos atrasados' })
  preventivasAtrasadas!: number;

  @ApiProperty({ description: 'Equipamentos com mais manutenções corretivas' })
  equipamentosMaisCorretivas!: { equipamentoId: string; codigo: string; corretivas: number }[];
}