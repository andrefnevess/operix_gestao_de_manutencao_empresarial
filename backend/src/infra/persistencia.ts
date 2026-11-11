/**
 * PERSISTENCIA=memoria roda a API sem banco de dados (dados de exemplo em memória).
 * Útil para o front-end, para testes e para demonstrações rápidas.
 * Qualquer outro valor usa o PostgreSQL via Prisma.
 */
export function usarMemoria(): boolean {
  return process.env.PERSISTENCIA === 'memoria';
}
