# Política de Segurança da Informação

> Documento de caráter acadêmico, elaborado pela equipe do projeto. Não substitui orientação jurídica profissional.

## 1. Objetivo

Estabelecer diretrizes para proteger a confidencialidade, a integridade e a disponibilidade das informações do projeto Operix: código-fonte, documentação, credenciais, ambientes e dados tratados pelo sistema.

## 2. Abrangência

Aplica-se a todos os integrantes da equipe, ao repositório no GitHub, aos ambientes (local e demonstração) e à aplicação desenvolvida.

## 3. Princípios

| Princípio | Aplicação no projeto |
|---|---|
| Confidencialidade | Repositório privado; segredos fora do código; acesso por perfil na aplicação |
| Integridade | Alterações somente via Pull Request revisado; histórico de commits preservado |
| Disponibilidade | Código versionado no GitHub; banco de dados reproduzível via scripts e Docker |
| Menor privilégio | Cada pessoa e cada perfil do sistema acessa apenas o necessário |

## 4. Controle de acesso ao repositório

- O repositório é **privado**; o acesso é concedido apenas aos integrantes da equipe e ao professor;
- Novos acessos são solicitados ao Tech Lead e registrados em [decisões](../05-reunioes/decisoes);
- Todos os integrantes devem habilitar a **autenticação em dois fatores (2FA)** na conta do GitHub;
- A branch `main` deve ser protegida: sem push direto, com Pull Request e ao menos uma aprovação;
- Ao final do projeto, os acessos são revisados conforme o [TEP](../06-encerramento/TEP.md).

## 5. Gestão de segredos

- Senhas, tokens, chaves de API e strings de conexão **nunca** são versionados;
- Configurações sensíveis ficam em variáveis de ambiente e em arquivos `.env`, que estão no `.gitignore`;
- O repositório mantém apenas um `.env.example` com nomes de variáveis e valores fictícios;
- No pipeline, segredos ficam em **GitHub Secrets**;
- Se um segredo for exposto em um commit, ele deve ser **revogado e trocado imediatamente**; apagar o commit não é suficiente.

## 6. Desenvolvimento seguro

| Risco (OWASP Top 10) | Controle adotado |
|---|---|
| Quebra de controle de acesso | Autorização por perfil verificada no back-end em cada endpoint |
| Falhas criptográficas | Senhas com hash BCrypt; comunicação via HTTPS no ambiente de demonstração |
| Injeção (SQL e outras) | Uso de JPA com consultas parametrizadas; validação de entradas |
| Design inseguro | Regras de negócio revisadas pelo Tech Lead e documentadas |
| Configuração incorreta | Perfis de configuração separados por ambiente; mensagens de erro sem detalhes internos |
| Componentes vulneráveis | Dependências atualizadas e verificadas pelo Dependabot |
| Falhas de identificação e autenticação | Bloqueio de usuários inativos; sessões/tokens com expiração |
| Falhas de registro e monitoramento | Logs de ações relevantes (login, alterações de ordens), sem registrar senhas |

## 7. Revisão de código

Todo Pull Request deve ser verificado quanto a:

- Ausência de segredos no código;
- Validação de dados de entrada;
- Verificação de permissão nas operações;
- Tratamento de exceções sem expor informações internas.

## 8. Gestão de incidentes

| Etapa | Ação |
|---|---|
| Identificação | Qualquer integrante que perceba o incidente comunica imediatamente o Tech Lead |
| Contenção | Revogar credenciais expostas, restringir acessos, pausar o deploy se necessário |
| Registro | Abrir Issue com o rótulo `seguranca` descrevendo o ocorrido (sem expor o segredo) |
| Correção | Aplicar a correção via Pull Request |
| Lições aprendidas | Discutir na Retrospectiva e atualizar esta política |

## 9. Responsabilidades

Ver [README](README.md#responsáveis).
