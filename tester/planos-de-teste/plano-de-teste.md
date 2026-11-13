# Plano de Teste — v1.3

> Versão 1.3 · 11/11/2026 (v1.2 de 09/11/2026, v1.1 de 26/10/2026, v1 de 18/10/2026) · Escopo: UH01 a UH08. Itens marcados com `[A definir]` dependem de decisão da equipe.

| Item | Descrição |
|---|---|
| Projeto | Operix — Gestão de Manutenção Empresarial |
| Responsável | José Arraes — Tester / QA |
| Escopo desta versão | UH01 Autenticação · UH02 Usuários e perfis · UH03 Equipamentos · UH04 Chamados · UH05 Geração e atribuição de OS · UH06 Execução da OS · UH07 Manutenção preventiva · UH08 Histórico e indicadores |
| Fora do escopo desta versão | Verificação na interface de UH04 a UH08 (telas ainda em integração) |
| Ambiente | Local (Docker Compose com PostgreSQL) e demonstração `[A definir]` |
| Ferramentas | Jest (unitários), Supertest (API), Swagger (testes exploratórios da API), Prisma Studio (conferência dos dados), GitHub Actions (execução automática) |

## 1. Objetivo

Verificar se as funcionalidades de autenticação, gestão de usuários, cadastro de equipamentos, chamados, ordens de serviço, manutenção preventiva, histórico e indicadores atendem aos critérios de aceite do backlog, às regras de negócio (RN01 a RN06 e RN10) e aos requisitos não funcionais de segurança (RNF01, RNF02).

## 2. Níveis e tipos de teste

| Nível | O que cobre | Ferramenta | Quem escreve |
|---|---|---|---|
| Unitário | Regras de negócio nas classes de domínio (ex.: `OrdemServico.iniciar()` / `concluir()`) | Jest | Back-end, com revisão do QA |
| API / integração | Cada endpoint: sucesso, erro de validação e acesso negado | Supertest | QA |
| Sistema (manual) | Fluxos completos na interface, seguindo os casos de teste | Casos CT-NNN | QA |
| Aceitação | Critérios de aceite de cada história, validados com o PO | Casos CT-NNN | QA + PO |

## 3. Rastreabilidade

| História | Critérios de aceite | Casos de teste |
|---|---|---|
| UH01 — Autenticação | CA01 a CA06 | CT-001 a CT-005 |
| UH02 — Usuários e perfis | CA01 a CA06 | CT-006 a CT-011 |
| UH03 — Equipamentos | CA01 a CA06 | CT-012 a CT-017 |
| UH04 — Abertura de chamado | CA01 a CA06 | CT-018 a CT-023 |
| UH05 — Geração e atribuição de OS | CA01 a CA06 | CT-024 a CT-029 |
| UH06 — Execução e encerramento da OS | CA01 a CA06 | CT-030 a CT-034 |
| UH07 — Manutenção preventiva | CA01 a CA06 | CT-035 a CT-039 |
| UH08 — Histórico e indicadores | CA01 a CA06 | CT-040 a CT-047 |

Índice completo em [`tester/casos-de-teste/README.md`](../casos-de-teste/README.md).

## 4. Dados de teste

- Somente dados fictícios, com e-mails no domínio `@operix.local` (ex.: `gestor.teste@operix.local`), conforme a política de LGPD do projeto;
- Um usuário de teste por perfil: Administrador, Gestor, Técnico e Solicitante, mais um usuário inativo;
- Senhas de teste nunca são reaproveitadas de contas reais;
- O banco de teste é recriado pelas migrations do Prisma antes de cada rodada.

## 5. Critérios de entrada

- História com critérios de aceite definidos e aprovados pelo PO;
- Build disponível no ambiente de teste e pipeline de CI passando;
- Endpoints documentados no Swagger.

## 6. Critérios de saída

- 100% dos casos de prioridade Alta executados;
- Nenhum defeito Crítico ou Alto em aberto;
- Defeitos Médios e Baixos registrados como Issue e priorizados pelo PO.

## 7. Gestão de defeitos

Todo defeito vira uma Issue do tipo `[BUG]` (modelo em `.github/ISSUE_TEMPLATE/bug.md`), com passos para reproduzir, resultado esperado e obtido e evidência em `tester/evidencias/`.

| Severidade | Exemplo |
|---|---|
| Crítica | Falha de segurança ou perda de dados (ex.: usuário inativo consegue entrar) |
| Alta | Funcionalidade principal não funciona (ex.: não é possível cadastrar equipamento) |
| Média | Funciona com contorno (ex.: mensagem de erro incorreta) |
| Baixa | Cosmético (ex.: texto desalinhado) |

## 8. Cronograma (Trello)

| Data | Atividade |
|---|---|
| 18/10 | Plano de teste v1 e casos de teste UH01 a UH03 |
| 20/10 | Testes Jest/Supertest de UH01 a UH03 e execução dos casos de teste |
| 31/10 | Casos de teste de UH04 a UH07 (CT-018 a CT-039) e execução quando as APIs forem entregues |
| 04/11 | Teste de regressão do MVP e relatório de bugs |
| 09/11 | Execução completa dos testes e relatório final |

## 9. Riscos

| Risco | Impacto | Resposta |
|---|---|---|
| APIs de UH01 a UH03 não ficarem prontas até 20/10 | Testes de API atrasam | Começar pelos testes unitários das classes de domínio |
| Divergências entre o código e o backlog | Casos falham por requisito, não por defeito | Registrar como Issue e alinhar com PO e Back-end (as divergências do schema inicial foram resolvidas no PR #5) |
| Regras ainda indefinidas em histórias futuras (UH04 a UH08) | Casos ficam incompletos | Levar ao PO e ao Tech Lead para decisão (tempo de bloqueio de 15 minutos e hash bcrypt já definidos no PR #5) |
| Ambiente de teste indisponível | Execução bloqueada | Banco de teste temporário recriado pelas migrations |

## 10. Execuções já realizadas

| Data | O que foi testado | Resultado |
|---|---|---|
| 11/10/2026 | Migração `init` do schema Prisma (PR #2) | Tabelas criadas sem erro |
| 11/10/2026 | CT-013 no nível do banco: código de equipamento duplicado | Aprovado: o banco recusou o código repetido (RN01) |
| 23/10/2026 | CT-001 a CT-017 (UH01 a UH03) pela API e pela interface, sobre o PR #5 | 17 aprovados, 5 defeitos (relatório [RT-001](../relatorios/RT-001-execucao-sprint-1.md)) |
| 11/11/2026 | CT-018 a CT-039 (UH04 a UH07) com testes automatizados e execução manual pelo Swagger, sobre o PR #11 | 21 aprovados, 1 reprovado, 6 defeitos (relatório [RT-002](../relatorios/RT-002-execucao-uh04-uh07.md)) |
| 11/11/2026 | Regressão final: UH01 a UH08 (main + PR #13 + PR #14), 50 testes de API e 23 de domínio | 50/50 e 23/23 aprovados; DEF-07 corrigido; 3 defeitos novos na UH08 (relatório [RT-003](../relatorios/RT-003-regressao-final.md)) |
