# ADR-001 — Linguagem e framework do back-end

| Item | Valor |
|---|---|
| Status | Aceita |
| Data | 30/09/2026 |
| Responsável | André Neves (Tech Lead) |

## Contexto

O projeto pertence à disciplina de Programação Orientada a Objetos e precisa demonstrar claramente os conceitos de POO no back-end, expondo uma API para o front-end.

## Alternativas consideradas

[A DEFINIR] — registrar as demais opções avaliadas pela equipe, se houver.

## Decisão

Utilizar **TypeScript** com o framework **NestJS**.

## Justificativa

- TypeScript oferece classes, interfaces, modificadores de acesso (`private`, `protected`, `public`), classes abstratas e tipagem estática, permitindo demonstrar os pilares de POO;
- O NestJS tem estrutura modular (módulos, controllers e services), injeção de dependência e APIs bem organizadas;
- Mesma linguagem base (JavaScript/TypeScript) do front-end, o que facilita a colaboração da equipe.

## Consequências

- A equipe precisa estudar os conceitos de módulos, decorators e injeção de dependência do NestJS;
- Requer Node.js nos ambientes de desenvolvimento e execução;
- As regras de negócio devem ficar em classes de domínio, e não apenas nos services, para evidenciar a POO.
