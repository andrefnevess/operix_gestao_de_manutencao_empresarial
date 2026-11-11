import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { UsuarioResposta } from '../../usuarios/dto/usuario.dto';

export class LoginDto {
  @ApiProperty({ example: 'admin@operix.local' })
  @IsEmail({}, { message: 'Informe um e-mail válido.' })
  email: string;

  @ApiProperty({ example: 'sua-senha' })
  @IsString()
  @MinLength(1)
  senha: string;
}

export class LoginResposta {
  @ApiProperty({ description: 'Token JWT. Envie no cabeçalho Authorization: Bearer <token>.' })
  token: string;

  @ApiProperty({ type: UsuarioResposta })
  usuario: UsuarioResposta;
}
