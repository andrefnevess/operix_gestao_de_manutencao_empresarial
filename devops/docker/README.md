# Docker

| Arquivo | Descrição |
|---|---|
| [`docker-compose.yml`](docker-compose.yml) | Sobe o PostgreSQL, a API e o front-end |
| [`Dockerfile.backend`](Dockerfile.backend) | Imagem da API NestJS (cria as tabelas com o Prisma e carrega dados de exemplo) |
| [`Dockerfile.frontend`](Dockerfile.frontend) | Imagem do front-end Next.js (modo standalone), que encaminha `/api` para a API |

## Como usar

Na raiz do repositório:

```bash
docker compose -f devops/docker/docker-compose.yml up --build
```

| Serviço | Endereço |
|---|---|
| Front-end | http://localhost:8080 |
| API | http://localhost:3000/api |
| Swagger | http://localhost:3000/api/docs |
| PostgreSQL | localhost:5432 (usuário, senha e banco: `operix`) |

Usuários de exemplo: `admin@`, `gestor@`, `tecnico@` e `solicitante@operix.local`, com a senha definida em `SENHA_EXEMPLO` (padrão `operix-dev`, somente para desenvolvimento).

Para subir só o banco e rodar a API na máquina: `docker compose -f devops/docker/docker-compose.yml up -d banco`.

> As credenciais deste arquivo são apenas para o ambiente local. No ambiente de demonstração, use variáveis de ambiente e GitHub Secrets (ver [política de segurança](../../docs/07-compliance/seguranca-da-informacao.md)).
