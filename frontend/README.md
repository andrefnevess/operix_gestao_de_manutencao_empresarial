# Front-end

Aplicação web do Operix em **Next.js (React) + Tailwind CSS** (TypeScript), integrada à API do back-end.

## Responsável

Luíza Quintanilha.

## Situação

| Entrega | Situação |
|---|---|
| UH01 — Tela de login | Concluída, integrada à API |
| UH02 — Telas de usuários (lista, cadastro, edição, inativação) | Concluída, integrada à API |
| UH03 — Telas de equipamentos (lista com busca, cadastro, edição, inativação) | Concluída, integrada à API |
| Wireframes de chamados e ordens de serviço (Sprint 2) | Concluído — [docs/wireframes](docs/wireframes) |
| UH04 a UH08 | Sprint 2 e Sprint 3 |

## Como executar

Pré-requisitos: Node.js 20 ou superior e a API rodando (veja o [README do back-end](../backend/README.md)).

```bash
cd frontend
npm install
npm run dev
```

Acesse http://localhost:3001 e entre com um dos usuários de exemplo do back-end (por exemplo, `gestor@operix.local`).

## Telas

| Tela | Rota | Quem acessa | História |
|---|---|---|---|
| Login | `/login` | Todos | UH01 |
| Equipamentos | `/equipamentos` | Todos os perfis (consulta) | UH03 |
| Novo e editar equipamento | `/equipamentos/novo`, `/equipamentos/[id]` | Gestor | UH03 |
| Usuários | `/usuarios` | Administrador | UH02 |
| Novo e editar usuário | `/usuarios/novo`, `/usuarios/[id]` | Administrador | UH02 |

Capturas das telas em [docs/telas](docs/telas).

## Estrutura

```
frontend/
├── next.config.ts          Configuração do Next.js (encaminha /api para a API)
├── src/
│   ├── app/                Rotas (App Router) e estilos globais
│   │   ├── login/          Tela de login
│   │   └── (sistema)/      Telas que exigem login: equipamentos e usuários
│   ├── components/         Layout, controle de acesso, formulários e componentes reutilizáveis
│   └── services/           Comunicação com a API (api.ts) e sessão do usuário (sessao.tsx)
├── docs/
│   ├── telas/              Capturas das telas implementadas
│   └── wireframes/         Wireframes das próximas telas
└── tests/                  Testes do front-end (a implementar)
```

## Integração com a API

- As chamadas ficam centralizadas em `src/services/api.ts`, com os mesmos formatos da documentação Swagger (`/api/docs`).
- O Next.js encaminha `/api` para a API (`API_URL`, padrão `http://localhost:3000`).
- O token de login fica em `sessionStorage` e é enviado no cabeçalho `Authorization`.
- O front-end esconde o que o perfil não pode fazer, mas quem garante as permissões é sempre o back-end.
