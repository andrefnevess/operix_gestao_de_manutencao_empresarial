import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Usuario } from '../domain';

export const CHAVE_PUBLICO = 'operix:publico';
export const CHAVE_PERMISSAO = 'operix:permissao';

export type RegraDePermissao = (usuario: Usuario) => boolean;

/** Rota acessível sem login. */
export const Publico = () => SetMetadata(CHAVE_PUBLICO, true);

/**
 * Restringe a rota a usuários que atendem à regra.
 * A regra pergunta ao próprio objeto (ex.: `u => u.podeGerenciarUsuarios()`), usando o polimorfismo do domínio.
 */
export const Permite = (regra: RegraDePermissao) => SetMetadata(CHAVE_PERMISSAO, regra);

/** Injeta o usuário autenticado (objeto de domínio) no parâmetro do controller. */
export const UsuarioAtual = createParamDecorator((_: unknown, ctx: ExecutionContext): Usuario => {
  return ctx.switchToHttp().getRequest().usuario;
});
