# CI/CD

Ferramenta: **GitHub Actions** (arquivos em `.github/workflows/`).

## Etapas previstas

| Etapa | Gatilho | Ação |
|---|---|---|
| Instalação | Pull Request e integração na `main` | `npm ci` no back-end e no front-end |
| Build | Pull Request e integração na `main` | Compilar o back-end (NestJS) e o front-end (React) |
| Testes | Pull Request e integração na `main` | Executar Jest (unitários) e Supertest (API), com PostgreSQL em container |
| Imagens | Integração na `main` | Gerar as imagens Docker |
| Entrega | Integração na `main` | Publicação em ambiente de demonstração [A DEFINIR] |
