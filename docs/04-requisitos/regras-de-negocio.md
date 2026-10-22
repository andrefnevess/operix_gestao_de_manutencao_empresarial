# Regras de Negócio

> Status: versão 1.0 — alinhada ao [modelo de domínio](../03-arquitetura/modelo-de-dominio.md) e às histórias UH01–UH08.

| ID | Regra | Onde é garantida no modelo de domínio |
|---|---|---|
| RN01 | Cada equipamento possui um código único | Cadastro de `Equipamento` (repositório) |
| RN02 | Apenas usuários ativos podem acessar o sistema | `Usuario.autenticar()` |
| RN03 | Não é permitido abrir chamado para equipamento inativo | Criação de `Chamado` |
| RN04 | Uma ordem de serviço só pode ser executada após ser atribuída a um técnico | `OrdemServico.iniciar()` |
| RN05 | Uma ordem de serviço concluída ou cancelada não pode ser alterada | Todos os métodos de `OrdemServico` |
| RN06 | A conclusão de uma ordem exige a descrição do serviço realizado | Criação de `Manutencao` |
| RN07 | Ordens de manutenção preventiva são geradas conforme a periodicidade do plano | `PlanoPreventivo.proximaData()` |
| RN08 | Apenas gestores podem atribuir ou cancelar ordens de serviço | `OrdemServico.atribuir(gestor: Gestor, ...)` |
| RN09 | Prioridades válidas: Baixa, Média, Alta e Crítica | Enumeração `Prioridade` |
| RN10 | Somente o técnico atribuído pode iniciar e concluir a ordem de serviço | `OrdemServico.iniciar(tecnico)` |
| RN11 | Toda ordem de serviço tem exatamente uma origem: um chamado ou um plano preventivo | Métodos de fábrica de `OrdemServico` |
