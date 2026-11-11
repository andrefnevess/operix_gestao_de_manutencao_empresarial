# CT-028 — OS na lista do técnico atribuído

| Campo | Valor |
|---|---|
| ID | CT-028 |
| Requisito / História | RF05 / UH05 / CA06 |
| Objetivo | Verificar que o técnico vê a OS na sua lista de ordens atribuídas. |
| Pré-condições | OS atribuída ao técnico (CT-026). |
| Dados de teste | Usuário: `tecnico@operix.local` |
| Prioridade | Média |

## Passos

1. Entrar como técnico.
2. Abrir **Minhas ordens**.

## Resultado esperado

A OS atribuída aparece na lista do técnico, com equipamento, urgência e data prevista.

## Resultado obtido

Teste automatizado `CT-028` em `backend/tests/uh04-uh07.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 40/40). O técnico atribuído vê a OS na lista; outro técnico não vê.

> Execução: 11/11/2026 · branch `api-chamados` (PR #11, commit `88fe83e`) · API em `PERSISTENCIA=memoria`.

## Status

Aprovado

## Evidência

Saída dos testes automatizados no relatório [RT-002](../relatorios/RT-002-execucao-uh04-uh07.md).
