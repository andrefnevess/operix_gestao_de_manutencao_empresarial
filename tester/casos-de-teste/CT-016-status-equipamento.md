# CT-016 — Status do equipamento

| Campo | Valor |
|---|---|
| ID | CT-016 |
| Requisito / História | RF03 / UH03 / CA05 |
| Objetivo | Verificar os status possíveis do equipamento e o status inicial. |
| Pré-condições | Gestor autenticado. |
| Dados de teste | Equipamento `EQ-002` recém-cadastrado |
| Prioridade | Média |

## Passos

1. Cadastrar o equipamento sem escolher status.
2. Alterar o status para Em manutenção e depois para Inativo.
3. Tentar informar um status fora da lista pela API.

## Resultado esperado

O equipamento nasce Ativo; só aceita Ativo, Em manutenção e Inativo.

> Divergência de nomenclatura: o schema usa `DISPONIVEL` no lugar de "Ativo".

## Resultado obtido

—

## Status

Não executado

## Evidência

A anexar em `tester/evidencias/CT-016-evidencia.png` na execução.
