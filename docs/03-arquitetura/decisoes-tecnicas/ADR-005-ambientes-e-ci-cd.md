# ADR-005 — Ambientes e CI/CD

| Item | Valor |
|---|---|
| Status | Aceita |
| Data | 30/09/2026 |
| Responsável | André Neves (Tech Lead) e David Rafael (DevOps) |

## Contexto

A equipe precisa de ambientes iguais para todos os integrantes e de verificação automática de build e testes a cada alteração.

## Alternativas consideradas

[A DEFINIR] — registrar as demais opções avaliadas pela equipe, se houver.

## Decisão

Utilizar **Docker** (com Docker Compose) para os ambientes e **GitHub Actions** para CI/CD.

## Justificativa

- Docker garante ambientes reproduzíveis (API, front-end e PostgreSQL);
- GitHub Actions é integrado ao repositório e executa o pipeline a cada Pull Request.

## Consequências

- Os arquivos de pipeline ficam em `.github/workflows/`;
- Os Dockerfiles e o `docker-compose.yml` ficam em `devops/docker/`;
- Segredos do pipeline ficam em GitHub Secrets.
