# CT-034 — Alteração de OS concluída

| Campo | Valor |
|---|---|
| ID | CT-034 |
| Requisito / História | RF06 / UH06 / CA06 · RN05 |
| Objetivo | Verificar que ordens concluídas ou canceladas não podem ser alteradas. |
| Pré-condições | Uma OS concluída (CT-033) e uma OS cancelada. |
| Dados de teste | OS do CT-033 |
| Prioridade | Alta |

## Passos

1. Tentar editar, iniciar, atribuir ou cancelar a OS concluída (tela e API).
2. Repetir com a OS cancelada.

## Resultado esperado

Todas as alterações são recusadas.

## Resultado obtido

Teste automatizado `CT-034` em `backend/tests/uh04-uh07.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 40/40). Iniciar, concluir, atribuir e cancelar uma OS concluída: 422; atribuir uma OS cancelada: 422.

> Execução: 11/11/2026 · branch `api-chamados` (PR #11, commit `88fe83e`) · API em `PERSISTENCIA=memoria`.

## Status

Aprovado

## Evidência

Saída dos testes automatizados no relatório [RT-002](../relatorios/RT-002-execucao-uh04-uh07.md).
