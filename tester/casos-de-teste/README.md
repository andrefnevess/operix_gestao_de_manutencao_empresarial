# Casos de Teste

Casos de teste manuais derivados dos critérios de aceite das histórias de usuário. Modelo: [CT-000-modelo.md](CT-000-modelo.md).

## UH01 — Autenticação

| ID | Título | Referência | Prioridade | Status |
|---|---|---|---|---|
| [CT-001](CT-001-login-credenciais-validas.md) | Login com credenciais válidas | RF01 / UH01 / CA01, CA02 | Alta | Não executado |
| [CT-002](CT-002-login-credenciais-invalidas.md) | Login com credenciais inválidas | RF01 / UH01 / CA03 | Alta | Não executado |
| [CT-003](CT-003-login-usuario-inativo.md) | Login de usuário inativo | RF01 / UH01 / CA04 · RN02 | Alta | Não executado |
| [CT-004](CT-004-bloqueio-apos-tentativas.md) | Bloqueio após 5 tentativas sem sucesso | RF01 / UH01 / CA05 | Alta | Não executado |
| [CT-005](CT-005-logout.md) | Encerrar a sessão (logout) | RF01 / UH01 / CA06 | Média | Não executado |

## UH02 — Usuários e perfis

| ID | Título | Referência | Prioridade | Status |
|---|---|---|---|---|
| [CT-006](CT-006-cadastro-usuario-campos-obrigatorios.md) | Cadastro de usuário com campos obrigatórios | RF02 / UH02 / CA01 | Alta | Não executado |
| [CT-007](CT-007-usuario-email-duplicado.md) | Cadastro de usuário com e-mail duplicado | RF02 / UH02 / CA02 | Alta | Não executado |
| [CT-008](CT-008-senha-protegida.md) | Senha armazenada de forma protegida | RF02 / UH02 / CA03 · RNF01 | Alta | Não executado |
| [CT-009](CT-009-editar-usuario.md) | Edição de nome e perfil do usuário | RF02 / UH02 / CA04 | Média | Não executado |
| [CT-010](CT-010-inativar-usuario.md) | Inativação de usuário preserva o histórico | RF02 / UH02 / CA05 | Média | Não executado |
| [CT-011](CT-011-acesso-restrito-admin.md) | Gestão de usuários restrita ao Administrador | RF02 / UH02 / CA06 · RNF02 | Alta | Não executado |

## UH03 — Equipamentos

| ID | Título | Referência | Prioridade | Status |
|---|---|---|---|---|
| [CT-012](CT-012-cadastro-equipamento-obrigatorios.md) | Cadastro de equipamento com campos obrigatórios | RF03 / UH03 / CA01 | Alta | Não executado |
| [CT-013](CT-013-equipamento-codigo-duplicado.md) | Cadastro de equipamento com código duplicado | RF03 / UH03 / CA02 · RN01 | Alta | Aprovado (banco de dados) · Não executado (API e interface) |
| [CT-014](CT-014-equipamento-dados-opcionais.md) | Cadastro com dados opcionais | RF03 / UH03 / CA03 | Média | Não executado |
| [CT-015](CT-015-editar-equipamento.md) | Edição de equipamento | RF03 / UH03 / CA04 | Média | Não executado |
| [CT-016](CT-016-status-equipamento.md) | Status do equipamento | RF03 / UH03 / CA05 | Média | Não executado |
| [CT-017](CT-017-pesquisa-equipamentos.md) | Pesquisa na listagem de equipamentos | RF03 / UH03 / CA06 | Média | Não executado |

## Próximos casos

UH04 a UH08 (chamados, ordens de serviço, preventiva e indicadores): previstos para a Entrega 3 (MVP integrado, 04/11).

## Dados de teste

Somente dados fictícios com o domínio `@operix.local`, conforme a política de LGPD do projeto (`docs/07-compliance/lgpd-protecao-de-dados.md`). Nunca usar dados reais de colegas ou terceiros.
