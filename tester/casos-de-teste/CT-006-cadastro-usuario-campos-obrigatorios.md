# CT-006 — Cadastro de usuário com campos obrigatórios

| Campo | Valor |
|---|---|
| ID | CT-006 |
| Requisito / História | RF02 / UH02 / CA01 |
| Objetivo | Verificar que o cadastro exige nome, e-mail e perfil. |
| Pré-condições | Administrador autenticado. |
| Dados de teste | Nome: `Técnico Teste` · E-mail: `novo.tecnico@operix.local` · Perfil: Técnico |
| Prioridade | Alta |

## Passos

1. Acessar **Usuários > Novo**.
2. Tentar salvar sem preencher nenhum campo.
3. Preencher apenas o nome e tentar salvar.
4. Preencher nome, e-mail e perfil e salvar.

## Resultado esperado

Os passos 2 e 3 são recusados, indicando os campos obrigatórios; o passo 4 cadastra o usuário.

## Resultado obtido

Cadastro vazio e cadastro só com nome foram recusados (400) indicando os campos obrigatórios; cadastro completo criou o usuário (201). Extras: perfil inexistente recusado ("Perfil inválido.") e senha com menos de 8 caracteres recusada.

> Execução: 23/10/2026 · branch `feature/sprint-1-backend-telas-nextjs` (PR #5, commit 64fc4bb) · API em `PERSISTENCIA=memoria` · execução pela API conduzida com apoio de IA (Claude) e acompanhada por José Arraes.

## Status

Aprovado

## Evidência

Saída da execução em `tester/evidencias/execucao-api-2026-10-23.md`.
