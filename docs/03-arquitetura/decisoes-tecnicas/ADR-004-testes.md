# ADR-004 — Ferramentas de teste

| Item | Valor |
|---|---|
| Status | Aceita |
| Data | 30/09/2026 |
| Responsável | André Neves (Tech Lead) e José Arrais (Tester) |

## Contexto

É necessário testar as regras de negócio e os endpoints da API de forma automatizada, inclusive no pipeline de CI.

## Alternativas consideradas

[A DEFINIR] — registrar as demais opções avaliadas pela equipe, se houver.

## Decisão

Utilizar **Jest** para testes unitários e **Supertest** para testes de API.

## Justificativa

- Jest é o framework de testes padrão do ecossistema NestJS;
- Supertest permite testar os endpoints HTTP de ponta a ponta;
- Ambos executam no GitHub Actions.

## Consequências

- Cada regra de negócio relevante deve ter teste unitário;
- Cada endpoint deve ter ao menos um teste de API;
- Os casos de teste manuais continuam documentados em `tester/casos-de-teste`.
