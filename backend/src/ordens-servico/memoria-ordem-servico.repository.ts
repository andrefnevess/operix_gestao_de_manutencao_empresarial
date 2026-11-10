import { Injectable } from '@nestjs/common';
import { OrdemServico } from '../domain';
import { OrdemServicoRepository } from './ordem-servico.repository'

@Injectable()
export class MemoriaOrdemServicoRepository extends OrdemServicoRepository {
  private readonly ordens = new Map<string, OrdemServico>();

  async salvar(ordem: OrdemServico): Promise<OrdemServico> {
    this.ordens.set(ordem.getId(), ordem);
    return ordem;
  }

  async buscarPorId(id: string): Promise<OrdemServico | null> {
    return this.ordens.get(id) ?? null;
  }

  async listar(): Promise<OrdemServico[]> {
    return [...this.ordens.values()];
  }
}