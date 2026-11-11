# Relatório de Testes — Sprint 1

| Item | Valor |
|---|---|
| Período | 07/10 a 20/10/2026 |
| Escopo | UH01, UH02, UH03 e classes de domínio |
| Responsável | José Arraes — Tester / QA |

## Resumo

| Tipo | Executados | Aprovados | Reprovados |
|---|---|---|---|
| Testes unitários do domínio (Jest) | 23 | 23 | 0 |
| Testes de API (Jest + Supertest) | 14 | 14 | 0 |
| Casos de teste documentados (CT-001 a CT-013) | 13 | 13 | 0 |

Defeitos abertos: nenhum.

## O que os testes unitários cobrem

Regras do modelo de domínio para todas as classes, incluindo as que serão expostas na Sprint 2: bloqueio de login após 5 tentativas, permissões por perfil, chamado para equipamento inativo (RN03), ciclo de vida da ordem de serviço (RN04, RN05, RN10), descrição obrigatória na conclusão (RN06) e cálculo da preventiva (RN07).

## Evidências

- [Saída dos testes unitários](../evidencias/sprint-1-testes-dominio.txt)
- [Saída dos testes de API](../evidencias/sprint-1-testes-api.txt)
- [Capturas das telas](../../frontend/docs/telas)

## Pontos de atenção para a Sprint 2

- Testar as telas também no Docker Compose com PostgreSQL (nesta sprint, os testes automáticos rodaram com a persistência em memória);
- Cobrir pela API a edição de usuários (UH02-CA04) e os campos opcionais de equipamento (UH03-CA03);
- Escrever os casos CT-014 a CT-018 antes de as telas de chamados e ordens de serviço ficarem prontas.
