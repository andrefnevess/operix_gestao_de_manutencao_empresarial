# DevOps

Ambientes, automação de build/testes/entrega e infraestrutura.

## Responsável

David Rafael.

## Tecnologias

| Item | Tecnologia | Decisão |
|---|---|---|
| Containers | Docker + Docker Compose | [ADR-005](../docs/03-arquitetura/decisoes-tecnicas/ADR-005-ambientes-e-ci-cd.md) |
| CI/CD | GitHub Actions | [ADR-005](../docs/03-arquitetura/decisoes-tecnicas/ADR-005-ambientes-e-ci-cd.md) |

## Fluxo de entrega

Código -> Commit -> Pull Request -> GitHub Actions (build + testes) -> Revisão -> Integração na `main` -> Imagens Docker

## Estrutura

| Pasta | Conteúdo |
|---|---|
| [docker](docker) | Dockerfiles e `docker-compose.yml` |
| [ci-cd](ci-cd) | Documentação do pipeline |
| [infraestrutura](infraestrutura) | Descrição dos ambientes |

> Para o GitHub Actions executar, os arquivos do pipeline devem ficar em `.github/workflows/`. Esta pasta mantém a documentação.
