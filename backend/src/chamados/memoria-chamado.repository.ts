import {Injectable} from '@nestjs/common';
import {Chamado} from '../domain';
import {ChamadoRepository} from './chamado.repository';

@Injectable()
export class MemoriaChamadoRepository extends ChamadoRepository {
    private readonly chamados = new Map<string, Chamado>();

    async salvar(chamado: Chamado): Promise<Chamado> {
        this.chamados.set(chamado.getId(), chamado);
        return chamado;
    }   

    async buscarPorId(id: string): Promise<Chamado | null> {
        return this.chamados.get(id) ?? null;
    }

    async listar (): Promise<Chamado[]> {
        return [...this.chamados.values()];
    }

} 