import { Injectable } from '@nestjs/common';
import { Chamado, Prioridade, StatusChamado, Perfil, Usuario } from '../domain';
import { Equipamento, StatusEquipamento } from '../domain';
import { PrismaService } from '../infra/prisma.service';
import { ChamadoRepository } from './chamado.repository';

@Injectable()
export class PrismaChamadoRepository extends ChamadoRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async salvar(chamado: Chamado): Promise<Chamado> {
    const dados = {
      descricao: chamado.getDescricao(),
      urgencia: chamado.getUrgencia(),
      status: chamado.getStatus(),
      abertoEm: chamado.getAbertoEm(),
      solicitanteId: chamado.getSolicitante().getId(),
      equipamentoId: chamado.getEquipamento().getId(),
    };
    await this.prisma.chamado.upsert({
      where: { id: chamado.getId() },
      create: { id: chamado.getId(), ...dados },
      update: dados,
    });
    return chamado;
  }

  async buscarPorId(id: string): Promise<Chamado | null> {
    const linha = await this.prisma.chamado.findUnique({
      where: { id },
      include: { solicitante: true, equipamento: true },
    });
    return linha ? this.paraDominio(linha) : null;
  }

  async listar(): Promise<Chamado[]> {
    const linhas = await this.prisma.chamado.findMany({
      include: { solicitante: true, equipamento: true },
      orderBy: { abertoEm: 'asc' },
    });
    return linhas.map((l) => this.paraDominio(l));
  }

  private paraDominio(l: any): Chamado {
    const solicitante = Usuario.criar(l.solicitante.perfil as Perfil, {
      id: l.solicitante.id,
      nome: l.solicitante.nome,
      email: l.solicitante.email,
      senhaHash: l.solicitante.senhaHash,
      ativo: l.solicitante.ativo,
      especialidades: l.solicitante.especialidades,
      tentativasFalhas: l.solicitante.tentativasFalhas,
      bloqueadoAte: l.solicitante.bloqueadoAte,
    });

    const equipamento = Equipamento.reconstituir({
      id: l.equipamento.id,
      codigo: l.equipamento.codigo,
      nome: l.equipamento.nome,
      tipo: l.equipamento.tipo,
      localizacao: l.equipamento.localizacao,
      fabricante: l.equipamento.fabricante,
      modelo: l.equipamento.modelo,
      dataAquisicao: l.equipamento.dataAquisicao,
      status: l.equipamento.status as StatusEquipamento,
    });

    return Chamado.reconstituir({
      id: l.id,
      solicitante,
      equipamento,
      descricao: l.descricao,
      urgencia: l.urgencia as Prioridade,
      status: l.status as StatusChamado,
      abertoEm: l.abertoEm,
    });
  }
}
