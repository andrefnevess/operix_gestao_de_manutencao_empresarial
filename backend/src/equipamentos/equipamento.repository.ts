import { Equipamento } from '../domain';

export abstract class EquipamentoRepository {
  abstract buscarPorId(id: string): Promise<Equipamento | null>;
  abstract buscarPorCodigo(codigo: string): Promise<Equipamento | null>;
  abstract listar(busca?: string): Promise<Equipamento[]>;
  abstract salvar(equipamento: Equipamento): Promise<void>;
}
