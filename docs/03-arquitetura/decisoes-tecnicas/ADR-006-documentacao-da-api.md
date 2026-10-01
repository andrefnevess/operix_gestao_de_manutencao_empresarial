# ADR-006 — Documentação da API

| Item | Valor |
|---|---|
| Status | Aceita |
| Data | 30/09/2026 |
| Responsável | André Neves (Tech Lead) |

## Contexto

O front-end, o Tester e o professor precisam conhecer e testar os endpoints da API.

## Alternativas consideradas

[A DEFINIR] — registrar as demais opções avaliadas pela equipe, se houver.

## Decisão

Documentar a API com **Swagger / OpenAPI**, gerado a partir do código NestJS.

## Justificativa

- A documentação é gerada a partir do código e se mantém atualizada;
- Permite testar os endpoints pelo navegador e facilita a apresentação do projeto.

## Consequências

- DTOs e controllers devem ser anotados com os decorators de documentação;
- A interface do Swagger deve ser protegida ou desabilitada em ambientes que não sejam de desenvolvimento ou demonstração.
