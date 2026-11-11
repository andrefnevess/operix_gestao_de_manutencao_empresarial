# Casos de Teste

Os casos marcados como automatizados têm um teste com o mesmo número em [`backend/tests/api.e2e-spec.ts`](../../backend/tests/api.e2e-spec.ts) e rodam a cada Pull Request no GitHub Actions.

## Sprint 1 — UH01 a UH03

| ID | Título | História | Execução | Status |
|---|---|---|---|---|
| [CT-001](CT-001-login-valido.md) | Login com credenciais válidas | UH01 (CA01, CA02) | Automatizado | Aprovado |
| [CT-002](CT-002-login-invalido.md) | Login com credenciais inválidas | UH01 (CA03) | Automatizado | Aprovado |
| [CT-003](CT-003-logout.md) | Encerrar a sessão | UH01 (CA06) | Manual | Aprovado |
| [CT-004](CT-004-bloqueio-tentativas.md) | Bloqueio após 5 tentativas sem sucesso | UH01 (CA05) | Automatizado | Aprovado |
| [CT-005](CT-005-cadastro-usuario.md) | Cadastro de técnico com especialidades | UH02 (CA01, CA03) | Automatizado | Aprovado |
| [CT-006](CT-006-email-duplicado.md) | E-mail duplicado | UH02 (CA02) | Automatizado | Aprovado |
| [CT-007](CT-007-usuario-inativado.md) | Usuário inativado não acessa o sistema | UH02 (CA05) | Automatizado | Aprovado |
| [CT-008](CT-008-acesso-usuarios.md) | Somente administradores gerenciam usuários | UH02 (CA06) | Automatizado | Aprovado |
| [CT-009](CT-009-cadastro-equipamento.md) | Cadastro de equipamento | UH03 (CA01, CA05) | Automatizado | Aprovado |
| [CT-010](CT-010-campos-obrigatorios.md) | Validação de campos obrigatórios | UH03 (CA01) | Automatizado | Aprovado |
| [CT-011](CT-011-codigo-duplicado.md) | Código de equipamento duplicado | UH03 (CA02) | Automatizado | Aprovado |
| [CT-012](CT-012-editar-inativar-buscar.md) | Edição, inativação e busca de equipamentos | UH03 (CA04, CA05, CA06) | Automatizado | Aprovado |
| [CT-013](CT-013-permissao-equipamentos.md) | Solicitante consulta, mas não cadastra equipamentos | UH03 | Automatizado | Aprovado |

## Sprint 2 — planejados

| ID | Título | História | Status |
|---|---|---|---|
| CT-014 | Abertura de chamado para equipamento inativo | UH04 (CA04) · RN03 | Não executado |
| CT-015 | Geração de OS a partir de chamado | UH05 (CA01, CA02, CA05) | Não executado |
| CT-016 | Só o técnico atribuído inicia a OS | UH06 (CA01) · RN10 | Não executado |
| CT-017 | Conclusão exige descrição do serviço | UH06 (CA03) · RN06 | Não executado |
| CT-018 | Alerta de preventiva a vencer em 7 dias | UH07 (CA04) | Não executado |

Modelo: [CT-000-modelo.md](CT-000-modelo.md).
