# CT-012 — Cadastro de equipamento com campos obrigatórios

| Campo | Valor |
|---|---|
| ID | CT-012 |
| Requisito / História | RF03 / UH03 / CA01 |
| Objetivo | Verificar que o cadastro exige código, nome, tipo e localização. |
| Pré-condições | Gestor autenticado. |
| Dados de teste | Código: `EQ-001` · Nome: `Ar-condicionado sala 3` · Tipo: `Climatização` · Localização: `Bloco A` |
| Prioridade | Alta |

## Passos

1. Acessar **Equipamentos > Novo**.
2. Tentar salvar sem preencher os campos.
3. Preencher os quatro campos obrigatórios e salvar.

## Resultado esperado

O passo 2 é recusado indicando os campos obrigatórios; o passo 3 cadastra o equipamento.

> Divergência: o schema atual não tem o campo `tipo` (ver observações de QA no PR #2).

## Resultado obtido

—

## Status

Não executado

## Evidência

A anexar em `tester/evidencias/CT-012-evidencia.png` na execução.
