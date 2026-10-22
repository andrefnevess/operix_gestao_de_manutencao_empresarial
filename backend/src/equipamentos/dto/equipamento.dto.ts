import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Equipamento, StatusEquipamento } from '../../domain';

/** Campos obrigatórios: código, nome, tipo e localização (UH03-CA01). Opcionais: fabricante, modelo e data de aquisição (UH03-CA03). */
export class SalvarEquipamentoDto {
  @ApiProperty({ example: 'CMP-001' })
  @IsString()
  @MinLength(1, { message: 'O código é obrigatório.' })
  @MaxLength(30)
  codigo: string;

  @ApiProperty({ example: 'Compressor de ar' })
  @IsString()
  @MinLength(1, { message: 'O nome é obrigatório.' })
  @MaxLength(120)
  nome: string;

  @ApiProperty({ example: 'Compressor' })
  @IsString()
  @MinLength(1, { message: 'O tipo é obrigatório.' })
  @MaxLength(60)
  tipo: string;

  @ApiProperty({ example: 'Galpão A' })
  @IsString()
  @MinLength(1, { message: 'A localização é obrigatória.' })
  @MaxLength(120)
  localizacao: string;

  @ApiPropertyOptional({ example: 'Schulz' })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  fabricante?: string;

  @ApiPropertyOptional({ example: 'CSL 20' })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  modelo?: string;

  @ApiPropertyOptional({ example: '2024-03-15' })
  @IsOptional()
  @IsDateString({}, { message: 'Data de aquisição inválida.' })
  dataAquisicao?: string;
}

export class EquipamentoResposta {
  @ApiProperty() id: string;
  @ApiProperty() codigo: string;
  @ApiProperty() nome: string;
  @ApiProperty() tipo: string;
  @ApiProperty() localizacao: string;
  @ApiProperty({ nullable: true, type: String }) fabricante: string | null;
  @ApiProperty({ nullable: true, type: String }) modelo: string | null;
  @ApiProperty({ nullable: true, type: String }) dataAquisicao: string | null;
  @ApiProperty({ enum: StatusEquipamento }) status: StatusEquipamento;

  static de(e: Equipamento): EquipamentoResposta {
    return {
      id: e.getId(),
      codigo: e.getCodigo(),
      nome: e.getNome(),
      tipo: e.getTipo(),
      localizacao: e.getLocalizacao(),
      fabricante: e.getFabricante(),
      modelo: e.getModelo(),
      dataAquisicao: e.getDataAquisicao()?.toISOString().slice(0, 10) ?? null,
      status: e.getStatus(),
    };
  }
}
