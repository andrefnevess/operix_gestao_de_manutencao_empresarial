import { Injectable } from '@nestjs/common';
import { Equipamento, StatusEquipamento } from '../domain';
import { PrismaService } from '../infra/prisma.service';
import { EquipamentoRepository } from './equipamento.repository';

interface LinhaEquipamento {
  id: string;
  codigo: string;
  nome: string;
  tipo: string;
  localizacao: string;
  fabricante: string | null;
  modelo: string | null;
  dataAquisicao: Date | null;
  status: string;
}

@Injectable()
export class PrismaEquipamentoRepository extends EquipamentoRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async buscarPorId(id: string): Promise<Equipamento | null> {
    const linha = await this.prisma.equipamento.findUnique({ where: { id } });
    return linha ? this.paraDominio(linha) : null;
  }

  async buscarPorCodigo(codigo: string): Promise<Equipamento | null> {
    const linha = await this.prisma.equipamento.findUnique({ where: { codigo: codigo.trim().toUpperCase() } });
    return linha ? this.paraDominio(linha) : null;
  }

  async listar(busca = ''): Promise<Equipamento[]> {
    const termo = busca.trim();
    const contem = { contains: termo, mode: 'insensitive' as const };
    const linhas: LinhaEquipamento[] = await this.prisma.equipamento.findMany({
      where: termo ? { OR: [{ codigo: contem }, { nome: contem }, { tipo: contem }, { localizacao: contem }] } : undefined,
      orderBy: { codigo: 'asc' },
    });
    return linhas.map((l) => this.paraDominio(l));
  }

  async salvar(e: Equipamento): Promise<void> {
    const dados = {
      codigo: e.getCodigo(),
      nome: e.getNome(),
      tipo: e.getTipo(),
      localizacao: e.getLocalizacao(),
      fabricante: e.getFabricante(),
      modelo: e.getModelo(),
      dataAquisicao: e.getDataAquisicao(),
      status: e.getStatus(),
    };
    await this.prisma.equipamento.upsert({ where: { id: e.getId() }, create: { id: e.getId(), ...dados }, update: dados });
  }

  private paraDominio(l: LinhaEquipamento): Equipamento {
    return Equipamento.reconstituir({ ...l, status: l.status as StatusEquipamento });
  }
}
