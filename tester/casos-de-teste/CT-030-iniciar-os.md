# CT-030 — Início da OS pelo técnico atribuído

| Campo | Valor |
|---|---|
| ID | CT-030 |
| Requisito / História | RF06 / UH06 / CA01, CA02 |
| Objetivo | Verificar que o técnico atribuído inicia a OS e que os status mudam. |
| Pré-condições | OS atribuída a `tecnico@operix.local` (CT-026). |
| Dados de teste | Usuário: `tecnico@operix.local` |
| Prioridade | Alta |

## Passos

1. Como técnico, abrir a OS e clicar em **Iniciar**.
2. Conferir os status da OS e do equipamento.

## Resultado esperado

A OS passa para **Em execução** e o equipamento para **Em manutenção**.

## Resultado obtido

Regra coberta por teste unitário de domínio no PR #5 (`backend/src/domain/dominio.spec.ts`, teste "percorre o ciclo completo e registra manutenção corretiva"), executado em 23/10/2026 com `npm test` (23/23 aprovados, ver RT-001). A execução pela API e pela interface fica para quando UH04 a UH07 forem implementadas.

## Status

Não executado (API e interface) · regra de domínio aprovada em teste unitário

## Evidência

A anexar em `tester/evidencias/CT-030-evidencia.png` na execução.
