# DevOps

Ambientes, automação de build/testes/entrega e infraestrutura.

> Status: ferramentas pendentes de decisão (ADR-005).

## Responsável

David Rafael.

## Fluxo de entrega

Código -> Commit -> Pull Request -> Revisão -> Testes -> Integração na `main` -> Entrega

## Estrutura

| Pasta | Conteúdo |
|---|---|
| [docker](docker) | Configuração de containers, caso a equipe adote essa abordagem [A DEFINIR] |
| [ci-cd](ci-cd) | Definição e documentação do pipeline |
| [infraestrutura](infraestrutura) | Descrição dos ambientes |
