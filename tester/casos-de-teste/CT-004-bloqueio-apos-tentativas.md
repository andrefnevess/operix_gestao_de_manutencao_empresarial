# CT-004 — Bloqueio após 5 tentativas sem sucesso

| Campo | Valor |
|---|---|
| ID | CT-004 |
| Requisito / História | RF01 / UH01 / CA05 |
| Objetivo | Verificar o bloqueio temporário após 5 tentativas consecutivas de login sem sucesso. |
| Pré-condições | Usuário ativo cadastrado, sem tentativas falhas recentes. |
| Dados de teste | E-mail: `tecnico.teste@operix.local` · Senha errada: `Errada@1` |
| Prioridade | Alta |

## Passos

1. Tentar o login com a senha errada 5 vezes seguidas.
2. Na 6ª tentativa, informar a senha **correta**.
3. Aguardar o tempo de bloqueio (15 minutos) e tentar de novo com a senha correta.

## Resultado esperado

Após a 5ª falha o acesso fica bloqueado, inclusive com a senha correta; depois de 15 minutos o login volta a funcionar.

> Tempo de bloqueio: 15 minutos, conforme o domínio do PR #5 (`Usuario.MINUTOS_BLOQUEIO = 15`, UH01-CA05).

## Resultado obtido

Após 5 tentativas erradas, a 6ª com a senha correta foi recusada: "Acesso bloqueado temporariamente após várias tentativas. Tente novamente em alguns minutos." O passo 3 (desbloqueio após 15 minutos) não foi executado nesta rodada.

> Execução: 23/10/2026 · branch `feature/sprint-1-backend-telas-nextjs` (PR #5, commit 64fc4bb) · API em `PERSISTENCIA=memoria` · execução pela API conduzida com apoio de IA (Claude) e acompanhada por José Arraes.

## Status

Aprovado (parcial)

## Evidência

Saída da execução em `tester/evidencias/execucao-api-2026-10-23.md`.
