# CT-024 — Geração de OS a partir de chamado aberto

| Campo | Valor |
|---|---|
| ID | CT-024 |
| Requisito / História | RF05 / UH05 / CA01, CA02 |
| Objetivo | Verificar que a OS é gerada a partir de um chamado Aberto e herda equipamento, descrição e urgência. |
| Pré-condições | Gestor autenticado; chamado com status Aberto (CT-018). |
| Dados de teste | Usuário: `gestor@operix.local` · Chamado do CT-018 |
| Prioridade | Alta |

## Passos

1. Abrir o chamado do CT-018.
2. Clicar em **Gerar ordem de serviço**.
3. Conferir os dados da OS gerada.

## Resultado esperado

A OS é criada com o mesmo equipamento, descrição e urgência do chamado, com status **Aberta**.

## Resultado obtido

Regra coberta por teste unitário de domínio no PR #5 (`backend/src/domain/dominio.spec.ts`, teste "herda equipamento e urgência e põe o chamado em atendimento (UH05-CA02 e CA05)"), executado em 23/10/2026 com `npm test` (23/23 aprovados, ver RT-001). A execução pela API e pela interface fica para quando UH04 a UH07 forem implementadas.

## Status

Não executado (API e interface) · regra de domínio aprovada em teste unitário

## Evidência

A anexar em `tester/evidencias/CT-024-evidencia.png` na execução.
