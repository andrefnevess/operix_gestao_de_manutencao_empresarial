import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Perfil, Tecnico, Usuario } from '../../domain';

export class CriarUsuarioDto {
  @ApiProperty({ example: 'Maria Souza' })
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  nome: string;

  @ApiProperty({ example: 'maria.souza@empresa.com' })
  @IsEmail({}, { message: 'Informe um e-mail válido.' })
  email: string;

  @ApiProperty({ example: 'SenhaForte123', minLength: 8 })
  @IsString()
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
  senha: string;

  @ApiProperty({ enum: Perfil, example: Perfil.TECNICO })
  @IsEnum(Perfil, { message: 'Perfil inválido.' })
  perfil: Perfil;

  @ApiPropertyOptional({ type: [String], example: ['Elétrica', 'Refrigeração'], description: 'Somente para técnicos.' })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  especialidades?: string[];
}

export class AtualizarUsuarioDto {
  @ApiProperty({ example: 'Maria Souza' })
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  nome: string;

  @ApiProperty({ example: 'maria.souza@empresa.com' })
  @IsEmail({}, { message: 'Informe um e-mail válido.' })
  email: string;

  @ApiProperty({ enum: Perfil })
  @IsEnum(Perfil, { message: 'Perfil inválido.' })
  perfil: Perfil;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  especialidades?: string[];
}

/** Resposta pública: a senha nunca é exibida (UH02-CA03). */
export class UsuarioResposta {
  @ApiProperty() id: string;
  @ApiProperty() nome: string;
  @ApiProperty() email: string;
  @ApiProperty({ enum: Perfil }) perfil: Perfil;
  @ApiProperty() ativo: boolean;
  @ApiProperty({ type: [String] }) especialidades: string[];

  static de(u: Usuario): UsuarioResposta {
    return {
      id: u.getId(),
      nome: u.getNome(),
      email: u.getEmail(),
      perfil: u.getPerfil(),
      ativo: u.estaAtivo(),
      especialidades: u instanceof Tecnico ? u.getEspecialidades() : [],
    };
  }
}
