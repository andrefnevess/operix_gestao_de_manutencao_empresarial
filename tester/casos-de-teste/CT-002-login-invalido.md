# CT-002 — Login com credenciais inválidas

| Campo | Valor |
|---|---|
| ID | CT-002 |
| Requisito / História | UH01 (CA03) · RF01 |
| Objetivo | Garantir que o sistema não revela qual campo está errado. |
| Pré-condições | — |
| Dados de teste | Senha errada para gestor@operix.local; e-mail inexistente |
| Prioridade | Alta |
| Tipo de execução | Automatizado |

## Passos

1. Informar e-mail válido e senha errada e clicar em Entrar.
2. Informar e-mail inexistente e clicar em Entrar.

## Resultado esperado

Nos dois casos, a mensagem é a mesma: "E-mail ou senha inválidos."

## Resultado obtido

Conforme esperado.

## Status

**Aprovado** — Sprint 1

## Evidência

[sprint-1-testes-api.txt](../evidencias/sprint-1-testes-api.txt) e [CT-002-login-invalido.png](../evidencias/CT-002-login-invalido.png)
