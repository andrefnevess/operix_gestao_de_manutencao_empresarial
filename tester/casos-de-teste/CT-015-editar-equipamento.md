# CT-015 — Edição de equipamento

| Campo | Valor |
|---|---|
| ID | CT-015 |
| Requisito / História | RF03 / UH03 / CA04 |
| Objetivo | Verificar que o gestor consegue editar os dados de um equipamento. |
| Pré-condições | Gestor autenticado; existe o equipamento `EQ-001`. |
| Dados de teste | Nova localização: `Bloco B` |
| Prioridade | Média |

## Passos

1. Abrir o equipamento `EQ-001` e clicar em **Editar**.
2. Alterar a localização e salvar.
3. Tentar alterar o código para um já existente (`AR-123`).

## Resultado esperado

A localização é atualizada; a troca para um código já existente é recusada (RN01).

## Resultado obtido

—

## Status

Não executado

## Evidência

A anexar em `tester/evidencias/CT-015-evidencia.png` na execução.
