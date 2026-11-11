# CT-036 — Plano preventivo inválido

| Campo | Valor |
|---|---|
| ID | CT-036 |
| Requisito / História | RF07 / UH07 / CA01, CA02 |
| Objetivo | Verificar as validações do plano preventivo. |
| Pré-condições | Gestor autenticado; um equipamento inativo. |
| Dados de teste | Equipamento inativo · Periodicidade 0, negativa e vazia · Atividades vazias |
| Prioridade | Média |

## Passos

1. Tentar criar um plano para o equipamento inativo.
2. Tentar criar planos com periodicidade 0, negativa e vazia.
3. Tentar criar um plano sem descrição das atividades.

## Resultado esperado

Todos os cadastros são recusados com mensagem clara.

## Resultado obtido

Teste automatizado `CT-036` em `backend/tests/uh04-uh07.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 40/40). Equipamento inativo: 422; periodicidade 0 e negativa: 400; descrição vazia: 400.

> Execução: 11/11/2026 · branch `api-chamados` (PR #11, commit `88fe83e`) · API em `PERSISTENCIA=memoria`.

## Status

Aprovado

## Evidência

Saída dos testes automatizados no relatório [RT-002](../relatorios/RT-002-execucao-uh04-uh07.md).
