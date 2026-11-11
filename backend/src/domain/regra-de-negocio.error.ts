/**
 * Erro lançado quando uma operação violaria uma regra de negócio.
 * `regra` identifica a regra documentada (ex.: "RN03") ou o critério de aceite (ex.: "UH06-CA01").
 */
export class RegraDeNegocioError extends Error {
  constructor(
    message: string,
    readonly regra?: string,
  ) {
    super(message);
    this.name = 'RegraDeNegocioError';
  }
}

export function exigir(condicao: boolean, mensagem: string, regra?: string): void {
  if (!condicao) {
    throw new RegraDeNegocioError(mensagem, regra);
  }
}

export function texto(valor: string | null | undefined): string {
  return (valor ?? '').trim();
}
