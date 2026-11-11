import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

/** Fonte da data atual. Isolada em uma classe para que os testes possam controlar o tempo. */
@Injectable()
export class Relogio {
  agora(): Date {
    return new Date();
  }
}

export function novoId(): string {
  return randomUUID();
}
