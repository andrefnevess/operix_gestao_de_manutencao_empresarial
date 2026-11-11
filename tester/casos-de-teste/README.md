# Casos de Teste

Casos de teste manuais derivados dos critérios de aceite das histórias de usuário. Modelo: [CT-000-modelo.md](CT-000-modelo.md).

## UH01 — Autenticação

| ID | Título | Referência | Prioridade | Status |
|---|---|---|---|---|
| [CT-001](CT-001-login-credenciais-validas.md) | Login com credenciais válidas | RF01 / UH01 / CA01, CA02 | Alta | Aprovado |
| [CT-002](CT-002-login-credenciais-invalidas.md) | Login com credenciais inválidas | RF01 / UH01 / CA03 | Alta | Aprovado |
| [CT-003](CT-003-login-usuario-inativo.md) | Login de usuário inativo | RF01 / UH01 / CA04 · RN02 | Alta | Aprovado |
| [CT-004](CT-004-bloqueio-apos-tentativas.md) | Bloqueio após 5 tentativas sem sucesso | RF01 / UH01 / CA05 | Alta | Aprovado (parcial) |
| [CT-005](CT-005-logout.md) | Encerrar a sessão (logout) | RF01 / UH01 / CA06 | Média | Aprovado |

## UH02 — Usuários e perfis

| ID | Título | Referência | Prioridade | Status |
|---|---|---|---|---|
| [CT-006](CT-006-cadastro-usuario-campos-obrigatorios.md) | Cadastro de usuário com campos obrigatórios | RF02 / UH02 / CA01 | Alta | Aprovado |
| [CT-007](CT-007-usuario-email-duplicado.md) | Cadastro de usuário com e-mail duplicado | RF02 / UH02 / CA02 | Alta | Aprovado |
| [CT-008](CT-008-senha-protegida.md) | Senha armazenada de forma protegida | RF02 / UH02 / CA03 · RNF01 | Alta | Aprovado (parcial) |
| [CT-009](CT-009-editar-usuario.md) | Edição de nome e perfil do usuário | RF02 / UH02 / CA04 | Média | Aprovado |
| [CT-010](CT-010-inativar-usuario.md) | Inativação de usuário preserva o histórico | RF02 / UH02 / CA05 | Média | Aprovado |
| [CT-011](CT-011-acesso-restrito-admin.md) | Gestão de usuários restrita ao Administrador | RF02 / UH02 / CA06 · RNF02 | Alta | Aprovado (API) |

## UH03 — Equipamentos

| ID | Título | Referência | Prioridade | Status |
|---|---|---|---|---|
| [CT-012](CT-012-cadastro-equipamento-obrigatorios.md) | Cadastro de equipamento com campos obrigatórios | RF03 / UH03 / CA01 | Alta | Aprovado com observações |
| [CT-013](CT-013-equipamento-codigo-duplicado.md) | Cadastro de equipamento com código duplicado | RF03 / UH03 / CA02 · RN01 | Alta | Aprovado |
| [CT-014](CT-014-equipamento-dados-opcionais.md) | Cadastro com dados opcionais | RF03 / UH03 / CA03 | Média | Aprovado |
| [CT-015](CT-015-editar-equipamento.md) | Edição de equipamento | RF03 / UH03 / CA04 | Média | Aprovado (parcial) |
| [CT-016](CT-016-status-equipamento.md) | Status do equipamento | RF03 / UH03 / CA05 | Média | Aprovado |
| [CT-017](CT-017-pesquisa-equipamentos.md) | Pesquisa na listagem de equipamentos | RF03 / UH03 / CA06 | Média | Aprovado com observação |

## UH04 — Abertura de chamado

| ID | Título | Referência | Prioridade | Status |
|---|---|---|---|---|
| [CT-018](CT-018-abrir-chamado.md) | Abertura de chamado válido | RF04 / UH04 / CA01, CA02, CA03, CA05 | Alta | Aprovado |
| [CT-019](CT-019-chamado-sem-descricao.md) | Abertura de chamado sem descrição | RF04 / UH04 / CA02 | Alta | Aprovado com observação |
| [CT-020](CT-020-chamado-urgencia.md) | Urgência do chamado | RF04 / UH04 / CA03 | Média | Aprovado |
| [CT-021](CT-021-chamado-equipamento-inativo.md) | Abertura de chamado para equipamento inativo | RF04 / UH04 / CA04 · RN03 | Alta | Aprovado |
| [CT-022](CT-022-acompanhar-chamados.md) | Acompanhamento dos próprios chamados | RF04 / UH04 / CA06 | Média | Reprovado (DEF-06) |
| [CT-023](CT-023-permissao-abrir-chamado.md) | Permissão para abrir chamado | UH04 · RNF02 | Média | Aprovado com observação |

