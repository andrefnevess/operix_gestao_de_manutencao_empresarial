import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsString, IsUUID, Min } from 'class-validator';
import { PlanoPreventivo } from '../../domain';

export class CriarPlanoDto {
  @ApiProperty({ description: 'Id do equipamento' })
  @IsUUID()
  equipamentoId!: string;

  @ApiProperty({ example: 'Lubrificar rolamentos e conferir correias' })
  @IsString()
  @IsNotEmpty()
  descricao!: string;

  @ApiProperty({ example: 30, description: 'Periodicidade em dias' })
  @IsInt()
  @Min(1)
  periodicidadeDias!: number;

  @ApiProperty({ example: '2026-11-10T00:00:00.000Z', description: 'Data de início do plano' })
  @IsDateString()
  inicio!: string;
}

export class PlanoResposta {
  @ApiProperty() id!: string;
  @ApiProperty() equipamentoId!: string;
  @ApiProperty() equipamentoCodigo!: string;
  @ApiProperty() equipamentoNome!: string;
  @ApiProperty() descricao!: string;
  @ApiProperty() periodicidadeDias!: number;
  @ApiProperty() ultimaExecucao!: Date;
  @ApiProperty() proximaData!: Date;
  @ApiProperty() ativo!: boolean;

  static de(p: PlanoPreventivo): PlanoResposta {
    return {
      id: p.getId(),
      equipamentoId: p.getEquipamento().getId(),
      equipamentoCodigo: p.getEquipamento().getCodigo(),
      equipamentoNome: p.getEquipamento().getNome(),
      descricao: p.getDescricao(),
      periodicidadeDias: p.getPeriodicidadeDias(),
      ultimaExecucao: p.getUltimaExecucao(),
      proximaData: p.proximaData(),
      ativo: p.estaAtivo(),
    };
  }
}
