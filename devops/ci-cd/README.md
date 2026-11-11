# CI/CD

Ferramenta: **GitHub Actions**. O pipeline está em [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml) e roda a cada Pull Request e a cada integração na `main`.

| Job | Etapas |
|---|---|
| Back-end | `npm ci` → `prisma generate` → build → testes unitários do domínio (Jest) → testes de API (Jest + Supertest) |
| Front-end | `npm ci` → build (TypeScript + Next.js) |

Um Pull Request só deve ser integrado com o pipeline aprovado (Definition of Done).

## Próximas etapas

| Etapa | Situação |
|---|---|
| Build e testes | Implementado |
| Geração das imagens Docker | Planejado (Sprint 2) |
| Publicação no ambiente de demonstração | Planejado — hospedagem [A DEFINIR] |
