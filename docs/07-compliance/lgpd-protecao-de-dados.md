# LGPD — Proteção de Dados Pessoais

> Documento de caráter acadêmico, elaborado pela equipe do projeto. Não substitui orientação jurídica profissional.

## 1. Contexto

O Operix trata dados pessoais de usuários do sistema (gestores, técnicos e solicitantes). Por isso, o projeto segue os princípios da Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018), aplicando *privacy by design* desde a concepção.

## 2. Inventário de dados pessoais

| Dado | Titular | Finalidade | Obrigatório |
|---|---|---|---|
| Nome | Usuário | Identificação no sistema e nas ordens de serviço | Sim |
| E-mail | Usuário | Login e comunicação | Sim |
| Senha (hash) | Usuário | Autenticação | Sim |
| Perfil de acesso | Usuário | Controle de permissões | Sim |
| Especialidades | Técnico | Atribuição de ordens de serviço | Não |
| Registros de ações (logs) | Usuário | Rastreabilidade e segurança | Sim |

O sistema **não** coleta dados pessoais sensíveis (saúde, biometria, origem racial, religião, entre outros).

## 3. Princípios aplicados (art. 6º da LGPD)

| Princípio | Como é aplicado |
|---|---|
| Finalidade | Dados usados apenas para operar a gestão de manutenção |
| Necessidade | Coleta mínima: apenas os campos listados acima |
| Transparência | Política de privacidade disponível ao usuário |
| Segurança | Controles da [política de segurança](seguranca-da-informacao.md) |
| Prevenção | Revisão de privacidade em novas funcionalidades |
| Responsabilização | Registro das decisões e controles neste repositório |

## 4. Direitos dos titulares

O sistema deve permitir, no mínimo:

- Consulta dos próprios dados cadastrados;
- Correção de dados incompletos ou desatualizados;
- Inativação da conta, preservando o histórico de ordens de serviço de forma anonimizada quando necessário.

## 5. Dados em desenvolvimento e testes

- É **proibido** usar dados pessoais reais em desenvolvimento, testes, evidências ou apresentações;
- Usar apenas dados fictícios (ex.: `tecnico.teste@operix.local`);
- Evidências de teste (prints) não devem exibir dados reais de colegas ou terceiros.

## 6. Política de privacidade (modelo para o sistema)

> O Operix coleta nome, e-mail e perfil de acesso com a finalidade exclusiva de permitir o uso do sistema de gestão de manutenção. Os dados não são compartilhados com terceiros, são protegidos por controles de segurança e podem ser consultados ou corrigidos pelo próprio usuário. Solicitações relacionadas aos dados pessoais devem ser encaminhadas ao administrador do sistema.

## 7. Encarregado (DPO)

Por se tratar de projeto acadêmico, não há encarregado formal. Para fins de simulação, a função é atribuída ao Product Owner, André Neves.
