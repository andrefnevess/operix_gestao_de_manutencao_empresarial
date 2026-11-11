import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Relogio } from '../common/relogio';
import { Usuario } from '../domain';
import { UsuarioRepository } from '../usuarios/usuario.repository';
import { SenhaService } from './senha.service';

/** Mensagem genérica: não revela se o erro foi no e-mail ou na senha (UH01-CA03). */
export const MENSAGEM_LOGIN_INVALIDO = 'E-mail ou senha inválidos.';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarios: UsuarioRepository,
    private readonly senhas: SenhaService,
    private readonly jwt: JwtService,
    private readonly relogio: Relogio,
  ) {}

  async login(email: string, senha: string): Promise<{ token: string; usuario: Usuario }> {
    const usuario = await this.usuarios.buscarPorEmail(email);
    if (!usuario) {
      throw new UnauthorizedException(MENSAGEM_LOGIN_INVALIDO);
    }
    const agora = this.relogio.agora();
    if (usuario.estaBloqueado(agora)) {
      throw new UnauthorizedException('Acesso bloqueado temporariamente após várias tentativas. Tente novamente em alguns minutos.');
    }
    const autenticado = usuario.autenticar(senha, this.senhas, agora);
    await this.usuarios.salvar(usuario); // guarda tentativas e bloqueio
    if (!autenticado) {
      throw new UnauthorizedException(MENSAGEM_LOGIN_INVALIDO);
    }
    const token = await this.jwt.signAsync({ sub: usuario.getId(), perfil: usuario.getPerfil() });
    return { token, usuario };
  }
}
