import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { RegraDeNegocioError } from '../domain';
import { AcessoNegadoError, ConflitoError, NaoEncontradoError } from './erros';

/**
 * Converte os erros do domínio e da aplicação em respostas HTTP.
 * Erros inesperados viram 500 sem expor detalhes internos (política de segurança).
 */
@Catch()
export class ErrosFilter implements ExceptionFilter {
  catch(erro: unknown, host: ArgumentsHost): void {
    const res = host.switchToHttp().getResponse<Response>();

    if (erro instanceof HttpException) {
      res.status(erro.getStatus()).json(erro.getResponse());
      return;
    }
    if (erro instanceof RegraDeNegocioError) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ statusCode: 422, message: erro.message, regra: erro.regra ?? null });
      return;
    }
    if (erro instanceof NaoEncontradoError) {
      res.status(HttpStatus.NOT_FOUND).json({ statusCode: 404, message: erro.message });
      return;
    }
    if (erro instanceof ConflitoError) {
      res.status(HttpStatus.CONFLICT).json({ statusCode: 409, message: erro.message });
      return;
    }
    if (erro instanceof AcessoNegadoError) {
      res.status(HttpStatus.FORBIDDEN).json({ statusCode: 403, message: erro.message });
      return;
    }
    console.error(erro);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ statusCode: 500, message: 'Erro interno. Tente novamente.' });
  }
}