## UH05 — Geração e atribuição de OS

| ID | Título | Referência | Prioridade | Status |
|---|---|---|---|---|
| [CT-024](CT-024-gerar-os-de-chamado.md) | Geração de OS a partir de chamado aberto | RF05 / UH05 / CA01, CA02 | Alta | Aprovado |
| [CT-025](CT-025-gerar-os-chamado-nao-aberto.md) | Geração de OS a partir de chamado que não está aberto | RF05 / UH05 / CA01 | Média | Aprovado |
| [CT-026](CT-026-atribuir-os.md) | Atribuição de OS a técnico com data prevista | RF05 / UH05 / CA03, CA04, CA05 | Alta | Aprovado com observação |
| [CT-027](CT-027-atribuir-os-tecnico-invalido.md) | Atribuição de OS a técnico inativo ou a outro perfil | RF05 / UH05 / CA03 | Média | Aprovado |
| [CT-028](CT-028-os-na-lista-do-tecnico.md) | OS na lista do técnico atribuído | RF05 / UH05 / CA06 | Média | Aprovado |
| [CT-029](CT-029-permissao-atribuir-cancelar.md) | Somente o gestor atribui ou cancela OS | UH05 · RNF02 | Alta | Aprovado |

## UH06 — Execução e encerramento da OS

| ID | Título | Referência | Prioridade | Status |
|---|---|---|---|---|
| [CT-030](CT-030-iniciar-os.md) | Início da OS pelo técnico atribuído | RF06 / UH06 / CA01, CA02 | Alta | Aprovado |
| [CT-031](CT-031-iniciar-os-invalida.md) | Início de OS não atribuída ou por outro técnico | RF06 / UH06 / CA01 · RN04 · RN10 | Alta | Aprovado |
| [CT-032](CT-032-concluir-os-sem-descricao.md) | Conclusão de OS sem descrição do serviço | RF06 / UH06 / CA03 · RN06 | Alta | Aprovado |
| [CT-033](CT-033-concluir-os.md) | Conclusão da OS com registro da manutenção | RF06 / UH06 / CA04, CA05 | Alta | Aprovado (parcial) |
| [CT-034](CT-034-alterar-os-concluida.md) | Alteração de OS concluída | RF06 / UH06 / CA06 · RN05 | Alta | Aprovado |

## UH07 — Manutenção preventiva

| ID | Título | Referência | Prioridade | Status |
|---|---|---|---|---|
| [CT-035](CT-035-criar-plano-preventivo.md) | Criação de plano de manutenção preventiva | RF07 / UH07 / CA01, CA02, CA03 | Alta | Aprovado |
| [CT-036](CT-036-plano-preventivo-invalido.md) | Plano preventivo inválido | RF07 / UH07 / CA01, CA02 | Média | Aprovado |
| [CT-037](CT-037-alerta-preventiva.md) | Alerta de preventiva próxima do vencimento | RF08 / UH07 / CA04 | Média | Aprovado |
| [CT-038](CT-038-preventiva-atrasada.md) | Preventiva atrasada | RF08 / UH07 / CA05 | Média | Aprovado (API) |
| [CT-039](CT-039-gerar-os-preventiva.md) | Geração de OS a partir do alerta de preventiva | RF07 / UH07 / CA06 | Alta | Aprovado com observação |

> Casos UH04 a UH07 executados em 11/11/2026 sobre a API do PR #11, pelos testes automatizados `backend/tests/uh04-uh07.e2e-spec.ts` e, nos casos CT-018, CT-024, CT-026, CT-030, CT-032 e CT-033, também manualmente pelo Swagger. Resultado completo no [RT-002](../relatorios/RT-002-execucao-uh04-uh07.md). A verificação na interface fica para quando as telas existirem.

## Próximos casos

UH08 (indicadores): prevista para a Entrega 3.

## Dados de teste

Somente dados fictícios com o domínio `@operix.local`, conforme a política de LGPD do projeto (`docs/07-compliance/lgpd-protecao-de-dados.md`). Nunca usar dados reais de colegas ou terceiros.
