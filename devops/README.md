# DevOps

Ambientes, containers, pipeline de CI/CD e infraestrutura.

## Fluxo de entrega

Código -> Commit -> Pull Request -> Testes -> Build -> Deploy

## Estrutura

| Pasta | Conteúdo |
|---|---|
| [docker](docker) | Dockerfiles e docker-compose |
| [ci-cd](ci-cd) | Definição e documentação do pipeline |
| [infraestrutura](infraestrutura) | Descrição dos ambientes |

> Observação: para o GitHub Actions executar, o arquivo do pipeline deve ficar em `.github/workflows/`. Esta pasta mantém a documentação e as versões de referência.
