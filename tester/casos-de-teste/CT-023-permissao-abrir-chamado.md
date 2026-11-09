# CT-023 — Permissão para abrir chamado

| Campo | Valor |
|---|---|
| ID | CT-023 |
| Requisito / História | UH04 · RNF02 |
| Objetivo | Verificar quais perfis podem abrir chamado. |
| Pré-condições | Usuários de teste de cada perfil. |
| Dados de teste | `solicitante@`, `gestor@` e `tecnico@operix.local` |
| Prioridade | Média |

## Passos

1. Tentar abrir um chamado com cada perfil (tela e API).

## Resultado esperado

Solicitante (e gestor, se a regra permitir) abre chamado; o técnico não abre chamado.

## Resultado obtido

Regra coberta por teste unitário de domínio no PR #5 (`backend/src/domain/dominio.spec.ts`, teste "técnico não abre chamado"), executado em 23/10/2026 com `npm test` (23/23 aprovados, ver RT-001). A execução pela API e pela interface fica para quando UH04 a UH07 forem implementadas.

## Status

Não executado (API e interface) · regra de domínio aprovada em teste unitário

## Evidência

A anexar em `tester/evidencias/CT-023-evidencia.png` na execução.
