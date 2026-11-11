import { PlanoPreventivo } from '../domain';

export abstract class PlanoRepository {
  abstract salvar(plano: PlanoPreventivo): Promise<PlanoPreventivo>;
  abstract buscarPorId(id: string): Promise<PlanoPreventivo | null>;
  abstract listar(): Promise<PlanoPreventivo[]>;
}