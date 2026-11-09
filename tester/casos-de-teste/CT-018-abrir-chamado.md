# CT-018 — Abertura de chamado válido

| Campo | Valor |
|---|---|
| ID | CT-018 |
| Requisito / História | RF04 / UH04 / CA01, CA02, CA03, CA05 |
| Objetivo | Verificar que o solicitante abre um chamado vinculado a um equipamento, com descrição e urgência, e recebe número e status Aberto. |
| Pré-condições | Solicitante autenticado; equipamento `CMP-001` ativo. |
| Dados de teste | Usuário: `solicitante@operix.local` · Equipamento: `CMP-001` · Descrição: "Compressor fazendo ruído alto" · Urgência: Alta |
| Prioridade | Alta |

## Passos

1. Acessar **Chamados > Novo chamado**.
2. Selecionar o equipamento `CMP-001`.
3. Informar a descrição e a urgência Alta.
4. Salvar.

## Resultado esperado

O chamado é salvo com número único e status **Aberto**, exibidos ao solicitante.

## Resultado obtido

Regra coberta por teste unitário de domínio no PR #5 (`backend/src/domain/dominio.spec.ts`, teste "abre com status ABERTO"), executado em 23/10/2026 com `npm test` (23/23 aprovados, ver RT-001). A execução pela API e pela interface fica para quando UH04 a UH07 forem implementadas.

## Status

Não executado (API e interface) · regra de domínio aprovada em teste unitário

## Evidência

A anexar em `tester/evidencias/CT-018-evidencia.png` na execução.
