import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Usuario } from '../domain';
import { UsuarioResposta } from '../usuarios/dto/usuario.dto';
import { AuthService } from './auth.service';
import { LoginDto, LoginResposta } from './dto/login.dto';
import { Publico, UsuarioAtual } from './permissao.decorator';

/** Autenticação (UH01). */
@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Publico()
  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Entrar com e-mail e senha' })
  async login(@Body() dto: LoginDto): Promise<LoginResposta> {
    const { token, usuario } = await this.auth.login(dto.email, dto.senha);
    return { token, usuario: UsuarioResposta.de(usuario) };
  }

  @ApiBearerAuth()
  @Get('me')
  @ApiOperation({ summary: 'Dados do usuário logado' })
  me(@UsuarioAtual() usuario: Usuario): UsuarioResposta {
    return UsuarioResposta.de(usuario);
  }

  /** O token é descartado pelo front-end; a rota existe para registrar a saída (UH01-CA06). */
  @ApiBearerAuth()
  @Post('logout')
  @HttpCode(204)
  @ApiOperation({ summary: 'Sair' })
  logout(): void {}
}
