# Plano de Teste — versão 1.0

| Item | Descrição |
|---|---|
| Projeto | Operix — Gestão de Manutenção Empresarial |
| Responsável | José Arraes — Tester / QA |
| Escopo desta versão | Sprint 1: UH01 (autenticação), UH02 (usuários e perfis), UH03 (equipamentos) e as classes de domínio |
| Próxima revisão | Sprint 2 (UH04 a UH07), antes do MVP integrado de 04/11 |

## 1. Objetivo

Verificar se cada história atende aos seus critérios de aceite e se as regras de negócio do [modelo de domínio](../../docs/03-arquitetura/modelo-de-dominio.md) são respeitadas, antes de cada entrega da disciplina.

## 2. Níveis de teste

| Nível | O que verifica | Ferramenta | Onde fica | Quem escreve |
|---|---|---|---|---|
| Unitário | Regras de negócio nas classes de domínio (status, permissões, validações) | Jest | `backend/src/domain/*.spec.ts` | Back-end, revisado pelo QA |
| API (integração) | Endpoints, validação de entrada, permissões por perfil e mensagens de erro | Jest + Supertest | `backend/tests/*.e2e-spec.ts` | QA com o Back-end |
| Sistema (manual) | Fluxos nas telas, usabilidade e mensagens | Navegador + roteiro dos casos de teste | `tester/casos-de-teste` | QA |
| Aceitação | Critérios de aceite de cada história | Revisão com o Product Owner | Sprint Review | PO e QA |

## 3. Ambiente

| Ambiente | Uso |
|---|---|
| Local sem banco (`PERSISTENCIA=memoria`) | Testes automatizados de API e testes rápidos das telas |
| Local completo (Docker Compose) | Testes de sistema com PostgreSQL |
| GitHub Actions | Execução automática dos testes a cada Pull Request |

Dados de teste: apenas os usuários e equipamentos fictícios de exemplo. É proibido usar dados pessoais reais (LGPD).

## 4. Rastreabilidade

| História | Critérios cobertos | Casos de teste |
|---|---|---|
| UH01 — Autenticação | CA01 a CA06 | CT-001 a CT-004, CT-007 |
| UH02 — Usuários e perfis | CA01 a CA03, CA05, CA06 | CT-005 a CT-008 |
| UH03 — Equipamentos | CA01, CA02, CA04 a CA06 | CT-009 a CT-013 |

Pendentes na Sprint 1: UH02-CA04 (edição de usuário pela API — coberto só na tela) e UH03-CA03 (campos opcionais — coberto só na tela).

## 5. Critérios de entrada

- História com critérios de aceite definidos;
- Código integrado em um Pull Request com o pipeline aprovado.

## 6. Critérios de saída

- Todos os casos de prioridade alta executados e aprovados;
- Nenhum defeito crítico ou alto em aberto;
- Relatório da sprint publicado em `tester/relatorios`.

## 7. Registro de defeitos

Todo defeito vira uma Issue com o modelo `[BUG]`, com passos para reproduzir, resultado esperado, resultado obtido e evidência. Severidade: Crítica, Alta, Média ou Baixa.

## 8. Riscos

| Risco | Resposta |
|---|---|
| Ambiente indisponível | Testes de API rodam sem banco (modo em memória) |
| Requisitos alterados durante a sprint | Atualizar os casos de teste junto com a história |
| Pouco tempo antes das entregas | Priorizar os casos de prioridade alta e os testes automatizados |
