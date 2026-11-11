// Enumerações do domínio. Os valores são os mesmos do schema.prisma.

export enum Perfil {
  ADMINISTRADOR = 'ADMINISTRADOR',
  GESTOR = 'GESTOR',
  TECNICO = 'TECNICO',
  SOLICITANTE = 'SOLICITANTE',
}

export enum StatusEquipamento {
  ATIVO = 'ATIVO',
  EM_MANUTENCAO = 'EM_MANUTENCAO',
  INATIVO = 'INATIVO',
}

export enum StatusChamado {
  ABERTO = 'ABERTO',
  EM_ATENDIMENTO = 'EM_ATENDIMENTO',
  ENCERRADO = 'ENCERRADO',
  CANCELADO = 'CANCELADO',
}

export enum StatusOS {
  ABERTA = 'ABERTA',
  ATRIBUIDA = 'ATRIBUIDA',
  EM_EXECUCAO = 'EM_EXECUCAO',
  CONCLUIDA = 'CONCLUIDA',
  CANCELADA = 'CANCELADA',
}

export enum Prioridade {
  BAIXA = 'BAIXA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA',
  CRITICA = 'CRITICA',
}

export enum TipoManutencao {
  CORRETIVA = 'CORRETIVA',
  PREVENTIVA = 'PREVENTIVA',
}
