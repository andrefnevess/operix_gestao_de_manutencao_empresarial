# CI/CD

Ferramenta: **GitHub Actions**. O pipeline está em [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml) e roda a cada Pull Request e a cada integração na `main`.

| Job | Quando roda | Etapas |
|---|---|---|
| Back-end | PR e `main` | `npm ci` → `prisma generate` → build → testes unitários do domínio (Jest) → testes de API (Jest + Supertest) |
| Front-end | PR e `main` | `npm ci` → build (TypeScript + Next.js) |
| Ambiente completo | PR e `main`, depois dos dois anteriores | `docker compose up --build` (PostgreSQL + API + front-end) → confere a API em `/api/docs` e o front-end na porta 8080 → derruba o ambiente |
| Publicar imagens | Só na `main` | Gera e publica `operix-api` e `operix-web` no GitHub Container Registry (`ghcr.io`), com as tags `latest` e o SHA do commit |

Os testes de API rodam com `PERSISTENCIA=memoria`; o job **Ambiente completo** é o que valida a API com o PostgreSQL de verdade, via Prisma.

Um Pull Request só deve ser integrado com o pipeline aprovado (Definition of Done). A branch `main` é protegida e exige os checks **Back-end**, **Front-end** e **Ambiente completo**.

## Próximas etapas

| Etapa | Situação |
|---|---|
| Build e testes | Implementado |
| Teste do ambiente completo com Docker Compose | Implementado |
| Publicação das imagens Docker (`ghcr.io`) | Implementado |
| Publicação no ambiente de demonstração | Planejado — hospedagem [A DEFINIR] |
