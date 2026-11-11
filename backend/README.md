# Back-end

API REST e regras de negócio do Operix, em **TypeScript + NestJS**, com **PostgreSQL + Prisma**, testes com **Jest + Supertest** e documentação **Swagger/OpenAPI**.

## Responsáveis

Gerardo Mota e Matheus Oliveira.

## Situação

| Entrega | Situação |
|---|---|
| Classes de domínio (todas as classes do modelo) | Concluído, com testes |
| Modelo de dados (`prisma/schema.prisma`) | Concluído |
| UH01 — Autenticação | Concluído, com testes |
| UH02 — Usuários e perfis | Concluído, com testes |
| UH03 — Equipamentos | Concluído, com testes |
| UH04 a UH08 | Sprint 2 e Sprint 3 |

## Como executar

Pré-requisito: Node.js 20 ou superior.

```bash
cd backend
npm install
cp .env.example .env
npm run start:dev
```

Com `PERSISTENCIA=memoria` (padrão do `.env.example`), a API sobe **sem banco de dados** e já carrega dados fictícios:

| E-mail | Perfil |
|---|---|
| admin@operix.local | Administrador |
| gestor@operix.local | Gestor |
| tecnico@operix.local | Técnico |
| solicitante@operix.local | Solicitante |

A senha de todos é o valor de `SENHA_EXEMPLO` no `.env`. Esses dados existem só em memória e somem ao reiniciar.

- API: http://localhost:3000/api
- Documentação Swagger: http://localhost:3000/api/docs

### Com PostgreSQL

```bash
# na raiz do repositório: sobe o PostgreSQL
docker compose -f devops/docker/docker-compose.yml up -d banco

cd backend
# no .env: PERSISTENCIA=prisma
npx prisma generate
npx prisma migrate dev --name inicial
npm run prisma:seed
npm run start:dev
```

Para subir tudo (banco, API e front-end) em containers, veja [devops/docker](../devops/docker).

## Testes

```bash
npm test          # testes unitários das classes de domínio (Jest)
npm run test:e2e  # testes da API (Jest + Supertest), sem banco
```

## Estrutura

```
backend/
├── prisma/
│   ├── schema.prisma          Modelo de dados (tabelas)
│   └── seed.ts                Dados fictícios para desenvolvimento
├── src/
│   ├── domain/                Classes de domínio: regras de negócio e POO
│   │   ├── usuario.ts         Usuario (abstrata) e Administrador, Gestor, Tecnico, Solicitante
│   │   ├── equipamento.ts
│   │   ├── chamado.ts
│   │   ├── ordem-servico.ts
│   │   ├── plano-preventivo.ts
│   │   ├── manutencao.ts      Manutencao (abstrata), ManutencaoCorretiva, ManutencaoPreventiva
│   │   └── dominio.spec.ts    Testes unitários do domínio
│   ├── auth/                  Login, token JWT e controle de permissões
│   ├── usuarios/              UH02: controller, service, DTOs e repositórios
│   ├── equipamentos/          UH03: controller, service, DTOs e repositórios
│   ├── common/                Erros, filtro de erros e relógio
│   ├── infra/                 Prisma, modo em memória e dados de exemplo
│   ├── configurar-app.ts      Validação, CORS, Swagger
│   └── main.ts
└── tests/                     Testes de API (Supertest)
```

Cada módulo segue a mesma divisão:

| Camada | Responsabilidade |
|---|---|
| `controller` | Recebe a requisição HTTP e devolve a resposta |
| `dto` | Valida a entrada e define o formato da saída (a senha nunca sai) |
| `service` | Orquestra o caso de uso |
| `domain` | Aplica as regras de negócio |
| `repository` | Abstração da persistência, com implementação Prisma e em memória |

## Endpoints

| Método | Rota | Quem pode | História |
|---|---|---|---|
| POST | `/api/auth/login` | Público | UH01 |
| GET | `/api/auth/me` | Logado | UH01 |
| POST | `/api/auth/logout` | Logado | UH01 |
| GET, POST | `/api/usuarios` | Administrador | UH02 |
| GET, PUT | `/api/usuarios/:id` | Administrador | UH02 |
| PATCH | `/api/usuarios/:id/inativar` e `/reativar` | Administrador | UH02 |
| GET | `/api/equipamentos?busca=` | Logado | UH03 |
| GET | `/api/equipamentos/:id` | Logado | UH03 |
| POST, PUT | `/api/equipamentos`, `/api/equipamentos/:id` | Gestor | UH03 |
| PATCH | `/api/equipamentos/:id/inativar` e `/reativar` | Gestor | UH03 |

## Aplicação de POO

| Pilar | Onde ver no código |
|---|---|
| Encapsulamento | Atributos `private` em todas as classes de `src/domain`; o status só muda por métodos como `iniciar()` e `concluir()` |
| Herança | `Usuario` → `Administrador`, `Gestor`, `Tecnico`, `Solicitante`; `Manutencao` → `ManutencaoCorretiva`, `ManutencaoPreventiva`; repositórios Prisma e em memória herdam das classes abstratas de repositório |
| Polimorfismo | Permissões (`podeGerenciarUsuarios()`, `podeGerenciarEquipamentos()`...) respondidas por cada perfil; `OrdemServico.concluir()` cria a manutenção do tipo certo |
| Abstração | `Usuario`, `Manutencao`, `UsuarioRepository` e `EquipamentoRepository` são abstratas |

Detalhes em [docs/03-arquitetura/modelo-de-dominio.md](../docs/03-arquitetura/modelo-de-dominio.md).
