import { Injectable } from '@nestjs/common';
import { Equipamento, PlanoPreventivo, StatusEquipamento } from '../domain';
import { PrismaService } from '../infra/prisma.service';
import { PlanoRepository } from './plano.repository';

@Injectable()
export class PrismaPlanoRepository extends PlanoRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async salvar(plano: PlanoPreventivo): Promise<PlanoPreventivo> {
    const dados = {
      descricao: plano.getDescricao(),
      periodicidadeDias: plano.getPeriodicidadeDias(),
      ultimaExecucao: plano.getUltimaExecucao(),
      ativo: plano.estaAtivo(),
      equipamentoId: plano.getEquipamento().getId(),
    };
    await this.prisma.planoPreventivo.upsert({
      where: { id: plano.getId() },
      create: { id: plano.getId(), ...dados },
      update: dados,
    });
    return plano;
  }

  async buscarPorId(id: string): Promise<PlanoPreventivo | null> {
    const linha = await this.prisma.planoPreventivo.findUnique({
      where: { id },
      include: { equipamento: true },
    });
    return linha ? this.paraDominio(linha) : null;
  }

  async listar(): Promise<PlanoPreventivo[]> {
    const linhas = await this.prisma.planoPreventivo.findMany({
      include: { equipamento: true },
      orderBy: { ultimaExecucao: 'desc' },
    });
    return linhas.map((l) => this.paraDominio(l));
  }

  private paraDominio(l: any): PlanoPreventivo {
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

    return PlanoPreventivo.reconstituir({
      id: l.id,
      equipamento,
      descricao: l.descricao,
      periodicidadeDias: l.periodicidadeDias,
      ultimaExecucao: l.ultimaExecucao,
      ativo: l.ativo,
    });
  }
}
