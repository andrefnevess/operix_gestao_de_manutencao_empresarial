import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsString, IsUUID, Min } from 'class-validator';
import { OrdemServico } from '../../domain';

export class GerarOrdemDto {
  @ApiProperty({ description: 'Id do chamado de origem' })
  @IsUUID()
  chamadoId!: string;
}

export class AtribuirOrdemDto {
  @ApiProperty({ description: 'Id do técnico' })
  @IsUUID()
  tecnicoId!: string;

  @ApiProperty({ example: '2026-11-20T09:00:00.000Z' })
  @IsDateString()
  dataPrevista!: string;
}

export class ConcluirOrdemDto {
  @ApiProperty({ example: 'Troca da correia e lubrificação' })
  @IsString()
  @IsNotEmpty()
  descricaoServico!: string;

  @ApiProperty({ example: 90, description: 'Tempo gasto em minutos' })
  @IsInt()
  @Min(1)
  tempoGastoMin!: number;
}

export class CancelarOrdemDto {
  @ApiProperty({ example: 'Equipamento substituído' })
  @IsString()
  @IsNotEmpty()
  motivo!: string;
}

export class OrdemResposta {
  id!: string;
  status!: string;
  equipamentoId!: string;
  prioridade!: string;
  tecnicoId!: string | null;
  dataPrevista!: Date | null;
  chamadoId!: string | null;

  static de(o: OrdemServico): OrdemResposta {
    return {
      id: o.getId(),
      status: o.getStatus(),
      equipamentoId: o.getEquipamento().getId(),
      prioridade: o.getPrioridade(),
      tecnicoId: o.getTecnico()?.getId() ?? null,
      dataPrevista: o.getDataPrevista(),
      chamadoId: o.getChamado()?.getId() ?? null,
    };
  }
}