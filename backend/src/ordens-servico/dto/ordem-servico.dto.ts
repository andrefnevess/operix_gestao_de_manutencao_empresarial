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

export class ManutencaoDaOrdem {
  @ApiProperty() tipo!: string;
  @ApiProperty() descricaoServico!: string;
  @ApiProperty() tempoGastoMin!: number;
  @ApiProperty() realizadaEm!: Date;
}

/** Já traz os nomes do equipamento e do técnico, para as telas não precisarem de outras consultas. */
export class OrdemResposta {
  @ApiProperty() id!: string;
  @ApiProperty() status!: string;
  @ApiProperty({ description: 'CORRETIVA (veio de um chamado) ou PREVENTIVA (veio de um plano)' }) tipo!: string;
  @ApiProperty({ description: 'Descrição do chamado ou do plano de origem' }) descricao!: string;
  @ApiProperty() prioridade!: string;
  @ApiProperty() equipamentoId!: string;
  @ApiProperty() equipamentoCodigo!: string;
  @ApiProperty() equipamentoNome!: string;
  @ApiProperty({ nullable: true, type: String }) tecnicoId!: string | null;
  @ApiProperty({ nullable: true, type: String }) tecnicoNome!: string | null;
  @ApiProperty({ nullable: true, type: Date }) dataPrevista!: Date | null;
  @ApiProperty() criadaEm!: Date;
  @ApiProperty({ nullable: true, type: String }) chamadoId!: string | null;
  @ApiProperty({ nullable: true, type: String }) planoId!: string | null;
  @ApiProperty({ nullable: true, type: String }) motivoCancelamento!: string | null;
  @ApiProperty({ nullable: true, type: ManutencaoDaOrdem }) manutencao!: ManutencaoDaOrdem | null;

  static de(o: OrdemServico): OrdemResposta {
    const m = o.getManutencao();
    return {
      id: o.getId(),
      status: o.getStatus(),
      tipo: o.getPlano() ? 'PREVENTIVA' : 'CORRETIVA',
      descricao: o.getChamado()?.getDescricao() ?? o.getPlano()?.getDescricao() ?? '',
      prioridade: o.getPrioridade(),
      equipamentoId: o.getEquipamento().getId(),
      equipamentoCodigo: o.getEquipamento().getCodigo(),
      equipamentoNome: o.getEquipamento().getNome(),
      tecnicoId: o.getTecnico()?.getId() ?? null,
      tecnicoNome: o.getTecnico()?.getNome() ?? null,
      dataPrevista: o.getDataPrevista(),
      criadaEm: o.getCriadaEm(),
      chamadoId: o.getChamado()?.getId() ?? null,
      planoId: o.getPlano()?.getId() ?? null,
      motivoCancelamento: o.getMotivoCancelamento(),
      manutencao: m
        ? { tipo: m.getTipo(), descricaoServico: m.getDescricaoServico(), tempoGastoMin: m.getTempoGastoMin(), realizadaEm: m.getRealizadaEm() }
        : null,
    };
  }
}
