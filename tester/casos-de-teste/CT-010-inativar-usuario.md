# CT-010 — Inativação de usuário preserva o histórico

| Campo | Valor |
|---|---|
| ID | CT-010 |
| Requisito / História | RF02 / UH02 / CA05 |
| Objetivo | Verificar que usuários são inativados, não excluídos, e que o histórico é mantido. |
| Pré-condições | Administrador autenticado; usuário de teste com pelo menos uma ordem de serviço vinculada. |
| Dados de teste | Usuário: `tecnico.teste@operix.local` |
| Prioridade | Média |

## Passos

1. Inativar o usuário pela tela de usuários.
2. Verificar se ele continua na lista (com status Inativo).
3. Abrir uma ordem de serviço ligada a ele.

## Resultado esperado

O usuário continua cadastrado como Inativo, não consegue entrar (ver CT-003) e as ordens antigas continuam mostrando o nome dele.

## Resultado obtido

—

## Status

Não executado

## Evidência

A anexar em `tester/evidencias/CT-010-evidencia.png` na execução.
