# CT-021 — Abertura de chamado para equipamento inativo

| Campo | Valor |
|---|---|
| ID | CT-021 |
| Requisito / História | RF04 / UH04 / CA04 · RN03 |
| Objetivo | Verificar que não é possível abrir chamado para equipamento inativo. |
| Pré-condições | Equipamento de teste inativado pelo gestor. |
| Dados de teste | Equipamento inativo: `EMP-002` (inativar antes do teste) |
| Prioridade | Alta |

## Passos

1. Como gestor, inativar o equipamento `EMP-002`.
2. Como solicitante, tentar abrir um chamado para `EMP-002`.

## Resultado esperado

O chamado é recusado com mensagem informando que o equipamento está inativo.

## Resultado obtido

Teste automatizado `CT-021` em `backend/tests/uh04-uh07.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 40/40). Chamado para equipamento inativo recusado com 422, regra `RN03`.

> Execução: 11/11/2026 · branch `api-chamados` (PR #11, commit `88fe83e`) · API em `PERSISTENCIA=memoria`.

## Status

Aprovado

## Evidência

Saída dos testes automatizados no relatório [RT-002](../relatorios/RT-002-execucao-uh04-uh07.md).
