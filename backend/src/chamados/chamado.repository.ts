import { Chamado } from '../domain';
export abstract class ChamadoRepository {
    abstract salvar(chamado: Chamado): Promise<Chamado>;
    abstract buscarPorId(id: string): Promise<Chamado | null>;
    abstract listar(): Promise<Chamado[]>;
}

