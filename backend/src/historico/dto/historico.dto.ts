import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsISO8601, IsOptional } from 'class-validator';
import { Manutencao, TipoManutencao } from '../../domain';

/** Filtros do histórico (UH08-CA02 e CA03). Valor inválido devolve 400, não lista vazia. */
export class FiltroHistoricoQuery {
  @ApiPropertyOptional({ enum: TipoManutencao })
  @IsOptional()
  @IsEnum(TipoManutencao, { message: 'tipo deve ser CORRETIVA ou PREVENTIVA' })
  tipo?: TipoManutencao;

  @ApiPropertyOptional({ example: '2026-11-01' })
  @IsOptional()
  @IsISO8601({}, { message: 'de deve ser uma data no formato AAAA-MM-DD' })
  de?: string;

  @ApiPropertyOptional({ example: '2026-11-30' })
  @IsOptional()
  @IsISO8601({}, { message: 'ate deve ser uma data no formato AAAA-MM-DD' })
  ate?: string;
}

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