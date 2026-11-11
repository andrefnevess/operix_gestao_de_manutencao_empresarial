import { Injectable } from '@nestjs/common';
import { PlanoPreventivo } from '../domain';
import { PlanoRepository } from './plano.repository';

@Injectable()
export class MemoriaPlanoRepository extends PlanoRepository {
  private readonly planos = new Map<string, PlanoPreventivo>();

  async salvar(plano: PlanoPreventivo): Promise<PlanoPreventivo> {
    this.planos.set(plano.getId(), plano);
    return plano;
  }

  async buscarPorId(id: string): Promise<PlanoPreventivo | null> {
    return this.planos.get(id) ?? null;
  }

  async listar(): Promise<PlanoPreventivo[]> {
    return [...this.planos.values()];
  }
}