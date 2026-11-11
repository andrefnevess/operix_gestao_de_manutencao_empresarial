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

Cadastro vazio recusado (400) e nome só com espaços recusado ("O nome é obrigatório."). O schema do PR #5 já tem o campo `tipo` (divergência anterior resolvida).

Observações: as mensagens misturam inglês e português ("codigo must be a string" junto de "O código é obrigatório.") e incluem mensagens sem sentido para campo vazio ("must be shorter than or equal to 30 characters"); campo vazio retorna 400 e nome só com espaços retorna 422.

> Execução: 23/10/2026 · branch `feature/sprint-1-backend-telas-nextjs` (PR #5, commit 64fc4bb) · API em `PERSISTENCIA=memoria` · execução pela API conduzida com apoio de IA (Claude) e acompanhada por José Arraes.

## Status

Aprovado com observações

## Evidência

Saída da execução em `tester/evidencias/execucao-api-2026-10-23.md`.
