# Padrões de Código

> Status: em elaboração pelo Tech Lead.

## Java (back-end)

- Classes em `PascalCase`, métodos e atributos em `camelCase`, constantes em `UPPER_SNAKE_CASE`;
- Atributos privados, acesso por métodos (encapsulamento);
- Regras de negócio em `service` e nas entidades de domínio, nunca em `controller`;
- Pacotes em minúsculas: `br.com.operix.<camada>`.

## Branches e commits

Ver [plano de comunicação](../docs/02-gestao/comunicacao.md).

## Revisão de código

- Todo Pull Request precisa de ao menos uma aprovação;
- O revisor verifica legibilidade, aplicação de POO, testes e aderência aos padrões.
