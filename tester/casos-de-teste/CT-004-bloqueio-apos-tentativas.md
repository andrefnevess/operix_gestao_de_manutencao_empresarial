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
3. Aguardar o tempo de bloqueio [A DEFINIR] e tentar de novo com a senha correta.

## Resultado esperado

Após a 5ª falha o acesso fica bloqueado, inclusive com a senha correta; depois do tempo de bloqueio o login volta a funcionar.

> Pendência: o tempo de bloqueio não está definido no backlog nem nas regras de negócio.

## Resultado obtido

—

## Status

Não executado

## Evidência

A anexar em `tester/evidencias/CT-004-evidencia.png` na execução.
