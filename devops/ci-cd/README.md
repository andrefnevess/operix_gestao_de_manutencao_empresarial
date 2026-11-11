# CI/CD

Ferramenta: **GitHub Actions**. O pipeline está em [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml) e roda a cada Pull Request e a cada integração na `main`.

| Job | Quando roda | Etapas |
|---|---|---|
| Back-end | PR e `main` | `npm ci` → `prisma generate` → build → testes unitários do domínio (Jest) → testes de API (Jest + Supertest) |
| Front-end | PR e `main` | `npm ci` → build (TypeScript + Next.js) |
| Ambiente completo | PR e `main`, depois dos dois anteriores | `docker compose up --build` (PostgreSQL + API + front-end) → confere a API em `/api/docs` e o front-end na porta 8080 → derruba o ambiente |
| Publicar imagens | Só na `main` | Gera e publica `operix-api` e `operix-web` no GitHub Container Registry (`ghcr.io`), com as tags `latest` e o SHA do commit |

Os testes de API rodam com `PERSISTENCIA=memoria`; o job **Ambiente completo** é o que valida a API com o PostgreSQL de verdade, via Prisma.

Em Pull Requests, um commit novo cancela a execução anterior da mesma branch (`concurrency`). Na `main` isso não acontece, para que dois merges seguidos não interrompam a publicação das imagens.

Um Pull Request só deve ser integrado com o pipeline aprovado (Definition of Done): os checks **Back-end**, **Front-end** e **Ambiente completo** precisam estar verdes antes do merge. A proteção automática da `main` (regra de branch exigindo esses checks) está planejada, mas não está ativa: em repositório privado de conta pessoal no plano gratuito, o GitHub não aplica regras de proteção. Por isso a conferência é feita na revisão do PR.

## Próximas etapas

| Etapa | Situação |
|---|---|
| Build e testes | Implementado |
| Teste do ambiente completo com Docker Compose | Implementado |
| Proteção da `main` exigindo os checks | Planejado — hoje vale a Definition of Done |
| Publicação das imagens Docker (`ghcr.io`) | Implementado |
| Publicação no ambiente de demonstração | Planejado — hospedagem [A DEFINIR] |
