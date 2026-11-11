# Evidência — execução pela API em 23/10/2026

Versão: branch `feature/sprint-1-backend-telas-nextjs` (PR #5, commit `64fc4bb`) · API local em `PERSISTENCIA=memoria` · chamadas feitas a `http://localhost:3001/api` (encaminhado para a API em `localhost:3000`).

## Testes automatizados do PR #5

| Comando | Resultado |
|---|---|
| `npm test` | Test Suites: 1 passed · Tests: **23 passed, 23 total** |
| `npm run test:e2e` | Test Suites: 1 passed · Tests: **14 passed, 14 total** |

## Chamadas e respostas (resumo)

| Caso | Chamada | Resposta obtida |
|---|---|---|
| CT-001 | `POST /auth/login` gestor@operix.local | 200 · perfil GESTOR |
| CT-002 | `POST /auth/login` senha errada | 401 · "E-mail ou senha inválidos." |
| CT-002 | `POST /auth/login` e-mail inexistente | 401 · "E-mail ou senha inválidos." |
| CT-003 | `POST /auth/login` usuário inativado | 401 · "E-mail ou senha inválidos." |
| CT-003 | `GET /auth/me` com token emitido antes da inativação | 401 |
| CT-004 | 5 × `POST /auth/login` senha errada | 401, 401, 401, 401, 401 |
| CT-004 | 6ª tentativa com a senha correta | 401 · "Acesso bloqueado temporariamente após várias tentativas. Tente novamente em alguns minutos." |
| CT-006 | `POST /usuarios` vazio | 400 · 7 mensagens de validação |
| CT-006 | `POST /usuarios` só com nome | 400 |
| CT-006 | `POST /usuarios` completo | 201 · perfil TECNICO |
| CT-006 | `POST /usuarios` perfil inexistente | 400 · "Perfil inválido." |
| CT-006 | `POST /usuarios` senha de 1 caractere | 400 · "A senha deve ter pelo menos 8 caracteres." |
| CT-007 | `POST /usuarios` e-mail `gestor@operix.local` | 409 · "Já existe um usuário com este e-mail." |
| CT-007 | `POST /usuarios` e-mail `GESTOR@operix.local` | 409 · "Já existe um usuário com este e-mail." |
| CT-008 | `GET /usuarios` (admin) | 200 · campos: id, nome, email, perfil, ativo, especialidades (sem senha ou hash) |
| CT-009 | `PUT /usuarios/{id}` nome e perfil TECNICO → GESTOR | 200 · "Tecnico QA Editado", GESTOR |
| CT-009 | `GET /auth/me` após novo login | 200 · "Tecnico QA Editado", GESTOR |
| CT-009 | `POST /equipamentos` com o usuário editado | 201 (permissão de Gestor) |
| CT-010 | `PATCH /usuarios/{id}/inativar` | 200 · usuário consultável com `ativo: false` |
| CT-011 | `GET /usuarios` como Técnico / Solicitante / Gestor | 403 / 403 / 403 |
| CT-011 | `GET /usuarios` sem login | 401 |
| CT-012 | `POST /equipamentos` vazio | 400 · mensagens em inglês e português misturadas (DEF-02) |
| CT-012 | `POST /equipamentos` nome `"   "` | 422 · "O nome é obrigatório." (DEF-03) |
| CT-013 | `POST /equipamentos` código `arc-003` | 409 · "Já existe um equipamento com o código ARC-003." |
| CT-013 | `POST /equipamentos` como Solicitante | 403 |
| CT-014 | `POST /equipamentos` com fabricante, modelo e data | 201 · dados salvos, status ATIVO |
| CT-014 | `POST /equipamentos` sem opcionais | 201 · status ATIVO |
| CT-014 | `POST /equipamentos` data `abc` | 400 · "Data de aquisição inválida." |
| CT-014 | `POST /equipamentos` data `2099-01-01` | 201 (DEF-04) |
| CT-015 | `PUT /equipamentos/{ARC-003}` código `CMP-001` | 409 · "Já existe um equipamento com o código CMP-001." |
| CT-015 | `PUT /equipamentos/{ARC-003}` código `cmp-001` | 409 |
| CT-016 | Status após cadastro / após `PATCH .../inativar` | ATIVO / INATIVO |
| CT-017 | `GET /equipamentos?busca=CMP-001` · `compressor` · `Galpão` | CMP-001 · CMP-001 · CMP-001 |
| CT-017 | `GET /equipamentos?busca=galpao` · `inexistente` | vazio · vazio (DEF-05) |

## DEF-01 — saída do terminal

Ao rodar `npm run start:dev` com o `.env` copiado do `.env.example`:

```
[ERROR] PrismaClientInitializationError: error: Environment variable not found: DATABASE_URL.
  -->  schema.prisma:11
11 |   url      = env("DATABASE_URL")
Validation Error Count: 1
```

Com as variáveis definidas no terminal (`$env:PERSISTENCIA="memoria"` etc.), a API iniciou normalmente: "Operix API em http://localhost:3000/api".
