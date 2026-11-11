import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UsuarioRepository } from '../usuarios/usuario.repository';
import { CHAVE_PERMISSAO, CHAVE_PUBLICO, RegraDePermissao } from './permissao.decorator';

/**
 * Guard global: exige token válido em todas as rotas (exceto as marcadas com @Publico)
 * e aplica a regra de @Permite. Usuários inativados perdem o acesso na hora (RN02).
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwt: JwtService,
    private readonly usuarios: UsuarioRepository,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const alvos = [ctx.getHandler(), ctx.getClass()];
    if (this.reflector.getAllAndOverride<boolean>(CHAVE_PUBLICO, alvos)) {
      return true;
    }

    const req = ctx.switchToHttp().getRequest();
    const [tipo, token] = String(req.headers.authorization ?? '').split(' ');
    if (tipo !== 'Bearer' || !token) {
      throw new UnauthorizedException('Faça login para continuar.');
    }

    let id: string;
    try {
      id = (await this.jwt.verifyAsync<{ sub: string }>(token)).sub;
    } catch {
      throw new UnauthorizedException('Sessão expirada. Faça login novamente.');
    }

    const usuario = await this.usuarios.buscarPorId(id);
    if (!usuario || !usuario.estaAtivo()) {
      throw new UnauthorizedException('Faça login para continuar.');
    }
    req.usuario = usuario;

    const regra = this.reflector.getAllAndOverride<RegraDePermissao>(CHAVE_PERMISSAO, alvos);
    if (regra && !regra(usuario)) {
      throw new ForbiddenException('Você não tem permissão para esta operação.');
    }
    return true;
  }
}
