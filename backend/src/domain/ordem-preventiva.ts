import {OrdemServico} from './ordem-servico';

export class OrdemPreventiva extends OrdemServico {
    private dataAgendada: Date;

    constructor(id: number, descricao: string, dataAgendada: Date) {
        super (id, descricao);
        this.dataAgendada = dataAgendada;

    }

    getDataAgendada ():Date {
        return this.dataAgendada;
    }
}