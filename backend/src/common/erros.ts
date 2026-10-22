/** Erros da camada de aplicação (os erros de regra de negócio ficam em src/domain). */
export class NaoEncontradoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NaoEncontradoError';
  }
}

export class ConflitoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConflitoError';
  }
}

export class AcessoNegadoError extends Error {
  constructor(message = 'Você não tem permissão para esta operação.') {
    super(message);
    this.name = 'AcessoNegadoError';
  }
}
