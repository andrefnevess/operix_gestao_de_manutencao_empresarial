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

—

## Status

Não executado (API e interface)

## Evidência

A anexar em `tester/evidencias/CT-029-evidencia.png` na execução.
