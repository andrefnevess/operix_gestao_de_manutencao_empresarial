import { Injectable } from '@nestjs/common';
import { Equipamento } from '../domain';
import { EquipamentoRepository } from './equipamento.repository';

@Injectable()
export class MemoriaEquipamentoRepository extends EquipamentoRepository {
  private readonly itens = new Map<string, Equipamento>();

  async buscarPorId(id: string): Promise<Equipamento | null> {
    return this.itens.get(id) ?? null;
  }

  async buscarPorCodigo(codigo: string): Promise<Equipamento | null> {
    const alvo = codigo.trim().toUpperCase();
    return [...this.itens.values()].find((e) => e.getCodigo() === alvo) ?? null;
  }

  async listar(busca = ''): Promise<Equipamento[]> {
    return [...this.itens.values()].filter((e) => e.corresponde(busca)).sort((a, b) => a.getCodigo().localeCompare(b.getCodigo()));
  }

  async salvar(equipamento: Equipamento): Promise<void> {
    this.itens.set(equipamento.getId(), equipamento);
  }
}
