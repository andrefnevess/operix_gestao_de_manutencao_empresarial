import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { VerificadorDeSenha } from '../domain';

/** Hash de senhas com bcrypt (RNF01). Implementa a interface que o domínio espera. */
@Injectable()
export class SenhaService implements VerificadorDeSenha {
  private static readonly CUSTO = 10;

  gerarHash(senha: string): string {
    return bcrypt.hashSync(senha, SenhaService.CUSTO);
  }

  comparar(senha: string, hash: string): boolean {
    return bcrypt.compareSync(senha, hash);
  }
}
