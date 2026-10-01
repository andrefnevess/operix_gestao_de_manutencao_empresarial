# Back-end

API REST e regras de negócio do Operix.

## Responsáveis

Gerardo Mota e Matheus Oliveira.

## Tecnologias

| Item | Tecnologia | Decisão |
|---|---|---|
| Linguagem | TypeScript | [ADR-001](../docs/03-arquitetura/decisoes-tecnicas/ADR-001-linguagem-back-end.md) |
| Framework | NestJS | [ADR-001](../docs/03-arquitetura/decisoes-tecnicas/ADR-001-linguagem-back-end.md) |
| Banco de dados | PostgreSQL | [ADR-003](../docs/03-arquitetura/decisoes-tecnicas/ADR-003-banco-de-dados-e-orm.md) |
| ORM | Prisma | [ADR-003](../docs/03-arquitetura/decisoes-tecnicas/ADR-003-banco-de-dados-e-orm.md) |
| Testes | Jest + Supertest | [ADR-004](../docs/03-arquitetura/decisoes-tecnicas/ADR-004-testes.md) |
| Documentação da API | Swagger / OpenAPI | [ADR-006](../docs/03-arquitetura/decisoes-tecnicas/ADR-006-documentacao-da-api.md) |
| Gerenciador de dependências | npm | — |

## Estrutura prevista

```
backend/
├── package.json
├── prisma/
│   ├── schema.prisma        Modelo de dados
│   └── migrations/          Histórico de alterações do banco
├── src/
│   ├── main.ts              Inicialização da aplicação e do Swagger
│   ├── app.module.ts        Módulo raiz
│   ├── auth/                Autenticação (UH01)
│   ├── usuarios/            Usuários e perfis (UH02)
│   ├── equipamentos/        Equipamentos (UH03)
│   ├── chamados/            Chamados (UH04)
│   ├── ordens-servico/      Ordens de serviço (UH05, UH06)
│   ├── manutencoes/         Manutenções e preventivas (UH06, UH07)
│   ├── indicadores/         Histórico e indicadores (UH08)
│   └── prisma/              Serviço de acesso ao banco
└── tests/                   Testes de API (Supertest)
```

Cada módulo de negócio segue o padrão:

```
equipamentos/
├── equipamentos.module.ts
├── equipamentos.controller.ts   Endpoints HTTP
├── equipamentos.service.ts      Regras de negócio
├── dto/                         Dados de entrada e saída
├── entities/                    Classes de domínio
└── equipamentos.service.spec.ts Testes unitários (Jest)
```

## Aplicação de POO

Ver [docs/03-arquitetura/arquitetura.md](../docs/03-arquitetura/arquitetura.md).

## Como executar

Instruções serão adicionadas na Sprint 1. Previsto:

```bash
npm install
npx prisma migrate dev
npm run start:dev     # API
npm run test          # testes unitários
npm run test:e2e      # testes de API
```
