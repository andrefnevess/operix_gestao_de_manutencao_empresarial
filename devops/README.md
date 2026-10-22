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
| [docker](docker) | Dockerfiles, `docker-compose.yml` — implementados |
| [ci-cd](ci-cd) | Pipeline do GitHub Actions — implementado |
| [infraestrutura](infraestrutura) | Descrição dos ambientes |

> O pipeline fica em [`.github/workflows/ci.yml`](../.github/workflows/ci.yml), que é onde o GitHub Actions procura. Esta pasta mantém a documentação.
