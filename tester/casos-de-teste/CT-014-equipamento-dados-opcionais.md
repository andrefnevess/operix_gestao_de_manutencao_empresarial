# CT-014 — Cadastro com dados opcionais

| Campo | Valor |
|---|---|
| ID | CT-014 |
| Requisito / História | RF03 / UH03 / CA03 |
| Objetivo | Verificar que fabricante, modelo e data de aquisição podem ser informados, mas não são obrigatórios. |
| Pré-condições | Gestor autenticado. |
| Dados de teste | Fabricante: `Fabricante Teste` · Modelo: `X-100` · Data de aquisição: `01/03/2024` |
| Prioridade | Média |

## Passos

1. Cadastrar um equipamento preenchendo os campos opcionais.
2. Cadastrar outro deixando os opcionais em branco.
3. Abrir os dois cadastros.

## Resultado esperado

Os dois são salvos; o primeiro mostra os dados opcionais informados.

> Divergência: o schema atual não tem esses campos.

## Resultado obtido

—

## Status

Não executado

## Evidência

A anexar em `tester/evidencias/CT-014-evidencia.png` na execução.
