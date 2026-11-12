import { Equipamento } from './equipamento';
import { Prioridade, StatusChamado } from './enums';
import { exigir, texto } from './regra-de-negocio.error';
import { Usuario } from './usuario';

/** Pedido de manutenção feito por um solicitante (UH04). */
export class Chamado {
  private status: StatusChamado = StatusChamado.ABERTO;

  private constructor(
    private readonly id: string,
    private readonly solicitante: Usuario,
    private readonly equipamento: Equipamento,
    private readonly descricao: string,
    private readonly urgencia: Prioridade,
    private readonly abertoEm: Date,
  ) {}

  static abrir(
    id: string,
    solicitante: Usuario,
    equipamento: Equipamento,
    descricao: string,
    urgencia: Prioridade,
    agora: Date,
  ): Chamado {
    exigir(solicitante.podeAbrirChamado(), 'Este perfil não pode abrir chamados.');
    exigir(equipamento.estaAtivo(), 'Não é possível abrir chamado para equipamento inativo.', 'RN03');
    exigir(texto(descricao).length > 0, 'A descrição do problema é obrigatória.', 'UH04-CA02');
    return new Chamado(id, solicitante, equipamento, texto(descricao), urgencia, agora);
  }

  /** Reconstitui um chamado a partir dos dados do banco, sem aplicar regras. */
  static reconstituir(dados: {
    id: string;
    solicitante: Usuario;
    equipamento: Equipamento;
    descricao: string;
    urgencia: Prioridade;
    status: StatusChamado;
    abertoEm: Date;
  }): Chamado {
    const c = new Chamado(dados.id, dados.solicitante, dados.equipamento, dados.descricao, dados.urgencia, dados.abertoEm);
    c.status = dados.status;
    return c;
  }

  iniciarAtendimento(): void {
    exigir(this.status === StatusChamado.ABERTO, 'Só um chamado aberto pode entrar em atendimento.');
    this.status = StatusChamado.EM_ATENDIMENTO;
  }

  encerrar(): void {
    exigir(this.status === StatusChamado.EM_ATENDIMENTO, 'Só um chamado em atendimento pode ser encerrado.');
    this.status = StatusChamado.ENCERRADO;
  }

  cancelar(): void {
    exigir(this.status === StatusChamado.ABERTO, 'Só um chamado aberto pode ser cancelado.');
    this.status = StatusChamado.CANCELADO;
  }

  getId(): string {
    return this.id;
  }
  getSolicitante(): Usuario {
    return this.solicitante;
  }
  getEquipamento(): Equipamento {
    return this.equipamento;
  }
  getDescricao(): string {
    return this.descricao;
  }
  getUrgencia(): Prioridade {
    return this.urgencia;
  }
  getStatus(): StatusChamado {
    return this.status;
  }
  getAbertoEm(): Date {
    return this.abertoEm;
  }
}
