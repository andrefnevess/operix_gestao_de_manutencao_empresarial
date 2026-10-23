# RT-001 — Relatório de execução dos testes · Sprint 1

| Item | Valor |
|---|---|
| Data da execução | 23/10/2026 |
| Executado por | José Arraes — Tester / QA (CT-005 manual); demais casos pela API com apoio de IA (Claude), acompanhados por José Arraes |
| Versão testada | Branch `feature/sprint-1-backend-telas-nextjs` (PR #5), commit `64fc4bb` |
| Ambiente | Windows, Node.js 24, API NestJS local em `PERSISTENCIA=memoria`, front-end Next.js em `localhost:3001` |
| Escopo | UH01 Autenticação · UH02 Usuários e perfis · UH03 Equipamentos |
| Plano | [`tester/planos-de-teste/plano-de-teste.md`](../planos-de-teste/plano-de-teste.md) |

## 1. Resumo

| Tipo de teste | Executados | Aprovados | Reprovados |
|---|---|---|---|
| Testes unitários do domínio (`npm test`) | 23 | 23 | 0 |
| Testes de API (`npm run test:e2e`) | 14 | 14 | 0 |
| Casos de teste CT-001 a CT-017 (API e interface) | 17 | 17 (5 parciais ou com observações) | 0 |
| **Defeitos encontrados** | | | **5 (1 alto, 2 baixos, 2 melhorias)** |

Todos os critérios de aceite de UH01 a UH03 foram atendidos. O defeito de severidade alta (DEF-01) não afeta as regras de negócio, mas impede rodar o projeto localmente seguindo as instruções do PR.

## 2. Como foi executado

1. Testes automatizados do PR #5 rodados localmente: `npm test` e `npm run test:e2e` na pasta `backend`.
2. API iniciada com `npm run start:dev` e front-end com `npm run dev`.
3. Casos CT-001 a CT-017 executados pela API (as mesmas rotas usadas pelas telas), com os usuários de exemplo `*@operix.local` e usuários de teste criados durante a execução. Detalhes em [`execucao-api-2026-10-23.md`](../evidencias/execucao-api-2026-10-23.md).
4. CT-005 (logout) executado **manualmente** na interface, com prints.

Os dados criados durante a execução existem só na memória da API e somem ao reiniciá-la.

## 3. Resultado por caso de teste

| Caso | História | Resultado |
|---|---|---|
| CT-001 Login com credenciais válidas | UH01 CA01–02 | Aprovado |
| CT-002 Login com credenciais inválidas | UH01 CA03 | Aprovado |
| CT-003 Login de usuário inativo | UH01 CA04 | Aprovado |
| CT-004 Bloqueio após 5 tentativas | UH01 CA05 | Aprovado (parcial: tempo de desbloqueio não verificado) |
| CT-005 Logout | UH01 CA06 | Aprovado (manual) |
| CT-006 Cadastro de usuário — obrigatórios | UH02 CA01 | Aprovado |
| CT-007 E-mail duplicado | UH02 CA02 | Aprovado |
| CT-008 Senha protegida | UH02 CA03 | Aprovado (parcial: hash no banco não verificado) |
| CT-009 Editar nome e perfil | UH02 CA04 | Aprovado |
| CT-010 Inativar usuário | UH02 CA05 | Aprovado |
| CT-011 Acesso restrito ao Administrador | UH02 CA06 | Aprovado (API) |
| CT-012 Cadastro de equipamento — obrigatórios | UH03 CA01 | Aprovado com observações (DEF-02, DEF-03) |
| CT-013 Código de equipamento duplicado | UH03 CA02 | Aprovado |
| CT-014 Dados opcionais | UH03 CA03 | Aprovado com observação (DEF-04) |
| CT-015 Edição de equipamento | UH03 CA04 | Aprovado (parcial) |
| CT-016 Status do equipamento | UH03 CA05 | Aprovado |
| CT-017 Pesquisa | UH03 CA06 | Aprovado com observação (DEF-05) |

## 4. Defeitos e melhorias

| ID | Descrição | Severidade | Situação |
|---|---|---|---|
| DEF-01 | A API não carrega o arquivo `.env`: seguindo o "Como testar" do PR #5 (`cp .env.example .env && npm run start:dev`), a API falha com `Environment variable not found: DATABASE_URL`, porque `PERSISTENCIA=memoria` não é lido. Contorno usado: definir as variáveis no terminal antes de iniciar. Correção sugerida: carregar o `.env` no `main.ts` (por exemplo, `import 'dotenv/config'`) ou usar `@nestjs/config`. | Alta | Aberto |
| DEF-02 | Mensagens de validação misturam inglês e português e incluem mensagens sem sentido para campo vazio (ex.: "codigo must be a string", "must be shorter than or equal to 30 characters" junto de "O código é obrigatório."). | Baixa | Aberto |
| DEF-03 | Códigos HTTP inconsistentes na validação: campo ausente retorna 400; nome só com espaços retorna 422. | Baixa | Aberto |
| DEF-04 | Data de aquisição no futuro (`2099-01-01`) é aceita. Não há regra no backlog; sugerido avaliar com o PO. | Melhoria | Para o PO |
| DEF-05 | A busca não ignora acentos: `galpao` não encontra "Galpão". | Melhoria | Para o PO |

## 5. Pendências para a próxima rodada

- Verificar na interface o menu de cada perfil (CT-011) e as telas de edição (CT-009, CT-015);
- Verificar o hash de senha com o banco PostgreSQL (CT-008);
- Verificar o desbloqueio do login quando o tempo for definido (CT-004);
- Repetir a execução após a correção do DEF-01.

## 6. Evidências

- [Saída da execução pela API](../evidencias/execucao-api-2026-10-23.md)
- [CT-005: usuário logado](../evidencias/CT-005-01-logado.png)
- [CT-005: após clicar em Sair](../evidencias/CT-005-02-apos-sair.png)

> Execução apoiada por IA (Claude) e acompanhada e revisada por José Arraes, conforme `docs/07-compliance/integridade-academica-e-conduta.md`.
