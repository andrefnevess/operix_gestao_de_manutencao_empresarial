# Plano de Comunicação

O GitHub é o centro de gestão do projeto. Cada canal tem uma finalidade definida.

```
                 GITHUB
                    |
       +------------+------------+
       |            |            |
  Discussions     Issues        Pull Requests
   (conversas)   (tarefas)      (código)
       |            |            |
       +------------+------------+
                    |
              DOCUMENTAÇÃO
          /docs, atas e ADRs
```

## GitHub Discussions

Conversas, ideias e alinhamentos que não são tarefas. Categorias:

| Categoria | Uso |
|---|---|
| Geral | Avisos e assuntos gerais |
| Arquitetura | Propostas e debates técnicos |
| Desenvolvimento | Dúvidas de implementação |
| Bugs | Discussão inicial antes de abrir Issue |
| DevOps | Ambiente, pipeline e infraestrutura |
| Testes | Estratégia e qualidade |
| Scrum | Processo e cerimônias do Scrumban |
| Ideias | Sugestões de melhoria do produto |

## Issues

Unidade de trabalho rastreável. Modelos disponíveis em `.github/ISSUE_TEMPLATE`:

| Tipo | Prefixo do título | Exemplo |
|---|---|---|
| Bug | `[BUG]` | [BUG] API retorna 500 ao cadastrar ativo |
| Tarefa | `[TAREFA]` | [TAREFA] Criar entidade OrdemDeServico |
| Melhoria | `[MELHORIA]` | [MELHORIA] Filtro por status na listagem |
| Dúvida | `[DUVIDA]` | [DUVIDA] Regra de prioridade das ordens |

## Pull Requests

- Toda alteração na `main` entra via Pull Request;
- Pelo menos uma revisão aprovada (preferencialmente do Tech Lead);
- O PR deve referenciar a Issue (`Closes #N`);
- Discussões sobre o código ficam registradas no próprio PR.

## Fluxo de branches

| Branch | Uso |
|---|---|
| `main` | Código estável e integrado |
| `feature/<issue>-<descricao>` | Novas funcionalidades |
| `fix/<issue>-<descricao>` | Correções |
| `docs/<descricao>` | Documentação |

## Padrão de commits

`tipo: descrição curta` — tipos: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, `ci`.

## Canais externos

Comunicação rápida (ex.: WhatsApp) é permitida para avisos, mas decisões e discussões técnicas devem ser registradas no GitHub.
