# Ambientes

| Ambiente | Finalidade | Como sobe |
|---|---|---|
| Local sem banco | Desenvolvimento rápido do front-end e testes | API com `PERSISTENCIA=memoria` (`npm run start:dev` no back-end) |
| Local completo | Desenvolvimento e testes integrados | `docker compose -f devops/docker/docker-compose.yml up --build` |
| Demonstração | Apresentações e validação (F3) | [A DEFINIR] |

## Variáveis de ambiente

| Variável | Onde | Uso |
|---|---|---|
| `PERSISTENCIA` | API | `memoria` (sem banco) ou `prisma` (PostgreSQL) |
| `DATABASE_URL` | API | Conexão do Prisma com o PostgreSQL |
| `JWT_SECRET` | API | Assinatura dos tokens de login (obrigatório em produção) |
| `SENHA_EXEMPLO` | API | Senha dos usuários de exemplo (somente desenvolvimento) |
| `PORT` | API | Porta da API (padrão 3000) |
| `CORS_ORIGIN` | API | Origens autorizadas a chamar a API |
| `API_URL` | Front-end | Endereço da API que o servidor do Next.js chama (padrão `http://localhost:3000`; no Docker Compose, `http://api:3000`) |

Modelos: [`backend/.env.example`](../../backend/.env.example) e [`frontend/.env.example`](../../frontend/.env.example). Os arquivos `.env` reais nunca são versionados.
