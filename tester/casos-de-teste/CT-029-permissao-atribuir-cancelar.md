# CT-029 — Somente o gestor atribui ou cancela OS

| Campo | Valor |
|---|---|
| ID | CT-029 |
| Requisito / História | UH05 · RNF02 |
| Objetivo | Verificar que apenas o gestor pode atribuir ou cancelar ordens de serviço. |
| Pré-condições | OS com status Aberta. |
| Dados de teste | `tecnico@` e `solicitante@operix.local` |
| Prioridade | Alta |

## Passos

1. Como técnico, tentar atribuir e cancelar a OS (tela e API).
2. Repetir como solicitante.

## Resultado esperado

As ações são negadas para técnico e solicitante (HTTP 403 na API).

## Resultado obtido

Teste automatizado `CT-029` em `backend/tests/uh04-uh07.e2e-spec.ts`: aprovado na execução de José Arraes em 11/11/2026 (`npm run test:e2e`, 40/40). Técnico e solicitante recebem 403 ao gerar, atribuir ou cancelar OS; o gestor cancela (200).

> Execução: 11/11/2026 · branch `api-chamados` (PR #11, commit `88fe83e`) · API em `PERSISTENCIA=memoria`.

## Status

Aprovado

## Evidência

Saída dos testes automatizados no relatório [RT-002](../relatorios/RT-002-execucao-uh04-uh07.md).
