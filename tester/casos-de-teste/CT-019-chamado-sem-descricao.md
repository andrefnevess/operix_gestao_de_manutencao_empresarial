# CT-019 — Abertura de chamado sem descrição

| Campo | Valor |
|---|---|
| ID | CT-019 |
| Requisito / História | RF04 / UH04 / CA02 |
| Objetivo | Verificar que a descrição do problema é obrigatória. |
| Pré-condições | Solicitante autenticado; equipamento ativo. |
| Dados de teste | Descrição vazia e descrição só com espaços |
| Prioridade | Alta |

## Passos

1. Abrir um novo chamado sem preencher a descrição e salvar.
2. Repetir com a descrição só com espaços.

## Resultado esperado

Os dois cadastros são recusados, indicando que a descrição é obrigatória.

## Resultado obtido

Teste automatizado `CT-019` em `backend/tests/uh04-uh07.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 40/40).

Descrição vazia recusada com 400; descrição só com espaços recusada com 422 ("A descrição do problema é obrigatória."). Observação: códigos diferentes para o mesmo erro (DEF-09).

> Execução: 11/11/2026 · branch `api-chamados` (PR #11, commit `88fe83e`) · API em `PERSISTENCIA=memoria`.

## Status

Aprovado com observação

## Evidência

Saída dos testes automatizados no relatório [RT-002](../relatorios/RT-002-execucao-uh04-uh07.md).
