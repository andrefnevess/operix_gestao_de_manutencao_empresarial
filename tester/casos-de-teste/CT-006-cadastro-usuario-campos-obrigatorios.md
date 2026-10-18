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

—

## Status

Não executado

## Evidência

A anexar em `tester/evidencias/CT-006-evidencia.png` na execução.
